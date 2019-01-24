import React, {Component} from 'react';
import axios from 'axios';

class ProblemsCategoryCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this);
        this.submitProblemsCategory = this.submitProblemsCategory.bind(this);
    }

    onChangeInput(e) {
        this.setState({
            categoryName: e.target.value
        })
    }

    submitProblemsCategory(e) {
        e.preventDefault()
        let url = '/public/api/admin/problem_categories/create'
        axios.post(url, {name: this.state.categoryName})
            .then(res => {
                console.log(res);
            })
            .catch(err => {

            })
    }

    render() {
        return (
            <div id="admin-problemsCategoriesCreate" className="section container-content-admin">
                <h1 className="text-center">СОЗДАНИЕ КАТЕГОРИИ ПРОБЛЕМ</h1>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={this.submitProblemsCategory} className="border form-group col-xl-8 form-admin z-depth-5">
                            <label htmlFor="name">Название категории</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.categoryName}
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