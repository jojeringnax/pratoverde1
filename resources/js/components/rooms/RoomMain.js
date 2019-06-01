import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Admin from "../admin/Admin";
import App from "../main/App";

class RoomMain extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="room-page" className="section">
                Rooms
            </div>
        );
    }
}

export default RoomMain;