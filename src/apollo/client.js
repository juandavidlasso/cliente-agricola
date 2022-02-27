import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
// import fetch from 'node-fetch'

const httpLink = createHttpLink({
  uri: 'https://servidor-cultivos-agricola.herokuapp.com/graphql',
  // uri: 'http://localhost:8000/graphql'
  // fetch
})

const authLink = setContext((_, { headers }) => {
  // leer el storage almacenado
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          obtenerTablonesPorCorte: {
            merge(existing, incoming) {
              return incoming
            }
          },obtenerLaborPorCorte : {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerTherbicidaPorAplicacion: {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerHerbicidasPorCorte: {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerAPFEPorCorte: {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerTRFEPorAplicacion: {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerLluviasActuales: {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerLluvias: {
            merge(existing, incoming) {
              return incoming
            }
          },
          obtenerRiegosCorte: {
            merge(existing, incoming) {
              return incoming
            }
          }
        }
      }
    }
  }),
  link: authLink.concat( httpLink )
})

export default client
