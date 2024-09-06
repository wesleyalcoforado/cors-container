'use strict';

const { header } = require("express/lib/request");

function ResponseBuilder(response) {
    this.response = response;
    this.headers = {};
}

ResponseBuilder.prototype.addHeaderByKeyValue = function (key, value) {
    this.headers[key] = value;
    return this;
}

ResponseBuilder.prototype.build = function (headers) {
    if (headers) {
        headers.forEach((value, key) => {
            this.response.header(key, value);
        });
        Object.entries(this.headers).forEach(([key, value]) => {
            this.response.header(key, value);
        });
    }

    return this;
}

module.exports = ResponseBuilder;