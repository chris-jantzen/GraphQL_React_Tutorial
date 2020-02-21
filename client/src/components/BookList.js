import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

const BookList = props => {
  const displayBooks = () => {
    const { data } = props;
    return data.loading ? (
      <div>Loading books</div>
    ) : (
      data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      })
    );
  };

  return (
    <div>
      <ul id='book-list'>{displayBooks()}</ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
