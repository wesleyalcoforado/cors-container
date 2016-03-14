# cors-container

A CORS proxy in a container (Docker) for when you need to `Access-Control-Allow-Origin: *`! 

#### About

If you need permissive CORS for a front-end project, simply deploy this container and proxy your HTTP requests through it.

Once the container is running, you may navigate to [http://container-address:3000/https://jacob.uk.com](http://container-address:3000/https://jacob.uk.com), `cors-container` will then proxy the specified resource and transform the original headers to be CORS permissive, whilst keeping origional headers in-tact.

If you intend to use this in production over the open web, ensure the service is locked down with restrictive firewall/access permissions, otherwise any content may be proxied over your server.

I suggest implementing proper CORS headers on your resources and using this for development purposes only.

#### Relative URL rewriting 

cors-container can rewrite relative URLs to full URLs within the content you have proxied, for example: If we wish to proxy `http://blog.jacob.uk.com` and cors-container is runinnng on `http://localhost:3000/` our request URL would be `http://localhost:3000/http://blog.jacob.uk.com`.

cors-container will then rewrite any relative URLs, for example `<a href="/my-blog-post">` would be modified to `<a href="http://localhost:3000/http://blog.jacob.uk.com/my-blog-post">` in the proxied response.

This can be useful if you wish to be able to follow links and also pull them through the proxy. This is not enabled by default as this option mutates the origional response body.

Set `rewrite-urls` in the request header to cors-cotainer if you want relative URLs rewriting.

#### Deploying

##### Docker(hub)

```bash
$ docker pull imjacobclark/cors-container
$ docker run --restart=always -d -p 3000:3000 --name cors-container imjacobclark/cors-container
```

##### Docker(source)

```shell
$ git pull https://github.com/imjacobclark/cors-container.git && cd cors-container
$ docker build -t cors-container
$ docker run --restart=always -d -p 3000:3000 --name cors-container cors-container
```

##### Node

```shell
$ git pull https://github.com/imjacobclark/cors-container.git && cd cors-container
$ npm run test && npm start
```

#### Thanks to

* [Express](http://expressjs.com/)
* [request-promise](https://github.com/request/request-promise)
* [rel-to-abs](https://github.com/auth0/rel-to-abs)
* [Supertest](https://github.com/visionmedia/supertest)
* [Mocha](http://mochajs.org/)
* [Nock](https://github.com/pgte/nock)
