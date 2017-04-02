import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import initOpbeat from 'opbeat-react';

initOpbeat({
    appId: '92cc2b0285',
    organizationId: '622909d2afcb421383e9cec60bd045ae',
    secretToken: 'aa9d4874898f7790456ea4da9d641201cd7ae661'
});

// Task list container
class TaskListContainer extends React.Component {
	render() {

		const props = this.props;

		return (
			<div id="current-task-content"
				className={ props.show ? "showTab" : "hideTab" }>

				<TaskList tasks={ props.tasks }
					startTaskEdit={ props.startTaskEdit }
					changeTaskEdit={ props.changeTaskEdit }
					saveTaskEdit={ props.saveTaskEdit }
					cancelTaskEdit={ props.cancelTaskEdit }
					toggleTimer={ props.toggleTimer }
					removeTask={ props.removeTask } />

			</div>
		);

	}
}

// Current task tab content
class TaskList extends React.Component {
	handleTaskNameStartEdit( taskInfo ) {
		this.props.startTaskEdit( taskInfo, "name" );
	}

	handleTaskNameChange( taskInfo, name ) {
		this.props.changeTaskEdit( taskInfo, "name", name );
	}

	handleTaskNameSaveEdit( taskInfo ) {
		this.props.saveTaskEdit( taskInfo, "name" );
	}

	handleTaskNameCancelEdit( taskInfo ) {
		this.props.cancelTaskEdit( taskInfo, "name" );
	}

	handleTaskDescriptionStartEdit( taskInfo ) {
		this.props.startTaskEdit( taskInfo, "description" );
	}

	handleTaskDescriptionChange( taskInfo, description ) {
		this.props.changeTaskEdit( taskInfo, "description", description );
	}

	handleTaskDescriptionSaveEdit( taskInfo ) {
		this.props.saveTaskEdit( taskInfo, "description" );
	}

	handleTaskDescriptionCancelEdit( taskInfo ) {
		this.props.cancelTaskEdit( taskInfo, "description" );
	}

	toggleTimer( taskInfo ) {
		this.props.toggleTimer( taskInfo );
	}

	handleRemoveTask( taskInfo ) {
		this.props.removeTask( taskInfo );
	}

	render() {

		const tasks = this.props.tasks.map(
			function( taskInfo ) {

				return (
					<Task key={ taskInfo.id }
						info={ taskInfo }
						handleRemoveTask={ this.handleRemoveTask.bind(this) }
						handleTaskNameStartEdit={ this.handleTaskNameStartEdit.bind(this) }
						handleTaskNameChange={ this.handleTaskNameChange.bind(this) }
						handleTaskNameSaveEdit={ this.handleTaskNameSaveEdit.bind(this) }
						handleTaskNameCancelEdit={ this.handleTaskNameCancelEdit.bind(this) }
						handleTaskDescriptionStartEdit={ this.handleTaskDescriptionStartEdit.bind(this) }
						handleTaskDescriptionChange={ this.handleTaskDescriptionChange.bind(this) }
						handleTaskDescriptionSaveEdit={ this.handleTaskDescriptionSaveEdit.bind(this) }
						handleTaskDescriptionCancelEdit={ this.handleTaskDescriptionCancelEdit.bind(this) }
						toggleTimer={ this.toggleTimer.bind(this) } />
				);

			}.bind( this )

		);

		return (
			<div>
				<br/>
				<table className={"pure-table pure-table-horizontal"}>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Description</th>
							<th>Total</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ tasks }
					</tbody>
				</table>
			</div>
		);

	}
}

// Task
class Task extends React.Component {
	handleRemoveTask() {
		this.props.handleRemoveTask( this.props.info );
	}

	handleTaskNameStartEdit() {
		this.props.handleTaskNameStartEdit( this.props.info );
	}

	handleTaskNameChange( e ) {
		var newTaskName = e.target.value;
		this.props.handleTaskNameChange( this.props.info, newTaskName );
	}

	handleTaskNameSaveEdit() {
		this.props.handleTaskNameSaveEdit( this.props.info );
	}

	handleTaskNameCancelEdit() {
		this.props.handleTaskNameCancelEdit( this.props.info );
	}

