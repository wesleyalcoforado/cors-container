# cors-container

A CORS proxy in a container (Docker) for when you need to `Access-Control-Allow-Origin: *`! 

#### About

If you need permissive CORS for a front-end project, simply deploy this container and proxy your HTTP requests through it.

Once the container is running, you may navigate to [http://container-address:3000/https://jacob.uk.com](http://container-address:3000/https://jacob.uk.com), `cors-container` will then proxy the specified resource and transform the original headers to be CORS permissive, whilst keeping origional headers in-tact.

If you intend to use this in production over the open web, ensure the service is locked down with restrictive firewall/access permissions, otherwise any content may be proxied over your server.

I suggest implementing proper CORS headers on your resources and using this for development purposes only.

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
