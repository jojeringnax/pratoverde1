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
                content: '',
                author: ''
            },
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

    filesChange = (e) => {
        console.log(e.target.files[0]);
        // Object.entries(e.target.childNodes[0].files).forEach(
        //     ([key, val]) => {
        //         this.setState({
        //             ...this.state.mainFiles,
        //             [key]: val
        //         },() => {
        //             console.log(this.state.mainFiles);
        //         })
        //     }
        // );
    };

    createNews = (e) => {
        e.preventDefault();
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
        console.log('---post',this.state.photos);
        // images.forEach(function(img,index) {
        //     //'/storage/news/photo_{{articleid}}{{photo_id}}.{{extension}}'
        //     let photo = {};
        //     let src = img.getAttribute('src');
        //     let extension = src.slice(11,src.indexOf(';'));
        //     let new_url = "/storage/news/photo_" + res.data.id + "_"+ index + "." + extension;
        //     photo.photo_id= index;
        //     photo.extension = extension;
        //     photo.photo = src;
        //     photo.width = img.clientWidth;
        //     //photo.height = img.clientHeight;
        //     //photo.article_id = res.data.id;
        //     console.log('--- object_photo',photo);
        // });

        axios.post('/public/api/admin/articles/create',formData)
            .then(res => {
                console.log(res.data.id);
                alert("Новость создана");
                images.forEach(function(img,index) {
                    //'/storage/news/photo_{{articleid}}{{photo_id}}.{{extension}}'
                    let photo = {};
                    let src = img.getAttribute('src');
                    let extension = src.slice(11,src.indexOf(';'));
                    let new_url = "../storage/news/photo_" + res.data.id + "_"+ index + "." + extension;
                    photo.photo_id= index;
                    photo.extension = extension;
                    photo.photo = src;
                    photo.width = img.clientWidth;
                    //photo.height = img.clientHeight;
                    photo.article_id = res.data.id;
                        axios.post('/public/api/article/upload_photos',photo)
                            .then(res => {
                                console.log(res);
                                img.setAttribute('src', new_url)
                            })
                            .catch({

                            });
                    console.log('--- object_photo',photo);
                });
                //document.location.href = "public/admin";

            })
            .catch(err => {

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
        let url = '/public/api/article/' + id;
        axios.get(url)
            .then(res => {
                console.log(res.data);
                this.setState({
                    article: res.data
                });
                document.querySelector(".ql-editor").innerHTML = res.data.content
            })
            .catch(err => {

            })
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
            for(let i=0; i < delta.ops.length; i++) {
                //console.log(delta.ops);
                if (delta.ops[i].insert.image) {
                    console.log(i, delta.ops[i].insert);
                    photos.push({id:index_photo,data: delta.ops[i].insert});
                    index_photo +=1;
                    //delta.ops[i].insert.image = '';
                }
            }
            this.setState({
                photos: photos
            }, () => {
              //console.log('---photo_state',this.state.photos);
            });
            let html = document.querySelector(".ql-editor").innerHTML;


            this.setState({
                article: {
                    ...this.state.article,
                    content: html
                }
            }, () => {
                //console.log(this.state.content)
            });
        });

        if(this.props.match.params.hasOwnProperty('id')) {
            this.fillFormUpdate(this.props.match.params.id);
        }
    }

    render() {
        return(
            <div className="container-admin d-flex justify-content-start flex-column align-items-center">
                <div className="title-form"><h1>{this.textTitle()}</h1></div>
                <Link to="/public/admin/news" className="btn peach-gradient">Назад</Link>
                <form onSubmit={this.createNews}  className="news-create-form border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
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