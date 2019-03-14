import React from "react";
import axios from "axios";

class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        };
    }

    sendFile = (e) => {
        e.preventDefault();
        const formData = new FormData;
        Object.entries(e.target.childNodes[0].files).forEach(
            ([key, val]) => formData.append(key, val)
        );
        axios.post('/api/admin/files/create', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });
    };

    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center flex-column align-items-center">
                    <form onSubmit={this.sendFile}  className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="form-control"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <form onSubmit={this.sendFile}  className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                        <input
                            type="file"
                            id="one"
                            name="one"
                            className="form-control"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <form onSubmit={this.sendFile}  className="border rounded form-admin col-xl-8 col-lg-8 col-12 z-depth-1">
                        <input
                            type="file"
                            id="multiple"
                            name="multiple"
                            className="form-control"
                            multiple
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default File;