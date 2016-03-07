'use strict';

const request = require('request-promise');

module.exports = function(app){
    function setHeaders(res, origin){
        res.header(origin.headers);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', false);
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }

    app.get('/*', (req, res) => {
        console.info(req.protocol + '://' + req.get('host') + req.originalUrl);
        
        request({
            uri: req.params[0],
            resolveWithFullResponse: true
        })
        .then(originResponse => {
            setHeaders(res, originResponse);
            res.send(originResponse.body); 
        })
        .catch(originResponse => {
            setHeaders(res, originResponse);
            res.status(originResponse.statusCode || 200);
            return res.send('error');
        });
    });
};