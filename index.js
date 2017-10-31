import express from 'express'
import compression from 'compression'
import serveStatic from 'serve-static'
import fs from 'fs'
import { exec } from 'child_process'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Helmet } from 'react-helmet'

import Routes from './src/Routes'

const app = express()
app.use(compression())
app.use(serveStatic('public'))

var bundle = "http://localhost:8080/public/bundle.js";
if (process.env.NODE_ENV === 'production') {
  bundle = "/" + fs.readdirSync('./public').find(f => f.match(/bundle-/));
  if (!bundle) {
    console.log("No bundle found. Try `npm run build` first.")
    process.exit();
  }
}
else {
  const webpackDevServer = exec('npm run webpack-dev')
  process.on('exit', () => webpackDevServer.kill());
}

const HTML = (helmet, content, localAssets) => `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108172731-1"></script>
    <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'UA-108172731-1');</script>
    ${helmet.title.toString()}
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charset="UTF-8">
    <meta http-equiv="Content-Language" content="en">
    <link rel="stylesheet" href="${localAssets ? '' : 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta'}/css/bootstrap.min.css" />
    <link rel="stylesheet" href="${localAssets ? '' : 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0'}/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body><div id="app">${content}</div></body>
  <script src="${bundle}"></script>
</html>`

app.get('*', (req, res) => {
  const context = {}

  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Routes />
    </StaticRouter>
  )
  const helmet = Helmet.renderStatic()
  const localAssets = process.env.LOCAL_ASSETS ? true : false;

  if (context.url) {
    return res.redirect(context.url)
  }
  if (process.env.NODE_ENV === 'production') {
    res.send(HTML(helmet, content, localAssets))
  }
  else {
    res.send(HTML(helmet, '', localAssets));
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
