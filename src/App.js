import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import './App.css'
import Player from './Player.js'
import Map from './Map.js'
import Flag from './Flag.js'

class App extends Component {

    constructor () {
        super()
        this.state = {
            leaderboard: [],
            zones: [],
            logs: [],
            time: ''
        }
    }

    getItems() {
        // axios.get('https://serendipity-game-controller.herokuapp.com/spectator')
        axios.get('http://localhost:8080/spectator')
            .then(response => {
                const data = response.data;
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
                        {/*<div className='title'>Log</div>*/}
                        <div className='content' id='logs'>
                            {/*Logs*/}
                            <table id='logs-table'>
                                <tbody>
                                    {this.state.logs.map((log, key) =>
                                        <tr key={key}>
                                            <td><span>{log.time}</span></td>
                                            <td><Flag zone={log.zone_name} /></td>
                                            <td><span>{ ReactHtmlParser(log.message) }</span></td>
                                        </tr>
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