'use strict';

const ResponseBuilder = require('../../../app/ResponseBuilder');
const chai = require('chai');
const spies = require('chai-spies');
const should = chai.should();
const expect = chai.expect;

chai.use(spies);

describe('ResponseBuilder', function() {
    describe('.addHeaders()', function() {
        it('should call response.header to set expected response headers', function(){
            let response = chai.spy.object([ 'header' ]);
            let responseBuilder = new ResponseBuilder(response);

            responseBuilder
                .addHeaderByKeyValue('Access-Control-Allow-Origin', '*')
                .build({});

            expect(response.header).to.have.been.called(); 
        });
        
        it('should call response.header with expected arguments when no previous response headers exsist', function(){
            let response = chai.spy.object([ 'header' ]);
            let responseBuilder = new ResponseBuilder(response);

            responseBuilder
                .addHeaderByKeyValue('Access-Control-Allow-Origin', '*')
                .build({});

            expect(response.header).to.have.been.called.with({
                'Access-Control-Allow-Origin': '*'
            });
        });
        
        it('should call response.header with expected arguments when previous response headers need to be respected', function(){
            let response = chai.spy.object([ 'header' ]);
            let responseBuilder = new ResponseBuilder(response);

            responseBuilder
                .addHeaderByKeyValue('Access-Control-Allow-Origin', '*')
                .build({
                    'Another-Header': 'True'
                });

            expect(response.header).to.have.been.called.with({
                'Access-Control-Allow-Origin': '*',
                'Another-Header': 'True'
            });
        });
        
        it('should be chainable', function(){
            let response = chai.spy.object([ 'header' ]);
            let responseBuilder = new ResponseBuilder(response);

            responseBuilder
                .addHeaderByKeyValue('Access-Control-Allow-Origin', '*')
                .addHeaderByKeyValue('Another-Header', 'True')
                .build({});

            expect(response.header).to.have.been.called.with({
                'Access-Control-Allow-Origin': '*',
                'Another-Header': 'True'
            });
        });
    });
});