import React, { Component } from 'react';
import Rooms from './Rooms';
import Ristorante from './Ristorante';
import Description from './Description';
import Contacts from './Contacts';
import Blog from './Blog';

class Main extends React.Component {
    render() {
        return (
            <div className="section">
                <Description />
                <Rooms />
                <Ristorante />
                <Blog />
                <Contacts />
            </div>
        );
    }
}

export default Main;
