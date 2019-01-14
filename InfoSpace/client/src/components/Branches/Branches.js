import React, { Component } from 'react';
import Subbranches from './Subbranches/Subbranches';

class Branches extends Component {
	state = {
		branches: {
			cse: {
				elementType: 'normal',
				value: 'cse'
			},
			ece: {
				elementType: 'normal',
				value: 'ece'
			},
			eee: {
				elementType: 'normal',
				value: 'Electrical'
			},		
			me: {
				elementType: 'normal',
				value: 'Mechanical'
			}
		}
	}

	render() {
		const brancharray = [];
		for (let key in this.state.branches) {
			brancharray.push({
				id: key,
				config: this.state.branches[key]
			});
		}

		let branches = (
			<div>
				<Subbranches value={brancharray} />
			</div>
		);

		return (
			<div>
				{branches}
			</div>
		);
	}
};

export default Branches;