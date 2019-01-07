import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import NavBar from './NavBar';
import Rooms from './Rooms';
import Ristorante from './Ristorante';

class Desctription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="description">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10 description">
                            <div className="text-description">
                                <span className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />Commodi fuga, impedit magni natus nisi odit praesentium reiciendis vero voluptate. Dicta eius excepturi fugiat in placeat quis sit vitae! Animi cupiditate, dolorem error eveniet ipsa itaque minus modi natus nisi nulla quia tenetur voluptas. Aliquid, cum deleniti dignissimos exercitationem hic itaque magnam neque, nihil perspiciatis quibusdam quisquam reiciendis repudiandae, rerum! Accusamus, aperiam assumenda consequatur culpa cum cupiditate dolore est et illum impedit ipsa iusto laborum modi nihil quaerat quasi quibusdam quod recusandae repellendus, rerum saepe, suscipit temporibus veritatis voluptas voluptate? Culpa dicta eos facilis fugiat, maxime nesciunt non odit quibusdam tempore?</span>
                            </div>
                            <div className="pic-description">
                                <img src="img/dog-cat.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

class CardSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="card-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="cards d-flex justify-content-around">
                            <a href="" className="col-xl-3 card-item">
                                <div id="card-1" className="card-top">
                                </div>
                                <div className="card-body">
                                    <div className="title-card-body">
                                        <span>Lorem.</span>
                                    </div>
                                    <div className="text-card-body">
                                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, voluptate?</span>
                                    </div>
                                </div>
                            </a>
                            <a href="" className="col-xl-3 card-item">
                                <div id="card-2" className="card-top">
                                </div>
                                <div className="card-body">
                                    <div className="title-card-body">
                                        <span>Lorem.</span>
                                    </div>
                                    <div className="text-card-body">
                                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, quidem!</span>
                                    </div>
                                </div>
                            </a>
                            <a href="" className="col-xl-3 card-item">
                                <div id="card-3" className="card-top">
                                </div>
                                <div className="card-body">
                                    <div className="title-card-body">
                                        <span>Lorem.</span>
                                    </div>
                                    <div className="text-card-body">
                                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, debitis.</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <a className="btn-look-more" href="">look</a>
                    </div>
                </div>
            </section>
        );
    }
}

class Contacts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let icon = document.querySelectorAll('.item-soc-icon > img');
        let newSrc = '';
        for (let i=0; i < icon.length; i++){
            icon[i].addEventListener('mouseover', () => {
                newSrc = icon[i].getAttribute('src').substr(0, icon[i].getAttribute('src').length - 9) + '.svg';
                icon[i].setAttribute('src', newSrc);
            });
            icon[i].addEventListener('mouseleave', () => {
                newSrc = icon[i].getAttribute('src').substr(0, icon[i].getAttribute('src').length - 4) + '-main.svg';
                icon[i].setAttribute('src', newSrc);
            });
        }

    }

    render() {
        return (
            <section id="contacts">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="contacts d-flex justify-content-start flex-wrap">
                            <div className="wrapper-soc-net d-flex justify-content-center col-xl-12">
                                <div className="social-net d-flex justify-content-around col-xl-7">
                                    <div className="item-soc-icon vk">
                                        <img src="img/soc-icon/google-plus-main.svg" alt=""/>
                                    </div>
                                    <div className="item-soc-icon google-plus">
                                        <img src="img/soc-icon/twitter-main.svg" alt=""/>
                                    </div>
                                    <div className="item-soc-icon twitter">
                                        <img src="img/soc-icon/vk-main.svg" alt=""/>
                                    </div>
                                    <div className="item-soc-icon facebook">
                                        <img src="img/soc-icon/facebook-main.svg" alt=""/>
                                    </div>
                                    <div className="item-soc-icon linked-in">
                                        <img src="img/soc-icon/vk-main.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 contats-info d-flex flex-column">
                                <a className="item-cont-info location d-flex">
                                    <img src="img/soc-icon/map.svg" alt=""/>
                                    <span>Via dei Friniati, 11, 41040 Polinago MO, Italy</span>
                                </a>
                                <a href="tel:+39 350 049 2534" className="item-cont-info number d-flex">
                                    <img src="img/soc-icon/phone.svg" alt=""/>
                                    <span>+7(999)-999-9999</span>
                                </a>
                                <a href="mailto: hollow718@gmail.com" className="item-cont-info mail d-flex">
                                    <img src="img/soc-icon/mail.svg" alt=""/>
                                    <span>hollow718@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="section">
                <NavBar />
                <Desctription />
                <Rooms />
                <Ristorante />
                <CardSection />
                <Contacts />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
