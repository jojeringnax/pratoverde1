import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class ProblemsCategoryCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                id: '',
                name: ''
            }
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.submitProblemsCategory = this.submitProblemsCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }

    getCategory() {
        if(this.props.match.params.status === "update") {
            let url = '/public/api/problem_category/' + this.props.match.params.id;
            axios.get(url)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        category: res.data
                    })
                })
                .catch(err => {

                })
        }

    }

    onChangeInput(e) {
        this.setState({
            ...this.state.category,
            name: e.target.value
        })
    }

    submitProblemsCategory(e) {
        e.preventDefault();
        let url;
        if(this.props.match.params.status === "update") {
            url = '/public/api/admin/problem_categories/update/' + this.props.match.params.id;
        } else {
            url = '/public/api/admin/problem_categories/create';
        }
        axios.post(url, {name: this.state.category.name})
            .then(res => {
                console.log(res);
                    document.location.href = '/public/admin/problems/categories';
            })
            .catch(err => {

            })
    }

    componentWillMount() {
        this.getCategory();
    }

    render() {
        return (
            <div id="admin-problemsCategoriesCreate" className="section container-content-admin">
                <h1 className="text-center">СОЗДАНИЕ КАТЕГОРИИ ПРОБЛЕМ</h1>
                <div className="container">
                    <div className="row d-flex justify-content-center flex-column align-items-center">
                        <Link className="btn peach-gradient" to="/public/admin/problems/categories">Назад</Link>
                        <form onSubmit={this.submitProblemsCategory} className="border form-group col-xl-8 form-admin z-depth-5">
                            <label htmlFor="name">Название категории</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.category.name}
                                onChange={this.onChangeInput}
                            />
                            <button type="submit" className="btn btn-outline-success">Создать категорию</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemsCategoryCreate;