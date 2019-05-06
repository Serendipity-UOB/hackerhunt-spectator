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
                fill: '#ffffff',
                stroke: 'none'});

            if (zone === 'Italy') {
                let white = s.polygon().attr({stroke: 'none', fill: '#E6F2F8', points:
                    (0) + ', ' + (0) + ',' +
                    (0) + ', ' + (width) + ',' +
                    (width) + ', ' + (width) + ',' +
                    (width) + ', ' + (0)
                });
                let green = s.polygon().attr({stroke: 'none', fill: '#0E915F', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 - 0.4*flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 - 0.4*flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius)
                });
                let red = s.polygon().attr({stroke: 'none', fill: '#C6373B', points:
                    (width/2 + 0.4*flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 + 0.4*flagRadius) + ', ' + (width/2 + flagRadius)
                });
                s.g(white, green, red).attr({ mask: mask });
            } else if (zone === 'Sweden') {
                let blue = s.polygon().attr({stroke: 'none', fill: '#4080A5', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius)
                });
                let yellow_v = s.polygon().attr({stroke: 'none', fill: '#E2C044', points:
                    (width/2 - 0.5*flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - 0.5*flagRadius) + ', ' + (width/2 + flagRadius)
                });
                let yellow_h = s.polygon().attr({stroke: 'none', fill: '#E2C044', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - 0.25*flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 - 0.25*flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + 0.25*flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + 0.25*flagRadius)
                });
                s.g(blue, yellow_v, yellow_h).attr({ mask: mask });
            } else if (zone === 'Switzerland') {
                let red = s.polygon().attr({stroke: 'none', fill: '#C6373B', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius)
                });
                let white_h = s.polygon().attr({stroke: 'none', fill: '#E6F2F8', points:
                    (width/2 - 0.6*flagRadius) + ', ' + (width/2 - 0.2*flagRadius) + ',' +
                    (width/2 + 0.6*flagRadius) + ', ' + (width/2 - 0.2*flagRadius) + ',' +
                    (width/2 + 0.6*flagRadius) + ', ' + (width/2 + 0.2*flagRadius) + ',' +
                    (width/2 - 0.6*flagRadius) + ', ' + (width/2 + 0.2*flagRadius)
                });
                let white_v = s.polygon().attr({stroke: 'none', fill: '#E6F2F8', points:
                    (width/2 - 0.2*flagRadius) + ', ' + (width/2 - 0.6*flagRadius) + ',' +
                    (width/2 + 0.2*flagRadius) + ', ' + (width/2 - 0.6*flagRadius) + ',' +
                    (width/2 + 0.2*flagRadius) + ', ' + (width/2 + 0.6*flagRadius) + ',' +
                    (width/2 - 0.2*flagRadius) + ', ' + (width/2 + 0.6*flagRadius)
                });
                s.g(red, white_h, white_v).attr({ mask: mask });
            } else if (zone === 'Colombia') {
                let yellow = s.polygon().attr({stroke: 'none', fill: '#F7D033', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius)
                });
                let blue = s.polygon().attr({stroke: 'none', fill: '#11457E', points:
                    (width/2 - flagRadius) + ', ' + (width/2) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + 0.5*flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + 0.5*flagRadius)
                });
                let red = s.polygon().attr({stroke: 'none', fill: '#C6373B', points:
                    (width/2 - flagRadius) + ', ' + (width/2 + 0.5*flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + 0.5*flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius)
                });
                s.g(yellow, blue, red).attr({ mask: mask });
            } else if (zone === 'Czech') {
                let white = s.polygon().attr({stroke: 'none', fill: '#E6F2F8', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2)
                });
                let red = s.polygon().attr({stroke: 'none', fill: '#C6373B', points:
                    (width/2 - flagRadius) + ', ' + (width/2) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2) + ',' +
                    (width/2 + flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius)
                });
                let blue = s.polygon().attr({stroke: 'none', fill: '#11457E', points:
                    (width/2 - flagRadius) + ', ' + (width/2 - flagRadius) + ',' +
                    (width/2 - flagRadius) + ', ' + (width/2 + flagRadius) + ',' +
                    (width/2) + ', ' + (width/2)
                });
                s.g(white, red, blue).attr({ mask: mask });
            }

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