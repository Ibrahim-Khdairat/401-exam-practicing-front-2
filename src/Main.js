import React from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap/';
import { withAuth0 } from '@auth0/auth0-react';
import './Main.css'

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            placesArr: [],
            email: ''
        }
    }

    componentDidMount = async () => {
        const { user, isAuthenticated } = this.props.auth0;

        let responseData = await axios.get('http://localhost:3001/places')
        this.setState({
            placesArr: responseData.data,
            email: user.email
        })
    }
    addToFav = async (place) => {
        let url = `http://localhost:3001/addtofav/${this.state.email}`
       await axios.post(url , place)
       
    }
    
    render() {
        return (
            <div className = 'placesCards'>
                {this.state.placesArr.map((place) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={place.PlaceImage} style ={{height :'200px'}} />
                            <Card.Body>
                                <Card.Title>{place.Placename}</Card.Title>

                                <Button variant="primary" onClick={() => { this.addToFav(place) }}>Add to fav</Button>
                            </Card.Body>
                        </Card>
                    )
                })}

            </div>
        )
    }
}

export default withAuth0(Main)
