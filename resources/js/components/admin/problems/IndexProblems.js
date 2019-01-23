import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

let problems = [];

class IndexProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: false
        };
        this.getProblems = this.getProblems.bind(this);
        this.createTable =this.createTable.bind(this);
        this.deleteProblem = this.deleteProblem.bind(this);
    }

    getProblems() {
        axios.get("/public/api/admin/problems")
            .then(response => {
                console.log('axios-get', response.data);
                problems = response.data;
                this.setState({
                    data: true
                },() => {
                    console.log(this.state.data);
                });
                //this.createTable();
                //
               // console.log(problems.length)
            })
            .catch( error => {
                console.log(error);
            });
    }

    deleteProblem(e) {
        e.preventDefault();
        console.log(e.target.getAttribute('data-delete'));
        let urlDelete = e.target.getAttribute('data-delete');
        axios.delete(urlDelete)
            .then(response => {
                //console.log(response)

            })
            .catch(function (error) {
                //console.log(error)
            });
    }

    createTable() {
        let table = [];
        let urlUpdate = '';
        let urlDelete = '';
        let child =[];
        console.log('pizda',  problems.length);
        for(let i=0; i < problems.length; i++) {
            //console.log(problems[i]);
            child =[];
            for(let key in problems[i]) {
                child.push(<td className="text-center" key={key}>{problems[i][key]}</td>)
            }
            urlUpdate = '/public/admin/problems/update/' + problems[i]['id'];
            urlDelete = '/public/api/admin/problems/delete/' + problems[i]['id'];
            child.push(<td key="action">
                <Link key="update" to={urlUpdate}>Tuda</Link>
                <Link key="delete" data-delete={urlDelete} onClick={this.deleteProblem} to="">Obratno</Link>
            </td>);
            table.push(<tr id={problems[i]['id']} key={i+1}>{child}</tr>);
        }
        console.log('table',table);
        return table;
    }

    componentDidMount() {
        this.getProblems();
    }

    render() {
        return (
            <div id="problems-page " className="section container-content-admin">
                <div className="container">
                    <div className="row">
                        <table className="table table-striped admin-table table-bordered">
                            <thead className="secondary-color-dark border-secondary">
                                <tr className="">
                                    <th width="5%" scope="col">id</th>
                                    <th width="10%" scope="col">Created_at</th>
                                    <th width="10%" scope="col">Updated_at</th>
                                    <th width="5%" scope="col">Room_id</th>
                                    <th width="15%" scope="col">Title</th>
                                    <th width="25%" scope="col">Content</th>
                                    <th width="5%" scope="col">Status</th>
                                    <th width="5%" scope="col">Parent_id</th>
                                    <th width="5%" scope="col">Category_id</th>
                                    <th width="5%" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexProblems;