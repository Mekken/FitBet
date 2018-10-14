import React from 'react'
import MuiButton from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    buttonRoot: {
        borderRadius: '100px',
        background: 'linear-gradient(0deg, #f5f5f5 9%, #c6ff00 10%)'
    }
}

const Button = ({ classes, ...rest }) => (
    <MuiButton classes={{ root: classes.buttonRoot }} { ...rest } />
)

export default withStyles(styles)(Button)