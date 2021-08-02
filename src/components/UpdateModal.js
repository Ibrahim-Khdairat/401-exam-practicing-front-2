import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap/';

class UpdateModal extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Place</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit = {this.props.handleUpdate}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Place Name</Form.Label>
                            <Form.Control type="text" defaultValue = {this.props.place.Placename}  name = 'name'/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Place Image</Form.Label>
                            <Form.Control type="text"  defaultValue = {this.props.place.PlaceImage} name ='img'/>
                        </Form.Group>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                    
                    </Form>


                 
                </Modal>
            </div>
        )
    }
}

export default UpdateModal
