import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

class BookForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="admin-page" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-center col-12">
                        <div className="title-form"><h1>Забронировать номер</h1></div>
                        <Link to="/public/admin" className="btn peach-gradient">Назад</Link>
                        <form className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookForm;