# webpack-starter-cli

```bash
npm install -g @vleesbrood/webpack-starter-cli
```

> a webpack config in a cli

## pre-requisites

- Node & NPM

## gotcha's

The cli assumes a folder layout like this:

```
 |- src/
 |- package.json
 |- .babelrc
 |- vlees.config.json
```

Use .babelrc to add babel presets!

```json
{
  "presets": [
    "@babel/preset-react"
  ]
}
```