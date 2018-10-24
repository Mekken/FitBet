/* eslint react/prop-types: 0 */
import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import moment from 'moment';
const ChallengeDetail = props => (
  <div className="container">
    <Grid container spacing={8}>
      <Grid
        container
        item
        xs
        justify="center"
        alignItems="stretch"
        style={{ marginTop: "3%", marginBottom: "5%" }}
      >
        <Paper style={{ padding: "1% 10% 5%" }}>
          <Grid item justify="center">
            <Typography variant="display1" align="center" color="primary">
              {props.events.title}
            </Typography>
          </Grid>
          <Grid item justify="center">
            <Typography variant="title" align="center" gutterBottom>
              “{props.events.desc}”
            </Typography>
          </Grid>

          <Grid item container direction="column" xs={12} spacing={8}>
            <React.Fragment>
              <Grid item xs={12} alignItems="stretch">
                <Paper elevation={8}>
                  <Typography variant="body2" color="primary" align="center">
                    Participants <PeopleIcon />
                    <br />
                  </Typography>
                  <Typography align="center" variant="subheading">
                    {props.events.players.map(res => (
                      <div key={res._id}>
                        {res.name} - {res.challengeSteps}
                      </div>
                    ))}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} alignItems="stretch">
                <Paper elevation={8}>
                  <Typography align="center" variant="body2" color="primary">
                    Stakes
                    <br />
                  </Typography>
                  <Typography align="center" variant="subheading">
                    {props.events.stakes}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item container direction="row" spacing="8">
                <Grid item xs={6} wrap>
                  <Paper elevation={8}>
                    <Typography align="center" variant="body2" color="primary">
                      Start date
                      <br />
                    </Typography>
                    <Typography align="center" variant="subheading">
                    {moment(props.events.startDate).format("MM-DD-YYYY")}
                      
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} wrap>
                  <Paper elevation={8}>
                    <Typography align="center" variant="body2" color="primary">
                      End date
                      <br />
                    </Typography>
                    <Typography align="center" variant="subheading">
                    {moment(props.events.endDate).format("MM-DD-YYYY")}
    
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </React.Fragment>
          </Grid>
        </Paper>
      </Grid>

      <Grid container direction="row" item spacing={8}>
        <Grid item xs={12}>
          <Typography variant="headline" align="center" color="primary">
            -Chats-
          </Typography>
        </Grid>

        <Grid item xs={8} style={{ margin: "0 auto" }}>
          {props.events.chat.map(res => (
            <div>
              <Typography variant="caption" align="left">
                {res.name}
              </Typography>

              <Paper elevation={6} square={false}>
                <Typography variant="body2">{res.text} </Typography>
              </Paper>

              <Typography variant="caption" align="right">
                {res.date}
              </Typography>
            </div>
          ))}
        </Grid>

        <Grid item xs={10} style={{ paddingLeft: "25%" }}>
          <TextField
            multiline
            fullWidth
            id="outlined-multiline-flexible"
            variant="outlined"
            rowsMax="5"
            name="chat"
            label="Start chatting"
            value={props.chat}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            style={{ padding: "1em 1em 1em 0.2em" }}
            color="primary"
            onClick={props.handleSubmit}
            type="submit"
            className="btn btn-primary"
            disabled={!props.formValid}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default ChallengeDetail;
