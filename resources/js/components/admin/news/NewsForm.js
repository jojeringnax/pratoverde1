import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import 'quill/dist/quill.snow.css';
import { SketchPicker } from 'react-color';

Quill.register('modules/imageResize', ImageResize);

class NewsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article :{
                title: '',
                content: 'CONTENT',
                author: ''
            },
            photo: 0,
            mainFiles: [],
            photos: []

        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.editorOnchange = this.editorOnchange.bind(this);
    }

    textTitle = () => {
        if(this.props.match.params.hasOwnProperty('id')) {
            return 'Обновление новости'
        }else {
            return "Создание новости"
        }
    };

    textButton = () => {
        if(this.props.match.params.hasOwnProperty('id')) {
            return 'Обновить новость'
        }else {
            return "Создать новость"
        }
    };

    createNews = async (e) => {
        e.preventDefault();
        document.getElementById('cube-loader').classList.remove('hide');
        const formData = new FormData;
        Object.entries(this.state.article).forEach(
            ([key, val]) => formData.append(key,val)
        );

        let obj = {
            file1: e.target.childNodes[4].files[0],
            file2: e.target.childNodes[5].files[0]
        };

        Object.entries(obj).forEach(
            ([key, val]) => formData.append(key, val)
        );

        let images = document.querySelectorAll(".ql-editor > p > img");
        let article = this.state.article;
        let article_id, html;
        await axios.post('/api/admin/articles/create',formData)
            .then(await async function(res) {
                article.for_index_page_photo_id = res.data['for_index_page_photo_id'];
                article.single_page_photo_id = res.data['single_page_photo_id'];
                article_id = res.data.id;

                let url_update;
                let index = 0;

                for (const image of images) {
                    let src = image.getAttribute('src');
                    if (src.match(/data:image/)) {
                        let extension = src.slice(11,src.indexOf(';'));
                        let new_url = "/storage/news/photo_" + res.data.id + "_"+ index + "." + extension;
                        let photo = {
                            photo_id: index,
                            extension: extension,
                            photo: src,
                            width: image.clientWidth,
                            article_id: res.data.id
                        };
                        //console.log('---image',index,image, photo);
                        await axios.post('/api/article/upload_photos',photo)
                            .then( function(res) {
                                console.log('--- image-res',res.data);
                                image.setAttribute('src', new_url);
                                image.style.width = "100%";
                                html = document.querySelector(".ql-editor");
                            })
                    }
                    index += 1;
                }
                article.content = html.innerHTML;
                url_update = '/api/admin/articles/update/' + article_id;
                console.log('---article',article);
                axios.post(url_update, article)
                    .then(res => {
                        console.log('---change-content-suc',res);
                        document.getElementById('cube-loader').classList.add('hide');
                        document.location.href = "/admin/news";
                    })
                    .catch(err => {
                        console.log('---change-content-err',err);
                    });

            });
    };

    handleChangeComplete = (color) => {
        this.setState({
            article: {
                ...this.state.article,
                title_color: color.hex
            }

        });
    };

    inputOnchange(e) {
        this.setState({
            article: {
                ...this.state.article,
                [e.target.name]: e.target.value
            }
        });
    }

    editorOnchange(value) {
        this.setState({
            article: {
                ...this.state.article,
                content: value
            }
        })
    }

    fillFormUpdate = (id) => {
        console.log(id);
        let url = '/api/article/' + id;
        axios.get(url)
            .then(res => {
                console.log(res.data);
                this.setState({
                    article: res.data
                });
                document.querySelector(".ql-editor").innerHTML = res.data.content
            });
    };

    componentDidMount() {
        let editor = document.getElementById('news-content-editor');
        const quill = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                ],
                imageResize: {
                    parchment: Quill.import('parchment')
                }
            }
        });

        quill.on('text-change', () => {
            let photos = [];
            let delta = quill.getContents();
            let index_photo = 0;
            let images = document.querySelectorAll(".ql-editor > p > img");
            for(let i=0; i < delta.ops.length; i++) {
                if (delta.ops[i].insert.image) {
                    for (let image of images) {
                        image.style.width = "100%";
                    }
                    console.log('--- images',delta.ops[i].insert);
                    photos.push({id:index_photo,data: delta.ops[i].insert});
                    index_photo +=1;
                }
            }
            this.setState({
                photos: photos
            });
            let html = document.querySelector(".ql-editor").innerHTML;
        });

        if(this.props.match.params.hasOwnProperty('id')) {
            this.fillFormUpdate(this.props.match.params.id);
        }
    }

    render() {
        return(
            <div className="container-admin d-flex justify-content-start flex-column align-items-center card">
                <div className="card-header">
                    <Link to="/admin/news" className="btn peach-gradient btn-back-admin">Назад</Link>
                    <div className="title-form"><h1>{this.textTitle()}</h1></div>
                </div>
                <form onSubmit={this.createNews}  className="news-create-form border rounded form-admin col-xl-8 col-lg-8 col-12">
                    <div className="item-form-admin form-group">
                        <label htmlFor="title">Заголовок</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            onChange={this.inputOnchange}
                            value={this.state.article.title || ''}
                        />
                    </div>
                    <div className="item-form-admin form-group">
                        <label htmlFor="author">Автор</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="form-control"
                            onChange={this.inputOnchange}
                            value={this.state.article.author  || ''}
                        />
                    </div>
                    <div className="item-form-admin" id="news-content-editor"></div>
                    <input
                        type="file"
                        id="file1"
                        name="file1"
                        onChange={this.filesChange}
                    />
                    <input
                        type="file"
                        id="file2"
                        name="file2"
                        onChange={this.filesChange}
                    />
                    <SketchPicker
                        color={this.state.article.title_color}
                        onChangeComplete={ this.handleChangeComplete }
                    />
                    <button type="submit" className="btn btn-outline-primary">{this.textButton()}</button>
                </form>
            </div>
        )
    }
}

export default NewsForm;