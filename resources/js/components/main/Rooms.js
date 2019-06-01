import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Desctription extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let divImg = document.querySelector('.btn-go-rooms');
        let img = document.querySelector('.btn-go-rooms > img');
        divImg.addEventListener('mouseover', e => {
            img.setAttribute('src','img/right-arrow-white.svg');
        });
        divImg.addEventListener('mouseleave', e => {
            img.setAttribute('src','img/right-arrow.svg');
        });
    }
    render() {
        return (
            <section id="rooms">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="go-rooms col-xl-4">
                            <span className="text-rooms">
                                ROOMs<br />
                            </span>
                            <span className="additional-text-rooms">Lorem ipsum dolor sit amet.</span>
                            <Link className="btn-go-rooms" to="/public/rooms">la <img src="img/right-arrow.svg" alt=""/></Link>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

export default Desctription;