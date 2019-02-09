import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem , CardColumns, Form, FormGroup, FormControl, Checkbox, ControlLabel, Button, Container, Row, Col } from 'react-bootstrap';
import img from './user.jpg'

class HomePage extends Component {
	render(){
		return (
			<div>
				<Container>
					<CardColumns>
					  <Card>
					    <Card.Img variant="top" src={img} />
					    <Card.Body>
					      <Card.Title>Param Singh</Card.Title>
					      <Card.Text>
					        This is a Param
					      </Card.Text>
					    </Card.Body>
					    <ListGroup className="list-group-flush">
						  <ListGroupItem>Skill1</ListGroupItem>
						  <ListGroupItem>Skill2</ListGroupItem>
						  <ListGroupItem>Skill3</ListGroupItem>
						</ListGroup>
					    <Form.Row>

					    <Card.Footer as = {Col}>
					      <Button variant="primary">Send message request</Button>
					    </Card.Footer>

					    <Card.Footer>
					      <Button variant="primary">View Profile</Button>
					    </Card.Footer>

					    </Form.Row>

					  </Card>
					  <Card>
					    <Card.Img variant="top" src={img} />
					    <Card.Body>
					      <Card.Title>Shikhar Shrivastav</Card.Title>
					      <Card.Text>
					        This is Shikhar
					      </Card.Text>
					    </Card.Body>
					    <ListGroup className="list-group-flush">
						  <ListGroupItem>Skill1</ListGroupItem>
						  <ListGroupItem>Skill2 </ListGroupItem>
						  <ListGroupItem>Skill3</ListGroupItem>
						</ListGroup>
					    
					    <Form.Row>

					    <Card.Footer as = {Col}>
					      <Button variant="primary">Send message request</Button>
					    </Card.Footer>

					    <Card.Footer>
					      <Button variant="primary">View Profile</Button>
					    </Card.Footer>

					    </Form.Row>
					  </Card>
					  <Card>
					    <Card.Img variant="top" src={img}/>
					    <Card.Body>
					      <Card.Title>Abhishek Rastogi</Card.Title>
					      <Card.Text>
					        This is Rastogi
					      </Card.Text>
					    </Card.Body>
					    <ListGroup className="list-group-flush">
						  <ListGroupItem>Skill1</ListGroupItem>
						  <ListGroupItem>Skill2</ListGroupItem>
						  <ListGroupItem>Skill3</ListGroupItem>
						</ListGroup>
					    	
					    <Form.Row>

					    <Card.Footer as = {Col}>
					      <Button variant="primary">Send message request</Button>
					    </Card.Footer>

					    <Card.Footer>
					      <Button variant="primary">View Profile</Button>
					    </Card.Footer>

					    </Form.Row>

					  </Card>
					</CardColumns>;
				</Container>
			</div>
		)
	}
}

export default HomePage;