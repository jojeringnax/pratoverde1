import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreateRooms from '../admin/rooms/CreateRooms'

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="admin-page" className="section">
                Admin
            </div>
        );
    }
}

export default Admin;