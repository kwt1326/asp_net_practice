import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/app';
import wdm from './wdm'
import RenderHtml from './renderHtml';

const app = express();
const port = 3000;

app.use(wdm);

app.get('/', function (req, res, next) {

  let preloadState = {
    text: 'Server-Side Rendering'
  };

  let renderProps = {
    preloadState: `window.__PRELOADED_STATE__ =${JSON.stringify(preloadState).replace(/</g, '\\u003c')}`,
    script: '/build/client.bundle.js'
  };

  ReactDOMServer.renderToNodeStream(
    <RenderHtml {...renderProps}>
      <App data={preloadState} />
    </RenderHtml>
  ).pipe(res);
});

app.listen(port, () => {
  console.log('http://localhost:3000')
});
