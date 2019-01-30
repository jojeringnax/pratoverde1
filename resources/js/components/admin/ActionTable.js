import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

class ActionTable extends React.Component {
    constructor(props) {
        super(props);
        this.deleteProblem = this.deleteProblem.bind(this);
    }

    deleteProblem(e) {
        e.preventDefault();
        let urlDelete = this.props.deleteUrl;
        let id = this.props.id;
        axios.delete(urlDelete)
            .then(response => {
                //console.log(response)
            let parent = document.querySelector('tbody');
            let child = document.getElementById(id);
            parent.removeChild(child);
            })
            .catch(function (error) {
                //console.log(error)
            });
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <td width="10%" className="actions" >
              <Link key="update"  className="action-link" to={this.props.updateUrl}>
                  <MdModeEdit />
              </Link>
              <Link  key="delete" className="action-link"  onClick={this.deleteProblem}  to="">
                  <MdDeleteForever />
              </Link>
            </td>
        );
    }
}


export default ActionTable;