import React from 'react';
import axios from "axios";

export default class UpdateRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                id:'',
                floor: '',
                status: '',
                type_id: '',
                last_washing_date: '',
                number_of_beds: ''
            },
            types: []
        };
        this.fillFormUpdate = this.fillFormUpdate.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.fillTypesRoom = this.fillTypesRoom.bind(this);
        this.submitType = this.submitType.bind(this);
        this.showFormAddType = this.showFormAddType.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getTypes = this.getTypes.bind(this);
    }

    fillFormUpdate() {
        let url = '/public/api/admin/rooms/update/'+ this.props.match.params.id;
        axios.get(url)
            .then(response => {
                console.log('form',response.data)
                this.setState({
                    room: response.data
                }, () => {
                    this.getTypes();
                });
            })
            .catch(function (error) {
                //console.log(error);
            });
    };

    getTypes() {
        axios.get("/public/api/admin/room_types")
            .then(response => {
                //console.log(response.data);
                console.log('type',response.data)
                this.setState({
                    types: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    updateRoom(e) {
        e.preventDefault();
        let form = document.forms.updateRoom;
        let formData = this.state.room;

        let url = "/public/api/admin/rooms/update/" + this.props.match.params.id;
        //console.log(form);
        axios.post(url, formData)
            .then(function (response) {
                alert('Данные обновлены');
            })
            .catch(function (error) {
                console.log(error);
                alert('Такой номер уже есть');
            });
    }
    onChangeInput(e) {
        // let newRoom = this.state.room;
        // newRoom[e.target.name] = e.target.value;
        // this.setState({
        //     room: newRoom
        // });
        this.setState({
            room : {
                ...this.state.room,
                [e.target.name]: e.target.value
            }
        }, function(){
            //console.log(this.state.room);
        });



    }

    changeCheckbox(e) {
        let newRoom = this.state.room;
        if (e.target.checked) {
            newRoom.need_wash = "1";
            this.setState({
                room: newRoom
            });
        } else {
            newRoom.need_wash = "0";
            this.setState({
                room: newRoom
            });
        }
    };

    fillTypesRoom() {
        if(this.state.types.length === 0) {
            return "Типов пока нет";
        }
        let options = [];
        for(let i=0; i < this.state.types.length; i++) {
            if(this.state.types[i].id === this.state.room.type_id) {
                options.unshift(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            } else {
                options.push(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            }
        }
        console.log('options',options);
        return options;
    }

    submitType(e) {
        e.preventDefault();
        let url = "/public/api/admin/room_types/create";
        let name = document.getElementById('nameType').value;
        console.log(document.getElementById('nameType'));
        axios.post(url, {name:name})
            .then(response => {
                console.log(response);
                alert('Комната добавлена');
            })
            .catch(function (error) {
                console.log(error);
                alert('Такой номер уже есть');
            });
    }

    showFormAddType() {
        document.getElementById('inp-nameType').classList.remove('hide');
    }

    componentDidMount() {
        this.fillFormUpdate();
    }

    render() {
        return (
            <section id="update-rooms">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={this.updateRoom} method="post" name="updateRoom" className="col-7">
                            UPDATE
                            <div className="item-form-admin">
                                <label htmlFor="id">Номер</label>
                                <input
                                    name="id"
                                    type="number"
                                    id="id"
                                    value={this.state.room.id}
                                    className="form-control"
                                    max="36"
                                    onChange={this.onChangeInput}
                                />
                            </div>

                            <div className="item-form-admin">
                                <label htmlFor="floor">Этаж</label>
                                <input
                                    value={this.state.room.floor}
                                    onChange={this.onChangeInput}
                                    name="floor"
                                    type="number"
                                    id="floor"
                                    className="form-control"
                                    min="1"
                                    max="3"
                                />
                            </div>

                            <div className="item-form-admin">
                                <label htmlFor="floor">Статус</label>
                                <input
                                    name="status"
                                    type="text"
                                    id="status"
                                    value={this.state.room.status}
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                />
                            </div>

                            <div className="custom-control custom-checkbox item-form-admin">
                                <input
                                    onClick={this.changeCheckbox}
                                    type="checkbox"
                                    name="need_wash"
                                    value={this.state.room.need_wash}
                                    defaultChecked={this.state.room.need_wash}
                                    className="custom-control-input"
                                    id="clear"
                                />
                                <label className="custom-control-label" htmlFor="clear">Чистка</label>
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="beds">Количество кроватей</label>
                                <input
                                    name="number_of_beds"
                                    type="number"
                                    value={this.state.room.number_of_beds}
                                    id="beds"
                                    className="form-control"
                                    max="5"
                                    onChange={this.onChangeInput}
                                />
                            </div>

                            <div className="item-form-admin form-group">
                                <label htmlFor="date-clear">Последняя дата чистки номера</label>
                                <input
                                    name="last_washing_date"
                                    value={this.state.room.last_washing_date}
                                    type="date"
                                    id="last_washing_date"
                                    className="form-control" required
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div onChange={this.onChangeInput} className="item-form-admin form-group">
                                <select name="type_id" id="types-room">
                                    {this.fillTypesRoom()}
                                </select>
                            </div>

                            <div className="item-form-admin form-group">
                                <div id="inp-nameType" className="add-types hide d-flex justify-content-around border border-dark d-flex align-items-center">
                                    <input
                                        name="name"
                                        type="text"
                                        form="add-type"
                                        id="nameType"
                                        className="form-control"
                                    />
                                    <button form="add-type" className="btn btn-success" type="submit">Добавить тип</button>
                                </div>
                                <button onClick={this.showFormAddType} type="button" className="add-types btn btn-secondary">
                                    Добавить тип номера
                                </button>
                            </div>
                            <button className="btn btn-primary" type="submit">Сохранить</button>
                        </form>
                        <form onSubmit={this.submitType} id="add-type" className=""></form>
                    </div>
                </div>
            </section>
        );
    }
}
