import React, { Component } from 'react';

class OrgDataTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			rows: null,
			columns: [""].concat(props.periods)
		};
	}
	
	componentDidMount() {
		// TODO Bring this in line with the rest of the API uses
		let url = "https://prod.preview.open990/api/org/table/" + this.props.table_id
		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					// TODO: Rewrite API to provide content in this format (after Oril engagement)
					let rows = [];
					for (let i = 0; i < result.data.length; i++) {
						let row_data = result.data[i];
						let row = [row_data.label].concat(row_data.data);
						rows.push(row)
					}
					this.setState({
						isLoaded: true,
						rows: rows
					});
				}
			);
	}
	
	render() {
		if (!this.state.isLoaded) {
			return (<div>Loading table {this.props.table_id}</div>);
		} else {
			return (<div>{JSON.stringify(this.state.rows)}</div>);
		}
	}
}

export default OrgDataTable;
