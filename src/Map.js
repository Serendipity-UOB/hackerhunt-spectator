import React, { Component } from 'react'
import './Map.css'
import Snap from 'snapsvg-cjs'

class Map extends Component {

    constructor () {
        super();
        this.state = {zones: []}
    }


    drawMap = () => {
        console.log("drawMap");

        let s = Snap('#map');

        // Set the dimensions
        let width = document.getElementById('map-content').clientWidth;
        let height = document.getElementById('map-content').clientHeight;
        if (height > 0.45*width) {
            height = 0.45*width;
        } else {
            width = height/0.45;
        }
        document.getElementById('map').setAttribute('viewBox', '0 0 ' + width + ' ' + height + '');
        document.getElementById('map-content').setAttribute('height', '' + height);
        document.getElementById('map-content').setAttribute('width', '' + width);
        // document.getElementById('map').setAttribute('width', '' + width);


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

        let pillarRadius = 0.02*width;
        document.getElementById('map-pillar-1').setAttribute('r', '' + pillarRadius);
        document.getElementById('map-pillar-1').setAttribute('cx', '' + 0.8*width);
        document.getElementById('map-pillar-1').setAttribute('cy', '' + 0.63*height);

        let pillar2_cx = 0.7*width;
        let pillar2_cy = 0.63*height;
        document.getElementById('map-pillar-2').setAttribute('r', '' + pillarRadius);
        document.getElementById('map-pillar-2').setAttribute('cx', '' + pillar2_cx);
        document.getElementById('map-pillar-2').setAttribute('cy', '' + pillar2_cy);
        document.getElementById('map-pillar-2').style.strokeDasharray = 2 * Math.PI * pillarRadius;
        document.getElementById('map-pillar-2').style.strokeDashoffset = 0.25 * 2 * Math.PI * pillarRadius;
        document.getElementById('map-pillar-2').setAttribute('transform', 'rotate(180 ' + pillar2_cx + ' '+ pillar2_cy + ')');

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
        console.log(document.querySelectorAll('*[id^="zone-"]'));
        document.querySelectorAll('*[id^="zone-"]').forEach(function(elem){
            elem.parentNode.removeChild(elem);
        });

        // Render updated zones
        this.state.zones.forEach(function(zone){
            console.log(zone);
            s.circle().attr({id: 'zone-'+zone.zone_id, cx: ''+(zone.x*width), cy: ''+(zone.y*height), r: ''+(0.02*width)});

        });


    };

    componentDidMount () {
        window.addEventListener('resize', this.drawMap);
        let s = Snap('#map');
        s.polygon().attr({id: 'map-border', stroke: '#00A6EE', fill: '#001C31', points: ''});
        s.polygon().attr({id: 'map-polygon', fill: '#002c4a', stroke: '#00A6EE', points: ''});
        s.circle().attr({id: 'map-lab', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0'});
        s.circle().attr({id: 'map-pillar-1', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0'});
        s.circle().attr({id: 'map-pillar-2', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0',});
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