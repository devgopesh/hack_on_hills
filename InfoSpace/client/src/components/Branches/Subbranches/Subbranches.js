import React from 'react';
import classes from './Subbranches.css';
import BranchLink from '../BranchLink/BranchLink';

const subbranches = (props) => {
	let branchElement = null;

	return (
		<div className={classes.sidenav}>
			{props.value.map(branch => (
				<BranchLink link="/" value={branch.config.value}>{branch.config.value}</BranchLink>
			))}
		</div>
	);
};

export default subbranches
