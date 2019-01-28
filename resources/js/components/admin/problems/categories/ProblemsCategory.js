import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
class ProblemsCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.getCategoies = this.getCategoies.bind(this);
        this.createTable = this.createTable.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    getCategoies() {
        let url = '/public/api/admin/problem_categories';
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
    }
    deleteRow(e) {
        e.preventDefault();
        let urlDelete = e.target.getAttribute('href');
        let dataDelete = e.target.getAttribute('data-delete');
        let elem = document.querySelector('#'+dataDelete)
        //console.log(dataDelete, document.querySelector('#'+dataDelete))

        axios.delete(urlDelete)
            .then(res => {
                elem.remove();
            })
            .catch(err => {

            });
    }
    createTable() {
        let urlDelete = "/public/api/admin/problem_categories/delete/";
        let urlUpdate = "/public/admin/problems/categories/update/";
        let table = [];
        let row = [];
        for(let i=0; i < this.state.categories.length; i++) {
            row = [];
            for(let key in this.state.categories[i]) {
                row.push(<td key={this.state.categories[i][key]}>{this.state.categories[i][key]}</td>);
            }
            row.push(<td width="10%" className="actions" key="actions">
                <Link to={urlUpdate + this.state.categories[i]['id']}><MdModeEdit className="icons"/></Link>
                <Link onClick={this.deleteRow} data-delete={this.state.categories[i]['name']} to={urlDelete + this.state.categories[i]['id']}><MdDeleteForever className="icons"/></Link>
            </td>);
            table.push(<tr id={this.state.categories[i]['name']} key={i}>{row}</tr>);
        }
        return table;
    }
    componentDidMount() {
        this.getCategoies();
    }

    render() {
        return (
            <div id="admin-page" className="section container-content-admin">
                <div className="container">
                    <div className="row">
                        <h1 className="text-center">КАТЕГОРИИ ПРОБЛЕМ</h1>
                        <Link to="/public/admin/problems" className="btn peach-gradient">Назад</Link>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>
                        <Link className="btn btn-outline-secondary" to="/public/admin/problems/categories/create">Создать категорию проблемы</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemsCategory;