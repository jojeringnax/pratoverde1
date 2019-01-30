import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class RoomsCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room : {
                id: '',
                floor: '',
                status: '',
                need_wash: '',
                number_of_beds: '',
                last_washing_date: '',
                type_id: ''
            },
            types: []
        };
        this.submitRoom = this.submitRoom.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.showTypes = this.showTypes.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.fillFormUpdate = this.fillFormUpdate.bind(this);
        this.addTitleText = this.addTitleText.bind(this);
    }

    addTitleText() {
        if(this.props.match.params.id) {
            return "ОБНОВЛЕНИЕ НОМЕРА";
        } else {
            return "СОЗДАНИЕ НОМЕРА";
        }
    }

    showTypes() {
        if(this.state.types.length === 0) {
            return "Типов пока нет";
        }
        let options = [];
        for(let i=0; i < this.state.types.length; i++) {
            if(this.state.types[i].id === this.state.room.type_id) {
                console.log('hui', this.state.types[i].id, this.state.room.type_id);
                options.unshift(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            } else {
                options.push(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            }
        }

        return options;

    }

    getTypes() {
        axios.get("/public/api/admin/room_types")
            .then(response => {
                if(response.data.length !== 0) {
                    //console.log(response.data)
                    this.setState({
                        types: response.data
                    }, () => {
                        if(!this.props.match.params.id) {
                            this.setState({
                                room: {
                                    ...this.state.room,
                                    type_id: this.state.types[0]['id']
                                }
                            });
                        }
                    });
                } else {
                    return "Типов номеров нет"
                }
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

    submitRoom(e) {
        e.preventDefault();
        let formData = this.state.room;
        let url, textResponse;
        if(this.props.match.params.id) {
            url = '/public/api/admin/rooms/update/' + this.props.match.params.id;
            textResponse = "Номер обновлен";
        } else {
            url = '/public/api/admin/rooms/create';
            textResponse = 'Номер добавлен';
        }
        axios.post(url, formData)
        .then(function (response) {
            //console.log(response);
            alert(textResponse);
            document.location.href = '/public/admin/rooms'
        })
        .catch(error => {

        });
    }

    fillFormUpdate() {
        if(this.props.match.params.id) {
            let url = '/public/api/room/'+ this.props.match.params.id;
            axios.get(url)
                .then(response => {
                    this.setState({
                        room: response.data
                    }, () => {
                        this.getTypes();
                    });
                })
                .catch(function (error) {
                    //console.log(error);
                });
        }
    };

    componentDidMount() {
        this.getTypes();
        this.fillFormUpdate();
    }


    render() {
        return (
            <div id="create-rooms" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-start flex-column align-items-center">
                        <h1 className="text-center">{this.addTitleText()}</h1>
                        <Link to="/public/admin/rooms" className="btn peach-gradient" value="">Назад</Link>
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
                                    name="number_of_beds"
                                    type="number"
                                    id="beds"
                                    className="form-control"
                                    max="5"
                                    value={this.state.room.number_of_beds}
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
                            <select onChange={this.inputOnChange} value={this.state.room.type_id || ''} name="type_id" id="types-room" className="form-control">
                                {this.showTypes()}
                            </select>
                        </div>

                            <button onClick={this.submitRoom} className="btn btn-primary" type="submit">Сохранить</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomsCreate;