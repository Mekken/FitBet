import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Button from "../../components/Button";
import AButton from '@material-ui/core/Button'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class HamburgerMenu extends React.Component {
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
          <MenuIcon fontSize='large'/>
        </AButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            <Typography variant="subtitle1" align="left">
              <Button component={Link} to="/login">
                Login
              </Button>
            </Typography>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
          <Typography variant="subtitle1" align="justify">
            <Button component={Link} to="/events">
              Events
            </Button>
          </Typography>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
          <Typography variant="subtitle1" align="right">
            <Button component={Link} to="/create">
              Create
            </Button>
          </Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default HamburgerMenu;
