import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        alert(this.state.active);
    }

    componentDidMount() {
        let links = document.querySelectorAll(".nav-top-a");
        let url = '';
        for (let index = 0; index < links.length; ++index) {
            //console.log(links[index])
            links[index].addEventListener('click', e => {
                e.preventDefault();
                url = links[index].getAttribute('href');
                console.log(url);
                console.log(document.querySelector(url).offsetTop);
                for (let i = 0; i < links.length; ++i) {
                    links[i].classList.remove('active-nav')
                }
                window.scrollTo({
                    top: document.querySelector(url).offsetTop -70,
                    behavior: "smooth"
                });
                links[index].classList.add('active-nav')
            });
        }
        let nav = document.querySelector('nav');
        let oldOffsetNav = nav.offsetTop;
        window.onscroll = function() {
            if (window.pageYOffset >= nav.offsetTop) {
                nav.classList.add('fixed-nav');
                document.querySelector('.arr-up').classList.remove('hide');
            }
            if(window.pageYOffset < oldOffsetNav) {
                nav.classList.remove('fixed-nav');
                document.querySelector('.arr-up').classList.add('hide');
            }
        };

        document.querySelector('.arr-up').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
        document.querySelector('a')

    }

    render() {
        return (
            <section id="banner">
                <div className="banner">
                    <a href="/rooms" className="go-rooms-banner">book room</a>
                    <a href="" className="logo"><img src="img/logo.png" alt=""/></a>
                    <div className="img-banner"></div>
                    <Link to="/admin">ADMIN</Link>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <a className="nav-link nav-top-a active-nav" href="#rooms">rooms <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-top-a" href="#restaurant">ristorante</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-top-a" href="#card-section">blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-top-a" href="#contacts">location</a>
                            </li>
                        </ul>
                    </div>
                    <div className="arr-up hide"><img src="img/arrow-menu.png" alt=""/></div>
                </nav>
            </section>
        );
    }
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <Header />
            </div>
        )
    }
}

export default NavBar;