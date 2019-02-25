import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import ActionTable from '../../ActionTable';


class SourceCustomerIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sources:  {}
        }
    }

    getInformation = () => {
        axios.get('/public/api/admin/customer_sources')
            .then(res => {
                this.setState({
                   sources: res.data
                }, () => {
                    console.log(this.state.sources);
                });
            })
            .catch(err => {

            });
    };

    createTable = () => {
        let table = [];
        let urlUpdate = '';
        let urlDelete = '';

        for (let i=0; i < this.state.sources.length; i++) {
            let child = [];
            for(let key in this.state.sources[i]){
                child.push(<td key={key}>{this.state.sources[i][key]}</td>)
            }
            urlUpdate = '/public/admin/customers/source/update/' + this.state.sources[i]['id'];
            urlDelete = '/public/api/admin/customer_sources/delete/' + this.state.sources[i]['id'];
            child.push(<ActionTable
                key="action"
                id={this.state.sources[i]['id']}
                updateUrl={urlUpdate}
                deleteUrl={urlDelete}
            />);
            table.push(<tr id={this.state.sources[i]['id']} key={i+1}>{child}</tr>);
        }
        return table
    };

    componentDidMount() {
        this.getInformation();
    }

    render() {
        return (
            <div className="container-admin">
                <Link to="/public/admin/customers" className="btn peach-gradient">Назад</Link>
                <table className="table admin-table table-bordered z-depth-1">
                    <thead className="primary-color-dark border-secondary">
                    <tr className="">
                        <th width="" scope="col">id</th>
                        <th width="" scope="col">Наименование источника</th>
                        <th width="" scope="col">Ссылка на источник</th>
                        <th width="" scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {this.createTable()}
                    </tbody>
                </table>
                <Link to="/public/admin/customers/source/create" className="btn btn-outline-secondary">Создать источник</Link>
            </div>
        );
    }
}

export default SourceCustomerIndex;