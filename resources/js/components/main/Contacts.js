import React from "react";

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
                                        <img src="/public/img/soc-icon/google-plus-main.svg" alt="google plus"/>
                                    </div>
                                    <div className="item-soc-icon google-plus">
                                        <img src="/public/img/soc-icon/twitter-main.svg" alt="twitter"/>
                                    </div>
                                    <div className="item-soc-icon twitter">
                                        <img src="/public/img/soc-icon/vk-main.svg" alt="vk"/>
                                    </div>
                                    <div className="item-soc-icon facebook">
                                        <img src="/public/img/soc-icon/facebook-main.svg" alt="facebook"/>
                                    </div>
                                    <div className="item-soc-icon linked-in">
                                        <img src="/public/img/soc-icon/vk-main.svg" alt="linked-in"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 contats-info d-flex flex-column">
                                <a className="item-cont-info location d-flex">
                                    <img src="/public/img/soc-icon/map.svg" alt="location"/>
                                    <span>Via dei Friniati, 11, 41040 Polinago MO, Italy</span>
                                </a>
                                <a href="tel:+39 350 049 2534" className="item-cont-info number d-flex">
                                    <img src="/public/img/soc-icon/phone.svg" alt="tel-number"/>
                                    <span>+39 350 049 2534</span>
                                </a>
                                <a href="mailto: hollow718@gmail.com" className="item-cont-info mail d-flex">
                                    <img src="/public/img/soc-icon/mail.svg" alt="mail"/>
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

export default Contacts;