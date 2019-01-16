import React from "react";
import axios from 'axios';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    render() {
        return (
            <section id="description">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10 description">
                            <div className="text-description">
                                <span className="text-center">
                                    {console.log('gg',this.state.data)}
                                    {this.state.data.map(function (item) {
                                        return <h4 key={item.id}>{item.last_washing_date}</h4>
                                    })
                                    }
                                </span>
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

export default Description;