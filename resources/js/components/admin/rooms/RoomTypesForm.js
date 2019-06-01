import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import axios from "axios";

class RoomTypesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: {
                name: '',
                single_price: 0,
                two_price: 0,
                min_capacity: 0,
                max_capacity: 0,
            },
            price: {
                single_price_euro: '',
                single_price_cent: '',
                two_price_euro: '',
                two_price_cent: ''
            }
        };
    }


    onChangeType = (e) => {
        if(e.target.name === 'min_capacity' || e.target.name === 'max_capacity') {
            this.setState({
                type: {
                    ...this.state.type,
                    [e.target.name]: parseInt(e.target.value)
                }
            });
        } else {
            this.setState({
                type: {
                    ...this.state.type,
                    [e.target.name]: e.target.value
                }
            });
        }

    };

    onChangePrice = (e) => {
        this.setState({
            price: {
                ...this.state.price,
                [e.target.name]: parseInt(e.target.value)
            }
        }, () => {
            //console.log(this.state.price);
            let single_price_euro = this.state.price.single_price_euro;
            let single_price_cent = this.state.price.single_price_cent;

            let two_price_euro = this.state.price.two_price_euro;
            let two_price_cent = this.state.price.two_price_cent;

            this.setState({
                type: {
                    ...this.state.type,
                    single_price:  single_price_euro*100 + single_price_cent,
                    two_price:  two_price_euro*100 + two_price_cent
                }

            }, () => {
                //console.log(this.state.type)
            });
        });



    };

    submitType = (e) => {
        e.preventDefault();

        console.log(this.state.type);

        let url;
        if(this.props.match.params.status === "update") {
            url = "/api/admin/room_types/update/" + this.props.match.params.id;
        } else {
            url = "/api/admin/room_types/create";
        }
        axios.post(url, this.state.type)
            .then(response => {
                alert('Тип номера добавлен');
                document.location.href = "/admin/rooms/types";
            })
            .catch(function (error) {
                alert('Такой номер уже есть');
            });
    };



    getType = () =>{
        let url;
        if(this.props.match.params) {
            url = '/api/room_type/' + this.props.match.params.id;
            axios.get(url)
                .then(res => {
                    this.setState({
                        type: res.data
                    },() => {
                        console.log(this.state.single_price)
                        this.setState({
                            price: {
                                ...this.state.price,
                                single_price_euro: parseInt(this.state.type.single_price) / 100,
                                single_price_cent: parseInt(this.state.type.single_price) % 100,
                                two_price_euro: parseInt(this.state.type.two_price) / 100,
                                two_price_cent: parseInt(this.state.type.two_price) % 100
                            }
                        }, () => {
                            console.log(this.state)
                        })
                    });
                })
                .catch(err => {});
        }
    };

    componentDidMount() {
        this.getType();
    }

    render() {
        return (
            <div className="container-admin d-flex justify-content-center flex-column align-items-center">
                <h1 className="text-center">{this.props.match.params.id ? "Обновить тип номера" : "Добавить тип номера"}</h1>
                <Link to="/admin/rooms/types" className="btn peach-gradient" value="">Назад</Link>
                <form onSubmit={this.submitType} className="border form-group item-form-admin col-xl-8 form-admin z-depth-5 d-flex flex-wrap align-items-start">
                    <div className="d-flex flex-wrap justify-content-center">
                        <div id="inp-nameType" className="col-12">
                            <input
                                name="name"
                                type="text"
                                id="nameType"
                                className="form-control"
                                value={this.state.type.name}
                                onChange={this.onChangeType}
                                placeholder="Наименование типа номера"
                            />
                        </div>
                        <div id="" className="item-form-admin col-xl-6 col-lg-6 col-12 d-flex flex-wrap justify-content-between">
                            <label htmlFor="" className="col-12">Цена для одного человека</label>
                            <input
                                name="single_price_euro"
                                type="number"
                                id="single_price_euro"
                                className="form-control col-xl-5"
                                value={this.state.price.single_price_euro}
                                onChange={this.onChangePrice}
                                placeholder="euro"
                            />
                            <input
                                name="single_price_cent"
                                type="number"
                                id="single_price_cent"
                                className="form-control col-xl-5"
                                value={this.state.price.single_price_cent}
                                onChange={this.onChangePrice}
                                placeholder="cent"
                            />
                        </div>
                        <div id="" className="item-form-admin col-xl-6 col-lg-6 col-12 d-flex flex-wrap justify-content-between">
                            <label htmlFor="" className="col-12">Цена для двух человек</label>
                            <input
                                name="two_price_euro"
                                type="number"
                                id="two_price_euro"
                                className="form-control col-5"
                                value={this.state.price.two_price_euro}
                                onChange={this.onChangePrice}
                                placeholder="euro"
                            />
                            <input
                                name="two_price_cent"
                                type="number"
                                id="two_price_cent"
                                className="form-control col-5"
                                value={this.state.price.two_price_cent}
                                onChange={this.onChangePrice}
                                placeholder="cent"
                            />
                        </div>
                        <div id="" className="item-form-admin col-xl-6 col-lg-6 col-12">
                            <label htmlFor="" className="col-12">Минимальная вместимость</label>
                            <input
                                name="min_capacity"
                                type="number"
                                id="min_capacity"
                                className="form-control"
                                value={this.state.type.min_capacity}
                                onChange={this.onChangeType}
                                placeholder="Минимальная вместимость"
                            />
                        </div>
                        <div id="" className="item-form-admin col-xl-6 col-lg-6 col-12">
                            <label htmlFor="" className="col-12">Максимальная вместимость</label>
                            <input
                                name="max_capacity"
                                type="number"
                                id="max_capacity"
                                className="form-control"
                                value={this.state.type.max_capacity}
                                onChange={this.onChangeType}
                                placeholder="Максимальная вместимость"
                            />
                        </div>

                        <button className="btn btn-success" type="submit">{this.props.match.params.id ? "Обновить тип номера" : "Добавить тип номера"}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RoomTypesForm;
