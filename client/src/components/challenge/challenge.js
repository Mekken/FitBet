import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';


const ChallengeDetail = props => (
    <div className="container">
    <h1>Challenge data</h1>
       <div className="card-body">
        <li className="list-group-item" key={props.events._id}>
        <h3>Event name: {props.events.title}</h3>
        <h3>Event description: {props.events.desc}</h3>
        <h3>Stakes: {props.events.stakes}</h3>
        <h3>Start date: {props.events.startDate}</h3>
        <h3>End date: {props.events.endDate}</h3>
        { 
            props.events.players.map(res => (
                <h3 key={res._id}>Participants: {res.name} </h3>
            ))
        }
        {
            props.events.chat.map(res => (
                <h3 key={res.date}> {res.date} - {res.name}: {res.text} </h3>
        ))
        }        
        </li>
        <div>
        Enter chat
        </div>
        <textarea
          name="chat"
          value={props.chat}
          onChange={props.handleChange}
        />
        <button onClick={props.handleSubmit} type="submit" className="btn btn-primary" 
          >Submit</button>
       </div>
    </div>
);
  
export default ChallengeDetail;