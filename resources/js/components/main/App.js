import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
{/*MAIN PAGE IMPORT*/}
import NavBar from './NavBar';
import Main from './Main';
import RoomMain from '../rooms/RoomMain';
{/*ADMIN IMPORT*/}
import Admin from '../admin/Admin';
{/*ADMIN-ROOMS IMPORT*/}
import IndexCreateRooms from '../admin/rooms/IndexCreateRooms';
import CreateRooms from '../admin/rooms/CreateRooms';
import UpdateRooms from '../admin/rooms/UpdateRooms';
import RoomTypes from "../admin/rooms/RoomTypes";
{/*ADMIN-PROBLEM IMPORT*/}
import IndexProblems from "../admin/problems/IndexProblems";
import ProblemCreate from "../admin/problems/ProblemCreate";
import ProblemUpdate from "../admin/problems/ProblemUpdate";

export default class App extends React.Component {
    render() {
        return (
            <div className="section">
                <NavBar />
                <Main />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <Router>
            <Switch>
                <Route path="/public" exact component={App} />
                <Route path="/public/rooms" component={RoomMain} />
                {/*ADMIN SYSTEM ROUTE*/}
                <Route path="/public/admin" exact component={Admin} />
                {/*ADMIN-ROOMS ROUTE*/}
                <Route path="/public/admin/rooms" exact component={IndexCreateRooms} />
                <Route path="/public/admin/rooms/create" component={CreateRooms} />
                <Route path="/public/admin/rooms/update/:id" component={UpdateRooms} />
                <Route path="/public/admin/room/types" exact component={RoomTypes} />
                {/*ADMIN-PROBLEMS ROUTE*/}
                <Route path="/public/admin/problems" exact component={IndexProblems} />
                <Route path="/public/admin/problems/create" component={ProblemCreate} />
                <Route path="/public/admin/problems/update/:id" component={ProblemUpdate} />
                <Route render={() => (<div>Sorry</div>)}/>
            </Switch>
        </Router>,
        document.getElementById('root')
    );
}
