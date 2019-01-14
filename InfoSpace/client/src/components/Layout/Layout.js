import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Branches from '../Branches/Branches';

const layout = (props) => {
	let layouts = null;
	if (localStorage.getItem('home')) {
		layouts = (
			<div>
				<Toolbar />
				<Branches />
			</div>
		);
	}
	return (
		<div>
			{layouts}
			{props.children}
		</div>
	);
};

export default layout;