import React, { Component } from "react";
import {Motion, spring} from 'react-motion';
import "./Vote.scss";
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../../constants/apiConstants";
const Arrow = ({direction, ...props}) => (
    <svg viewBox="0 0 28 12" {...props}>
        <polyline
            points={
                direction === 'up' ?
                    "0.595,11.211 14.04,1.245 27.485,11.211" :
                    "27.485,0.803 14.04,10.769 0.595,0.803"
            }
        />
    </svg>
)

Arrow.defaultProps = {
    direction: 'up'
}

class NumberColumn extends Component {
    _getNumbers() {
        let numbers = []
        let i = 0
        while (i < 10) {
            numbers.push(<div>{i}</div>)
            i++
        }
        return numbers
    }

    render() {
        const { current } = this.props

        return (
            <div className="vote__column">
                <Motion
                    style={{y: spring(current * 10)}}
                >
                    {({y}) =>
                        <div
                            style={{
                                transform: `translateY(${-y - 2.5}%)`
                            }}
                        >
                            {this._getNumbers()}
                        </div>
                    }
                </Motion>
            </div>
        )
    }
}

class Vote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 43,
            voteStatus: 0,
        }
        this.upVote = this.upVote.bind(this)
        this.downVote = this.downVote.bind(this)
        this.callUpVote = this.callUpVote.bind(this)
        this.callDownVote = this.callDownVote.bind(this)
    }

    callUpVote(){
        const config = {
            headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)},
            params:{
                id: this.props.postId
            }
        };
        axios.get(API_BASE_URL + '/resource/upvote', config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    callDownVote(){
        const config = {
            headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)},
            params:{
                id:  this.props.postId
            }
        };
        axios.get(API_BASE_URL + '/resource/downvote', config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    upVote() {
        const { count } = this.state
        if (this.state.voteStatus === 0){
            this.callUpVote()
            this.setState({count: count + 1, voteStatus: 1})
        }else if(this.state.voteStatus === 1){
            this.callDownVote()
            this.setState({count: count - 1, voteStatus: 0})
        }else{
            this.callUpVote()
            this.callUpVote()
            this.setState({count: count + 2, voteStatus: 1})
        }
    }

    downVote() {
        const { count } = this.state
        if (this.state.voteStatus === 0){
            this.callDownVote()
            this.setState({count: count - 1, voteStatus: -1})
        }else if(this.state.voteStatus === -1){
            this.callUpVote()
            this.setState({count: count + 1, voteStatus: 0})
        }else{
            this.callDownVote()
            this.callDownVote()
            this.setState({count: count - 2, voteStatus: -1})
        }
    }

    componentDidMount() {
        // for demonstration purposes
        this.setState({count: this.props.vote})
    }

    _getCount() {
        const counts = this.state.count.toString().split('')
        return counts.map(_count => {
            if (_count === '-') {
                return <span className="vote__column" className="negative__sign">-</span>
            } else {
                return <NumberColumn current={parseFloat(_count)} />
            }
        })
    }

    render() {
        let inputStyleUp = {};
        let inputStyleDown= {};
        if(this.state.voteStatus === 1) {
            inputStyleUp = {
                stroke: '#b4da55'
            }
        }else if (this.state.voteStatus === -1){
            inputStyleDown = {
                stroke: '#F33119'
            }
        }
        return(
            <div className="vote">
                <Arrow
                    direction="up"
                    className="vote__arrow vote__arrow--up"
                    onClick={this.upVote}
                    style={inputStyleUp}
                />
                <div className="vote__columns">
                    {this._getCount()}
                </div>
                <Arrow
                    direction="down"
                    className="vote__arrow vote__arrow--down"
                    onClick={this.downVote}
                    style={inputStyleDown}
                />
            </div>
        )
    }
}

export default Vote