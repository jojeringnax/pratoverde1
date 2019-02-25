import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
import 'quill/dist/quill.snow.css';
Quill.register('modules/imageResize', ImageResize);



class NewsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: '',
            mainFiles: []

        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.editorOnchange = this.editorOnchange.bind(this);
    }

    filesCange = (e) => {
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
        console.log(e.target.childNodes);
        formData.append('data',this.state);
        Object.entries(e.target.childNodes[4].files).forEach(
            ([key, val]) => formData.append(key, val)
        );
        Object.entries(e.target.childNodes[5].files).forEach(
            ([key, val]) => formData.append(key, val)
        );

        axios.post('/public/api/admin/articles/create',formData)
            .then(res => {
                console.log(res);
                alert("Новость создана");
                document.location.href = "/public/admin/news";
            })
            .catch(err => {

            });
    };

    inputOnchange(e) {
        console.log(e.target);
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    editorOnchange(value) {
        console.log(value);
        this.setState({
            content: value
        })
    }

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
            let delta = quill.getContents();
            console.log(delta.ops);
            for(let i=0; i < delta.ops.length; i++) {
                //console.log(delta.ops[i].insert);
                if (delta.ops[i].insert.image) {
                    //console.log(delta.ops[i].insert);
                }
            }
            let html = document.querySelector(".ql-editor").innerHTML;
            this.setState({
                content: html
            }, () => {
                //console.log(this.state.content)
            });
        });
    }

    render() {
        return(
            <div className="container-admin d-flex justify-content-start flex-column align-items-center">
                <div className="title-form"><h1>Опишите проблему</h1></div>
                <Link to="/public/admin/problems" className="btn peach-gradient">Назад</Link>
                <form onSubmit={this.createNews}  className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                    <div className="item-form-admin form-group">
                        <label htmlFor="title">Заголовок</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            onChange={this.inputOnchange}
                            value={this.state.title || ''}
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
                            value={this.state.author  || ''}
                        />
                    </div>
                    <div className="item-form-admin" id="news-content-editor"></div>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={this.filesCange}
                    />
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={this.filesCange}
                    />
                    <button type="submit" className="btn btn-outline-primary">СОЗДАТЬ НОВОСТЬ</button>
                </form>
            </div>

        )
    }
}

export default NewsForm;