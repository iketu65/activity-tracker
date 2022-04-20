// import React, { Component } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// export default class EditExercise extends Component {
//     constructor(props) {
//         super(props);

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeActivityName = this.onChangeActivityName.bind(this);
//         this.onChangeType = this.onChangeType.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
//         this.onChangeDuration = this.onChangeDuration.bind(this);
//         this.onChangeDate = this.onChangeDate.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             username: '',
//             activityName: '',
//             type: '',
//             description: '',
//             duration: 0,
//             date: new Date(),
//             users: []
//         }
//     }

//     componentDidMount() {
//         axios.get('http://localhost:4000/exercises/' + this.props.match.params.id)
//             .then(response => {
//                 console.log(response)
//                 this.setState({
//                     username: response.data.username,
//                     activityName: response.data.activityName,
//                     type: response.data.type,
//                     description: response.data.description,
//                     duration: response.data.duration,
//                     date: new Date(response.data.date)
//                 })
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })

//         axios.get('http://localhost:4000/users/')
//             .then(response => {
//                 if (response.data.length > 0) {
//                     this.setState({
//                         users: response.data.map(user => user.username),
//                     })
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             })

//     }

//     onChangeUsername(e) {
//         this.setState({
//             username: e.target.value
//         })
//     }

//     onChangeActivityName(e) {
//         this.setState({
//             username: e.target.value
//         })
//     }

//     onChangeType(e) {
//         this.setState({
//             username: e.target.value
//         })
//     }

//     onChangeDescription(e) {
//         this.setState({
//             description: e.target.value
//         })
//     }

//     onChangeDuration(e) {
//         this.setState({
//             duration: e.target.value
//         })
//     }

//     onChangeDate(date) {
//         this.setState({
//             date: date
//         })
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const exercise = {
//             username: this.state.username,
//             activityName: this.state.activityName,
//             type: this.state.type,
//             description: this.state.description,
//             duration: this.state.duration,
//             date: this.state.date
//         }

//         console.log(exercise);

//         axios.post('http://localhost:4000/exercises/update/' + this.props.match.params.id, exercise)
//             .then(res => console.log(res.data));

//         window.location = '/';
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Edit Activity Log</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Username: </label>
//                         <select ref="userInput"
//                             required
//                             className="form-control"
//                             value={this.state.username}
//                             onChange={this.onChangeUsername}>
//                             {
//                                 this.state.users.map(function (user) {
//                                     return <option
//                                         key={user}
//                                         value={user}>{user}
//                                     </option>;
//                                 })
//                             }
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Activity Name: </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.activityName}
//                             onChange={this.onChangeActivityName}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Username: </label>
//                         <select ref="typeInput"
//                             required
//                             className="form-control"
//                             value={this.state.type}
//                             onChange={this.onChangeType}>
//                             <option key='1' value="Run">Run</option>;
//                             <option key='2' value="Bicycle Ride">Bicycle Ride</option>;
//                             <option key='3' value="Swim">Swim</option>;
//                             <option key='4' value="Walk and Hike">Walk and Hike</option>;
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Description: </label>
//                         <input type="text"
//                             required
//                             className="form-control"
//                             value={this.state.description}
//                             onChange={this.onChangeDescription}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Duration (in minutes): </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={this.state.duration}
//                             onChange={this.onChangeDuration}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Date: </label>
//                         <div>
//                             <DatePicker
//                                 selected={this.state.date}
//                                 onChange={this.onChangeDate}
//                             />
//                         </div>
//                     </div>
//                     <br />
//                     <div className="form-group">
//                         <input type="submit" value="Edit Activity Log" className="btn btn-primary" />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }


import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditExercise = () => {
    const props = useParams()
    const [state, setState] = useState({
        username: '',
        activityName: '',
        type: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })
    

    useEffect(() => {
        console.log(props.id)
        console.log(state)
        axios.get('http://localhost:4000/exercises/' + props.id)
            .then(response => {
                setState({
                    username: response.data.username,
                    activityName: response.data.activityName,
                    type: response.data.type,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    console.log(`response ${response.data[0]}`)
                    setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
            
      }, [])

    const onChangeUsername = (e) => {
        setState(prevState => ({
            ...prevState,
            username: e.target.value
        }))
    }

    const onChangeActivityName = (e) => {
        setState(prevState => ({
            ...prevState,
            activityName: e.target.value
        }))
    }

    const onChangeType = (e) => {
        setState(prevState => ({
            ...prevState,
            type: e.target.value
        }))
    }

    const onChangeDescription = (e) => {
        setState(prevState => ({
            ...prevState,
            description: e.target.value
        }))
    }

    const onChangeDuration = (e) => {
        setState(prevState => ({
            ...prevState,
            duration: e.target.value
        }))
    }

    const onChangeDate = (date) => {
        setState(prevState => ({
            ...prevState,
            date: date
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: state.username,
            activityName: state.activityName,
            type: state.type,
            description: state.description,
            duration: state.duration,
            date: state.date
        }

        console.log(exercise);

        axios.post('http://localhost:4000/exercises/update/' + props.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    return (
        <div>
            <h3>Edit Activity Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={state.username}
                        onChange={onChangeUsername}>
                        {
                            state.users?.map(function (user) {
                                console.log(user)
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
                        value={state.activityName}
                        onChange={onChangeActivityName}
                    />
                </div>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={state.type}
                        onChange={onChangeType}>
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
                        value={state.description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={state.duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={state.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Edit Activity Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;