import React, { Component } from 'react';
import useStyles from 'react-jss';
@useStyles({
    wrap: {
        display: 'flex',
        flexDirection: 'column',
        width: '520px',
        minHeight: '600px'
    },
    play: {

    },
    content: {
    }
})
export default class extends Component<any> {
    render() {
        const {classes} = this.props;
        return <div className={classes.wrap}>
           hello, world
        </div>
    }
}