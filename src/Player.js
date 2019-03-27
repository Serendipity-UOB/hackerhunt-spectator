import React, { Component } from 'react'
import './Player.css'
import Crown from './Crown.js'

class Player extends Component {

    constructor () {
        super()
        this.state = {}
    }

    render () {
        return (
            <div className='player-card'>
                <div className='player-card-left'>
                    <div><span>#{this.props.player.position}</span></div>
                </div>
                <div className='player-card-right'>
                    <div className='player-name-container'>
                        <div className='player-name-border'>
                            <div className='player-name'>
                                <Crown position={this.props.player.position}/> {this.props.player.real_name}
                            </div>
                        </div>
                    </div>
                    <div className='player-reputation-container'><div className='player-reputation'><span>{this.props.player.reputation}</span></div></div>
                </div>
            </div>
        )
    }

}

export default Player