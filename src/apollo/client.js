//import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import fetch from 'node-fetch'

const httpLink = createHttpLink({
  uri: 'https://servidor-cultivos-agricola.herokuapp.com/graphql',
  //uri: 'http://localhost:8000/graphql',
  fetch
})

const authLink = setContext((_, { headers }) => {

  // leer el storage almacenado
  //const token = localStorage.getItem('token')
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat( httpLink )
})

// const client = new ApolloClient({
//   uri: "http://localhost:8000/graphql",
//   // Enviar token al servidor
//   fetchOptions: {
//     credentials: 'include'
//   },
//   request: operation => {
//     const token = localStorage.getItem('token')
//     operation.setContext({
//       headers: {
//         authorization : token
//       }
//     })
//   },
//   cache: new InMemoryCache({
//     addTypename: false
//   }),
//   onError: ({networkError, graphQLErrors}) => {
//     console.log('graphQLErrors', graphQLErrors);
//     console.log('networkError', networkError);
//   }
// })

export default client
