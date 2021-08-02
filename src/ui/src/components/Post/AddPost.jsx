import axios from 'axios';
import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import {API_BASE_URL} from '../../constants/apiConstants';
import Select from 'react-select'
import parse from 'html-react-parser';

function filePickerCallback(callback, value, meta) {
        if (meta.filetype == 'image') {
            var input = document.getElementById('my-file');
            input.click();
            input.onchange = function () {
                var file = input.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log('name',e.target.result);
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
class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
            title:'',
            content:''
        };
    }
    componentDidMount(){}

    addPost(){
        const config = {};
        axios.post(API_BASE_URL + '/resource/add', {
            title: this.state.title,
            content: this.state.content,
            // user: 'test_user',
            status: 'pending',
            contentType: 'html'
        }, config)
            .then(function (response) {
                console.log('reponse from add post is ',response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleTitleChange(e){
        this.setState({title:e.target.value})
    }
    handleSubjectChange(content, editor){
        this.setState({content})
    }
    render() {
        const options = [
            { value: 'housing', label: 'Housing' },
            { value: 'coop', label: 'Coop' }
        ]
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
                            <input id="my-file" type="file" name="my-file" style={{display:"none"}} onChange="" />
                            <Editor
                                apiKey="2vophh7te67s70zf5n0obxpzbaukcwkekay17zxlbab4yk8o"
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
                                        'removeformat | help | image',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    automatic_uploads: true,
                                    file_browser_callback_types: 'image',
                                    file_picker_callback: filePickerCallback,
                                }}
                                onEditorChange={this.handleSubjectChange}
                            />
                        </div>
                        <div className="form-group">
                            <Select options={options}
                                    placeholder="Select Post Catagory"/>
                        </div>
                        <button type="button" onClick={this.addPost} id="submit" name="submit"
                                className="btn btn-primary pull-right">Add Post
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}


class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[]
        };
    }

    componentDidMount(){
        var self = this;
        axios.get(API_BASE_URL + '/resource/all', {
        })
            .then(function (response) {
                self.setState({posts:response.data})
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }
    render() {
        return (
            <div className="list-group">
                {
                    this.state.posts.map(function(post,index) {
                        return <a href="#" key={index} className="list-group-item active">
                            <h4 className="list-group-item-heading">{post.title}</h4>
                            <div>
                                {post.contentType && post.contentType === "html"
                                    ?<p className="list-group-item-text">{parse(post.content)}</p>
                                    :<p className="list-group-item-text">{post.content}</p>
                                }
                            </div>
                        </a>
                    })
                }
            </div>
        )
    }
}

export { ShowPost, AddPost }
