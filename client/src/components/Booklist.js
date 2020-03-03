// @flow
import * as React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const getBookQuery = gql`
{
    books{
        name
        id
    }
}
`;
const BookList = ()=>{
    const { loading, error, data } = useQuery(getBookQuery);
    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div>
        <ul id="book-list">
          {data.books.map(book => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </div>
    );
}

export default BookList;