import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      age,
      _id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;


const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      id
    }
  }
`;
const getBookQuery = gql`
  query GetBook($id: String) {
    book(id: $id) {
      id
      name
      genre
      author {
        _id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
