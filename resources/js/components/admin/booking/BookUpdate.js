import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

class BookUpdate extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="admin-page" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-center col-12">
                        BookingUpdate
                    </div>
                </div>
            </div>
        );
    }
}

export default BookUpdate;