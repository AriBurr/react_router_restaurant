import React from 'react';
import { Segment, Form, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DishForm extends React.Component {
  state = { dish: { name: '', ingredients: '', price: '' } };

  componentDidMount() {
    const match = this.props.match;
    if (match)
      axios.get(`/api/dishes/${match.params.id}`)
        .then( res => {
          this.setState({ dish: res.data })
        }).catch( err => {
            console.log(err);
        });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let baseUrl = '/api/dishes';
    const { id, name, ingredients, price } = this.state.dish;
    baseUrl = id? `${baseUrl}/${id}` : baseUrl;
    const params = { dish: { name, ingredients, price } }

    if(id)
      axios.put(baseUrl, params)
        .then(res => {
          this.props.history.push(`/dishes/${id}`);
        }).catch( err => {
          console.log(err);
        });
    else
      axios.post(baseUrl, params)
        .then(res => {
          this.setState({ dish: { name: '', ingredients: '', price: '' } });
          this.props.addDish(res.data);
        }).catch( err => {
          console.log(err);
        });
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ dish: {...this.state.dish, [id]: value } });
  }

  cancelButton = () => {
    const { id } = this.state.dish;
    if(id)
      return(<Button as={Link} to={`/dishes/${id}`}>Cancel</Button>);
  }

  render() {
    const { name, ingredients, price } = this.state.dish;

    return(
      <Form onSubmit={this.handleSubmit}>
        <Label>Name:</Label>
        <Form.Input value={name} id='name' onChange={this.handleChange} />

        <Label>Price:</Label>
        <Form.Input value={price} id='price' onChange={this.handleChange} />

        <Label>Special Ingredient:</Label>
        <Form.Input value={ingredients} id='ingredients' onChange={this.handleChange} />

        { this.cancelButton() }
        <Button primary type='submit'>Save</Button>
      </Form>
    );
  }
}

export default DishForm;
