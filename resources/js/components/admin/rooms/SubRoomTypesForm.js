import React, { Component } from 'react';
import axios from "axios";

class SubRoomTypesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomType : {
                name: ''
            }
        };
    }

    submitType = (e) => {
        e.preventDefault();
        let data = {name: this.state.roomType.name};
        axios.post('/public/api/admin/room_types/create',data)
            .then(res => {
                alert("Тип комнаты создан");
                this.props.closeModWin();
                this.props.updateState();
                this.setState({
                    roomType: {
                        ...this.state.roomType,
                        name: ''
                    }
                });
            })
            .catch(err => {});
    };

    changeInput = (e) => {
      this.setState({
        roomType: {
            ...this.state.roomType,
            name: e.target.value
        }
      });
    };

    render () {
        return (
          <div>
              <form onSubmit={this.submitType} action="" className="card card-type-create">
                  <h2 className="text-center">Создать тип комнаты</h2>
                  <input
                      className="form-control"
                      type="text"
                      name="add_type"
                      placeholder="Введите название типа комнаты"
                      value={this.state.roomType.name}
                      onChange={this.changeInput}
                  />
                  <button type="submit" className="btn btn-outline-success">Создать тип</button>
              </form>

          </div>
        );
    }
}

export default SubRoomTypesForm;