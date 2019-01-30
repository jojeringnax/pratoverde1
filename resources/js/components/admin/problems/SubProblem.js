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
    }

    inputOnChange() {
        console.log('kuku');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prev', prevProps, prevState, this.props.room_id);
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

    render() {
        return(
            <div className="form-subProblem col-12 d-flex justify-content-center">
                <form className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
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
                        <div id="parent_id" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                            <label htmlFor="parent_id">parent_id</label>
                            <input
                                type="number"
                                className="form-control"
                                id="parent_id"
                                name="parent_id"
                                onChange={this.inputOnChange}
                                value={this.props.room_id || ''}
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
                            value={this.state.subproblem.category_id || ''}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
export default SubProblem;