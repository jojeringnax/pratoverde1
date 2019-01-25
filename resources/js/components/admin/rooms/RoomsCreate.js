import React, { Component } from 'react';
import axios from 'axios';
class RoomsCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room : {
                id: '',
                floor: '',
                status: '',
                need_wash: '',
                beds: '',
                last_washing_date: '',
                type_id: ''
            },
            types: []
        };
        this.createRoom = this.createRoom.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.showTypes = this.showTypes.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.back = this.back.bind(this);
    }

    showTypes() {
        if(this.state.types.length === 0) {
            return "Типов пока нет";
        }
        let options = [];
        for(let i=0; i < this.state.types.length; i++) {
            options.push(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
        }
        return <div className="item-form-admin form-group">
            <select
                name="type_id"
                id="types-room"
                className="form-control"
                onChange={this.inputOnChange}
            >
                {options}
            </select>
        </div>;
    }

    getTypes() {
        axios.get("/public/api/admin/room_types")
            .then(response => {
                this.setState({
                    types: response.data
                });
            })
            .catch(function(error) {
                //console.log(error);
            });

    }

    inputOnChange(e){
        if (e.target.type === 'checkbox') {
            this.setState({
                room: {
                    ...this.state.room,
                    [e.target.name]: e.target.checked
                }
            }, function(){
                //console.log('checkbox',this.state.room);
            })
        } else {
            this.setState({
                room: {
                    ...this.state.room,
                    [e.target.name]: e.target.value
                }
            }, function(){
                //console.log(this.state.room);
            });
        }
    }

    createRoom(e) {
        e.preventDefault();
        let formData = this.state.room;

        axios.post('/public/api/admin/rooms/create', formData)
        .then(function (response) {
            //console.log(response);
            alert('Номер добавлен');
        })
        .catch(error => {

        });
    }

    componentDidMount() {
        this.getTypes();
    }

    back() {
        history.back();
    }

    render() {
        return (
            <div id="create-rooms" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-start flex-column align-items-center">
                        <h1 className="text-center">СОЗДАНИЕ НОМЕРА</h1>
                        <input type="button" className="btn peach-gradient" onClick={this.back} value="Назад"/>
                        <form name="room" className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                            <div className="item-form-admin">
                                <label htmlFor="id">Номер</label>
                                <input
                                    name="id"
                                    type="number"
                                    id="id"
                                    className="form-control"
                                    max="36"
                                    value={this.state.room.id}
                                    onChange={this.inputOnChange}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="floor">Этаж</label>
                                <input
                                    name="floor"
                                    type="number"
                                    id="floor"
                                    className="form-control"
                                    min="1"
                                    max="3"
                                    value={this.state.room.floor}
                                    onChange={this.inputOnChange}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="status">Статус</label>
                                <input
                                    name="status"
                                    type="text"
                                    id="status"
                                    className="form-control"
                                    value={this.state.room.status}
                                    onChange={this.inputOnChange}
                                />
                            </div>
                            <div className="custom-control custom-checkbox item-form-admin">
                                <input
                                    type="checkbox"
                                    name="need_wash"
                                    className="custom-control-input"
                                    id="clear"
                                    checked={this.state.room.need_wash}
                                    onChange={this.inputOnChange} />
                                <label className="custom-control-label" htmlFor="clear">Чистка</label>
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="beds">Количество кроватей</label>
                                <input
                                    name="beds"
                                    type="number"
                                    id="beds"
                                    className="form-control"
                                    max="5"
                                    value={this.state.room.beds}
                                    onChange={this.inputOnChange}
                                />
                            </div>
                            <div className="item-form-admin form-group">
                            <label htmlFor="date-clear">Последняя дата чистки номера</label>
                            <input
                                name="last_washing_date"
                                type="date"
                                id="last_washing_date"
                                className="form-control"
                                value={this.state.room.last_washing_date}
                                onChange={this.inputOnChange}
                                required
                            />
                        </div>
                        <div className="item-form-admin form-group form">
                            {this.showTypes()}
                        </div>

                            <button onClick={this.createRoom} className="btn btn-primary" type="submit">Сохранить</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomsCreate;