import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


let picPath = {};

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getNewsMainPage = () => {
        axios.get('/public/api/admin/articles')
            .then(res => {
                //console.log('---', res.data);
                this.setState({
                    articles: res.data
                }, () => {
                    this.getPhoto();
                });
            })
            .catch(err => {

            })
    };

    getPhoto = () => {
        this.state.articles.forEach((article, index) => {
            if(index <3) {
                let url_file_index = '/public/api/file/' + article['for_index_page_photo_id'];
                axios.get(url_file_index)
                    .then(res => {
                        this.setState({
                            pic : {
                                ...this.state.pic,
                                [index]:res.data.path
                            }
                            //pic: res.data.path
                        });
                    })
                    .catch(err => {
                    });
            }
        });
    };

    showArticles = () => {
        let article_item, id;
        let articles = [];
        if(this.state.articles !== undefined && this.state.pic !== undefined) {
            this.state.articles.forEach((article, index) => {
                let html = article.content;
                const regex = /(<([^>]+)>)/ig;
                const result = html.replace(regex, '').substr(0,70) + "...";
                if(index >= this.state.articles.length - 3) {
                    if(this.state.pic[index] !== undefined) {
                        picPath = {
                            backgroundImage: 'url(/public'+  this.state.pic[index] +')'
                        };
                    }
                    id = "/public/blog/new/" + article.id;
                    article_item = <Link key={id} to={id} className="col-xl-3 card-item">
                        <div style={picPath} id="card-1" className="card-top">
                        </div>
                        <div className="card-body">
                            <div className="title-card-body">
                                <span>{article.title}</span>
                            </div>
                            <div className="text-card-body">
                                <span>{result}</span>
                            </div>
                        </div>
                    </Link>;
                    articles.push(article_item);
                }
            });
            return articles;
        }
    };

    componentDidMount() {
        this.getNewsMainPage();
    }

    render() {
        return (
            <section id="card-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="cards d-flex justify-content-around">
                            {this.showArticles()}
                            {/*<a href="" className="col-xl-3 card-item">*/}
                                {/*<div id="card-1" className="card-top">*/}
                                {/*</div>*/}
                                {/*<div className="card-body">*/}
                                    {/*<div className="title-card-body">*/}
                                        {/*<span>Lorem.</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="text-card-body">*/}
                                        {/*<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, voluptate?</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</a>*/}
                            {/*<a href="" className="col-xl-3 card-item">*/}
                                {/*<div id="card-2" className="card-top">*/}
                                {/*</div>*/}
                                {/*<div className="card-body">*/}
                                    {/*<div className="title-card-body">*/}
                                        {/*<span>Lorem.</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="text-card-body">*/}
                                        {/*<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, quidem!</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</a>*/}
                            {/*<a href="" className="col-xl-3 card-item">*/}
                                {/*<div id="card-3" className="card-top">*/}
                                {/*</div>*/}
                                {/*<div className="card-body">*/}
                                    {/*<div className="title-card-body">*/}
                                        {/*<span>Lorem.</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="text-card-body">*/}
                                        {/*<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, debitis.</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</a>*/}
                        </div>
                        <a className="btn-look-more" href="">look</a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Blog;