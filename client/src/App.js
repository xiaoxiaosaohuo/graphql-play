import React from 'react';
import Booklist from "./components/Booklist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// 启动apollo
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1> My Reading List</h1>
        <Booklist />
      </div>
    </ApolloProvider>
  );
}

export default App;
