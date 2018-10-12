import React from 'react'
import MuiButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    buttonRoot: {
        borderRadius: '0px',
    }
}

const Button = ({ classes, ...rest }) => (
    <MuiButton classes={{ root: classes.buttonRoot }} { ...rest } />
)

export default withStyles(styles)(Button)