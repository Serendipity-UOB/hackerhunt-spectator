import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

    constructor () {
        super()
        this.state = {
            username: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        axios.get('http://localhost:8080/spectator')
            .then(response => console.log(response))
    }

    render () {
        return (
            // <div className='button__container'>
                // <button className='button' onClick={this.handleClick}>
                    // Click Me
                // </button>
            // </div>
            <div id='container'>

                <div id='left-container'>
                    <div id='map-container'>
                        <div className='title'>Map</div>
                        <div className='content'></div>
                    </div>
                    <div id='logs-container'>
                        <div className='title'>Log</div>
                        <div className='content'></div>
                    </div>
                </div>
                <div id='right-container'>
                    <div id='leaderboard-container'>
                        <div className='title'>Leaderboard</div>
                        <div className='content'></div>
                    </div>
                </div>

                {/*<div id='top-container'>*/}

                {/*</div>*/}
                {/*// <div id='bottom-container'>*/}


                {/*</div>*/}
            </div>

        )
    }

}

export default App