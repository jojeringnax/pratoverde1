import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ActionTable from '../ActionTable';

let TableStyle = {overflowX: 'auto'};

class NewsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: ''
        }
    }

    getNews = () => {
        let url = '/api/admin/articles';
        axios.get(url)
            .then(res => {
                this.setState({news: res.data});
            })
            .catch(err => {})
    };

    createTable = () => {
        let urlDelete = "/api/admin/articles/delete/";
        let urlUpdate = "/admin/news/update/";
        let table = [];
        let row = [];
        for(let i=0; i < this.state.news.length; i++) {
            row = [];
            for(let key in this.state.news[i]) {
                if(key === 'content'){
                    let html = this.state.news[i]['content'];
                    const regex = /(<([^>]+)>)/ig;
                    const result = html.replace(regex, '').substr(0,70) + "...";
                    row.push(<td key={key}>{result}</td>);
                } else {
                    row.push(<td key={key}>{this.state.news[i][key]}</td>);
                }


            }
            row.push(
                <ActionTable
                    key="action"
                    id={this.state.news[i]['id']}
                    updateUrl={urlUpdate + this.state.news[i]['id']}
                    deleteUrl={urlDelete + this.state.news[i]['id']}
                />
            );
            table.push(<tr id={this.state.news[i]['id']} key={i}>{row}</tr>);
        }
        return table;
    };

    componentDidMount() {
        this.getNews();
    }

    render() {
        return (
            <div className="container-admin" style={TableStyle}>
                <h1 className="text-center">НОВОСТИ</h1>
                <div id="style-scroll-table" className="table-container-admin">
                    <table className="table admin-table table-bordered z-depth-1">
                        <thead className="primary-color-dark border-secondary">
                        <tr className="">
                            <th width="5%" scope="col">id</th>
                            <th width="10%" scope="col">Created_at</th>
                            <th width="10%" scope="col">Updated_at</th>
                            <th width="5%" scope="col">Title</th>
                            <th width="25%" scope="col">Content</th>
                            <th width="25%" scope="col">Author</th>
                            <th width="15%" scope="col">Title_color</th>
                            <th width="5%" scope="col">for_index_page_photo_id</th>
                            <th width="5%" scope="col">single_page_photo_id</th>
                            <th width="5%" scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody className="">
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
                <Link className="btn btn-outline-secondary" to="/admin/news/create">Создать новость</Link>
            </div>
        )
    }
}

export default NewsIndex;