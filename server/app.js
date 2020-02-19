const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

mongoose
  .connect(`mongodb://chris:test123@ds263928.mlab.com:63928/gql-ninja`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database...'));

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
