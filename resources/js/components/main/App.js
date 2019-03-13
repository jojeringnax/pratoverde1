import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter  as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { connect } from 'react-redux'

import { Provider } from 'react-redux';
import { store } from '../../store/configureStore';
import { setTypes } from "../../actions/setTypes";

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
        const { rooms, roomTypes, setTypes } = this.props;
        console.log('---renderApp', rooms, roomTypes);
        return (
            <div className="section">
                <NavBar />
                <Main />
            </div>
        );
    }
}

const mapStateToProps = store => {
    console.log('---store',store);
    return {
        rooms: store.rooms,
        roomTypes: store.roomTypes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTypes: type => dispatch(setYear(type)),
    }
};

const AppC =  connect(mapStateToProps, mapDispatchToProps)(App);


const Root = ({store}) => {
    return(
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/public" exact component={AppC} />
                    <Route path="/public/rooms" render={() => <RoomMain />} />
                    <Route path="/public/bookings/form" render={() => <BookingsForm />} />
                    <Route
                        path="/public/blog/new/:id"
                        render={(routeProps) => <NewsPage {...routeProps}/>}
                    />
                    <Route component={Admin}/>
                    {/*ADMIN SYSTEM ROUTE*/}
                </Switch>
            </Router>
        </Provider>
    )
};

if (document.getElementById('root')) {
    ReactDOM.render(
        <Root store={store} />,
        document.getElementById('root')
    );
}
