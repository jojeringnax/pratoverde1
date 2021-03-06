import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import { MdDeleteForever, MdModeEdit, MdAddBox } from "react-icons/md";

class ActionTable extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteRow = (e) => {
        e.preventDefault();
        let urlDelete = this.props.deleteUrl;
        let id = this.props.id;
        axios.delete(urlDelete)
            .then(response => {
                let parent = document.querySelector('tbody');
                let child = document.getElementById(id);
                console.log(parent, child, id);
                parent.removeChild(child);
            })
            .catch(function (error) {
                //console.log(error)
            });
    };

    render() {
        return (
            <td width="10%" className="actions" >
                <Link key="update"  className="action-link" to={this.props.updateUrl}>
                    <MdModeEdit />
                </Link>
                <Link  key="delete" className="action-link"  onClick={this.deleteRow}  to="">
                    <MdDeleteForever />
                </Link>
                <Link key="subproblem" className={(this.props.problem) ? 'action-link' : 'hide'} to={"/admin/subproblem/create/" + this.props.id}>
                    <MdAddBox />
                </Link>
            </td>
        );
    }
}


export default ActionTable;
