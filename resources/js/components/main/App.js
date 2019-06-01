import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter  as Router } from 'react-router-dom';

{/*MAIN PAGE IMPORT*/}
import NavBar from './NavBar';
import Main from './Main';
import RoomMain from '../rooms/RoomMain';

{/*ADMIN IMPORT*/}
import Admin from '../admin/Admin';
import NewsPage from '../blog/NewsPage';
import BookingsForm from "../booking/BookingsForm";

class App extends React.Component {
    render() {
        return (
            <div className="section">
                <NavBar />
                <Main />
            </div>
        );
    }
}


const Root = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/rooms" render={() => <RoomMain />} />
                <Route path="/bookings/form" render={() => <BookingsForm />} />
                <Route
                    path="/blog/new/:id"
                    render={(routeProps) => <NewsPage {...routeProps}/>}
                />
                <Route component={Admin}/>
                {/*ADMIN SYSTEM ROUTE*/}
            </Switch>
        </Router>
    )
};

if (document.getElementById('root')) {
    ReactDOM.render(
        <Root />,
        document.getElementById('root')
    );
}
