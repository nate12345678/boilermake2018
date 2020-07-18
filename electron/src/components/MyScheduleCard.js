import '../css/MyScheduleCard.css';
import React from 'react';
import EditScheduleForm from './EditScheduleForm';
import DailySchedule from './DailySchedule';
import {
	Card,
	CardActions,
	CardContent,
	Collapse,
	Icon,
	IconButton,
	Typography
} from '@material-ui/core';

class MyScheduleCard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false
		}
	}


	handleExpansion = () => {
		this.setState((prevState, props) => ({
			isExpanded: !prevState.isExpanded
		}));
	}


	render() {
		const schedule = this.props.schedule
			? <DailySchedule schedule={this.props.schedule} />
			: 'Loading...';

		return (
			<Card className="MyScheduleCard" elevation={4}>
				<CardContent style={{ width: '100%' }}>
					<Typography className="Title" variant="h6">My Schedule</Typography>
					{schedule}
				</CardContent>
				<CardActions>
					<IconButton id="ExpandButton"
					            aria-expanded={this.state.isExpanded}
					            aria-label="show more"
					            onClick={this.handleExpansion}>
						<Icon id="ExpandIcon" className={this.state.isExpanded ? 'expanded' : 'collapsed'}>expand_more</Icon>
					</IconButton>
				</CardActions>
				<Collapse id="EditScheduleCollapse" in={this.state.isExpanded} unmountOnExit>
					<div id="EditScheduleForm">
						<EditScheduleForm onSubmit={this.props.onAddInterval}/>
					</div>
				</Collapse>
			</Card>
		);
	}

}

export default MyScheduleCard;
