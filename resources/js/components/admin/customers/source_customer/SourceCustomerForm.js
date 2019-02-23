import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

class SourceCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {
                name: '',
                link: ''
            }
        }
    }

    textSource = (params) => {
        if(this.props.match.params.hasOwnProperty('id')) {
            if(params === "title") {
                return "Обновление источника";
            } else {
                return "Обновить источник";
            }

        }else {
            if(params === "button") {
                return "Создание источника";
            } else {
                return "Создать источник";
            }
        }
    };

    fillSourceCustomers = (id) => {
        let url = "/public/api/customer_source/" + id;
        console.log(url);
        axios.get(url)
            .then(res => {
                console.log(res.data);
                this.setState({
                    source: res.data
                });

            })
            .catch(err => {

            });

    };

    sourceChange = (e) => {
        this.setState({
            ...this.state.source,
            [e.target.name]: e.target.value
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

    componentDidMount() {
        if(this.props.match.params.hasOwnProperty('id')) {
            this.fillSourceCustomers(this.props.match.params.id);
        }
    }

    render() {
        return (
            <div className="container-admin d-flex justify-content-center flex-column align-items-center">
                <h2 className="text-center">{this.textSource('title')}</h2>
                <form action="" onSubmit={this.submitSource} className="border form-group col-xl-8 form-admin z-depth-5">
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
                    <button className="btn btn-outline-success" form="source-form" type="submit">{this.textSource('button')}</button>
                </form>
            </div>
        )
    }
}

export default SourceCustomerForm;