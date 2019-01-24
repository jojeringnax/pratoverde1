import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import axios from 'axios';
class RoomTypesUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:''
        };
        this.getType = this.getType.bind(this);
        this.updateType = this.updateType.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }

    getType(){
        let url = '/public/api/admin/room_type/' + this.props.match.params.id;
        axios.get(url)
            .then(res => {
                //console.log(res);
                this.setState({
                   type: res.data.name
                });
            })
            .catch(err => {

            })
    }

    updateType(e) {
        e.preventDefault();
        console.log('ff')
        let url = '/public/api/admin/room_types/update/' + this.props.match.params.id;
        axios.post(url,{name: this.state.type})
            .then(response => {
                //console.log(response)
            })
            .catch(error => {

            })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        }, () => {
            console.log(this.state.type)
        })
    }

    componentDidMount() {
        this.getType();
    }

    render() {
        return (
            <div id="admin-roomTypesUpdate" className="section">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={this.updateType} className="border form-group col-xl-8 form-admin z-depth-5">
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
                            <button className="btn btn-success" type="submit">Обновить тип номера</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomTypesUpdate;