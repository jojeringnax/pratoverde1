import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ProblemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {
                room_id: '',
                title: '',
                content: '',
                status : '',
                parent_id: '',
                category_id: ''
            }
        };
        this.inputOnChange = this.inputOnChange.bind(this);
        this.createProblem = this.createProblem.bind(this);
        this.fillFormUpdateProblem = this.fillFormUpdateProblem.bind(this);
    }

    inputOnChange(e) {
        this.setState({
            problem : {
                ...this.state.problem,
                [e.target.name] : e.target.value
            }
        }, () => {
            //console.log(this.state.problem)
        })
    }

    createProblem(e) {
        e.preventDefault();
        let formData = this.state.problem;
        let url;
        if(this.props.match.params.id){
            url = '/public/api/admin/problems/update' + this.props.match.params.id;
        } else {
            url = '/public/api/admin/problems/create';
        }
        axios.post(url, formData)
            .then(function (response) {
                //console.log(response);
                alert('Проблема создана добавлен');
                document.location.href = '/public/admin/problems';
            })
            .catch(error => {
                //console.log(error.response.data.code);
                alert(codes[error.response.data.code])

            });

    }
    fillFormUpdateProblem() {
        let url;
        //console.log(this.props.match);
        if(this.props.match.params.id){
            url = '/public/api/problem/' + this.props.match.params.id;
            //console.log(url)
            axios.get(url)
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        problem: response.data
                    }, () => {
                        //console.log(response);
                    });
                })
                .catch(error => {
                    //console.log(error);
                    //alert(codes[error.response.data.code])
                });
        }

    }

    componentDidMount() {
        //console.log(this.props.match.params.status)
        this.fillFormUpdateProblem();
    }

    render() {
        return (
            <div id="problems-page" className="section container-content-admin">
                <div className="container">
                    <div className="row d-flex justify-content-start flex-column align-items-center">
                        <div className="title-form"><h1>Опишите проблему</h1></div>
                        <Link to="/public/admin/problems" className="btn peach-gradient">Назад</Link>
                        <form onSubmit={this.createProblem}  className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                            <div className="item-form-admin form-group">
                                <label htmlFor="room_id">room_id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="room_id"
                                    name="room_id"
                                    onChange={this.inputOnChange}
                                    value={this.state.problem.room_id || ''}
                                />
                            </div>
                            <div className="item-form-admin form-group">
                                <label htmlFor="title">title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    onChange={this.inputOnChange}
                                    value={this.state.problem.title || ''}
                                />
                            </div>
                            <div className="item-form-admin form-group">
                                <label htmlFor="content">content</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    name="content"
                                        onChange={this.inputOnChange}
                                    value={this.state.problem.content || ''}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <div id="status" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="status">status</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="status"
                                        name="status"
                                        min="0"
                                        max="1"
                                        onChange={this.inputOnChange}
                                        value={this.state.problem.status || ''}
                                    />
                                </div>
                                <div id="parent_id" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="parent_id">parent_id</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="parent_id"
                                        name="parent_id"
                                        onChange={this.inputOnChange}
                                        value={this.state.problem.parent_id || ''}
                                    />
                                </div>
                            </div>

                            <div className="item-form-admin form-group">
                                <label htmlFor="category_id">category_id</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="category_id"
                                    name="category_id"
                                    onChange={this.inputOnChange}
                                    value={this.state.problem.category_id || ''}
                                />
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Создать проблему</button>
                        </form>
                        <button type="button" className="btn btn-outline-secondary">Создать подпроблему</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemForm