import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ProblemUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {
                created_at: '',
                updated_at: '',
                room_id: '',
                title: '',
                content: '',
                status: '',
                parent_id: '',
                category_id: ''
            }
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.updateProblem = this.updateProblem.bind(this);
        this.fillFormUpdateProblem = this.fillFormUpdateProblem.bind(this);
    }

    fillFormUpdateProblem() {
        let url = '/public/api/problem/'+ this.props.match.params.id;
        axios.get(url)
            .then(response => {
                //console.log(response.data)
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

    onChangeInput(e) {
        this.setState({
            problem: {
                ...this.state.problem,
                [e.target.name]: e.target.value
            }
        }, () =>{
            console.log(this.state.problem)
        });
    }

    updateProblem(e) {
        e.preventDefault();
        let formData = this.state.problem;

        axios.post('/public/api/admin/problems/update/' + this.props.match.params.id, formData)
            .then(function (response) {
                //console.log(response);
                //alert('Проблема создана добавлен');
                document.location.href = '/public/admin/problems';
            })
            .catch(error => {
                alert(codes[error.response.data.code]);

            });
    }

    componentDidMount() {
        this.fillFormUpdateProblem();
    }

    render() {
        return (
            <div id="problems-update-page" className="section">
                <div className="container container-content-admin">
                    <div className="row d-flex justify-content-center">
                        <h1 className="text-center">ОБНОВЛЕНИЕ ПРОБЛЕМЫ</h1>
                        <Link to="/public/admin/problems" className="btn peach-gradient">Назад</Link>
                        <form onSubmit={this.updateProblem} className="border form-group col-xl-8 form-admin z-depth-5">

                            <div className="item-form-admin">
                                <label htmlFor="created_at">Дата создания проблемы</label>
                                <input
                                    name="created_at"
                                    type="text"
                                    id="created_at"
                                    value={this.state.problem.created_at}
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    disabled={true}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="updated_at">Дата обновления проблемы</label>
                                <input
                                    name="updated_at"
                                    type="text"
                                    id="updated_at"
                                    value={this.state.problem.updated_at}
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    disabled={true}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="room_id">room_id</label>
                                <input
                                    name="room_id"
                                    type="number"
                                    id="room_id"
                                    value={this.state.problem.room_id || ''}
                                    className="form-control"
                                    max="36"
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="title">Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    id="title"
                                    value={this.state.problem.title || ''}
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                />
                            </div>

                            <div className="item-form-admin">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    className="form-control"
                                    value={this.state.problem.content || ''}
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="status">Status</label>
                                <input
                                    name="status"
                                    type="number"
                                    id="status"
                                    value={this.state.problem.status}
                                    className="form-control"
                                    max="36"
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="parent_id">Parent_id</label>
                                <input
                                    name="parent_id"
                                    type="number"
                                    id="parent_id"
                                    value={this.state.problem.parent_id || ''}
                                    className="form-control"
                                    max="36"
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div className="item-form-admin">
                                <label htmlFor="category_id">category_id</label>
                                <input
                                    name="category_id"
                                    type="number"
                                    id="category_id"
                                    value={this.state.problem.category_id || ''}
                                    className="form-control"
                                    max="36"
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Сохранить изменения</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemUpdate