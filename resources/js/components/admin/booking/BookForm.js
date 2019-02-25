import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import axios from 'axios';
import Select from 'react-select';

let customers = [];
let table = [];
class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataGet:false,
            price : {
              afterPoint: 0,
              point: false
            },
            getOptions: false,
            selectedOption: '',
            customerOptions: [],
            emailCustomer: '',
            book: {
                customer_id: '',
                check_in: '',
                check_out: '',
                price: '',
                pay_method: 0,
                status: 0,
            }
        };
    }

    textButton = () => {
      if(this.props.match.params.id) {
          return "Сменить бронь";
      }else {
          return "Забронировать номер";
      }
    };

    getCustomers = () => {
        axios.get("/public/api/admin/customers")
            .then(res => {
                let name;
                table = res.data;
                for(let i=0; i < res.data.length; i++) {
                    name = res.data[i]['surname'] + " " + res.data[i]['name'];
                    if(res.data[i]['id'] === this.state.book.customer_id) {
                        customers.unshift({value: res.data[i]['id'], label: name});
                        this.setState({
                            selectedOption: this.state.customer_id,
                            emailCustomer: res.data[i]['email']
                        })
                    } else {
                        customers.push({value: res.data[i]['id'], label: name});
                    }
                }
                this.setState({ customerOptions: customers });
                if(!this.props.match) {
                    this.setState({
                        book: {
                            ...this.state.book,
                            pay_method: 0,
                            status: 0,
                        }
                    });
                }
            })
            .catch(err => {});
    };

    maskPrice = (e) => {
        if (57 >= e.keyCode && e.keyCode >= 48) {
            if (this.state.price.point === true && this.state.price.afterPoint !== 2){
                this.setState({
                    book : {
                        ...this.state.book,
                        price: this.state.book.price += e.key
                    },
                    price: {
                        ...this.state.price,
                        afterPoint: this.state.price.afterPoint += 1
                    }
                });
            } else if(this.state.price.point === false) {
                this.setState({
                    book : {
                        ...this.state.book,
                        price: this.state.book.price += e.key
                    }
                });
            }
        } else if(e.keyCode === 190 && this.state.price.point === false) {
            this.setState({
                book : {
                    ...this.state.book,
                    price: this.state.book.price += e.key
                },
                price: {
                    ...this.state.price,
                    point: true
                }
            });
        } else if(e.keyCode === 8) {
            if(this.state.price.point === true && this.state.price.afterPoint <= 2) {
                if(this.state.price.afterPoint === 0) {
                    this.setState({
                        price: {
                            ...this.state.price,
                            point: false
                        },
                        book: {
                            ...this.state.book,
                            price: this.state.book.price.slice(0,this.state.book.price.length-1)
                        }
                    });
                } else {
                    this.setState({
                        price: {
                            ...this.state.price,
                            afterPoint: this.state.price.afterPoint -= 1
                        },
                        book: {
                            ...this.state.book,
                            price: this.state.book.price.slice(0,this.state.book.price.length-1)
                        }
                    });
                }
            } else {
                this.setState({
                    book: {
                        ...this.state.book,
                        price: this.state.book.price.slice(0,this.state.book.price.length-1)
                    }
                });
            }
        }
    };

    inputOnChange = (e) => {
        if(e.target.name !== "price") {
            this.setState({
                book : {
                    ...this.state.book,
                    [e.target.name]: e.target.value
                }
            });
        }
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption }, () => {
            table.forEach((item) => {
                if (item.id === this.state.selectedOption.value) {
                    this.setState({
                        emailCustomer: item.email,
                        book: {
                            ...this.state.book,
                            customer_id:  this.state.selectedOption.value
                        }
                    });
                }
            });
        });
    };

    submitBook = (e) => {
        e.preventDefault();
        let url;
        if(this.props.match.params.id) {
            url = "/public/api/admin/bookings/update/" + this.props.match.params.id;
        } else {
            url = "/public/api/admin/bookings/create";
        }
        let data = Object.assign({}, this.state.book);
        let cent = data.price.slice(-2, data.price.length);
        data.price = parseInt(data.price.slice(0,data.price.indexOf('.')))* 100 + parseInt(cent);
        axios.post(url,data)
            .then(res => {
                console.log(res);
                this.setState({
                    book: {
                        ...this.state.book,
                        price: String(this.state.book.price)
                    }
                },() => {
                    document.location.href = "/public/admin/bookings";
                })
            })
            .catch(err => {
               console.log(err);
            });
    };

    showPayMethods = () => {
        let options = [];
        if(this.props.match) {
            payMethods.forEach((item, index) => {
                if(this.state.book.pay_method === index){
                    options.unshift(<option key={index} value={index}>{item}</option>);
                } else {
                    options.push(<option key={index} value={index}>{item}</option>);
                }
            });
        }else {
            payMethods.forEach(function (item, index) {
                options.push(<option key={index} value={index}>{item}</option>);
            });
        }
        return options;
    };

    showStatus = () => {
        let options = [];
        if(this.props.match) {
            statusBook.forEach((item, index) => {
                if(this.state.book.status === index){
                    options.unshift(<option key={index} value={index}>{item}</option>)
                } else {
                    options.push(<option key={index} value={index}>{item}</option>)
                }
            });
        }else {
            statusBook.forEach(function (item, index) {
                options.push(<option key={index} value={index}>{item}</option>)
            });
        }
        return options;
    };

    fillFormUpdate = () => {
        let url = "/public/api/booking/" + this.props.match.params.id;
        axios.get(url)
            .then(res => {
                let book = Object.assign({},res.data);
                let price = String(book.price);
                price = price.slice(0, price.length - 2) + "." + price.slice(-2);
                book.price = price;
                this.setState({ book:book });
                this.getCustomers();
            })
            .catch(err => {});
        this.setState({ dataGet: true });
    };

    componentDidMount() {
        if(this.props.match.params.id) {
            this.fillFormUpdate();
        }else {
            this.getCustomers();
        }
    }

    render() {
        return (
            <>
                <div className="container-admin d-flex justify-content-center">
                    <div className="container">
                        <div className="row">
                            <div className="title-form"><h1>{this.textButton()}</h1></div>
                            <Link to="/public/admin/bookings" className="btn peach-gradient">Назад</Link>
                            <form onSubmit={this.submitBook} className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1 d-flex flex-wrap">
                                <div id="parent_id" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="parent_id">ФИО клиента</label>
                                    <Select
                                        onChange={this.handleChange}
                                        placeholder="Выберите клиента"
                                        classNamePrefix="select"
                                        isSearchable = "true"
                                        value = {this.state.customerOptions[0]}
                                        options={this.state.customerOptions}
                                        name="select_customer"
                                    />
                                </div>
                                <div id="parent_id" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="parent_id">email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.emailCustomer}
                                        placeholder="Email клиента"
                                        disabled
                                    />
                                </div>
                                <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="check_in">Check in</label>
                                    <input
                                        type="date"
                                        id="check_in"
                                        name="check_in"
                                        className="form-control"
                                        value={this.state.book.check_in}
                                        onChange={this.inputOnChange}
                                        placeholder="Дата заселения"
                                    />
                                </div>
                                <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="check_out">Check out</label>
                                    <input
                                        type="date"
                                        id="check_out"
                                        name="check_out"
                                        className="form-control"
                                        value={this.state.book.check_out}
                                        onChange={this.inputOnChange}
                                        placeholder="Дата выселения"
                                    />
                                </div>
                                <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="form-control"
                                        value={this.state.book.price}
                                        onChange={this.inputOnChange}
                                        onKeyDown={this.maskPrice}
                                        placeholder="Цена за номер"
                                    />
                                </div>
                                <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="pay_methods">Paymethods</label>
                                    <select
                                        id="pay_method"
                                        name="pay_method"
                                        className="form-control"
                                        value={this.state.book.pay_method}
                                        onChange={this.inputOnChange}
                                    >
                                        {this.showPayMethods()}
                                    </select>
                                </div>
                                <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-control"
                                        value={this.state.book.status}
                                        onChange={this.inputOnChange}
                                    >
                                        {this.showStatus()}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-outline-success">{this.textButton()}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default BookForm;