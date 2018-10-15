import React from "react";

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
        </li>
       </div>
    </div>
);
  
export default ChallengeDetail;