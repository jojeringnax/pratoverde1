import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ActionTable from '../ActionTable';

export default class RoomsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms : []
        };
        this.deleteRoom = this.deleteRoom.bind(this);
    }

    deleteRoom(e) {
        e.preventDefault();
        console.log(e.target.getAttribute('data-delete'));
        let urlDelete = e.target.getAttribute('data-delete');
        axios.delete(urlDelete)
            .then(response => {})
            .catch(function (error) {});
    }

    createTableRooms(){
        let table = [];
        let urlUpdate = '';
        let urlDelete = '';

        for (let i=0; i < this.state.rooms.length; i++) {
            let child = [];
            for(let key in this.state.rooms[i]){
                child.push(<td key={key}>{this.state.rooms[i][key]}</td>)
            }
            urlUpdate = '/public/admin/rooms/update/' + this.state.rooms[i]['id'];
            urlDelete = '/public/api/admin/rooms/delete/' + this.state.rooms[i]['id'];
            child.push(<ActionTable
                key="action"
                id={this.state.rooms[i]['id']}
                updateUrl={urlUpdate}
                deleteUrl={urlDelete}
            />);
            table.push(<tr id={this.state.rooms[i]['id']} key={i+1}>{child}</tr>);
        }
        return table
    };


    componentDidMount() {
        axios.get('/public/api/admin/rooms')
            .then(response => {
                this.setState({
                    rooms: response.data
                },()=>{
                    console.log(this.state.rooms)
                });
            })
            .catch(function (error) {
            });
    }

    render() {
        return (
            <div className="container-admin">
                <Link to="/public/admin" className="btn peach-gradient">Назад</Link>
                <table className="table table-striped admin-table table-bordered">
                    <thead className="secondary-color-dark border-secondary">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Floor</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type_id</th>
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
                <Link className="btn btn-outline-secondary" to="/public/admin/rooms/types">ТИПЫ КОМНАТ</Link>
                <Link className="btn btn-outline-secondary" to="/public/admin/rooms/create">СОЗДАТЬ НОМЕР</Link>
            </div>
        );
    }
}