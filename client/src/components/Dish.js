import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Segment, Header, List } from 'semantic-ui-react';
import axios from 'axios';

class Dish extends React.Component {
  state = { dish: {} };

  componentDidMount() {
    const dishId = this.props.match.params.id;
    axios.get(`/api/dishes/${dishId}`)
      .then( res => {
        this.setState({ dish: res.data })
      }).catch( err => {
        console.log(err)
      });
  }

  deleteDish = () => {
    axios.delete(`/api/dishes/${this.state.dish.id}`)
      .then( res => {
        this.props.history.push('/menu')
      }).catch( err => {
        console.log(err)
      });
  }

  displayDish = () => {
    const { id, name, ingredients, price } = this.state.dish;
    return (
      <Segment basic>
        <Header as='h1'>{name}</Header>
        <List>
          <List.Item>Price: ${price}</List.Item>
          <List.Item>Special Ingredient: {ingredients}</List.Item>
        </List>
          <Button as={Link} to={'/menu'}>Back to Menu</Button>
          <Button color='red' onClick={this.deleteDish}>Delete</Button>
          <Button as={Link} to={`/dishes/${id}/edit`} color='orange'>Edit</Button>
      </Segment>
    );
  }

  render () {
    return (
      <Segment basic>
        <Header as='h1'>Dish</Header>
        {this.displayDish()}
      </Segment>
    );
  }
}

export default Dish;
