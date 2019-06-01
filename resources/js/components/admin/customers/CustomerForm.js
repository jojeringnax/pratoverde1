import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Select from 'react-select';
import MaskedInput from 'react-maskedinput'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {
                name: '',
                link: ''
            },
            getOptions: [],
            selectedOption: {
                value: '',
                label: ''
            },
            customer: {
                name: '',
                email: '',
                surname: '',
                phone_number: '',
                source_id: ''
            },

            sourceVisible: false

        }
    }

    getSources = () => {
        axios.get("/api/admin/customer_sources")
            .then(res => {
                let options = [];
                res.data.forEach((source) => {
                    if(source.id === this.state.customer.source_id) {
                        options.unshift({'value': source.id, label: source.name});
                        this.setState({
                            selectedOption: {
                                value: source.id,
                                label: source.name
                            }
                        })
                    }else {
                        options.push({'value': source.id, label: source.name});
                    }

                });
                this.setState({
                    getOptions: options
                });
            })
    };

    submitCustomer = (e) => {
        e.preventDefault();
        let url;
        let data = this.state.customer;
        if(this.props.match.params.id) {
            url = "/api/admin/customers/update/" + this.props.match.params.id;
            document.location.href = "public/admin/customers";
        } else {
            url = "/api/admin/customers/create";
        }

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

    textTypeForm = () => {
        if(this.props.match.params.id) {
            return "Обновить данные клиента"
        }else {
            return "Добавить клиента"
        }
    };

    fillFormUpdate = () => {
        let url = "/api/customer/" + this.props. match.params.id;
        axios.get(url)
            .then(res => {
                this.setState({
                    customer: res.data
                }, () => {
                    this.getSources();
                });

            })
    };

    handleChange = (e) => {
        this.setState({
            customer : {
                ...this.state.customer,
                source_id: e.value
            },
            selectedOption: {
                value: e.value,
                label: e.label
            }
        });
    };

    submitSource = (e) => {
        e.preventDefault();
        let data = this.state.source;
        axios.post("/api/admin/customer_sources/create",data)
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

    visibleSource = (e) => {
        e.preventDefault();
        if(this.state.sourceVisible === true) {
            this.setState({sourceVisible: false});
            document.getElementById('sourceFormCreate').classList.add('hide');
        } else {
            this.setState({sourceVisible: true});
            document.getElementById('sourceFormCreate').classList.remove('hide');
        }
    };

    componentDidMount() {
        if(this.props.match.params.id) {
            this.fillFormUpdate();
        }else {
            this.getSources();
        }
    };

    render() {
        return (
            <div className="container-admin">
                <div className="container">
                    <div className="row d-flex justify-content-center flex-column align-items-center">
                        <h1 className="text-center">{this.textTypeForm()}</h1>
                        <Link to="/admin/customers" className="btn peach-gradient" value="">Назад</Link>
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
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.getOptions}
                                />
                            </div>
                            <button onClick={this.visibleSource} className="btn btn-outline-warning waves-effect">Создать источник</button>
                            <div id="sourceFormCreate" className="hide border-dark rounded z-depth-1-half additional-form-admin">
                                <h2>Создать источник</h2>
                                <div className="item-form-admin form-group">
                                    <label htmlFor="">Наименование источника</label>
                                    <input
                                        type="text"
                                        id="sourceChange"
                                        name="name_source"
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

                            <button form="customer-form" className="btn btn-outline-primary" type="submit">{this.textTypeForm()}</button>
                        </form>
                        <form onSubmit={this.submitSource} id="source-form" ></form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerForm;
