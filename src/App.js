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
            time: {
                minutes: '0',
                seconds: '0'
            },
            countdown_message: ''
        }
    }

    getItems() {
        axios.get('https://serendipity-game-controller.herokuapp.com/spectator')
        // axios.get('http://localhost:8080/spectator')
            .then(response => {
                // console.log(response);
                const data = response.data;
                switch (response.status) {
                    case 200: // CURRENT GAME
                        // console.log('200');
                        this.setState({ leaderboard : data.leaderboard });
                        this.setState({ zones : data.zones });
                        this.setState({ logs : this.state.logs.concat(data.logs) });
                        // console.log(this.state.logs);
                        if (data.logs.length > 0) this.updateScroll();
                        this.setState({ time : data.time });
                        if (data.time.minutes < 1 && data.time.seconds <= 30) {
                            document.getElementById('countdown').classList.add('red');
                            document.getElementById('countdown-container').classList.add('pulse');
                        }
                        this.setState({ countdown_message : 'TIME REMAINING' });
                        break;
                    case 204: // NO GAME (Also just at start of game)
                        // console.log('204');
                        if (document.getElementById('countdown').classList.contains('red')) {
                            document.getElementById('countdown').classList.remove('red');
                        }
                        if (document.getElementById('countdown-container').classList.contains('pulse')) {
                            document.getElementById('countdown-container').classList.remove('pulse');
                        }
                        break;
                    case 206: // COUNTDOWN TO START OF GAME
                        // console.log('206');
                        // console.log(response);
                        this.setState({ leaderboard : data.leaderboard });
                        this.setState({ time : data.time });
                        this.setState({ logs : [] });
                        this.setState({ countdown_message : 'NEXT GAME IN' });
                        this.setState({ zones : [] });
                        // this.setState({ zones : data.zones });
                        break;
                    default:
                        console.log(response);
                        break;
                }
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
                        {/*<div className='title' id='map-title'>Map</div>*/}
                        <div className='content' id='map-content'>
                            <Map zones={this.state.zones}/>
                            {/*Map*/}
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
                            {this.state.time.minutes <= 9 ? '0' : ''}{this.state.time.minutes > 0 ? this.state.time.minutes : '0'}:{this.state.time.seconds <= 9 ? '0' : ''}{this.state.time.seconds > 0 ? this.state.time.seconds : '0'}
                        </div>
                        <div id='countdown-message'>
                            {this.state.countdown_message}
                        </div>
                    </div>
                    <div id='leaderboard-container'>
                        {/*<div className='title'>Leaderboard</div>*/}
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