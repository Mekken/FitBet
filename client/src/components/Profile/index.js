import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import AButton from '@material-ui/core/Button'
import Button from "../../components/Button";

class ProfileMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <AButton
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <PersonIcon />
        </AButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            {" "}
            <Typography variant="subtitle1" align="justify">
              <Button component={Link} to="/dashboard">
                Dashboard
              </Button>
            </Typography>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Typography variant="subtitle1" align="right">
              <Button component={Link} to="/login" style={{marginLeft:'1.5em'}}>
                Log out
              </Button>
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default ProfileMenu;
