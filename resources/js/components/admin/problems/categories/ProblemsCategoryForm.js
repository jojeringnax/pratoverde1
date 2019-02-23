import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class ProblemsCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                id: '',
                name: ''
            },
            nameButton: ''
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.submitProblemsCategory = this.submitProblemsCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }

    getCategory() {
        if(this.props.match.params.id) {
            let url = '/public/api/problem_category/' + this.props.match.params.id;
            axios.get(url)
                .then(res => {
                    this.setState({
                        category: res.data,
                        nameButton: 'Обновить категорию'
                    });
                })
                .catch(err => {

                })
        }else {
            this.setState({
                nameButton: 'Создать категорию'
            })
        }

    }

    onChangeInput(e) {
        this.setState({
            category: {
                ...this.state.category,
                name: e.target.value
            }
        });
    }

    submitProblemsCategory(e) {
        e.preventDefault();
        let url;
        let textSuccess;
        if(this.props.match.params.id) {
            url = '/public/api/admin/problem_categories/update/' + this.props.match.params.id;
            textSuccess = "Категория проблем обновлена";
        } else {
            url = '/public/api/admin/problem_categories/create';
            textSuccess = "Категория проблем создана";
        }
        axios.post(url, {name: this.state.category.name})
            .then(res => {
                alert(textSuccess);
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
            <div id="admin-problemsCategoriesCreate" className="section container-content-admin container-admin">
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
                            <button type="submit" className="btn btn-outline-success">{this.state.nameButton}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemsCategoryForm;