import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Player from './Player.js'

class App extends Component {

    constructor () {
        super()
        this.state = {
            leaderboard: [],
            zones: 'default',
            logs: 'default'
        }
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getItems(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getItems() {
        axios.get('http://localhost:8080/spectator')
            .then(response => {
                const data = response.data;
                this.setState({ leaderboard : data.leaderboard });
                this.setState({ zones : data.zones });
                const newLogs = this.state.logs.concat(data.logs);
                this.setState({ logs : newLogs });
                console.log(this.state.leaderboard);
                console.log(typeof this.state.leaderboard)
            })
    }

    render () {
        return (
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
                        <div className='content no-border'>
                            {this.state.leaderboard.sort((a, b) => a.position - b.position).map((player, key) =>
                                <Player player={player} key={key}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default App