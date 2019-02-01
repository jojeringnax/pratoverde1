import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class NewsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: ''

        };
        this.createNews = this.createNews.bind(this);
        this.sendFile = this.sendFile.bind(this);
        this.inputOnchange = this.inputOnchange.bind(this);
        this.editorOnchange = this.editorOnchange.bind(this);
    }
    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    sendFile(e) {
        //console.log(e.target.file);

    }

    createNews(e) {
        e.preventDefault();
        var formData = this.state;
        // let imagefile = document.querySelector('#file');
        // formData.append("image", imagefile.files[0]);
        // console.log(imagefile.files[0]);
        axios.post('/public/api/admin/articles/create',formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {

            });
    }

    inputOnchange(e) {
        console.log(e.target)
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

    render() {
        return(
            <div className="container">
                <div className="row d-flex justify-content-start flex-column align-items-center">
                    <div className="title-form"><h1>Опишите проблему</h1></div>
                    <Link to="/public/admin/problems" className="btn peach-gradient">Назад</Link>
                    <form onSubmit={this.createNews}  className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={this.inputOnchange}
                            value={this.state.title || ''}
                        />
                        <input
                            type="text"
                            id="author"
                            name="author"
                            onChange={this.inputOnchange}
                            value={this.state.author  || ''}
                        />

                        <ReactQuill
                            value={this.state.content}
                            onChange={this.editorOnchange}
                            modules={this.modules}
                            formats={this.formats}
                            name="content"
                        />
                        {/*<input*/}
                            {/*type="file"*/}
                            {/*id="file"*/}
                            {/*name="file"*/}
                            {/*onChange={this.sendFile}*/}
                        {/*/>*/}
                        <button type="submit">send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewsForm;