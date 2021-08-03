import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../../constants/apiConstants";
import parse from "html-react-parser";
import SearchField from "react-search-field";


export default class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.searchOnChange = this.searchOnChange.bind(this);
        this.redirectToAddPost = this.redirectToAddPost.bind(this);
    }

    componentDidMount() {
        var self = this;
        axios.get(API_BASE_URL + '/resource/all', {})
            .then(function (response) {
                self.setState({posts: response.data})
            })
            .catch(function (error) {
                console.log('error is ', error);
            });
    }

    searchOnChange(value, event){
        console.log(value)

        var self = this;
        if(value != ""){
            axios.get(API_BASE_URL + '/search/resource', {
                params: {
                    word: value
                }
            })
                .then(function (response) {
                    self.setState({posts: response.data}, ()=>{
                        console.log("Calledd!!!")
                    })
                })
                .catch(function (error) {
                    console.log('error is ', error);
                });
        }
    }

    redirectToAddPost(){
        this.props.history.push("/AddPost")
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.redirectToAddPost} id="addPost" name="Create Post"
                        className="btn btn-primary pull-right">Create Post
                </button>
                <div className="search-bar">
                    <SearchField
                        placeholder="Search Posts..."
                        onChange={this.searchOnChange}
                        // searchText="This is initial search text"
                        classNames="test-class"
                    />
                </div>
                <div className="list-group">
                    {
                        this.state.posts.map(function (post, index) {
                            return <a href="#" key={index} className="list-group-item active">
                                <h4 className="list-group-item-heading">{post.title}</h4>
                                <div>
                                    {post.contentType && post.contentType === "html"
                                        ? <p className="list-group-item-text">{parse(post.content)}</p>
                                        : <p className="list-group-item-text">{post.content}</p>
                                    }
                                </div>
                            </a>
                        })
                    }
                </div>
            </div>
        )
    }
}
