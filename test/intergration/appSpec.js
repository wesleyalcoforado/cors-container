'use strict';

var request = require('supertest');
var app = require('../../app');

describe('GET /http://jacob.uk.com', function(){
    it('respond with expected headers', function(done){
        request(app)
            .get('/https://www.jacob.uk.com')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('Access-Control-Allow-Headers', 'Content-Type')
            .expect('Access-Control-Allow-Credentials', 'false')
            .expect(200, done);
    });
    
    it('respect headers set by origin', function(done){
        request(app)
            .get('/https://www.jacob.uk.com/')
            .expect('X-Powered-By', 'Express')
            .expect(200, done);
    });
    
    it('respond with expected not found status code', function(done){
        request(app)
            .get('/https://www.jacob.uk.com/i-do-not-exsist')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('Access-Control-Allow-Headers', 'Content-Type')
            .expect('Access-Control-Allow-Credentials', 'false')
            .expect(404, done);
    });
});