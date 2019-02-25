import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import ActionTable from '../ActionTable';
let booking = [];
class BookIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getBookings: false
        };
    }

    getBookings = () => {
        booking = [];
        axios.get("/public/api/admin/bookings")
            .then(res => {
                booking =  booking.concat(res.data);
                axios.get("/public/api/admin/customers")
                    .then(ress => {
                        let customers = [];
                        customers = customers.concat(ress.data);
                        booking.forEach((book, index) => {
                            customers.forEach((customer) => {
                                if(book.customer_id === customer.id) {
                                    book.customer_name = customer.name + " " + customer.surname
                                }
                            });
                        });
                        this.setState({getBookings: true});
                    })
                    .catch(err => {});
            })
            .catch(err => {});
    };

    tableBooking = () => {
        let table = [];
        let child = [];
        let urlUpdate = '';
        let urlDelete = '';
        for(let i=0; i < booking.length; i++) {
            child = [];
            for(let key in booking[i]) {
                console.log(key)
                if (key !== "customer_name" && key !== "created_at" && key !== "updated_at") {
                    if(key === "customer_id") {
                        child.push(<td key={key}>{booking[i]["customer_name"]}</td>);
                    } else if(key === "pay_method"){
                        child.push(<td key={key}>{payMethods[booking[i][key]]}</td>);
                    } else if(key === "status") {
                        child.push(<td key={key}>{statusBook[booking[i][key]]}</td>);
                    } else {
                        child.push(<td key={key}>{booking[i][key]}</td>);
                    }
                }
            }
            urlUpdate = '/public/admin/bookings/update/' + booking[i]['id'];
            urlDelete = '/public/api/admin/bookings/delete/' + booking[i]['id'];
            child.push(
                <ActionTable key="action" id={booking[i]['id']} updateUrl={urlUpdate} deleteUrl={urlDelete}/>
            );
            table.push(<tr id={booking[i]['id']} key={i}>{child}</tr>);
        }
        return table;
    };

    componentDidMount() {
        this.getBookings();
    }

    render() {
        return (
            <>
                <div className="container-admin d-flex justify-content-center col-12">
                    <div className="container-fluid">
                        <div className="row">
                            <Link to="/public/admin" className="btn peach-gradient">Назад</Link>
                            <table className="table admin-table table-bordered z-depth-1">
                                <thead className="primary-color-dark border-secondary">
                                <tr className="">
                                    <th width="" scope="col">id</th>
                                    <th width="" scope="col">ФИО клиента</th>
                                    <th width="" scope="col">Дата заселения</th>
                                    <th width="" scope="col">Дата отправления</th>
                                    <th width="" scope="col">Цена</th>
                                    <th width="" scope="col">Метод оплаты</th>
                                    <th width="" scope="col">Статус</th>
                                    <th width="" scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody className="">
                                {this.tableBooking()}
                                </tbody>
                            </table>
                            <Link to="/public/admin/bookings/create" className="btn btn-outline-secondary">ЗАБРОНИРОВАТЬ НОМЕР</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default BookIndex;