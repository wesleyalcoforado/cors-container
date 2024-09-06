'use strict';

const converter = require('rel-to-abs');
const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf8');
const ResponseBuilder = require('./app/ResponseBuilder');
const { buffer } = require('node:stream/consumers');


module.exports = app => {
    app.get('/*', (req, res) => {
        const responseBuilder = new ResponseBuilder(res);

        const requestedUrl = req.url.slice(1);
        const corsBaseUrl = '//' + req.get('host');

        console.info(req.protocol + '://' + req.get('host') + req.url);

        if (requestedUrl == '') {
            res.send(index);
            return;
        }

        fetch(requestedUrl, {
            headers: req.headers,
        })
            .then(async originResponse => {
                responseBuilder
                    .addHeaderByKeyValue('Access-Control-Allow-Origin', '*')
                    .addHeaderByKeyValue('Access-Control-Allow-Credentials', false)
                    .addHeaderByKeyValue('Access-Control-Allow-Headers', 'Content-Type')
                    .addHeaderByKeyValue('X-Proxied-By', 'cors-container')
                    .build(originResponse.headers);
                if (req.headers['rewrite-urls']) {
                    res.send(
                        converter
                            .convert(originResponse.body, requestedUrl)
                            .replace(requestedUrl, corsBaseUrl + '/' + requestedUrl)
                    );
                } else {
                    res.send(await buffer(originResponse.body));
                }
            })
            .catch(originResponse => {
                responseBuilder
                    .addHeaderByKeyValue('Access-Control-Allow-Origin', '*')
                    .addHeaderByKeyValue('Access-Control-Allow-Credentials', false)
                    .addHeaderByKeyValue('Access-Control-Allow-Headers', 'Content-Type')
                    .addHeaderByKeyValue('X-Proxied-By', 'cors-containermeh')
                    .build(originResponse.headers);

                res.status(originResponse.statusCode || 500);

                return res.send(originResponse.message);
            });
    });
};
