import React, { Component } from 'react';

class CreateRooms extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="create-rooms" className="section">
                <div className="container">
                    <div className="row">

                    </div>
                </div>
                <form action="" className="col-9">
                    <label htmlFor="floor">Выберите количество комнат</label>
                    <input name="floor" type="number" id="floor" className="form-control"/>

                    <label htmlFor="clear">Чистка</label>
                    <input name="clear" type="checkbox" id="floor" className="form-control"/>

                    <label htmlFor="beds">Количество кроватей</label>
                    <input name="beds" type="number" id="floor" className="form-control"/>

                    <label htmlFor="date-clear">Последняя дата чистки номера</label>
                    <input name="date-clear" type="date" id="floor" className="form-control"/>

                    <button className="btn btn-primary" type="submit">Сохранить</button>
                </form>
            </div>
        );
    }
}

export default CreateRooms;