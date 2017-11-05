import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import fs from "fs";
import { exec } from "child_process";
import bodyParser from "body-parser";
import morgan from "morgan";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-client-preset";
import LocalLink from "./src/ApolloLinkLocal";
import schema from "./src/GraphQLSchema";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import { Helmet } from "react-helmet";
import Routes from "./src/Routes";

const PROD = process.env.NODE_ENV === "production";
const app = express();
app.use(compression());
app.use(serveStatic("public"));
app.use(morgan(PROD ? "common" : "dev"));

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

var bundle = "http://localhost:8080/public/bundle.js";
if (PROD) {
  bundle = "/" + fs.readdirSync("./public").find(f => f.match(/bundle-/));
  if (!bundle) {
    console.log("No bundle found. Try `npm run build` first.");
    process.exit();
  }
} else {
  const webpackDevServer = exec("npm run webpack-dev");
  process.on("exit", () => webpackDevServer.kill());

  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
}

const HTML = (helmet, content, localAssets, state) => `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-108172731-1"></script>
    <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'UA-108172731-1');</script>
    ${helmet.title.toString()}
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charset="UTF-8">
    <meta http-equiv="Content-Language" content="en">
    <link rel="stylesheet" href="${localAssets
      ? ""
      : "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta"}/css/bootstrap.min.css" />
    <link rel="stylesheet" href="${localAssets
      ? ""
      : "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0"}/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body><div id="app">${content}</div></body>
  <script>
    window.__STATE__=${JSON.stringify(state).replace(/</g, "\\u003c")};
  </script>
  <script crossorigin src="${bundle}"></script>
</html>`;

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new LocalLink(schema)
});

app.get("*", async (req, res, next) => {
  if (process.env.SKIP_RENDER) {
    return res.send(HTML({ title: "" }, "", false, ""));
  }

  const context = {};

  const jsx = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </ApolloProvider>
  );

  try {
    await getDataFromTree(jsx);
  } catch (e) {
    return next(e);
  }

  const initialState = client.cache.extract();

  const content = ReactDOMServer.renderToString(jsx);
  const helmet = Helmet.renderStatic();
  const localAssets = process.env.LOCAL_ASSETS ? true : false;

  if (context.url) {
    return res.redirect(context.url);
  }

  res.send(HTML(helmet, content, localAssets, initialState));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
