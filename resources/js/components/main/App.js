import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter  as Router} from 'react-router-dom';

{/*MAIN PAGE IMPORT*/}
import NavBar from './NavBar';
import Main from './Main';
import RoomMain from '../rooms/RoomMain';

{/*ADMIN IMPORT*/}
import Admin from '../admin/Admin';

import NewsPage from '../blog/NewsPage';

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
                <Route path="/public" exact render={() => <App />} />
                <Route path="/public/rooms" render={() => <RoomMain />} />
                <Route
                    path="/public/blog/new/:id"
                    render={(routeProps) => <NewsPage {...routeProps}/>}
                />
                <Route component={Admin}/>
                {/*ADMIN SYSTEM ROUTE*/}
            </Switch>
        </Router>,
        document.getElementById('root')
    );
}
