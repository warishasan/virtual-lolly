const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const shortid = require("shortid");
const q = faunadb.query;

var client = new faunadb.Client({
  secret: "fnAD5MqQrdACB9dQ1KIGSHWDc6hdEVRDhV8St8ua",
})



const typeDefs = gql`
  type Query {
    getAllLollies: [Lolly]!
    getLollyByPath (lollyPath: String!): Lolly
  }
  type Lolly {
    recipientName: String!
    sendersName: String!
    message: String!
    flavorTop: String!
    flavorMid: String!
    flavorBot: String!
    lollyPath: String!
  }

  type Mutation{
  createLolly(recipientName: String!,sendersName: String!,message: String!,flavorTop: String!,flavorMid: String!,flavorBot: String!):Lolly
}`


const resolvers = {
  Query: {
    getAllLollies: async() => {
     
      var result = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("allLollies"))),
          q.Lambda(x => q.Get(x))
        )
      )

      return result.data.map(d => {
        return ({
          recipientName: d.data.recipientName,
          sendersName: d.data.sendersName,
          flavorTop: d.data.flavorTop,
          flavorMid: d.data.flavorMid,
          flavorBot: d.data.flavorBot,
          message: d.data.message,
          lollyPath: d.data.lollyPath
        })
      })
      
    },

    getLollyByPath: async(_,args) => {
     
      var result = await client.query(
       
        q.Get(
          q.Match(q.Index('Lolly_by_path'), args.lollyPath)
        )
        
      )

    

      return result.data
      
    },



  },

  Mutation:{
    
    createLolly: async (root, args) => {
      const id = shortid.generate();
      args.lollyPath = id;

      const result = await client.query(
        q.Create(q.Collection("Lollies"),{
          data: args
        })
      )

      axios.post('https://api.netlify.com/build_hooks/5f9b08201c44a833a923d4b4')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });


      console.log(result)
      return result.data
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
