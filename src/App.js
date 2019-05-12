import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Player from './Player.js'
import Map from './Map.js'
import Log from './Log.js'

class App extends Component {

    constructor () {
        super()
        this.state = {
            leaderboard: [],
            zones: [],
            logs: [],
            time: '',
            countdown_message: ''
        }
    }

    getItems() {
        // axios.get('https://serendipity-game-controller.herokuapp.com/spectator')
        axios.get('http://localhost:8080/spectator')
            .then(response => {
                // console.log(response);
                const data = response.data;
                this.setState({ time : data.time });
                this.setState({ countdown_message : data.countdown_message });
                this.setState({ leaderboard : data.leaderboard });
                this.setState({ zones : data.zones });
                if (data.clear_logs) this.setState({ logs : [] });
                else this.setState({ logs : this.state.logs.concat(data.logs) });
                if (data.logs.length > 0) this.updateScroll();
            })
    }

    updateScroll(){
        var element = document.getElementById("logs");
        element.scrollTop = element.scrollHeight;
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getItems(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render () {
        return (
            <div id='container'>
                <div id='left-container'>
                    <div id='map-container'>
                        <div className='content' id='map-content'>
                            <Map zones={this.state.zones}/>
                        </div>
                    </div>
                    <div id='logs-container'>
                        <div className='content' id='logs'>
                            <table id='logs-table'>
                                <tbody>
                                    {this.state.logs.map((log, key) =>
                                        <Log key={key} log={log}/>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id='right-container'>
                    <div id='countdown-container'>
                        <div id='countdown'>
                            {this.state.time}
                        </div>
                        <div id='countdown-message'>
                            {this.state.countdown_message}
                        </div>
                    </div>
                    <div id='leaderboard-container'>
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