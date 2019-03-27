import React, { Component } from 'react'
import './Crown.css'

class Crown extends Component {

    constructor () {
        super()
        this.state = {}
    }

    render () {
        return (
            <div className='crown'>
                {this.props.position === 1 &&
                <img src="gold_crown.png" alt="gold"/>
                }
                {this.props.position === 2 &&
                <img src="silver_crown.png" alt="silver"/>
                }
                {this.props.position === 3 &&
                <img src="bronze_crown.png" alt="bronze"/>
                }
            </div>
        )
    }

}

export default Crown