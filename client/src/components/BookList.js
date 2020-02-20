import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

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
