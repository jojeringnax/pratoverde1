import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class SubProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subproblem: {
                room_id: '',
                title: '',
                content: '',
                status : '',
                parent_id: '',
                category_id: ''
            }
        };
        this.inputOnChange = this.inputOnChange.bind(this);
        this.submitSubForm = this.submitSubForm.bind(this);
    }

    inputOnChange(e) {
        this.setState({
           subproblem: {
               ...this.state.subproblem,
               [e.target.name]: e.target.value
           }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('prev', prevProps, prevState, this.props.room_id);
        if (prevProps.room_id !== this.props.room_id) {
            this.setState({
                subproblem: {
                    ...this.state.subproblem,
                    parent_id: this.props.room_id
                }
            }, () => {
                //console.log('kuku', this.state.subproblem);
            });
        }
    }

    submitSubForm(e) {
        e.preventDefault();
        let url = '/public/api/admin/problems/create';
        axios.post(url, this.state.subproblem)
            .then(res => {
                console.log(res);
                document.location.href = '/public/admin/problems';
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return(
            <div className="hide form-subProblem d-flex justify-content-center">
                <form onSubmit={this.submitSubForm} className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                    <h2 className="text-center">Родительская проблема: <em><b><h2>{this.props.title}</h2></b></em></h2>
                    <div className="item-form-admin form-group">
                        <label htmlFor="room_id">room_id</label>
                        <input
                            type="text"
                            className="form-control"
                            id="room_id"
                            name="room_id"
                            onChange={this.inputOnChange}
                            value={this.state.subproblem.room_id || ''}
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
                            value={this.state.subproblem.title || ''}
                        />
                    </div>
                    <div className="item-form-admin form-group">
                        <label htmlFor="content">content</label>
                        <textarea
                            className="form-control"
                            id="content"
                            name="content"
                            onChange={this.inputOnChange}
                            value={this.state.subproblem.content || ''}
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
                                value={this.state.subproblem.status || ''}
                            />
                        </div>

                        <div className="item-form-admin form-group col-xl-6 col-lg-6 col-12">
                            <label htmlFor="category_id">category_id</label>
                            <input
                                type="number"
                                className="form-control"
                                id="category_id"
                                name="category_id"
                                onChange={this.inputOnChange}
                                value={this.state.subproblem.category_id || ''}
                            />
                        </div>
                        <input
                            type="hidden"
                            className="form-control"
                            id="parent_id"
                            name="parent_id"
                            onChange={this.inputOnChange}
                            value={this.props.room_id || ''}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-secondary">СОЗДАТЬ ПОДПРОБЛЕМУ</button>
                </form>
            </div>
        )
    }
}
export default SubProblem;