	handleTaskDescriptionStartEdit() {
		this.props.handleTaskDescriptionStartEdit( this.props.info );
	}

	handleTaskDescriptionChange( e ) {
		var newTaskDesc = e.target.value;
		this.props.handleTaskDescriptionChange( this.props.info, newTaskDesc );
	}

	handleTaskDescriptionSaveEdit() {
		this.props.handleTaskDescriptionSaveEdit( this.props.info );
	}

	handleTaskDescriptionCancelEdit() {
		this.props.handleTaskDescriptionCancelEdit( this.props.info );
	}

	toggleTimer() {
		this.props.toggleTimer( this.props.info );
	}

	render() {

		const taskInfo = this.props.info;

		const editingName = taskInfo.editing.name;
		const editName = editingName ? "" : "noBackground noBorder";
		const editNameOkButton = editingName ? "" : "hide";
		const editNameCancelButton = editingName ? "" : "hide";

		const editingDesc = taskInfo.editing.description;
		const editDescription = editingDesc ? "" : "noBackground noBorder";
		const editDescriptionOkButton = editingDesc ? "" : "hide";
		const editDescriptionCancelButton = editingDesc ? "" : "hide";

		const total = taskInfo.total;
		const totalTime = total.h + "h " + total.m + "m " + total.s + "s";

		const onPause = taskInfo.state == "onPause";
		const playIcon = onPause ? "fa fa-play" : "fa fa-pause";
		const onPlayIconClick = this.toggleTimer;
		const showRemoveIcon = onPause ? "" : "hide";
		const showRunningIcon = onPause ? "hide" : "";

		return (

			<tr className={ taskInfo.id % 2 == 0 ? "row-even" : "row-odd" }>

				<td>
					<i className={ "cursor taskRemove fa fa-times " +
						showRemoveIcon }
						onClick={ this.handleRemoveTask.bind(this) }></i>
					<i className={ "taskRunning fa fa-spinner fa-spin " +
						showRunningIcon }></i>
				</td>

				<td>
					<input type="text" name="name" placeholder="Name"
						className={ editName }
						value={ taskInfo.name }
						onClick={ this.handleTaskNameStartEdit.bind(this) }
						onChange={ this.handleTaskNameChange.bind(this) } />
					<div className={ "clearFloat" }></div>
					<div className={ "icon iconButton iconCheck floatLeft " +
						editNameOkButton }
						onClick={ this.handleTaskNameSaveEdit.bind(this) } >
					</div>
					<div className={ "icon iconButton iconClose floatLeft " +
						editNameOkButton}
						onClick={ this.handleTaskNameCancelEdit.bind(this) } >
					</div>
				</td>

				<td>
					<textarea name="description" placeholder="Description"
						className={ editDescription }
						value={ taskInfo.description }
						onClick={ this.handleTaskDescriptionStartEdit.bind(this) }
						onChange={ this.handleTaskDescriptionChange.bind(this) } >
					</textarea>
					<div className={ "clearFloat" }></div>
					<div className={ "icon iconButton iconCheck floatLeft " +
						editDescriptionOkButton }
						onClick={ this.handleTaskDescriptionSaveEdit.bind(this) } >
					</div>
					<div className={ "icon iconButton iconClose floatLeft " +
						editDescriptionOkButton}
						onClick={ this.handleTaskDescriptionCancelEdit.bind(this) } >
					</div>
				</td>

				<td>
					{ totalTime }
				</td>

				<td>
					<i className={ "cursor taskPlay " + playIcon }
						onClick={ onPlayIconClick.bind(this) }></i>
				</td>

			</tr>

		);

	}
}

// New task form
class NewTaskForm extends React.Component {
	render() {

		const props = this.props;

		return (
			<div id="new-task-form"
				className={ props.show ? "showTab" : "hideTab" }>

				<NewTask onAddNewTaskClick={ props.onAddNewTaskClick } />

			</div>
		);

	}
}

