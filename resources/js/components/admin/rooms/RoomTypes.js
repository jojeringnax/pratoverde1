import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

let types = [];
class RoomTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false,
        };
        this.getTypes = this.getTypes.bind(this);
        this.deleteTypes = this.deleteTypes.bind(this);
        this.createTable = this.createTable.bind(this);
    }

    getTypes() {
        axios.get('/public/api/admin/room_types')
            .then(response => {
                types = response.data;
                this.setState({
                    data: true,
                })

            })
            .catch(error => {
                //console.log(error)
            })
    }

    deleteTypes(e) {
        e.preventDefault();
        let id = e.target.id;
        console.log(document.getElementById(id).parentNode);
        axios.delete(e.target.href)
            .then(response => {
                //console.log(response);
                let parent = document.querySelector('tbody');
                let child = document.getElementById(id).parentNode;
                parent.removeChild(child);
            })
            .catch(error => {
                //console.log(error);
            })
    }

    createTable() {
        let urlDelete = "/public/api/admin/room_types/delete/";
        let urlUpdate = "/public/admin/rooms/types/update/";
        let row = [];
        let table = [];
        for(let i=0; i < types.length; i++) {
            row = [];
            for(let key in types[i]) {
                row.push(<td id={types[i][key]} key={key}>{types[i][key]}</td>);
            }
            row.push(<td key="action">
                    <Link to={urlUpdate + types[i]['id']}>Update</Link>
                    <Link id={types[i]['id']} onClick={this.deleteTypes} to={urlDelete + types[i]['id']}>Delete</Link>
                    </td>);
            table.push(<tr key={i}>{row}</tr>);
        }
        return table;
    }

    componentDidMount() {
        this.getTypes()
    }


    render() {
        return (
            <div className="" id="section-roomTypes">
                <div className="container">
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>
                        <Link to="/public/admin/rooms/types/create" className="btn btn-outline-secondary">Добавить Тип Номера</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomTypes;