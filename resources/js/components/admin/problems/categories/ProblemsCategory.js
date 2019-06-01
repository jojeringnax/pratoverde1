import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import ActionTable from '../../ActionTable';

class ProblemsCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }
    getCategories = () => {
        let url = '/api/admin/problem_categories';
        axios.get(url)
            .then(res => {
                console.log(res.data);
                this.setState({
                    categories: res.data
                }, () => {
                   // console.log(this.state.categories);
                });
            })
            .catch(err => {

            })
    };

    createTable = () => {
        let urlDelete = "/api/admin/problem_categories/delete/";
        let urlUpdate = "/admin/problems/categories/update/";
        let table = [];
        let row = [];
        for(let i=0; i < this.state.categories.length; i++) {
            row = [];
            for(let key in this.state.categories[i]) {
                row.push(<td key={this.state.categories[i][key]}>{this.state.categories[i][key]}</td>);
            }
            row.push(
                <ActionTable
                    key="action"
                    id={this.state.categories[i]['id']}
                    updateUrl={urlUpdate + this.state.categories[i]['id']}
                    deleteUrl={urlDelete + this.state.categories[i]['id']}
                />
            );
            table.push(<tr id={this.state.categories[i]['id']} key={i}>{row}</tr>);
        }
        return table;
    };

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return (
            <div className="container-admin">
                <h1 className="text-center">КАТЕГОРИИ ПРОБЛЕМ</h1>
                <Link to="/admin/problems" className="btn peach-gradient">Назад</Link>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map((category, index) => {
                                return(
                                  <tr key={index}>
                                      <td key="id">{category.id}</td>
                                      <td key="name">{category.name}</td>
                                      <ActionTable
                                          key="action"
                                          id={category.id}
                                          updateUrl={"/api/admin/problem_categories/delete/" + category.id}
                                          deleteUrl={"/admin/problems/categories/update/" + category.id}
                                      />
                                  </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <Link className="btn btn-outline-secondary" to="/admin/problems/categories/create">Создать категорию проблемы</Link>
            </div>
        );
    }
}

export default ProblemsCategory;
