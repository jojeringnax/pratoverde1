import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import Main from './Main';
import { Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom';
import RoomMain from '../rooms/RoomMain';
import Admin from '../admin/Admin';
import CreateRooms from '../admin/rooms/CreateRooms';
import IndexCreateRooms from '../admin/rooms/IndexCreateRooms';
import UpdateRooms from '../admin/rooms/UpdateRooms';

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
                <Route path="/public/admin" exact component={Admin} />
                <Route path="/public/admin/rooms/create" component={CreateRooms} />
                <Route path="/public/admin/rooms" exact component={IndexCreateRooms} />
                <Route path="/public/admin/rooms/update/:id" component={UpdateRooms} />
                <Route render={() => (<div>Sorry</div>)}/>
            </Switch>
        </Router>,
        document.getElementById('root')
    );
}
