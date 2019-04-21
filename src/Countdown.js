import React, { Component } from 'react';

class Countdown extends Component {

    constructor () {
        super();
        this.state = {
            minutes: '',
            seconds: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ minutes: nextProps.minutes });
        this.setState({ seconds: nextProps.seconds });
    }

    render () {
        return (
            <div id='countdown'>
                {this.state.minutes <= 9 ? '0' : ''}{this.state.minutes > 0 ? this.state.minutes : '0'}:{this.state.seconds <= 9 ? '0' : ''}{this.state.seconds > 0 ? this.state.seconds : '0'}
            </div>
        )
    }

}

export default Countdown