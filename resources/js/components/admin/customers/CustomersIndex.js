import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import ActionTable from "../problems/categories/ProblemsCategory";

let sources = [];

class CustomersIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getSources: false
        }
    }

    getSourceCustomer = () => {
      axios.get("/public/api/admin/customer")
          .then(res => {
              console.log(res);
              this.setState({getSources: true});
              sources = res.data;
          })
          .catch(err => {
              console.log(err);
          })
    };

    createTable = () => {
        let urlDelete = "/public/api/admin/customers/delete/";
        let urlUpdate = "/public/admin/customers/update/";
        let table = [];
        let row = [];
        for(let i=0; i < sources.length; i++) {
            row = [];
            for(let key in sources[i]) {
                row.push(<td key={sources[i][key]}>{sources[i][key]}</td>);
            }
            row.push(
                <ActionTable
                    key="action"
                    id={sources[i]['id']}
                    updateUrl={urlUpdate + sources[i]['id']}
                    deleteUrl={urlDelete + sources[i]['id']}
                />
            );
            table.push(<tr id={sources[i]['id']} key={i}>{row}</tr>);
        }
        return table;
    };

    componentDidMount() {
        this.getSourceCustomer();
    }

    render() {
        return (
            <div className="customer-admin-index">
                <div className="container">
                    <div className="row">
                        <Link to="/public/admin" className="btn peach-gradient">Назад</Link>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomersIndex;