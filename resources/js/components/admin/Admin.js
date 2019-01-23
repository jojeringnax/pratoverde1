import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="admin-page" className="section">
                Admin
                <Link to="/public/admin/problem"> PROBLEMS</Link>
                <Link to="/public/admin/rooms"> ROOMS</Link>
            </div>
        );
    }
}

export default Admin;