import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    author: ''
  };

  displayAuthors = () => {
    const { data } = this.props;
    return data.loading ? (
      <option disabled>Loading Authors..</option>
    ) : (
      data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      })
    );
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form id='add-book' onSubmit={this.onSubmit}>
        <div className='field'>
          <label htmlFor='name'>Book Name</label>
          <input type='text' name='name' id='book-name' />
        </div>
        <div className='field'>
          <label htmlFor='genre'>Genre</label>
          <input type='text' name='genre' id='genre' />
        </div>
        <div className='field'>
          <label htmlFor='author'>Author</label>
          <select name='author' id='authorname'>
            <option>Selector Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
