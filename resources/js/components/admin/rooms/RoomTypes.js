import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import ActionTable from '../ActionTable';

class RoomTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: []
        }
    }

    getTypes = () => {
        axios.get('/api/admin/room_types')
            .then(res => {
                this.setState({
                    types: res.data,
                });
            })
            .catch(error => {})
    };

    componentDidMount() {
        this.getTypes()
    }

    render() {
        return (
            <div className="container-admin d-flex justify-content-center align-items-center flex-column">
                 <h1 className="text-center">ТИПЫ КОМНАТ</h1>
                 <Link to="/admin/rooms" className="btn peach-gradient">Назад</Link>
                 <table className="table table-striped admin-table table-bordered">
                 <thead className="secondary-color-dark border-secondary">
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Цена за одного человека</th>
                            <th>Цена за двух людей</th>
                            <th>Минимальная вместимость</th>
                            <th>Максимальная вместимость</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.types.map((type, index) => {
                                return(
                                    <tr id={type.id} key={"type_" + type.id}>
                                        <td key="id">{type.id}</td>
                                        <td key="name">{type.name}</td>
                                        <td key="single_price">{type.single_price}</td>
                                        <td key="two_price">{type.two_price}</td>
                                        <td key="min_capacity">{type.min_capacity}</td>
                                        <td key="max_capacity">{type.max_capacity}</td>
                                        <ActionTable
                                            key="action"
                                            id={type.id}
                                            updateUrl={"/admin/rooms/types/update/" + type.id}
                                            deleteUrl={"/api/admin/room_types/delete/" + type.id}
                                        />
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Link to="/admin/rooms/types/create" className="btn btn-outline-secondary">Добавить Тип Номера</Link>
            </div>
        )
    }
}

export default RoomTypes;