// New task tab content
class NewTask extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			"taskName": "",
			"taskDescription": "",
			"message": "",
			"status": "",
			"timer": null
		};

	}

	handleTaskNameChange( event ) {

		this.setState( {
			"taskName": event.target.value
		} );

	}

	handleTaskDescriptionChange( event ) {

		this.setState( {
			"taskDescription": event.target.value
		} );

	}

	onAddNewTask( ) {

		const state = this.state;

		const taskName = state.taskName;
		const taskDescription = state.taskDescription;
		let message = "";
		let status = "";

		if ( taskName && taskDescription ) {

			this.props.onAddNewTaskClick( taskName, taskDescription );

			message = "Successfully added new task to the list";
			status = "success";

		} else {

			message = "Please provide a name and description";
			status = "error";

		}

		if ( state.timer ) {

			window.clearTimeout( state.timer );

		}

		// TOOO: fix bug when switching tabs while
		// add task success message has not timed out
		const timer = setTimeout( function() {

			this.setState( {
				"message" : "",
				"status" : "",
				"timer" : null
			} );

		}.bind( this ), 1000 );

		this.setState( {
			"message": message,
			"status": status,
			"timer": timer
		} );

	}

	render() {

		const taskName = this.state.taskName;
		const taskDescription = this.state.taskDescription;
		const status = this.state.status;
		const messageClass = status == "" ? "" :
			( status == "success" ? "successMessage" : "errorMessage" );
		const messageIcon = status == "success" ?
			( <i className={ "fa fa-check-circle" }></i> ) :
			( <div></div> );

		return (
			<form name="contact" action="#" method="post"
	    		className="pure-form pure-form-stacked ">

	    		<br/>

				<fieldset>

			    	<legend></legend>

		        	<label>Name:</label>
		            <input type="text" name="name" placeholder="Name"
		            	value={ taskName }
						onChange={ this.handleTaskNameChange.bind(this) } />

		            <br/>

		            <label>Description:</label>
		            <textarea name="message" placeholder="Description of task..."
		            	value={ taskDescription }
						onChange={ this.handleTaskDescriptionChange.bind(this) } >
		            </textarea>

		            <br/>

			        <div className="pure-controls">
			        	<input type="button"
			        		className="pure-button pure-button-primary"
							value="Add"
			        		onClick={ this.onAddNewTask.bind(this) } />
			        	&nbsp;
			        	<input type="reset"
			        		className="pure-button" value="Reset" />
			        </div>

			        <br/>

			        <ReactCSSTransitionGroup
						transitionName="show-hide-animation"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}>
			        	<div key={ this.state.message }
			        		className={ messageClass }>
							{ messageIcon }
			        		{ this.state.message }
			        	</div>
			        </ReactCSSTransitionGroup>

			    </fieldset>

			</form>
		);

	}

}

// DateInfo
class DateInfo extends React.Component {
	render() {

		const d = new Date();
		const days = [
			"Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday"
		];
		const dayOfWeek = days[ d.getDay() ];
		const months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const month = months[ d.getMonth() ];
		const today = month + " " + d.getDate() + ", " + d.getFullYear();

		return (
			<div>
				{ today }
				<br/>
				{ dayOfWeek }
			</div>
		);

	}
}

// Sidebar
class Sidebar extends React.Component {
	render() {
		return (
			<aside id="sidebar"
				className="pure-u-1 pure-u-md-5-24 pure-u-lg-1-4 small-box shadow">

				<SidebarTabs activeTab={ this.props.activeTab }
					tabs={ this.props.tabs }
					onTabClick={ this.props.onTabClick } />

			</aside>
		);

	}
}

Sidebar.defaultProps = {
	"activeTab": 0,
	"tabs": [
		{
			"id": 0,
			"link": "#",
			"text": "tab 1"
		}
	],
	"onTabClick": function( e, tab ) {}
};

// Sidebar tabs
class SidebarTabs extends React.Component {
	render() {

		return (
			<nav id="sidebar-tabs"
				className="pure-menu pure-menu-open">
				<a className="pure-menu-heading main-menu-heading">
					<DateInfo />
				</a>
				<SidebarTabList activeTab={ this.props.activeTab }
					tabs={ this.props.tabs }
					onTabClick={ this.props.onTabClick } />
			</nav>
		);

	}

}

