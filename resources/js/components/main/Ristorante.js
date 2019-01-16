import React, { Component } from 'react';

class Ristorante extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="restaurant">
                <div className="container-fluid">
                    <div className="row">
                        <div id="pizza" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 item-restaurant item-rest-hover">
                            <div className="layout-item-rest"></div>
                            <div className="text-rest">
                                <span>pizzeria</span>
                            </div>
                        </div>
                        <div id="chief" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 item-restaurant">
                            <div className="desc-chief">
                                <span className="title-desc-chief">our chief</span>
                                <span className="text-desc-chief">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab adipisci architecto aut culpa dolore eaque enim excepturi exercitationem illo incidunt iusto labore minima necessitatibus nihil nostrum officia omnis perspiciatis provident quam quas quasi quibusdam quod quos, recusandae reiciendis repellendus sed sit totam vel, veritatis vitae voluptatem voluptatibus! Eligendi est et illo impedit laborum, maxime porro quos velit veniam? Alias asperiores consequuntur cumque dicta dolor dolorem dolores ducimus, earum eius eum eveniet exercitationem fugit hic inventore.</span>
                            </div>
                        </div>
                        <div id="menu" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 item-restaurant">
                            <div className="desc-menu">
                                <span className="title-desc-menu">menu</span>
                                <div className="time-work">
                                    <span className="title-time-work">Часы работы</span>
                                    <div className="main-time-work d-flex flex-wrap">
                                        <div className="dayswork col-xl-6 d-flex align-items-center justify-content-end">
                                            понедельник-пятница
                                        </div>
                                        <div className="clock-work col-xl-6">
                                            12.00-14.00<br />
                                            19.00-22.00
                                        </div>
                                        <div className="dayswork col-xl-6 d-flex align-items-center justify-content-end">
                                            суббота-воскресение
                                        </div>
                                        <div className="clock-work col-xl-6">
                                            12.00-14.00<br />
                                            19.00-22.00 (pizza)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="eat" className="col-xl-6 col-lg-6 col-md-6 col-sm-12 item-restaurant item-rest-hover">
                            <div className="layout-item-rest"></div>
                            <div className="text-rest">
                                <span>ristorante</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Ristorante;