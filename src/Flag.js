import React, { Component } from 'react';
import Snap from 'snapsvg-cjs';

class Flag extends Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        // console.log(this.props);
        let width = 30;
        let height = width;
        let zone = this.props.zone;
        let color = this.props.color;
        if (zone === 'Czech Republic') zone = 'Czech';

        document.querySelectorAll('.flag'+zone).forEach(function(flag) {
            flag.setAttribute('viewBox', '0 0 ' + width + ' ' + height + '');
            flag.setAttribute('height', '' + height);
            flag.setAttribute('width', '' + width);

            let s = Snap(flag);

            const flagRadius = width/2 - 1;

            let mask = s.circle().attr({
                cx: '' + width/2,
                cy: '' + width/2,
                r: '' + flagRadius,
                fill: '#fff',
                stroke: '#000'});

            let fileName = zone.replace(/\s+/g, '-').toLowerCase() + '.png';
            let flag_image = s.image(fileName, zone.x*width - flagRadius*1.1, zone.y*height - flagRadius*1.1, flagRadius*2.2, flagRadius*2.2);

            s.circle().attr({
                cx: '' + width/2,
                cy: '' + width/2,
                r: '' + flagRadius,
                fill: 'none',
                stroke: color});

        });
    }

    render () {
        return (
            <div>
                <svg className={'flag'+this.props.zone}>

                </svg>
            </div>
        )
    }

}

export default Flag