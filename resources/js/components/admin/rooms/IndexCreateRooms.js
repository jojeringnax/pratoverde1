import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default class IndexCreateRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms : []
        }
        this.deleteRoom = this.deleteRoom.bind(this);
    }
    componentDidMount() {
        axios.get('/public/api/admin/rooms')
            .then(response => {
                this.setState({
                    rooms: response.data
                });
            })
            .catch(function (error) {
            });
    }

    deleteRoom(e) {
        e.preventDefault();
        console.log(e.target.getAttribute('data-delete'));
        let urlDelete = e.target.getAttribute('data-delete');
        axios.delete(urlDelete)
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    createTableRooms(){
        let table = [];
        let url = '';
        let urlDelete = ''
        for (let i=0; i < this.state.rooms.length; i++) {
            let child = [];
            for(let key in this.state.rooms[i]){
                child.push(<td key={key}>{this.state.rooms[i][key]}</td>)
            }
            url = '/public/admin/rooms/update/' + this.state.rooms[i]['id'];
            urlDelete = '/public/api/admin/rooms/delete/' + this.state.rooms[i]['id'];
            child.push(<td key="action">
                <Link key="update" to={url}>Tuda</Link>
                <Link key="delete" data-delete={urlDelete} onClick={this.deleteRoom} to="">Obratno</Link>
            </td>);
            table.push(<tr key={i+1}>{child}</tr>);
        }
        return table
    };

    render() {
        return (
            <div id="admin-rooms" className="section">
                <div className="container">
                    <div className="row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Floor</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Last_washing_date</th>
                                    <th scope="col">Need_wash</th>
                                    <th scope="col">Number_of_beds</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTableRooms()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}