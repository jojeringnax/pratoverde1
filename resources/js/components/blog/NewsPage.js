import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Contacts from '../main/Contacts';

let colorTitleBanner = {};
let divStyle = {};
let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class NewsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            article: {
                id: '',
                content: '',
                author: '',
                created_at: '',
                updated_at: '',
                for_index_page_photo_id: '',
                single_page_photo_id: '',
                title: '',
                title_color: ''
            },
            single_page_photo_id: '',
            for_index_page_photo_id: '',
            dateString: ''
        };
    }

    getArticle = () => {
        let url = '/api/article/' + this.props.match.params.id;
        axios.get(url)
            .then(res => {
               console.log('---res.data',res.data);
                let url_file_single = '/api/file/'+ res.data['single_page_photo_id'];
                let url_file_index = '/api/file/'+ res.data['for_index_page_photo_id'];
                this.setState({
                    article: res.data
                },() => {
                    colorTitleBanner = {color: this.state.article.title_color};
                    let dateObj = new Date(this.state.article.created_at);
                    console.log(dateObj.getDate(), monthNames[dateObj.getUTCMonth()], dateObj.getUTCFullYear());
                    this.setState({
                        dateString: monthNames[dateObj.getUTCMonth()] + ', ' + dateObj.getDate() + ', ' + dateObj.getUTCFullYear()
                    })
                });
                axios.get(url_file_single)
                    .then(res => {
                        //console.log('--- file = ', res.data.path);
                        divStyle = {
                            backgroundImage: 'url('+  res.data.path +')'
                        };
                        this.setState({
                            single_page_photo_id: res.data.path
                        })
                    })
                    .catch(err => {});

                axios.get(url_file_index)
                    .then(res => {
                        console.log('--- file = ', res.data.path);
                        this.setState({
                            single_page_photo_id: res.data.path
                        })
                    })
                    .catch(err => {})
            })
            .catch(err => {});
    };

    componentDidMount() {
        this.getArticle();
    }

    render() {
        return(
            <>
                <div className="container-fluid">
                    <div className="row d-flex flex-column article_page">
                        <div style={divStyle} className="banner-article">
                            <div className="title-article">
                                <h1 style={colorTitleBanner} className="title-banner-article">
                                    {this.state.article.title}
                                </h1>
                                <span style={colorTitleBanner} className="date-banner-article">
                                    {this.state.dateString}
                                </span>
                            </div>
                        </div>
                        <article className="d-flex">
                            <div className="container">
                                <div className="row d-flex">
                                    <div className="content d-flex col-8 flex-column justify-content-center align-items-center">
                                        <div className="date-article">
                                            {this.state.dateString}
                                        </div>
                                        <div className="title-article-content">
                                            <h1>{this.state.article.title}</h1>
                                        </div>
                                        <div className="content-article-content">
                                            {ReactHtmlParser(this.state.article.content)}
                                        </div>
                                        <div className="author align-self-start">
                                            {this.state.article.author}
                                        </div>
                                    </div>
                                    <div className="soc-media col-4 d-flex flex-column align-items-center justify-content-center">
                                        <div className="title-soc-media-new-page">
                                            Share this post
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <Contacts />
                    </div>
                </div>
            </>
        )
    }
}

export default NewsPage;
