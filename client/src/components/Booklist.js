// @flow
import React,{useState} from 'react';
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";
import BookDetails from './BookDetails';
const BookList = ()=>{
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected,setSelected] = useState(null);
    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <div>
        <ul id="book-list">
          {data.books.map(book => {
            return (
              <li key={book.id} onClick={e => setSelected(book.id)}>
                {book.name}
              </li>
            );
          })}
        </ul>
        <BookDetails bookId={selected} />
      </div>
    );
}

export default BookList;