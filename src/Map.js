import React, { Component } from 'react'
import './Map.css'
import Snap from 'snapsvg-cjs'

const Color = require('color');

class Map extends Component {

    constructor () {
        super();
        this.state = {zones: []}
    }


    drawMap = () => {
        // console.log("drawMap");

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

        // let pillarRadius = 0.02*width;
        // document.getElementById('map-pillar-1').setAttribute('r', '' + pillarRadius);
        // document.getElementById('map-pillar-1').setAttribute('cx', '' + 0.8*width);
        // document.getElementById('map-pillar-1').setAttribute('cy', '' + 0.63*height);

        // let pillar2_cx = 0.7*width;
        // let pillar2_cy = 0.63*height;
        // document.getElementById('map-pillar-2').setAttribute('r', '' + pillarRadius);
        // document.getElementById('map-pillar-2').setAttribute('cx', '' + pillar2_cx);
        // document.getElementById('map-pillar-2').setAttribute('cy', '' + pillar2_cy);
        // document.getElementById('map-pillar-2').style.strokeDasharray = 2 * Math.PI * pillarRadius;
        // document.getElementById('map-pillar-2').style.strokeDashoffset = 0.25 * 2 * Math.PI * pillarRadius;
        // document.getElementById('map-pillar-2').setAttribute('transform', 'rotate(180 ' + pillar2_cx + ' '+ pillar2_cy + ')');

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
        // console.log(document.querySelectorAll('*[id^="zone-"]'));
        document.querySelectorAll('*[id^="zone-"]').forEach(function(elem){
            elem.parentNode.removeChild(elem);
        });

        // Render updated zones
        this.state.zones.forEach(function(zone){
            // console.log(zone);
            let color = Color('rgb(' + zone.colour.red + ', ' + zone.colour.green + ', ' + zone.colour.blue + ')');
            let g = s.gradient('r(0.5, 0.5, 0.5)'+color.hex()+'-rgba(1, 1, 1, 0)');
            let flagRadius = 0.02*width;
            let glow = s.circle().attr({id: 'zone-colour' + zone.zone_id,
                cx: '' + (zone.x*width),
                cy: '' + (zone.y*height),
                r: '' + (0.06*width*zone.size + flagRadius),
                fill: g,
                stroke: 'none'});
            let mask = s.circle().attr({id: 'zone-mask' + zone.zone_id,
                cx: '' + (zone.x*width),
                cy: '' + (zone.y*height),
                r: '' + flagRadius,
                fill: '#fff',
                stroke: '#000'});
            if (zone.zone_name === 'Italy') {
                // console.log('Italy');
                let white = s.polygon().attr({id: 'zone-italy-white', stroke: 'none', fill: '#f2f2f2', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let green = s.polygon().attr({id: 'zone-italy-green', stroke: 'none', fill: '#009246', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width - 0.4*flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width - 0.4*flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let red = s.polygon().attr({id: 'zone-italy-red', stroke: 'none', fill: '#ce2b37', points:
                    (zone.x*width + 0.4*flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width + 0.4*flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let g = s.g(white, green, red).attr({ id: 'zone-italy-mask', mask: mask });
            } else if (zone.zone_name === 'Sweden') {
                // console.log('Sweden');
                let blue = s.polygon().attr({id: 'zone-sweden-blue', stroke: 'none', fill: '#006AA7', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let yellow_v = s.polygon().attr({id: 'zone-sweden-yellow_v', stroke: 'none', fill: '#FECC00', points:
                    (zone.x*width - 0.5*flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - 0.5*flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let yellow_h = s.polygon().attr({id: 'zone-sweden-yellow_h', stroke: 'none', fill: '#FECC00', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - 0.25*flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - 0.25*flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + 0.25*flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + 0.25*flagRadius)
                });
                let g = s.g(blue, yellow_v, yellow_h).attr({ id: 'zone-sweden-mask', mask: mask });
            } else if (zone.zone_name === 'Switzerland') {
                // console.log('Switzerland');
                let red = s.polygon().attr({id: 'zone-switzerland-red', stroke: 'none', fill: '#D52B1E', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let white_h = s.polygon().attr({id: 'zone-switzerland-white_h', stroke: 'none', fill: '#FFFFFF', points:
                    (zone.x*width - 0.6*flagRadius) + ', ' + (zone.y*height - 0.2*flagRadius) + ',' +
                    (zone.x*width + 0.6*flagRadius) + ', ' + (zone.y*height - 0.2*flagRadius) + ',' +
                    (zone.x*width + 0.6*flagRadius) + ', ' + (zone.y*height + 0.2*flagRadius) + ',' +
                    (zone.x*width - 0.6*flagRadius) + ', ' + (zone.y*height + 0.2*flagRadius)
                });
                let white_v = s.polygon().attr({id: 'zone-switzerland-white_h', stroke: 'none', fill: '#FFFFFF', points:
                    (zone.x*width - 0.2*flagRadius) + ', ' + (zone.y*height - 0.6*flagRadius) + ',' +
                    (zone.x*width + 0.2*flagRadius) + ', ' + (zone.y*height - 0.6*flagRadius) + ',' +
                    (zone.x*width + 0.2*flagRadius) + ', ' + (zone.y*height + 0.6*flagRadius) + ',' +
                    (zone.x*width - 0.2*flagRadius) + ', ' + (zone.y*height + 0.6*flagRadius)
                });
                let g = s.g(red, white_h, white_v).attr({ id: 'zone-switzerland-mask', mask: mask });
            } else if (zone.zone_name === 'Colombia') {
                // console.log('Colombia');
                let yellow = s.polygon().attr({id: 'zone-colombia-yellow', stroke: 'none', fill: '#FCD116', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let blue = s.polygon().attr({id: 'zone-colombia-blue', stroke: 'none', fill: '#003893', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + 0.5*flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + 0.5*flagRadius)
                });
                let red = s.polygon().attr({id: 'zone-colombia-red', stroke: 'none', fill: '#CE1126', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + 0.5*flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + 0.5*flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let g = s.g(yellow, blue, red).attr({ id: 'zone-colombia-mask', mask: mask });
            } else if (zone.zone_name === 'Czech Republic') {
                // console.log('Czech Republic');
                let white = s.polygon().attr({id: 'zone-czechrepublic-white', stroke: 'none', fill: '#FFFFFF', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height)
                });
                let red = s.polygon().attr({id: 'zone-czechrepublic-red', stroke: 'none', fill: '#D7141A', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height) + ',' +
                    (zone.x*width + flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius)
                });
                let blue = s.polygon().attr({id: 'zone-czechrepublic-blue', stroke: 'none', fill: '#11457E', points:
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height - flagRadius) + ',' +
                    (zone.x*width - flagRadius) + ', ' + (zone.y*height + flagRadius) + ',' +
                    (zone.x*width) + ', ' + (zone.y*height)
                });
                let g = s.g(white, red, blue).attr({ id: 'zone-czechrepublic-mask', mask: mask });
            }
            let border = s.circle().attr({id: 'zone-border' + zone.zone_id,
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
        s.polygon().attr({id: 'map-border', stroke: '#00A6EE', fill: '#001C31', points: ''});
        s.polygon().attr({id: 'map-polygon', fill: '#002c4a', stroke: '#00A6EE', points: ''});
        s.circle().attr({id: 'map-lab', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0'});
        // s.circle().attr({id: 'map-pillar-1', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0'});
        // s.circle().attr({id: 'map-pillar-2', fill: '#001C31', stroke: '#00A6EE', cx: '0', cy: '0', r: '0',});
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