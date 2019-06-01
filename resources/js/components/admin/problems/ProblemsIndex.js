import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {setProblemsArray, axiosRequest} from "../../../helpers/helpers";
import { MdDeleteForever, MdModeEdit, MdAddBox } from "react-icons/md";

class ProblemsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: []
        }
    }

    deleteRowProblem = (e) => {

        e.preventDefault();
        let deleteArr = [];
        deleteArr.push(document.getElementById('id_' + e.currentTarget.getAttribute('data-deleteid')));
        let parent_id = e.currentTarget.getAttribute('data-deleteid');
        let children = [];
        document.querySelectorAll('.row-problem').forEach(el => {
            if(el.getAttribute('data-parentid') === parent_id) {
                children.push(el);
                parent_id = el.getAttribute('data-id');
            }
        });

        deleteArr = deleteArr.concat(children);
        deleteArr.forEach(row => {
            let url_delete = '/api/admin/problems/delete/'+ row.getAttribute('data-id');
            console.log(row);
            axiosRequest(url_delete, {}, "delete")
                .then(res => {
                    row.remove();
                    console.log(res.data)
                })
        })


    };

    toggleTableClick = (e) => {
        let id = e.currentTarget.id;
        if (this.state.problems[id] && this.state.problems[id]['visible'] === false) {
            this.setState({
                problems: Object.assign({}, this.state.problems, {[id]:{visible: true}})
            });
            for(let i=0; i < document.querySelectorAll('tr[data-parent_id="'+e.currentTarget.id+'"]').length; i++) {
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
    };

    getProblems = () => {
        axios.get("/api/admin/problems")
            .then(response => {
                //console.log('axios-get', response.data);
                this.setState({problems: response.data});
            })
            .catch( error => {
                console.log(error);
            });
    };

    renderProblem = (obj, level=0) =>{
        if(obj === []){
            return false;
        }
        let result = [];
        result.push(
            <div data-id = {obj.problem.id} data-parentid={obj.problem.parent_id} id={"id_"+obj.problem.id} key={"idd_" + obj.problem.id} className="d-flex flex-row row-problem">
                <div id="id" className="item-row-problem" key="id">
                    {obj.problem.id}
                </div>
                <div id="created_at" className="item-row-problem" key="created_at">
                    {obj.problem.created_at}
                </div>
                <div id="updated_at" className="item-row-problem" key="updated_at">
                    {obj.problem.updated_at}
                </div>
                <div id="room_id" className="item-row-problem" key="room_id">
                    {obj.problem.room_id}
                </div>
                <div id="title" className="item-row-problem" key="title">
                    {obj.problem.title}
                </div>
                <div id="content" className="item-row-problem" key="content">
                    {obj.problem.content}
                </div>
                <div id="status" className="item-row-problem" key="status">
                    {obj.problem.status}
                </div>
                <div id="parent_id" className="item-row-problem" key="parent_id">
                    {obj.problem.parent_id}
                </div>
                <div id="category_id" className="item-row-problem" key="category_id">
                    {obj.problem.category_id}
                </div>
                <div id="actions" className="item-row-problem" key="actions">
                    <Link key="update"  className="action-link" to={"/admin/problems/update/" + obj.problem.id}>
                        <MdModeEdit />
                    </Link>
                    <Link  data-deleteid={obj.problem.id} key="delete" className="action-link"  onClick={this.deleteRowProblem}  to="">
                        <MdDeleteForever />
                    </Link>
                    <Link key="subproblem" className={'action-link'} to={"/admin/subproblem/create/" + obj.problem.id}>
                        <MdAddBox />
                    </Link>
                </div>
            </div>
            );


        level++;
        Object.keys(obj.children).map(key => {
            result.push(
                <div key={"child_" + obj.problem.id} id="children" style={{marginLeft:level*30}}>
                    {this.renderProblem(obj.children[key], level)}
                </div>
            );
        });

        return result;
    };

    componentDidMount() {
        this.getProblems();
    }

    render() {
        const problems = setProblemsArray(this.state.problems);
        console.log(problems);
        return (
            <div className="container-admin">
                <Link to="/admin" className="btn peach-gradient">Назад</Link>
                <div className="d-flex flex-column">
                    {
                        problems.map(problem => {
                            return this.renderProblem(problem)
                        })
                    }

                </div>
                <Link to="/admin/problems/categories" className="btn btn-outline-secondary">КАТЕГОРИИ</Link>
                <Link to="/admin/problems/create" className="btn btn-outline-secondary">СОЗДАТЬ ПРОБЛЕМУ</Link>
            </div>
        );
    }
}

export default ProblemsIndex;
