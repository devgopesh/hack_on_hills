import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import classes from './Layout.module.css'
import Grid from '../Grid/Grid'

const MyAwesomeLayout = () => {
    return(
            <Row>
                <Col lg={3} md={3} sm={3} xs={3} className = {classes.blockCode}>
                    <Button className = {classes.button}>Computer Science Engineering</Button>
                    <Button className = {classes.button}>Electronics Engineering</Button>
                    <Button className = {classes.button}>Electrical Engineering</Button>
                    <Button className = {classes.button}>Chemical Engineering</Button>
                    <Button className = {classes.button}>Cvil Engineering</Button>
                </Col>
                <Col lg={9} md={9} sm={9} xs={9} className = {classes.grid}>
                    <Grid />
                </Col>
            </Row>
    );
}

export default MyAwesomeLayout;