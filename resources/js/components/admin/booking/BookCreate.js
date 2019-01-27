import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

class BookCreate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="admin-page" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-center col-12">
                        BookingCreate
                    </div>
                </div>
            </div>
        );
    }
}

export default BookCreate;