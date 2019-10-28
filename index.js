import { ApolloServer } from 'apollo-server-micro'
import { gql } from 'apollo-server-micro'
import axios from 'axios'


const typeDefs = gql`
  type Query {
      yesNo: String
  }
`

class YesNoAPI {
  constructor () {
    this.baseURL = 'https://yesno.wtf/api'
  }

  async get () {
    const response = await axios.get(this.baseURL)
    console.log(response)
    return response.data.answer
  }
}

const resolvers = {
  Query: {
    yesNo: async (parent, args, { dataSources }) => {
      return dataSources.yesno.get()
    }
  }
}


const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: () => ({ yesno: new YesNoAPI() }),
  introspection: true,
  playground: true
})

module.exports = server.createHandler({ path: '/' })
