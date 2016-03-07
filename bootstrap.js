'use strict';

const request = require('request-promise');

module.exports = function(app){
    function setHeaders(res, origin){
        res.header(origin.headers);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', false);
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('X-Proxied-By', 'cors-container');
    }

    app.get('/*', (req, res) => {
        console.info(req.protocol + '://' + req.get('host') + req.originalUrl);
        
        request({
            uri: req.params[0],
            resolveWithFullResponse: true,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
            }
        })
        .then(originResponse => {
            setHeaders(res, originResponse);
            res.send(originResponse.body); 
        })
        .catch(originResponse => {
            setHeaders(res, originResponse);
            res.status(originResponse.statusCode || 500);
            return res.send(originResponse.message);
        });
    });
};
