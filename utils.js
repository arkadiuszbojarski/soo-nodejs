/*jslint node: true, nomen: true */
'use strict';

function url(req) {
    return req.protocol + '://' + req.get('host') + req.baseUrl;
}

function dto(url, item) {
    var resource = JSON.parse(JSON.stringify(item));
    resource._links = {
        self: { href: url + '/' + item._id },
    };
    return resource;
}

function Page(url, size, number, collection, count, name) {
    this._embedded = {};
    this._embedded[name] = [];
    this._links = { self: { href: url }};
    this.page = {
        'size': size,
        'totalElements': count,
        'totalPages': Math.ceil(count / size),
        'number': number
    };

    if (count) {
        this._links.first = { href: url + '?page=0&size=' + size };
        this._links.next = { href: url + '?page=' + (number + 1) + '&size=' + size};
        if (number > 0) {
            this._links.prev = { href: url + '?page=' + (number - 1) + '&size=' + size};
        }
        this._links.last = { href: url + '?page=' + Math.floor(count / size) + '&size=' + size};

        var page = this;
        collection.forEach(function (item) {
            page._embedded[name].push(dto(url, item));
        });
    }
}

module.exports = {
    url: url,
    dto: dto,
    Page: Page
};
