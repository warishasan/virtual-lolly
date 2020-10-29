module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Lollies",
        // This is the field under which it's accessible
        fieldName: "LOLLIES",
        // URL to query from
        url: "http://localhost:8888/.netlify/functions/newLolly",
      },
    },

    
  ],
}