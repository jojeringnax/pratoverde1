import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import ActionTable from '../ActionTable';

class CustomersIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    getSourceCustomer = () => {
      axios.get("/api/admin/customers")
          .then(res => {
              this.setState({customers: res.data});

          })
          .catch(err => {
              console.log(err);
          })
    };

    createTable = () => {
        let urlDelete = "/api/admin/customers/delete/";
        let urlUpdate = "/admin/customers/update/";
        let table = [];
        let row = [];
        for(let i=0; i < this.state.customers.length; i++) {
            row = [];
            for(let key in this.state.customers[i]) {
                row.push(<td key={key}>{this.state.customers[i][key]}</td>);
            }
            row.push(
                <ActionTable
                    key="action"
                    id={this.state.customers[i]['id']}
                    updateUrl={urlUpdate + this.state.customers[i]['id']}
                    deleteUrl={urlDelete + this.state.customers[i]['id']}
                />
            );
            console.log(row);
            table.push(<tr id={this.state.customers[i]['id']} key={i}>{row}</tr>);
        }

        return table;
    };

    componentDidMount() {
        this.getSourceCustomer();
    }

    render() {
        return (
            <div className="container-admin">
                <Link to="/admin" className="btn peach-gradient">Назад</Link>
                <table className="table admin-table table-bordered z-depth-1">
                    <thead className="primary-color-dark border-secondary">
                        <tr className="">
                            <th width="" scope="col">id</th>
                            <th width="" scope="col">Created_at</th>
                            <th width="" scope="col">Updated_at</th>
                            <th width="" scope="col">Surname</th>
                            <th width="" scope="col">Name</th>
                            <th width="" scope="col">Email</th>
                            <th width="" scope="col">Source_id</th>
                            <th width="" scope="col">Phone_number</th>
                            <th width="" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {this.createTable()}
                    </tbody>
                </table>
                <Link to="/admin/customers/create" className="btn btn-outline-secondary">Создать клиента</Link>
            </div>
        )
    }
}

export default CustomersIndex;