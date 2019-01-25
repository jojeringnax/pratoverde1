import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="admin-page" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-center col-12">
                        <div id="" className="col-xl-10 card dashboard-admin-title">
                            <div className="card-header">
                                <h3>DASHBOARD</h3>
                            </div>
                            <div className="card-body d-flex justify-content-around">
                                <Link className="col-3 btn-admin-section card" to="/public/admin/problems"> PROBLEMS</Link>
                                <Link className="col-3 btn-admin-section card" to="/public/admin/rooms"> ROOMS</Link>
                                <Link className="col-3 btn-admin-section card" to="/">BOOKING</Link>
                                <Link className="col-3 btn-admin-section card" to="">CUSTOMER</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;