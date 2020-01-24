/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from "apollo-client";
import VueApollo, { ApolloProvider } from "vue-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import { WebSocketLink } from "apollo-link-ws";

Vue.config.productionTip = false

const link = new WebSocketLink({
  uri: "ws://192.168.66.189:8080/v1/graphql",
  options: {
    reconnect: true,
    timeout: 60000
    //connectionParams: () => {
    //  return { headers: getHeaders() };
  }
});

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
Vue.use(VueApollo);

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
