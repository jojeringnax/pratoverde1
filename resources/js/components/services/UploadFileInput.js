import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

class UploadFileInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    handleOnChangeFiles = async (e) => {

        const numberFiles = e.target.files.length;
        for (let i=0; i < numberFiles; i++) {
            let reader = new FileReader();
            reader.addEventListener("load",  () => {
                this.setState(
                    prevState => {
                    return {files: [...prevState.files, reader.result]};
                }, () =>{
                    this.props.setFiles(this.state.files);
                })
            }, false);

            reader.readAsDataURL(e.target.files[i]);
        }

        e.target.value = '';
    };

    deleteImg = (e) => {
        let newArrFiles = this.state.files;
        newArrFiles.splice(parseInt(e.currentTarget.getAttribute('data-idimg')), 1)
        this.setState({
            files: newArrFiles
        })
    };

    render() {
        return (
            <div>
                <div className="item-form-admin  input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Upload file</span>
                    </div>
                    <div className="custom-file">
                        <input
                            name="photo[]"
                            type="file"
                            id="photo"
                            onChange={this.handleOnChangeFiles}
                            multiple
                            className="custom-file-input"
                        />
                        <label className="custom-file-label" htmlFor="photo">
                            {this.state.files.length > 0 ? this.state.files.length : "Выберите файлы"}
                        </label>
                    </div>
                </div>
                <div className="preview d-flex flex-wrap img-wrap" >
                    {
                        this.state.files.map((file, index) => {
                            return (
                                <div key={index}  id={"img_"+ index} className="img-file-preview img-thumbnail d-flex align-items-center justify-content-center" >
                                    <IoIosCloseCircleOutline data-idimg={index} onClick={this.deleteImg} className="close-icon-file" />
                                    <img src={file} className="" alt={"img_"+ index} />
                                </div>
                            )

                        })
                    }
                </div>
            </div>

        );
    }

}

export default UploadFileInput;
