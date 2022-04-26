import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeActivityName = this.onChangeActivityName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            activityName: '',
            type: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeActivityName(e) {
        this.setState({
            activityName: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            activityName: this.state.activityName,
            type: this.state.type,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        if ((exercise.activityName.length <= 4) || (exercise.description.length <= 10 || (exercise.duration < 0))) {
            // alert("Please enter information in correct format");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter activity data in correct format!',
              })
        } else {
            axios.post('http://localhost:4000/exercises/add', exercise)
                .then(res => console.log(res.data));

            window.location = '/';
            Swal.fire(
                'Good job!',
                'Activity data added!',
                'success'
              )
        }

    }

    render() {
        return (
            <div>
                <h3>Create New Activity Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Activity Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.activityName}
                            onChange={this.onChangeActivityName}
                            placeholder="Activity name must have more than 4 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Activity Type: </label>
                        {/* <input type="text"
                            required
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}
                        /> */}
                        <select ref="typeInput"
                            required
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}>
                            <option key='1' value="Run">Run</option>;
                            <option key='2' value="Bicycle Ride">Bicycle Ride</option>;
                            <option key='3' value="Swim">Swim</option>;
                            <option key='4' value="Walk and Hike">Walk and Hike</option>;
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            placeholder="Description must have more than 10 characters"
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    < br />
                    <div className="form-group">
                        <input type="submit" value="Create Activity Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

