import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ActionTable from '../ActionTable';

export default class RoomsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
    }

    componentDidMount() {
        axios.get('/api/admin/rooms')
            .then(response => {
                this.setState({
                    rooms: response.data
                });
            })
            .catch(function (error) {
            });
    }

    render() {
        return (
            <div className="container-admin">
                <Link to="/admin" className="btn peach-gradient">Назад</Link>
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
                        <th scope="col">Photo</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rooms.map((room, index) => {
                            return(
                                <tr id={room.id} key={index + "_room"}>
                                    <td key="id">{room.id}</td>
                                    <td key="floor">{room.floor}</td>
                                    <td key="status">{room.status}</td>
                                    <td key="type_id">{room.type_id}</td>
                                    <td key="last_washing_date">{room.last_washing_date}</td>
                                    <td key="need_wash">{room.need_wash}</td>
                                    <td key="number_of_beds">{room.number_of_beds}</td>
                                    <td key="photo">{room.photo}</td>
                                    <ActionTable
                                        key="action"
                                        id={room.id}
                                        updateUrl={'/admin/rooms/update/' + room.id}
                                        deleteUrl={'/api/admin/rooms/delete/' + room.id}
                                    />
                                </tr>
                            )
                        })

                    }
                    </tbody>
                </table>
                <Link className="btn btn-outline-secondary" to="/admin/rooms/types">ТИПЫ КОМНАТ</Link>
                <Link className="btn btn-outline-secondary" to="/admin/rooms/create">СОЗДАТЬ НОМЕР</Link>
            </div>
        );
    }
}
