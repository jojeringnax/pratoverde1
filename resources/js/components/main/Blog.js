import React from "react";

class Blog extends React.Component {
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

export default Blog;