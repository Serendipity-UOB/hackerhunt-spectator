import React, { Component } from 'react'
import './Zone.css'

var Color = require('color');

class Zone extends Component {

    constructor () {
        super()
        this.state = {}
    }

    componentDidMount() {
        const id = 'zone-border-' + this.props.zone.zone_id;
        console.log(id);
        var color = Color('rgb(' + this.props.zone.colour.red + ', ' + this.props.zone.colour.green + ', ' + this.props.zone.colour.blue + ')')
        document.getElementById(id).style.borderColor = color;
        document.getElementById(id).style.backgroundImage = 'radial-gradient(\n' + '' + color + ',\n' + '#00000000 60%\n' + ')';
    }

    render () {
        return (
            <div class='zone-border' id={'zone-border-' + this.props.zone.zone_id}>
                <div class='zone' id={'zone-' + this.props.zone.zone_id}>
                    {/*<div>*/}
                        {/*<span>{this.props.zone.zone_id}</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

}

export default Zone