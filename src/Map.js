import React, { Component } from 'react'
import './Map.css'
import Snap from 'snapsvg-cjs'

class Map extends Component {

    constructor () {
        super()
        this.state = {}
    }

    drawMap = () => {
        console.log("drawMap")
        let width = document.getElementById('map').clientWidth
        let height = 0.45*width
        document.getElementById('map').style.height = '' + height + '';
        document.getElementById('map-content').style.height = '' + height + '';
        console.log(document.getElementById('map').clientHeight)
        console.log(width)
        this.forceUpdate()
        console.log('draw map');
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
        document.getElementById('map-border').setAttribute('points',
            0 + ', ' + 0 +',' +
            width + ', ' + 0 +',' +
            width + ', ' + height +',' +
            0 + ', ' + height);
    }

    componentDidMount () {
        window.addEventListener('resize', this.drawMap)
        let s = Snap('#map')
        let border = s.polygon()
            .attr({
                id: 'map-border',
                stroke: '#00A6EE',
                fill: 'none',
                points: ''
            });
        let main = s.polygon()
            .attr({
                id: 'map-polygon',
                fill: '#002c4a',
                stroke: '#00A6EE',
                points: ''
            });
        this.drawMap();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render () {
        return (
            <svg id='map'/>
        )
    }

}

export default Map