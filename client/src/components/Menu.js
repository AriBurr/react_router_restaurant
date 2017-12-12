import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, List } from 'semantic-ui-react';
import DishForm from './DishForm';
import axios from 'axios';

class Menu extends React.Component {
  state = { dishes:[] }

  componentDidMount() {
    axios.get('/api/dishes')
      .then(res => {
        this.setState({ dishes: res.data })
      }).catch(err =>{
        console.log(err);
      });
  }

  displayDishes = () => {
    return this.state.dishes.map( dish => {
      return (
        <List.Item>
          <Link to={`/dishes/${dish.id}`}>
            {dish.name}, ${dish.price}
          </Link>
        </List.Item>
      );
    });
  }

  addDish = (dish) => {
    this.setState({ dishes: [dish, ...this.state.dishes] });
  }

  render () {
    return (
      <Segment basic>
        <DishForm addDish={this.addDish}/>
        <Header as='h1'>Menu</Header>
        <List>
          {this.displayDishes()}
        </List>
      </Segment>
    );
  }
}

export default Menu;
