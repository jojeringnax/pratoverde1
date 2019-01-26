import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import axios from "axios";

class RoomTypesCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ''
        };
        this.submitType = this.submitType.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    submitType(e) {
        e.preventDefault();
        let url = "/public/api/admin/room_types/create";
        axios.post(url, {name:this.state.type})
            .then(response => {
                console.log(response);
                alert('Тип номера добавлен');
                document.location.href = "/public/admin/rooms/types";
            })
            .catch(function (error) {
                console.log(error);
                alert('Такой номер уже есть');
            });
    }


    render() {
        return (
            <div id="admin-roomTypesCreate" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-center flex-column align-items-center">
                        <h1 className="text-center">СОЗДАНИЕ ТИПА НОМЕРА</h1>
                        <Link to="/public/admin/rooms/types" className="btn peach-gradient" value="">Назад</Link>
                        <form onSubmit={this.submitType} className="border form-group col-xl-8 form-admin z-depth-5">
                            <label htmlFor="created_at">Тип номера</label>
                            <div id="inp-nameType" className="add-types d-flex justify-content-around border border-dark d-flex align-items-center">
                                <input
                                    name="name"
                                    type="text"
                                    form="add-type"
                                    id="nameType"
                                    className="form-control"
                                    value={this.state.type}
                                    onChange={this.onChangeType}
                                />
                            </div>
                            <button className="btn btn-success" type="submit">Добавить тип номера</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomTypesCreate;