import React, { Component } from 'react'
import './Map.css'
import Snap from 'snapsvg-cjs'

class Map extends Component {

    constructor () {
        super();
        this.state = {}
    }

    drawMap = () => {
        // Set the dimensions
        let width = document.getElementById('map-content').clientWidth;
        let height = document.getElementById('map-content').clientHeight;
        if (height > 0.45*width) {
            height = 0.45*width;
        } else {
            width = height/0.45;
        }

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
            0.25*width + ', ' + 0.63*height +',' +
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
    }

    componentDidMount () {
        window.addEventListener('resize', this.drawMap)
        let s = Snap('#map')
        s.polygon().attr({id: 'map-border', stroke: '#00A6EE', fill: '#001C31', points: ''});
        s.polygon().attr({id: 'map-polygon', fill: '#002c4a', stroke: '#00A6EE', points: ''});
        s.circle().attr({id: 'map-pillar-1', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0'});
        s.circle().attr({id: 'map-pillar-2', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0',});
        this.drawMap();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render () {
        return (
            <div id='map-wrapper'>
                <svg id='map'></svg>
            </div>
        )
    }

}

export default Map