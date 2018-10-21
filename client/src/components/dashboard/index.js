import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Steps from "./steps";
import Events from "./events";

const styles = () => ({});

const Dashboard = props => {
  const { classes } = props;
  return (
    <div className={classes.events}>
      <Steps />
      <Events />
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

// <div className={classes.events}>
//   <h1>Events</h1>
//   <div className="card-body">
//     {
//       props.events.map(result => (
//         <div key={result._id}>
//           <h3><a href={"/challenge/" + result._id} target="">Event name: {result.title}</a></h3>
//           <h3>Event description: {result.desc}</h3>
//           <h3>Stakes: {result.stakes}</h3>
//           <h3>Start date: {result.startDate}</h3>
//           <h3>End date: {result.endDate}</h3>
//           {
//             result.players.map(res => (
//               <h3 key={res._id}>Participants: {res.name} </h3>
//           ))
//           }
//         </div>
//       ))
//     }
//     <button onClick={() => props.redirectToEvents()}>Click for more...</button>
//   </div>
// </div>