class SidebarTabList extends React.Component {
	render() {

		const activeTab = this.props.activeTab;
		const onTabClick = this.props.onTabClick;
		const tabs = this.props.tabs.map(
				function( tab ) {

					const tabClass = tab.id == activeTab ?
						"pure-menu-selected" : "";

					return (
						<li className={ tabClass }
							key={ tab.id }>
							<SidebarTabLink tab={ tab }
								onTabClick={ onTabClick } />
						</li>
					);

				}
			);

		return (
			<ul className="menu-list">
				{ tabs }
			</ul>
		);

	}
}

class SidebarTabLink extends React.Component {
	onTabClick( e ) {
		this.props.onTabClick( e, this.props.tab );
	}

	render() {

		const tabData = this.props.tab;
		const linkText = typeof tabData.total !== "undefined" ?
			tabData.text + " (" + tabData.total + ")" : tabData.text;

		return(
			<a className="menu-item-link"
				href={ tabData.link }
				onClick={ this.onTabClick.bind(this) }>
				{ linkText }
			</a>
		);

	}
}

// Time tracker app
class TimeTrackerApp extends React.Component {
	constructor(props) {
		super(props);

		let tasks = localStorage[ "tasks" ];

		if ( tasks ) {

			tasks = JSON.parse( tasks );

			console.log(
				"Restoring tasks:",
				tasks
			);

		} else {

			tasks = [
				{
					"id": 0,
					"name": "First task",
					"description": "Description...",
					"state": "onPause",
					"editing": {
						"name": false,
						"nameStore": "",
						"description": false,
						"descriptionStore": ""
					},
					"total": { "h": 0, "m": 0, "s": 0 }
				},
				{
					"id": 1,
					"name": "Second task",
					"description": "Description...",
					"state": "onPause",
					"editing": {
						"name": false,
						"nameStore": "",
						"description": false,
						"descriptionStore": ""
					},
					"total": { "h": 0, "m": 0, "s": 0 }
				}
			];

		}

		this.state = {
			"activeTab": 1,
			"tabs": [
				{ "id": 0, "link": "#", "text": "New Task" },
				{ "id": 1, "link": "#", "text": "Current Tasks", "total": tasks.length },
			],
			"tasks": tasks
		};

	}

	handleTabClick( e, tab ) {

		e.preventDefault();

		this.setState( { "activeTab": tab.id } );

	}

	handleAddNewTaskClick( name, description ) {

		let currentTasks = this.state.tasks;
		const newTask = {
			"id": currentTasks.length,
			"name": name,
			"description": description,
			"state": "onPause",
			"editing": {
				"name": false,
				"nameStore": "",
				"description": false,
				"descriptionStore": ""
			},
			"total": { "h": 0, "m": 0, "s": 0 }
		};

		// add task
		currentTasks.push( newTask );

		// update total task count on sidebar
		let tabs = this.state.tabs.slice();

		tabs[ 1 ].total += 1;

		// update state
		this.setState( {
			"tabs": tabs,
			"tasks": currentTasks
		} );

	}

	handleRemoveTaskClick( taskInfo ) {

		let currentTasks = this.state.tasks.slice();
		const length = currentTasks.length;
		const taskId = taskInfo.id;
		let taskIndexInList = null;

		// remove task
		for( var i = 0; i < length; i++ ) {

			if ( currentTasks[ i ].id == taskId ) {
				taskIndexInList = i;
			}

		}

		currentTasks.splice( taskIndexInList, 1 );

		// update total task count on sidebar
		let tabs = this.state.tabs.slice();

		tabs[ 1 ].total -= 1;

		// update state
		this.setState( {
			"tabs": tabs,
			"tasks": currentTasks
		} );

	}

	handleStartTaskEdit( taskInfo, fieldName ) {

		let currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ].editing[ fieldName ] = true;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = currentTasks[ taskInfo.id ][ fieldName ];

