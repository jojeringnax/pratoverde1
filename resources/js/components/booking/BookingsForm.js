import React from 'react';
import {MdAddBox} from "react-icons/md";
import axios from "axios";
import {Link} from "react-router-dom";
import MaskedInput from 'react-maskedinput'

let delPadding = {padding: '0'};

class BookingsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            customer: {
                name: '',
                surname: '',
                email: '',
                phone_number: ''
            },
            booking : {
                customer_id: '',
                check_in :'',
                check_out:'',
                pay_methods: '',
                comment: '',
                status: 'Не подтверждена',
                price: 'net',
            },
            room_types: [{
                id: '',
                name: '',
                number_of_rooms: '',
                capacity: ''
            }],
            room_connect : {
                booking_id: '',
                guests_number: 2,
                children_number: 0,
                with_pets: false
            },
            types: []
        };
    }

    customerChangeInput = (e) => {
        let value;
        let reg = /\d/g;
        let phone_number;
        if(e.target.name === "phone_number" && e.target.value !== "") {
            phone_number = e.target.value;
            value = parseInt(phone_number.match(reg).join(''));
        } else {
            value = e.target.value
        }
        this.setState({
            customer: {
                ...this.state.customer,
                [e.target.name]:value
            }
        });
    };

    inputOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        if (e.target.type === 'checkbox') {
            this.setState({
                booking: {
                    ...this.state.booking,
                    [e.target.name]:e.target.checked
                }
            });
        } else {
            this.setState({
                booking: {
                    ...this.state.booking,
                    [e.target.name]:e.target.value
                }
            });
        }
    };

    typeInputOnChange = (e) => {
        console.log(e.target.value, e.target.name, this.state.types);
        let elem_types = {};
        let value = e.target.value;
        this.state.types.forEach(function(type){
            //console.log('----',type, type.id, value)
            if(type.id === parseInt(value)) {
                console.log(type);
                elem_types = {
                    id: type.id,
                    name: type.name,
                    number: '',
                    capacity: ''
                };
            }
        });

        let number = e.target.id.substr(e.target.id.length-1,e.target.id.length);
        console.log('---number', number)

        this.setState({
            room_types: {
                ...this.state.room_types,
                [parseInt(number) + 1]: elem_types
            }
        }, () => {
            console.log(this.state.room_types)
        })
        // this.setState({
        //     booking: {
        //         ...this.state.booking,
        //         [e.target.name]:e.target.value
        //     }
        // });
    };

    showPayMethods = () => {
        let options = [];
        payMethods.forEach(function (item, index) {
            options.push(<option key={index} value={index}>{item}</option>);
        });
        return options;
    };

    showTypes = () => {
        if(this.state.types.length === 0) {
            return "Типов пока нет";
        }
        let options = [];
        for(let i=0; i < this.state.types.length; i++) {
            // if(this.state.types[i].id === this.state.room.type_id) {
            //     //console.log('hui', this.state.types[i].id, this.state.room.type_id);
            //     options.unshift(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            // } else {
                options.push(<option name={this.state.types[i].id} key={i} value={this.state.types[i].id}>{this.state.types[i].name}</option>);
            // }
        }
        options.unshift(<option key="choose" value="null">Выберите тип</option>);
        console.log(this.props);
        // if(this.props.match.hasOwnProperty('params')) {
        //
        // }
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

    addType = (e) => {
        e.preventDefault();
    };

    createCustomer = (e) => {
        e.preventDefault();
        let data = this.state.customer;
        let url = "/public/api/admin/customers/create";
        axios.post(url, data)
            .then(res => {
                console.log(res.data.id);
                this.setState({
                    booking: {
                        ...this.state.booking,
                        customer_id: res.data.id
                    }
                }, () => {
                    let num_slide = 1;
                    let widthWrapper = window.innerWidth* 0.6;
                    let slides = document.querySelector('.slides');
                    let offset = 0;
                    offset = (parseInt(offset) - widthWrapper*parseInt(num_slide)) + 'px';
                    slides.style.transform = 'translate3d(' + offset + ', 0, 0)';
                })

            })
            .catch(err => {
                console.log(err);
            })
    };

    nextSlide = (e) => {
        let num_slide = e.target.parentNode.getAttribute('data-id');
        let widthWrapper = window.innerWidth* 0.6;
        let slides = document.querySelector('.slides');
        let offset = 0;
        offset = (parseInt(offset) - widthWrapper*parseInt(num_slide)) + 'px';
        slides.style.transform = 'translate3d(' + offset + ', 0, 0)';
    };

    backSlide = (e) => {
        let num_slide = e.target.parentNode.getAttribute('data-id');
        let widthWrapper = window.innerWidth* 0.6;
        let slides = document.querySelector('.slides');
        let offset = 0;
        offset = (parseInt(offset) - widthWrapper*parseInt(num_slide - 2)) + 'px';
        slides.style.transform = 'translate3d(' + offset + ', 0, 0)';
    };

    componentDidMount() {
        this.getTypes();

        let widthWrapper = window.innerWidth* 0.6;
        document.getElementById('wrapper_from').style.width = widthWrapper + 'px';
        let slides = document.querySelectorAll('.wrapper_form_item');
        let slidesWidth = widthWrapper*3 + 'px';
        document.querySelector('.slides').style.width = slidesWidth;
    }

    render() {
        return(
          <div className="container-admin d-flex justify-content-start flex-column align-items-center">
              <div id="wrapper_from" className="wrapper_form z-depth-1">
                  <div className="slides d-flex">
                      <div data-id="1" className="wrapper_form_item slide-in">
                          <form id="create-customer" action="">
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="name">Имя</label>
                                  <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      className="form-control"
                                      value={this.state.customer.name}
                                      onChange={this.customerChangeInput}
                                      placeholder="Имя"
                                  />
                              </div>
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="surname">Фамилия</label>
                                  <input
                                      type="text"
                                      id="surname"
                                      name="surname"
                                      className="form-control"
                                      value={this.state.customer.surname}
                                      onChange={this.customerChangeInput}
                                      placeholder="Фамилия"
                                 />
                              </div>
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="email">Email</label>
                                  <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      className="form-control"
                                      value={this.state.customer.email}
                                      onChange={this.customerChangeInput}
                                      placeholder="E-mail"
                                  />
                              </div>
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="phone_number">Телефонный номер</label>
                                  <input
                                      type="tel"
                                      id="phone_number"
                                      name="phone_number"
                                      className="form-control"
                                      value={this.state.customer.phone_number}
                                      onChange={this.customerChangeInput}
                                      placeholder="Телефонный номер"
                                  />
                              </div>
                          </form>
                          <button form="create-customer" className="btn btn-outline-info" onClick={this.createCustomer} id="asd" >ДАЛЕЕ</button>
                      </div>

                      <div data-id="2" id="second" className="wrapper_form_item slide-in">
                          <div className="d-flex flex-wrap">
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="customer_id">customer_id</label>
                                  <input
                                      type="number"
                                      id="customer_id"
                                      name="customer_id"
                                      className="form-control"
                                      value={this.state.booking.customer_id}
                                      onChange={this.inputOnChange}
                                      placeholder="customer_id"
                                  />
                              </div>
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="check_in">Check in</label>
                                  <input
                                      type="date"
                                      id="check_in"
                                      name="check_in"
                                      className="form-control"
                                      value={this.state.booking.check_in}
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
                                      value={this.state.booking.check_out}
                                      onChange={this.inputOnChange}
                                      placeholder="Дата выселения"
                                  />
                              </div>


                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="guests_number">Количество взрослых гостей</label>
                                  <input
                                      type="number"
                                      id="guests_number"
                                      name="guests_number"
                                      className="form-control"
                                      value={this.state.booking.guests_number}
                                      onChange={this.inputOnChange}
                                      placeholder="Количество взрослых гостей"
                                  />
                              </div>
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="children_number">Количество детей</label>
                                  <input
                                      type="number"
                                      id="children_number"
                                      name="children_number"
                                      className="form-control"
                                      value={this.state.booking.children_number}
                                      onChange={this.inputOnChange}
                                      placeholder="Количество детей"
                                  />
                              </div>
                              <div className="custom-control custom-checkbox item-form-admin d-flex justify-content-center align-items-center col-xl-6">
                                  <input
                                      type="checkbox"
                                      name="with_pets"
                                      className="custom-control-input"
                                      id="pets"
                                      checked={this.state.booking.with_pets}
                                      onChange={this.inputOnChange} />
                                  <label className="custom-control-label" htmlFor="pets">Домашние животные</label>
                              </div>
                              <div id="" className="inp-problem-create item-form-admin form-group col-xl-6 col-lg-6 col-12">
                                  <label htmlFor="pay_methods">Выберите способ оплаты</label>
                                  <select
                                      id="pay_method"
                                      name="pay_method"
                                      className="form-control"
                                      value={this.state.booking.pay_methods}
                                      onChange={this.inputOnChange}
                                  >
                                      {this.showPayMethods()}
                                  </select>
                              </div>
                          </div>
                          <button className="btn btn-outline-secondary" onClick={this.backSlide}>back</button>
                          <button className="btn btn-outline-info" onClick={this.nextSlide}>ДАЛЕЕ</button>
                      </div>
                      <div data-id="3" id="third" className="wrapper_form_item slide-in">
                          <div className="flex flex-wrap">
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
                                            id={"rooms_number_" + this.state.room_types.length}
                                            name={"rooms_number_" + this.state.room_types.length}
                                            className="form-control rooms_number"
                                            value={this.state.room_types[0].number_of_rooms}
                                            onChange={this.typeInputOnChange}
                                            placeholder="Количество номеров"
                                        />
                                    </div>
                                    <Link style={delPadding} onClick={this.addType} key="add_types" className={'action-link-book-form col-xl-2 justify-content-center'} to="">
                                        <MdAddBox />
                                    </Link>
                                </div>
                            </div>
                            <div id="" className="inp-problem-create item-form-admin form-group col-xl-12 col-lg-12 col-12">
                                <label htmlFor="comment">Оставьте сообщение</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    className="form-control"
                                    value={this.state.booking.comment}
                                    onChange={this.inputOnChange}
                                    placeholder="Текст сообщения"
                                />
                            </div>
                          </div>
                          <button className="btn btn-outline-secondary" onClick={this.backSlide}>back</button>
                          <button className="btn btn-outline-success" onClick={this.backSlide}>Отправить</button>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default BookingsForm;