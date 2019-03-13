import React, {Component} from 'react';
import {MdAddBox} from "react-icons/md";
import {Link} from "react-router-dom";
import axios from "axios";

let delPadding = {padding: '0'};

class AddTypeRoom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            types: []
        }
    }

    showTypes = () => {
        if(this.state.types.length === 0) {
            return "Типов пока нет";
        }
        let options = [];
        for(let i=0; i < this.state.types.length; i++) {
            options.push(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
        }
        options.unshift(<option key="choose" value="null">Выберите тип</option>);
        console.log(this.props);

        return options;

    };

    getTypes = () => {
        axios.get("/public/api/admin/room_types")
            .then(response => {
                if(response.data.length !== 0) {
                    this.setState({
                        types: response.data
                    }, () => {
                        console.log(this.state)
                    });
                } else {
                    return "Типов номеров нет"
                }
            })
            .catch(function(error) {
            });
    };

    typeInputOnChange = (e) => {
        this.setState({
            col: 1
        })
    };

    componentDidMount() {
        this.getTypes();
    }

    render() {
        return(
            <div className="wrapper-add_types d-flex">
                <div className="item-form-admin form-group form d-flex flex-column col-xl-6">
                    <label htmlFor="types-room">Типы номеров</label>
                    <div className="d-flex align-items-start">
                        <select onChange={this.typeInputOnChange} value={'Типов номеров нет'} name="type_id" id="type_0" className="form-control">
                            {this.showTypes()}
                        </select>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-12 d-flex">
                    <div id="" className="inp-booking item-form-admin form-group col-xl-10" style={delPadding}>
                        <label htmlFor="rooms_number">Количество номеров</label>
                        <input
                            type="number"
                            id={"rooms_number_" + this.props.id}
                            name={"rooms_number_" + this.props.id}
                            className="form-control rooms_number"
                            value=''
                            onChange={this.typeInputOnChange}
                            placeholder="Количество номеров"
                        />
                    </div>
                    <Link style={delPadding} onClick={this.props.add} key="add_types" className={'action-link-book-form col-xl-2 justify-content-center'} to="">
                        <MdAddBox />
                    </Link>
                </div>
            </div>
        );
    }

}

export default AddTypeRoom