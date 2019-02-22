import React, { Component } from 'react';
import {MdClose} from "react-icons/md";
import ClosePopUpBtn from './ClosePopUpBtn';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    closeModFormBtn = () => {
        ClosePopUpBtn(this.props.close);
    };

    closeModForm = () => {
        document.addEventListener("click", () => {
            if(!event.target.closest(".modal-web") && !event.target.closest("a") && this.props.showw) {
                this.closeModFormBtn();
            }
        });

    };

    showFormCreateType = () => {
        document.querySelector('.layout-admin').classList.add('fadein-layout');
        document.querySelector('.modal-web').classList.add('fade-in');
        //document.querySelector('.mod-wrapper').classList.add('fade-in');

        document.querySelector('.layout-admin').classList.remove('fadeout-layout');
        document.querySelector('.modal-web').classList.remove('fadeout');

        document.querySelector('.layout-admin').classList.remove('hide');
        document.querySelector('.modal-web').classList.remove('hide');
        document.querySelector('.mod-wrapper').classList.remove('hide');
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.showw) {
            this.showFormCreateType();
            this.closeModForm();
        }
    }

    render() {
        return (
            <div className="mod-wrapper hide">
                <div className="modal-web hide">
                    <div onClick={this.closeModFormBtn} className="close-btn">
                        <MdClose />
                    </div>
                    {this.props.contentPopUp}
                </div>
                <div className="layout-admin hide"></div>
            </div>
        )
    }
}

export default PopUp;