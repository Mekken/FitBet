import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  
}

const FormItem = ({ classes, ...rest }) => {
  
  return (
    <TextField classes={{ root: classes.buttonRoot }} { ...rest }>
    </TextField>
  )
}
export default withStyles(styles)(FormItem);