		this.setState( { "tasks": currentTasks } );

	}

	handleChangeTaskEdit( taskInfo, fieldName, fieldValue ) {

		let currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ][ fieldName ] = fieldValue;

		this.setState( { "tasks": currentTasks } );

	}

	handleSaveTaskEdit( taskInfo, fieldName ) {

		let currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ].editing[ fieldName ] = false;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = "";

		this.setState( { "tasks": currentTasks } );

	}

	handleCancelTaskEdit( taskInfo, fieldName ) {

		let currentTasks = this.state.tasks;

		currentTasks[ taskInfo.id ][ fieldName ] = currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ];
		currentTasks[ taskInfo.id ].editing[ fieldName ] = false;
		currentTasks[ taskInfo.id ].editing[ fieldName + "Store" ] = "";

		this.setState( { "tasks": currentTasks } );

	}

	updateTaskInfo( taskInfo ) {

		let currentTasks = this.state.tasks.slice();

		currentTasks.forEach( function( t ) {
			if ( t.id == taskInfo.id ) {
				t = taskInfo;
			}
		} );

		this.setState( { "tasks": currentTasks } );

	}

	setTaskTimer( task, status ) {

		if ( status === "onPause" ) {

			task.state = "onPause";

			window.clearInterval( task.timer );
			task.timer = null;

		} else if ( status === "onPlay" ) {

			task.state = "onPlay";

			task.timer = setInterval( function() {

				var sec = task.total.s + 1 >= 60 ? 0 : task.total.s + 1;
				var addMin = task.total.s + 1 >= 60;
				var addHr = addMin && task.total.m + 1 >= 60;

				task.total.s = sec;
				task.total.m = addMin ?
					( addHr ? 0 : task.total.m + 1 ) : task.total.m;
				task.total.h = addHr ? task.total.h + 1 : task.total.h;

				this.updateTaskInfo( task );

			}.bind( this ), 1000 );

		}

		return task;

	}

	handleToggleTimer( taskInfo ) {

		if ( taskInfo.timer ) {

			taskInfo = this.setTaskTimer( taskInfo, "onPause" );

		} else {

			taskInfo = this.setTaskTimer( taskInfo, "onPlay" );

		}

		this.updateTaskInfo( taskInfo );

	}

	render() {

		const activeTab = this.state.activeTab;

		return (
			<div className="pure-g">

				<Sidebar activeTab={ activeTab }
					tabs={ this.state.tabs }
					onTabClick={ this.handleTabClick.bind(this) } />

			    <aside id="task-content"
			    	className="pure-u-1 pure-u-md-18-24 pure-u-lg-17-24 small-box shadow">

			    	<ReactCSSTransitionGroup
						transitionName="switch-tab-animation"
						transitionLeave={ false }
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}>

						<NewTaskForm
							key={ activeTab }
							show={ activeTab == 0 }
							onAddNewTaskClick={ this.handleAddNewTaskClick.bind(this) } />

					</ReactCSSTransitionGroup>

			    	<ReactCSSTransitionGroup
						transitionName="switch-tab-animation"
						transitionLeave={ false }
						transitionEnterTimeout={500}
						transitionLeaveTimeout={500}>

						<TaskListContainer
							key={ activeTab }
							show={ activeTab == 1 }
							tasks={ this.state.tasks }
							startTaskEdit={ this.handleStartTaskEdit.bind(this) }
							changeTaskEdit={ this.handleChangeTaskEdit.bind(this) }
							saveTaskEdit={ this.handleSaveTaskEdit.bind(this) }
							cancelTaskEdit={ this.handleCancelTaskEdit.bind(this) }
							toggleTimer={ this.handleToggleTimer.bind(this) }
							removeTask={ this.handleRemoveTaskClick.bind(this) } />

			    	</ReactCSSTransitionGroup>

			    </aside>

		    </div>
		);

	}

	componentDidMount() {

		const self = this;

		// Play tasks on load
		const tasks = self.state.tasks.slice();

		for ( let i = tasks.length; i--; ) {

			const task = tasks[ i ];

			if ( task.state === "onPlay" ) {

				console.log( "Playing task:", task.name );

				this.setTaskTimer( task, "onPlay" );
				this.updateTaskInfo( task );

			}

		}

		// Save tasks on tab close / reload
		window.onbeforeunload = function( e ) {

			localStorage[ "tasks" ] = JSON.stringify( self.state.tasks	);

		}

	}
}

ReactDOM.render(
	<TimeTrackerApp />,
	document.getElementById('app')
);