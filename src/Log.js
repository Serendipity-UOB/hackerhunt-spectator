import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Flag from './Flag.js';

class Log extends Component {

    constructor() {
        super();
        this.state = {
            color: '#ffffff'
        }
    }

    componentWillMount() {
        switch (this.props.log.interaction) {
            // case 'exchange':
            //     this.setState({color: '#77D365'});
            //     break;
            // case 'intercept':
            //     this.setState({color: '#FF9F1C'});
            //     break;
            // case 'expose':
            //     this.setState({color: '#FF6338'});
            //     break;
            default:
                this.setState({color: '#00A6EE'});
                break;
        }
    }

    render () {
        return (
            <tr>
                <td><span>{this.props.log.time}</span></td>
                <td><Flag zone={this.props.log.zone_name} color={this.state.color}/></td>
                <td><span>{ ReactHtmlParser(this.props.log.message) }</span></td>
            </tr>
        )
    }

}

export default Log