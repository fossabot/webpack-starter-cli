# webpack-starter
> ez webpackin'

This is a skeleton template for getting started with webpack es6 and npm.  
With the [commands](#commands) listed here, Webpack will bundle & compile everything under `src` to something your browser actually supports.  

This repo also contains [a react branch with a starter project](https://github.com/arno-s/webpack-es6-starter/tree/react).

## get it
```bash
> git clone https://github.com/arno-s/webpack-starter.git
> npm install
> npm run serve
```
## <a id="commands"></a>commands
```bash
> npm run serve     #builds, watches & runs webpack-dev-server
```
```bash
> npm run build     #builds to /dist/-folder for deployment
```
```bash
> npm run ib        #run previous 2 commands
```

## todo
- set root-path for importing modules & fallback to /node-modules/

## important
don't forget to remove jquery if you don't use it from the `package.json`.
