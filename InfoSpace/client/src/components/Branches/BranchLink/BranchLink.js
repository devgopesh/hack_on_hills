import React from 'react';
import { NavLink } from 'react-router-dom';

const branchlink = (props) => {
	return (
		<li>
			<NavLink to={props.link + props.value}>
				{props.children}
			</NavLink>
		</li>
	); 
	
};

export default branchlink;