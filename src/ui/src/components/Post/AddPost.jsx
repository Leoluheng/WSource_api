import axios from 'axios';
import React from 'react';
import {Editor} from "@tinymce/tinymce-react";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/apiConstants';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {categories} from './categories'
import Box from '@material-ui/core/Box';
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    box: {
        display: "flex",
        padding: 8,
        justifyContent: "space-around",
        alignItems: "center"
    },
})


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
}

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.modifyPost = this.modifyPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.redirectToShowPost = this.redirectToShowPost.bind(this);

        this.state = {
            title: '',
            content: '',
            categories: [],
            selectedCategory: '',
            isModify: false
        };
    }

    componentDidMount() {
        var self = this;
        axios.get(API_BASE_URL + '/category/all', {}).then(function (response) {
            const categories = response.data.map(category => {
                return {value: category.type, label: category.type}
            })
            self.setState({categories})
        })
                .catch(function (error) {
                console.log('error is ', error);
            });
        if(this.props.match.params && this.props.match.params.postId){
            self.setState({isModify:true})
            const config = {
                headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)},
                params:{
                    id: self.props.match.params.postId
                }
            };
            axios.get(API_BASE_URL + '/resource/getById', config).then(function (response) {
                const post = response.data
                self.setState({title: post.title, content: post.content, selectedCategory: post.category})
            })
                .catch(function (error) {
                    console.log('error is ', error);
                });
        }
    }

    addPost() {
        const self = this;
        const config = { headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)} };
        axios.post(API_BASE_URL + '/resource/add', {
            title: self.state.title,
            content: self.state.content,
            // user: 'test_user',
            status: 'pending',
            contentType: 'html',
            resourceType: 'Offical',
            category: self.state.selectedCategory,
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


    modifyPost() {
        const self = this;
        const config = {
            headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)},
            params:{
                id: self.props.match.params.postId
            }
        };
        axios.post(API_BASE_URL + '/resource/update', {
            title: self.state.title,
            content: self.state.content,
            category: self.state.selectedCategory,
        }, config)
            .then(function (response) {
                console.log('Reponse from modify post is ', response)
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

    handleSelectCategory(e){
        this.setState({selectedCategory: e.target.value})
    }

    redirectToShowPost(){
        this.props.history.push("/official")
    }

    redirectToManagePost(){
        this.props.history.push("/managePost")
    }

    render() {
        return (
            <div className="col-md-9">
                <br styles="clear:both"/>
                <div className="form-group">
                    <TextField id="title" name="title" label="Title" className="form-control"
                               variant="outlined" fullWidth required value={this.state.title}
                               onChange={this.handleTitleChange}/>
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
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel id="select-category-label">Category</InputLabel>
                        <Select
                            labelId="select-category-label"
                            id="select-category"
                            value={this.state.selectedCategory}
                            onChange={this.handleSelectCategory}
                            label="Category"
                        >
                            {
                                categories.map((category, index) => {
                                    return (
                                        <MenuItem value={category}>{category}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <Box
                    component="span"
                    m={1} //margin
                    className={this.props.classes.box}
                >
                    {
                        this.state.isModify ?
                            (<Button variant="contained" color="primary"
                                     onClick={this.modifyPost} name="submit">
                                Update Post
                            </Button>) :
                            (<Button variant="contained" color="primary"
                                     onClick={this.addPost} name="submit">
                                Submit Post
                            </Button>)
                    }
                    {
                        this.state.isModify ?
                            (<Button variant="contained" color="secondary"
                                     onClick={this.redirectToShowPost} name="cancel">
                                Cancel
                            </Button>):
                            (<Button variant="contained" color="secondary"
                                     onClick={this.redirectToManagePost} name="cancel">
                                Cancel
                            </Button>)
                    }
                </Box>
            </div>
        )
    }
}
export default withRouter(withStyles(styles, { withTheme: true })(AddPost));
