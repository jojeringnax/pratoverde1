import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Select from 'react-select';
import MaskedInput from 'react-maskedinput'
let options = [];

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {
                name: '',
                link: ''
            },
            getOptions: [],
            selectedOption: '',
            customer: {
                name: '',
                email: '',
                surname: '',
                phone_number: '',
                source_id: ''
            }
        }
    }

    getSources = () => {

    };

    submitCustomer = (e) => {
        e.preventDefault();
        let url;
        let data = this.state.customer;
        // let phone;
        // phone = parseInt(this.state.customer.phone_number);
        // data.phone_number = phone;
        if(this.props.match.params.id) {
            url = "/public/api/admin/customers/update/" + this.props.match.params.id;
        } else {
            url = "/public/api/admin/customers/create";
        }

        console.log(this.state.customer.phone_number);

        axios.post(url, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    inputOnchange = (e) => {
        let value;
        let reg = /\d/g;
        let phone_number;
        if(e.target.name === "phone_number" && e.target.value !== "") {
            phone_number = e.target.value;
            value = phone_number.match(reg).join('');
        } else {
            value = e.target.value
        }
        this.setState({
            customer: {
                ...this.state.customer,
                [e.target.name]: value
            }
        });

    };


    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () => {
            console.log(`Option selected:`, selectedOption);
            // this.setState({
            //     problem : {
            //         ...this.state.problem,
            //         parent_id: selectedOption.value
            //     }
            // }, () => {
            //     console.log(selectedOption.value, this.state.problem)
            // })
        });

    };

    submitSource = (e) => {
        e.preventDefault();
        let data = this.state.source;
        axios.post("/public/api/admin/customer_sources/create",data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    };

    sourceChange = (e) => {
        this.setState({
            source: {
                ...this.state.source,
                [e.target.name]: e.target.value
            }
        });
    };

    componentDidMount() {

    }

    render() {
        const { selectedOption } = this.state.selectedOption;
        return (
            <div className="container">
                <div className="row d-flex justify-content-center flex-column align-items-center">
                    <h1 className="text-center">ДОБАВЛЕНИЕ КЛИЕНТА</h1>
                    <Link to="/public/admin" className="btn peach-gradient" value="">Назад</Link>
                    <form id="customer-form" onSubmit={this.submitCustomer} className="border form-group col-xl-8 form-admin z-depth-5">
                        <div className="item-form-admin form-group">
                            <label htmlFor="title">Имя</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Введите имя"
                                className="form-control"
                                value={this.state.customer.name || ''}
                                onChange={this.inputOnchange}
                            />
                        </div>
                        <div className="item-form-admin form-group">
                            <label htmlFor="title">Фамилия</label>
                            <input
                                type="surname"
                                id="surname"
                                name="surname"
                                placeholder="Введите фамилию"
                                className="form-control"
                                value={this.state.customer.surname || ''}
                                onChange={this.inputOnchange}
                            />
                        </div>
                        <div className="item-form-admin form-group">
                            <label htmlFor="title">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Введите e-mail"
                                className="form-control"
                                value={this.state.customer.email || ''}
                                onChange={this.inputOnchange}
                            />
                        </div>
                        <div className="item-form-admin form-group">
                            <label htmlFor="title">Телефонный номер</label>
                            <MaskedInput
                                id="phone_number"
                                mask="+1(111)-111-1111"
                                name="phone_number"
                                className="form-control"
                                value={this.state.customer.phone_number || ''}
                                onChange={this.inputOnchange}
                            />
                        </div>
                        <div className="item-form-admin form-group">
                            <label htmlFor="title">Откуда пришел клиент</label>
                            <Select
                                placeholder="Выберите источник"
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.state.getOptions}
                            />
                        </div>
                        <div className="border-dark rounded z-depth-1-half additional-form-admin">
                            <h2>Создать источник</h2>
                            <div className="item-form-admin form-group">
                                <label htmlFor="">Наименование источника</label>
                                <input
                                    type="text"
                                    id="sourceChange"
                                    name="name"
                                    className="form-control"
                                    placeholder="Введите наименование источника"
                                    onChange={this.sourceChange}
                                    value={this.state.source.name}
                                />
                            </div>
                            <div className="item-form-admin form-group">
                                <label htmlFor="">Ссылка на источник</label>
                                <input
                                    type="text"
                                    id="sourceChange"
                                    name="link"
                                    className="form-control"
                                    placeholder="Введите ссылку на источник"
                                    onChange={this.sourceChange}
                                    value={this.state.source.link}
                                />
                            </div>
                            <button className="btn btn-outline-success" form="source-form" type="submit">Создать источник</button>
                        </div>

                        <button form="customer-form" className="btn btn-outline-primary" type="submit">Создать клиента</button>
                    </form>
                    <form onSubmit={this.submitSource} id="source-form" ></form>
                </div>
            </div>
        )
    }
}

export default CustomerForm;