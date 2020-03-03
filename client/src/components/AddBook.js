import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
} from "../queries/queries";

const AddBook = (props)=>{
    const [ name, setName ]= useState();
    const [ genre, setGenre ] = useState();
    const [ authorId, setAuthorId ] = useState();
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook, dataFromServer] = useMutation(addBookMutation);

    const submitForm = (e)=> {
        e.preventDefault()
        console.log(name);
        addBook({
          variables: { name, genre, authorId },
          refetchQueries: [{ query: getBooksQuery }]
        });
    }
    const displayAuthors = ()=>{
        if(loading){
            return( <option disabled>Loading authors</option> );
        } else {
          console.log(data);
            return data.authors.map(author => {
                return( <option key={ author._id } value={author._id}>{ author.name }</option> );
            });
        }
    }
    return (
      <form id="add-book" onSubmit={submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => setGenre(e.target.value)} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => setAuthorId(e.target.value)}>
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
}

export default AddBook;