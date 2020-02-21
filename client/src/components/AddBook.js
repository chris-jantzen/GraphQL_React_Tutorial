import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';
import flowright from 'lodash.flowright';
const compose = flowright;

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
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

  onSubmit = async e => {
    e.preventDefault();

    const { name, genre, authorId } = this.state;
    await this.props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });

    this.setState({
      name: '',
      genre: '',
      authorId: ''
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form id='add-book' onSubmit={this.onSubmit}>
        <div className='field'>
          <label htmlFor='name'>Book Name</label>
          <input
            type='text'
            name='name'
            id='book-name'
            onChange={this.onChange}
            value={this.state.name}
          />
        </div>
        <div className='field'>
          <label htmlFor='genre'>Genre</label>
          <input
            type='text'
            name='genre'
            id='genre'
            onChange={this.onChange}
            value={this.state.genre}
          />
        </div>
        <div className='field'>
          <label htmlFor='author'>Author</label>
          <select
            name='authorId'
            id='authorname'
            onChange={this.onChange}
            value={this.state.authorId}
          >
            <option>Selector Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
