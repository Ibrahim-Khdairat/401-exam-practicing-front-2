import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap/';
import UpdateModal from './components/UpdateModal';



class BestPlaces extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      places: [],
      email: '',
      show: false,
      updatedObj: {},
      index: 0,
    }
  }

  componentDidMount = async () => {

    const { user, isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      let url = `https://exam-practice401-2.herokuapp.com/favplaces/${user.email}`

      let data = await axios.get(url);
      this.setState({
        places: data.data,
        email: user.email
      })
    }
  }

  delete = async (index) => {
    let url = `https://exam-practice401-2.herokuapp.com/deleteplaces/${this.state.email}?index=${index}`
    let data = await axios.delete(url);
    this.setState({
      places: data.data,
    })
  }
  update = (place, index) => {
    this.setState({
      show: true,
      updatedObj: place,
      index: index
    })
  }

  handleClose = () => {
    this.setState({
      show: false,

    })
  }

  handleUpdate = async (event) => {
    event.preventDefault();
    this.setState({
      show: false
    })

    let updatedInfo = {
      Placename: event.target.name.value,
      PlaceImage: event.target.img.value
    }
    let url = `https://exam-practice401-2.herokuapp.com/updateplace/${this.state.email}?index=${this.state.index}`

    let data = await axios.put(url , updatedInfo);
    this.setState({
      places: data.data,
    })

  }
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <UpdateModal show={this.state.show}
          handleClose={this.handleClose}
          place={this.state.updatedObj}
          handleUpdate={this.handleUpdate} />


        <div className='favsCards'>
          {this.state.places.map((place, index) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={place.PlaceImage} style={{ height: '200px' }} />
                <Card.Body>
                  <Card.Title>{place.Placename}</Card.Title>

                  <Button variant="danger" onClick={() => { this.delete(index) }}>Delete</Button>
                  <Button variant="warning" onClick={() => { this.update(place, index) }}>Update</Button>

                </Card.Body>
              </Card>
            )
          })}
        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(BestPlaces);
