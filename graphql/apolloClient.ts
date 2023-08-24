import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clldgg8473gge01tc5shncu0p/master',
  cache: new InMemoryCache(),
});
