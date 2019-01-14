import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';

import classes from './Toolbar.css';

class Toolbar extends Component {
	render() {
		return (
			<div>
				<Navbar>
					<FormGroup className={classes.toolbar}>
						<FormControl type="text" placeholder="Search" className={classes.search} />
						<Button type="submit">Submit</Button>
					</FormGroup>	
				</Navbar>
			</div>
		);
	}
}

export default Toolbar;