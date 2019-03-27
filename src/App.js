import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import axios from 'axios'
import './App.css'
import Player from './Player.js'
import Zone from './Zone.js'

class App extends Component {

    constructor () {
        super()
        this.state = {
            leaderboard: [],
            zones: [],
            logs: []
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
                this.setState({ logs : this.state.logs.concat(data.logs) });
                if (data.logs.length > 0) this.updateScroll();
            })
    }

    updateScroll(){
        var element = document.getElementById("logs");
        element.scrollTop = element.scrollHeight;
    }

    render () {
        return (
            <div id='container'>
                <div id='left-container'>
                    <div id='map-container'>
                        <div className='title'>Map</div>
                        <div className='content'>
                            {this.state.zones.map((zone, key) =>
                                <Zone zone={zone} key={key}/>
                            )}
                        </div>
                    </div>
                    <div id='logs-container'>
                        <div className='title'>Log</div>
                        <div className='content' id='logs'>
                            <table id='logs-table'>
                                <tbody>
                                    {this.state.logs.map((log, key) =>
                                        <tr key={key}>
                                            <td><span>{log.time}</span></td>
                                            <td><span>{ ReactHtmlParser(log.message) }</span></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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