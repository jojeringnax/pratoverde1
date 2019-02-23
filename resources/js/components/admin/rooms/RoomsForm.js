import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { MdAddBox, MdClose } from "react-icons/md";
import PopUp from '../popUp/PopUp';
import SubRoomTypesForm from './SubRoomTypesForm';
import ClosePopUpBtn from '../popUp/ClosePopUpBtn';

class RoomsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFormCreateTypes: false,
            room : {
                id: '',
                floor: '',
                status: '',
                need_wash: '',
                number_of_beds: '',
                last_washing_date: '',
                type_id: ''
            },
            types: [],
            countTypes: 0
        };
    }

    textButtonRoomForm = () => {
        if(this.props.match.params.id) {
            return "Обновить номер";
        }else {
            return "Создать номер";
        }
    };

    addTitleText = () => {
        if(this.props.match.params.id) {
            return "ОБНОВЛЕНИЕ НОМЕРА";
        } else {
            return "СОЗДАНИЕ НОМЕРА";
        }
    };

    showTypes = () => {
        if(this.state.types.length === 0) {
            return "Типов пока нет";
        }
        let options = [];
        for(let i=0; i < this.state.types.length; i++) {
            if(this.state.types[i].id === this.state.room.type_id) {
                //console.log('hui', this.state.types[i].id, this.state.room.type_id);
                options.unshift(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            } else {
                options.push(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            }
        }
        if(this.props.match.params.id) {
            options.unshift(<option key="choose" value="null">Выберите тип</option>);
        }
        return options;

    };

    getTypes = () => {
        axios.get("/public/api/admin/room_types")
            .then(response => {
                if(response.data.length !== 0) {
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
            });

    };

    inputOnChange = (e) =>{
        if (e.target.type === 'checkbox') {
            this.setState({
                room: {
                    ...this.state.room,
                    [e.target.name]: e.target.checked
                }
            });
        } else {
            this.setState({
                room: {
                    ...this.state.room,
                    [e.target.name]: e.target.value
                }
            });
        }
    };

    submitRoom = (e) => {
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
        .then(response => {
            alert(textResponse);
            document.location.href = '/public/admin/rooms'
        })
        .catch(err => {});
    };

    fillFormUpdate = () => {
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
                .catch(err =>{});
        }
    };

    chaneStateFormCreateType = () => {
        this.setState({
            showFormCreateTypes: false
        }, () => {
            this.getTypes();
        });
    };

    chaneStateFormCreateTypeTrue = () => {
        this.setState({
            showFormCreateTypes: true
        });
    };

    closeModFormBtn = () => {
        ClosePopUpBtn(this.chaneStateFormCreateType());
    };

    componentDidMount() {
        this.getTypes();
        this.fillFormUpdate();
    }

    render() {
        return (
            <div id="create-rooms" className="section container-admin">
                <PopUp
                    contentPopUp={
                        <SubRoomTypesForm
                            updateState={this.getTypes}
                            closeModWin={this.closeModFormBtn}
                        /> }
                    showw={this.state.showFormCreateTypes}
                    close={this.chaneStateFormCreateType}

                />
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
                            <div className="item-form-admin form-group form d-flex flex-column">
                                <label htmlFor="types-room">Типы номеров</label>
                                <div className="d-flex align-items-start">
                                    <select onChange={this.inputOnChange} value={this.state.room.type_id || 'Типов номеров нет'} name="type_id" id="types-room" className="form-control">
                                        {this.showTypes()}
                                    </select>
                                    <a onClick={this.chaneStateFormCreateTypeTrue} className="link-add-types-room">
                                        <MdAddBox />
                                    </a>
                                </div>
                            </div>
                            <button onClick={this.submitRoom} className="btn btn-outline-primary" type="submit">{this.textButtonRoomForm()}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomsForm;