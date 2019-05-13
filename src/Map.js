import React, { Component } from 'react';
import Snap from 'snapsvg-cjs';

const Color = require('color');

class Map extends Component {

    constructor () {
        super();
        this.state = {zones: []}
    }

    drawMap = () => {

        let s = Snap('#map');

        // Set the dimensions
        let width = document.getElementById('map-content').clientWidth;
        let height = document.getElementById('map-content').clientHeight;
        if (height > 0.55*width) {
            height = 0.55*width;
        } else {
            width = height/0.55;
        }
        document.getElementById('map').setAttribute('viewBox', '0 0 ' + width + ' ' + height + '');
        document.getElementById('map-content').setAttribute('height', '' + height);
        document.getElementById('map-content').setAttribute('width', '' + width);

        // Draw the border
        document.getElementById('map-border').setAttribute('points',
            0 + ', ' + 0 +',' +
            width + ', ' + 0 +',' +
            width + ', ' + height +',' +
            0 + ', ' + height);

        // Draw the map
        document.getElementById('map-polygon').setAttribute('points',
            0*width + ', ' + 0*height +',' +
            0.11*width + ', ' + 0*height +',' +
            0.11*width + ', ' + 0.4*height +',' +
            0.7*width + ', ' + 0.4*height +',' +
            0.7*width + ', ' + 0*height +',' +
            0.8*width + ', ' + 0*height +',' +
            0.8*width + ', ' + 0.4*height +',' +
            1*width + ', ' + 0.4*height +',' +
            1*width + ', ' + 1*height +',' +
            0.7*width + ', ' + 1*height +',' +
            0.7*width + ', ' + 0.63*height +',' +
            0.32*width + ', ' + 0.63*height +',' +
            0.32*width + ', ' + 1*height +',' +
            0.25*width + ', ' + 1*height +',' +
            0.25*width + ', ' + (0.08*width + 0.63*height) +',' +
            (0.25*width - 0.08*width) + ', ' + 0.63*height +',' + //
            0.11*width + ', ' + 0.63*height +',' +
            0*width + ', ' + 0.63*height);

        let labRadius = 0.08*width;
        let lab_cx = 0.25*width - labRadius;
        let lab_cy = 0.63*height + labRadius;
        document.getElementById('map-lab').setAttribute('r', '' + labRadius);
        document.getElementById('map-lab').setAttribute('cx', '' + lab_cx);
        document.getElementById('map-lab').setAttribute('cy', '' + lab_cy);
        document.getElementById('map-lab').style.strokeDasharray = 2 * Math.PI * labRadius;
        document.getElementById('map-lab').style.strokeDashoffset = 0.75 * 2 * Math.PI * labRadius;
        document.getElementById('map-lab').setAttribute('transform', 'rotate(-90 ' + lab_cx + ' '+ lab_cy + ')');

        // Remove existing zones
        document.querySelectorAll('*[id^="zone-"]').forEach(function(elem){
            elem.parentNode.removeChild(elem);
        });

        // Render updated zones
        this.state.zones.forEach(function(zone){

            // CALCULATE COLOUR
            let amount = (zone.colour + 1) / 2;
            let redHsv = Color('#F4462C').hsv();
            let greenHsv = Color('#51B73A').hsv();
            let hDiff = greenHsv.object().h - redHsv.object().h;
            let sDiff = greenHsv.object().s - redHsv.object().s;
            let vDiff = greenHsv.object().v - redHsv.object().v;
            let color = Color.hsv(redHsv.object().h + amount * hDiff,
                                     redHsv.object().s + amount * sDiff,
                                     redHsv.object().v + amount * vDiff);
            let flagRadius = 0.035*width;

            // DISPLAY ZONE PULSE
            s.circle().attr({
                id: 'zone-colour' + zone.zone_id,
                cx: '' + (zone.x * width),
                cy: '' + (zone.y * height),
                r: '' + flagRadius,
                fill: '' + color,
                stroke: 'none'})
                .animate({
                    r: (0.1 * width * zone.size + flagRadius),
                    fill: '' + color.fade(1)},
                    600);

            // DISPLAY FLAG
            let fileName = zone.zone_name.replace(/\s+/g, '-').toLowerCase() + '.png';
            let flag = s.image(fileName, zone.x*width - flagRadius*1.1, zone.y*height - flagRadius*1.1, flagRadius*2.2, flagRadius*2.2);
            let mask = s.circle().attr({id: 'zone-mask' + zone.zone_id,
                cx: '' + (zone.x*width),
                cy: '' + (zone.y*height),
                r: '' + flagRadius,
                fill: '#fff',
                stroke: '#000'});
            s.g(flag).attr({ id: 'zone-mask', mask: mask });

            // DISPLAY BORDER
            s.circle().attr({id: 'zone-border' + zone.zone_id,
                cx: '' + (zone.x*width),
                cy: '' + (zone.y*height),
                r: '' + flagRadius,
                fill: 'none',
                stroke: ''+color});
        });


    };

    componentDidMount () {
        window.addEventListener('resize', this.drawMap);
        let s = Snap('#map');
        s.polygon().attr({id: 'map-border', stroke: '#C9E5FF', fill: '#001C31', points: ''});
        s.polygon().attr({id: 'map-polygon', fill: '#0C4870', stroke: '#C9E5FF', points: ''});
        s.circle().attr({id: 'map-lab', fill: '#001C31', stroke: '#C9E5FF', cx: '0', cy: '0', r: '0'});
        this.drawMap(s);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ zones: nextProps.zones });
    }

    componentDidUpdate() {
        this.drawMap();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.drawMap);
    }

    render () {
        return (
            <div id='map-wrapper'>
                <svg id='map'>
                </svg>
            </div>
        )
    }

}

export default Map