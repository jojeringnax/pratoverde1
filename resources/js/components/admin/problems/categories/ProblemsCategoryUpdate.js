import React, { Component } from 'react';
import axios from 'axios'

class ProblemsCategoryUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                id: '',
                name: ''
            }
        };
        this.getCategory = this.getCategory.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.updateProblemsCategory = this.updateProblemsCategory.bind(this);
    }



    getCategory() {
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

    onChangeInput (e) {
        this.setState({
            category : {
                ...this.state.category,
                [e.target.name]: e.target.value
            }
        }, () => {
            console.log(this.state.category);
        })
    }

    updateProblemsCategory(e) {
        e.preventDefault();
        console.log(this.state.category);
        let data = this.state.category.name;
        let url = '/public/api/admin/problem_categories/update/' + this.props.match.params.id;
        axios.post(url, {name: data})
            .then(res => {
                console.log(res)
                document.location.href = '/public/admin/problems/categories';
            })
            .catch(err => {

            })
    }

    componentDidMount() {
        this.getCategory();
    }

    render() {
        return (
            <div id="admin-page" className="section">
                <div id="admin-problemsCategoriesCreate" className="section container-content-admin">
                    <h1 className="text-center">СОЗДАНИЕ КАТЕГОРИИ ПРОБЛЕМ</h1>
                    <div className="container">
                        <div className="row d-flex justify-content-center flex-column align-items-center">
                            <input type="button" className="btn peach-gradient" onClick={this.back} value="Назад"/>
                            <form onSubmit={this.updateProblemsCategory} className="border form-group col-xl-8 form-admin z-depth-5">
                                <label htmlFor="name">Название категории</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={this.state.category.name}
                                    onChange={this.onChangeInput}
                                />
                                <button type="submit" className="btn btn-outline-success">Обновить категорию</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemsCategoryUpdate;