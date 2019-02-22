import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import { Switch, Route, BrowserRouter  as Router} from 'react-router-dom';

import DashboardAdmin from './DashboardAdmin';
import NavBarAdmin from './NavBarAdmin';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <div className="section container-content-admin d-flex">
                    <NavBarAdmin />
                    <div className="row d-flex justify-content-center col-12">
                        <DashboardAdmin />
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;