import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ActionTable from '../ActionTable';
let problems = [];
let problemsVisible = {};
class ProblemsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false,
            problems: {}
        };
        this.getProblems = this.getProblems.bind(this);
        this.createTable = this.createTable.bind(this);
        this.toggleTableClick = this.toggleTableClick.bind(this);
    }

    toggleTableClick(e) {
        let id = e.currentTarget.id;
       // console.log(this.state.problems[id]['visible'])
        if (this.state.problems[id]['visible'] === false) {
            this.setState({
                problems: Object.assign({}, this.state.problems, {[id]:{visible: true}})
            });
            for(let i=0; i< document.querySelectorAll('tr[data-parent_id="'+e.currentTarget.id+'"]').length; i++) {
                document.querySelectorAll('tr[data-parent_id="'+e.currentTarget.id+'"]')[i].classList.remove('hide')
            }
        } else {
            this.setState({
                problems: Object.assign({}, this.state.problems, {[id]:{visible: false}})
            });
            for(let i=0; i< document.querySelectorAll('tr[data-parent_id="'+e.currentTarget.id+'"]').length; i++) {
                document.querySelectorAll('tr[data-parent_id="'+e.currentTarget.id+'"]')[i].classList.add('hide')
            }
        }

        console.log(document.querySelector('.toggle').clientHeight);
    }

    getProblems() {
        axios.get("/public/api/admin/problems")
            .then(response => {
                //console.log('axios-get', response.data);
                problems = response.data;
                this.setState({data: true});
                for(let i = 0; i < response.data.length; i++) {
                    //console.log(response.data[i]);
                    if(response.data[i]['parent_id'] != null) {
                        problemsVisible[response.data[i]['parent_id']] = {visible:false};
                    }

                }
                this.setState({
                   problems: problemsVisible
                },() => {
                    //console.log(this.state.problems)
                });

            })
            .catch( error => {
                console.log(error);
            });
    }

    createTable() {
        let table = [];
        let urlUpdate = '';
        let urlDelete = '';
        let child =[];
        let newTable, td;
        //console.log('pizda',  problems);
        for(let i=0; i < problems.length; i++) {
            //console.log(problems[i]);
            child =[];
            for(let key in problems[i]) {
                // if(problems[i]['parent_id'] === null){
                //     td =  <td id="" className="cursor text-center" key={key}>{problems[i][key]}</td>;
                // } else {
                //     td =  <td id="" className="text-center" key={key}>{problems[i][key]}</td>
                // }
                child.push(<td id="" className="cursor text-center" key={key}>{problems[i][key]}</td>);
            }
            //console.log(i, problems[i]['parent_id'])
            urlUpdate = '/public/admin/problems/update/' + problems[i]['id'];
            urlDelete = '/public/api/admin/problems/delete/' + problems[i]['id'];
            child.push(
                <ActionTable  key="action" id={problems[i]['id']} updateUrl={urlUpdate} deleteUrl={urlDelete}/>
               );

            //console.log(problems[i]['parent_id'], table[i+1]);
            if(problems[i]['parent_id'] === null) {
                //console.log(table[i], problems[i]['parent_id']);
                table.push(
                    <tr onClick={this.toggleTableClick} className="toggle" id={problems[i]['id']} key={i+1}>{child}</tr>
                );
                table.push(
                    <tr id={"hr/"+problems[i]['id']} key={"hr"+problems[i]['id']}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                );
            } else {
                for(let j=0; j < table.length; j++) {
                    if(table[j].props['id'] === problems[i]['parent_id']) {
                        //console.log(table[j], problems[i]['parent_id']);
                        newTable = table.slice(0, j+1);
                        //console.log('asd',problems[i]['id']);
                        newTable.push(
                            <tr className="hide collapss" data-parent_id={problems[i]['parent_id']} id={problems[i]['id']} key={i+1}>{child}</tr>
                        );
                        newTable =  newTable.concat(table.slice(j+1));
                        table = newTable
                    }
                }
            }

        }
       // console.log('table',table);
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
                        <Link to="/public/admin" className="btn peach-gradient">Назад</Link>
                        <table className="table table-striped admin-table table-bordered z-depth-1">
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
                            <tbody className="">
                                {this.createTable()}
                            </tbody>
                        </table>
                        <Link to="/public/admin/problems/categories" className="btn btn-outline-secondary">КАТЕГОРИИ</Link>
                        <Link to="/public/admin/problems/create" className="btn btn-outline-secondary">СОЗДАТЬ ПРОБЛЕМУ</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProblemsIndex;