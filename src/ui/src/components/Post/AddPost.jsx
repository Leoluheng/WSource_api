import axios from 'axios';
import React from 'react';
import {Editor} from "@tinymce/tinymce-react";
import {API_BASE_URL} from '../../constants/apiConstants';
import Select from 'react-select'

function filePickerCallback(callback, value, meta) {
    if (meta.filetype === 'image') {
        var input = document.getElementById('my-file');
        input.click();
        input.onchange = function () {
            var file = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('name', e.target.result);
                callback(e.target.result, {
                    alt: file.name
                });
            };
            reader.readAsDataURL(file);
        };
    }
    // if (meta.filetype == 'image') {
    //
    //     var input = document.getElementById('image-upload-tinymce');
    //     input.click();
    //
    //     input.onchange = () => {
    //         var file = input.files[0];
    //         var reader = new FileReader();
    //
    //         reader.onload = (e) => {
    //             var img = new Image();
    //             img.src = reader.result;
    //
    //             callback(e.target.result, {
    //                 alt: file.name
    //             });
    //
    //             // var delay = debounce(self.onEditorChange, 10000);
    //             //
    //             // delay();
    //         };
    //
    //         reader.readAsDataURL(file);
    //     };
    // }
}

export default class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.redirectToShowPost = this.redirectToShowPost.bind(this);
        this.state = {
            title: '',
            content: '',
            categories: [],
            selectedCategory: ''
        };
    }

    componentDidMount() {
        var self = this;
        axios.get(API_BASE_URL + '/category/all', {}).then(function (response) {
            const categories = response.data.map(category => {
                return {value: category.type, label: category.type}
            })
            // console.log(categories)
            self.setState({categories})
        })
                .catch(function (error) {
                console.log('error is ', error);
            });
    }

    addPost() {
        var self = this;
        const config = {};
        axios.post(API_BASE_URL + '/resource/add', {
            title: self.state.title,
            content: self.state.content,
            // user: 'test_user',
            status: 'pending',
            contentType: 'html',
            resourceType: 'Offical',
            category: {
                type: self.state.selectedCategory.value
            },
            voteCount: 0,
            viewCount: 0
        }, config)
            .then(function (response) {
                console.log('reponse from add post is ', response)
                if (response.status === 200) {
                    console.log("Success");
                    self.redirectToShowPost()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    handleSubjectChange(content, editor) {
        this.setState({content})
    }

    handleSelectCategory(selectedOption){
        this.setState({selectedCategory: selectedOption})
    }

    redirectToShowPost(){
        this.props.history.push("/ShowPost")
    }

    render() {
        return (
            <div className="col-md-9">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both"/>
                        <div className="form-group">
                            <input type="text" onChange={this.handleTitleChange} className="form-control" id="title"
                                   name="title" placeholder="Title" required/>
                        </div>
                        <div className="form-group">
                            <input id="my-file" type="file" name="my-file" style={{display: "none"}} onChange=""/>
                            <Editor tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                value={this.state.content}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | image',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    automatic_uploads: true,
                                    file_browser_callback_types: 'image',
                                    file_picker_callback: filePickerCallback,
                                }}
                                onEditorChange={this.handleSubjectChange}
                            />
                        </div>
                        <div className="form-group">
                            {/*Todo: Change to material Ui*/}
                            <Select options={this.state.categories}  onChange={this.handleSelectCategory}
                                    placeholder="Select Post Catagory"/>
                        </div>
                        <button type="button" onClick={this.addPost} id="submit" name="submit"
                                className="btn btn-primary pull-right">Add Post
                        </button>
                        <button type="button" onClick={this.redirectToShowPost} id="backButton" name="Back"
                                className="btn btn-primary pull-right">Back
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

