import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-client-preset'
const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__STATE__)
});

ReactDOM.hydrate((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById('app'))
