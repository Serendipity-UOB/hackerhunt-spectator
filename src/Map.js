import React, { Component } from 'react'
import './Map.css'
import Snap from 'snapsvg-cjs'

class Map extends Component {

    constructor () {
        super()
        this.state = {}
    }

    resize = () => {
        console.log("resize")
        console.log(document.getElementById('map').clientHeight)
        console.log(document.getElementById('map').clientWidth)
        this.forceUpdate()

    }

    componentDidMount () {
        console.log(document.getElementById('map-wrapper').clientHeight)
        window.addEventListener('resize', this.resize)
        let s = Snap('#map')
        var main = s.polygon(0, 0,
                             100, 0,
                             100, 150,
                             500, 150,
                             500, 0,
                             590, 0,
                             590, 150,
                             730, 150,
                             730, 370,
                             500, 370,
                             500, 250,
                             250, 250,
                             250, 370,
                             200, 370,
                             200, 250,
                             100, 250,
                             0, 250)
            .attr({
                fill: '#002c4a',
                stroke: '#00A6EE',
                vectoreffect: 'non-scaling-stroke'
            });

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render () {
        return (
            <div id='map-wrapper'>
                <svg id='map'/>
                {/*<svg id='map' width='100%' height='100%' viewBox="0 0 100 100" preserveAspectRatio="none">*/}
                    {/*<rect x='40%' y='40%' width='25%' height='25%' />*/}

                    {/*<polygon points="0,0 0,100 30,20 30,0" />*/}
                    {/*<polygon points="30,0 30,20 60,0 60,0" />*/}
                    {/*<polygon points="60,0 60,0 90,30 90,0" />*/}
                {/*</svg>*/}
                {/*<svg id='map'/>*/}
            </div>
        )
    }

}

export default Map