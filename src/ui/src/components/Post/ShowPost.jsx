import React from 'react';
import axios from 'axios';
import moment from 'moment';
import parse from 'html-react-parser';
import {withRouter} from "react-router-dom";

import {ACCESS_TOKEN_NAME, API_BASE_URL} from '../../constants/apiConstants';

import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

import Comments from "../Comments/Comments";
import Vote from "../Vote/Vote";
import PostHeader from "./PostHeader";
import PostTitle from "./PostTitle";
import {resourceMap} from "../../utils/resourceMap";
import {categories} from "./categories";


const styles = (theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop:theme.spacing(4),
        [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
            width: 1400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        flex: 1
    },
    contentLayout: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    emptyContentLayout: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        minHeight: '80vh'
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    root: {
        padding: theme.spacing(3, 3, 0, 3),
    },
    title: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    post: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    bold: {
        padding: theme.spacing(2),
        fontWeight: 500
    },
    content: {
        paddingLeft: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(1, 0, 3, 3),
        background: '#FFC100',
        color: 'white',
        borderRadius: 10,
        height: '40px',
        '&:hover': {
          backgroundColor: 'white',
          color: '#ffbf00',
          },
    },
    write: {
        margin: theme.spacing(1, 0, 3, 3),
        background: 'black',
        color: '#FFC100',
        borderRadius: 10,
        height: '40px',
        // '&:hover': {
        //   color: 'white',
        //   },
    },
    searchBox: {
        borderRadius: '20px'
    }
})

class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            displayPosts: [],
            searchSuggestions: [],
            displaySearchQuery: "",
            curPost: null,
            searchQuery: "",
            activeTabIndex: 0,
            resourceType: props.resourceType,
            selectedCategory: props.match.params && props.match.params.category?props.match.params.category:''
        };
        this.searchOnChange = this.searchOnChange.bind(this);
        this.getAllPost = this.getAllPost.bind(this);
        this.redirectToAddPost = this.redirectToAddPost.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.updateCurrentPost = this.updateCurrentPost.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleCancelSearch = this.handleCancelSearch.bind(this);
        this.handleSelectSearch = this.handleSelectSearch.bind(this);
        this.updateViewCount = this.updateViewCount.bind(this);
        this.search = this.search.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.applySearchFilter = this.applySearchFilter.bind(this);
    }

    componentDidMount() {
        this.getAllPost()
    }

    applyFilter(){
        console.log("Apply display filter")
        var displayPosts = this.state.allPosts.filter( (post) =>
            {
                return post.resourceType === this.state.resourceType &&
                    (this.state.selectedCategory === '' || this.state.selectedCategory === 'all' || post.category === this.state.selectedCategory)
            }
        );
        if (this.state.activeTabIndex === 0){
            // sort by timestamp
            displayPosts.sort((x, y) => {
                // console.log(moment(y.updateAt,'MMMM Do YYYY, h:mm:ss a').diff(moment(x.updateAt, 'MMMM Do YYYY, h:mm:ss a')))
                return moment(y.updateAt,'MMMM Do YYYY, h:mm:ss a').diff(moment(x.updateAt,'MMMM Do YYYY, h:mm:ss a'))
            })
        }else {
            // sort by views and vote
            displayPosts.sort((x, y) => {
                return y.voteCount + y.viewCount - x.voteCount - x.viewCount
            })
        }
        this.setState({displayPosts:displayPosts})
    }

    // Same filter but apply to search suggestion
    applySearchFilter(){
        console.log("Apply search filter")
        var searchSuggestions = this.state.searchSuggestions.filter( (post) =>
            {
                return post.resourceType === this.state.resourceType &&
                    (this.state.selectedCategory === '' || this.state.selectedCategory === 'all' || post.category === this.state.selectedCategory)
            }
        );
        console.log(searchSuggestions)
        if (this.state.activeTabIndex === 0){
            // sort by timestamp
            searchSuggestions.sort((x, y) => {
                // console.log(moment(y.updateAt,'MMMM Do YYYY, h:mm:ss a').diff(moment(x.updateAt, 'MMMM Do YYYY, h:mm:ss a')))
                return moment(y.updateAt,'MMMM Do YYYY, h:mm:ss a').diff(moment(x.updateAt,'MMMM Do YYYY, h:mm:ss a'))
            })
        }else {
            // sort by views and vote
            searchSuggestions.sort((x, y) => {
                return y.voteCount + y.viewCount - x.voteCount - x.viewCount
            })
        }
        this.setState({searchSuggestions:searchSuggestions})
    }

    getAllPost(){
        var self = this;
        axios.get(API_BASE_URL + '/resource/all', {})
            .then(function (response) {
                self.setState({allPosts: response.data}, ()=> {self.applyFilter()})

            })
            .catch(function (error) {
                console.log('error is ', error);
                self.props.showError("Posts failed to load.");
            });
    }

    search() {
        var self = this;
        if(this.state.searchQuery !== "" && this.state.searchQuery.length > 3){
            axios.get(API_BASE_URL + '/search/resourceFuzzy', {
                params: {
                    word: this.state.searchQuery
                }
            })
                .then(function (response) {
                    self.setState({allPosts: response.data, displaySearchQuery: self.state.searchQuery}, ()=> {self.applyFilter()})
                })
                .catch(function (error) {
                    console.log('error is ', error);
                    self.props.showError("Search failed.");
                });
        }else{
            self.props.showError("Search query is empty or too short.");
        }
    }

    searchOnChange(event, value){
        var self = this;
        this.setState({searchQuery: value})
        if(value !== "" && value.length > 3){
            axios.get(API_BASE_URL + '/search/resourceFuzzy', {
                params: {
                    word: value
                }
            })
                .then(function (response) {
                    self.setState({searchSuggestions: response.data}, ()=> {self.applySearchFilter()})
                })
                .catch(function (error) {
                    console.log('error is ', error);
                    self.props.showError("Search failed");
                });
        }
    }

    redirectToAddPost(){
        var self = this
        axios.get(API_BASE_URL + '/user/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
            .then(function (response) {
                if ( response.status !== 202) {
                    self.redirectToLogin()
                } else {
                    self.props.history.push(`/AddPost/${self.state.resourceType}`)
                }
            })
            .catch(function (error) {
                self.redirectToLogin()
            });
    }

    redirectToLogin() {
        if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
            localStorage.removeItem(ACCESS_TOKEN_NAME)
        }
        this.props.history.push('/login');
    }


    updateCurrentPost(curPost){
        this.setState({curPost: curPost })
        this.updateViewCount(curPost.id)
    }

    updateViewCount(resourceId){
        const config = {
            params:{
                id: resourceId
            }
        };
        axios.get(API_BASE_URL + '/resource/updateViewCount', config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Success");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChangeTab(event, value){
        this.setState({ activeTabIndex: value },()=> {this.applyFilter()});
    }

    handleSelectCategory(e){
        this.setState({selectedCategory: e.target.value},()=> {this.applyFilter()})
    }

    handleCancelSearch(){
        this.setState({searchSuggestions: [], searchQuery: '', displaySearchQuery: ''} )
        this.getAllPost();
    }

    handleSelectSearch(event, value){
        console.log(value)
        if (typeof value === "unefined" || value === null) {
            return;
        }
        this.setState({searchQuery: value.title}, ()=>{
            this.search()
        })
    }

    renderPostList(){
        const { activeTabIndex } = this.state;
        const height = this.state.resourceType === 'Service' ? 850 : 780;
        var self = this
        return (
            <Grid container component={Paper} elevation={3} >
                <Grid container xs={12} className={self.props.classes.root}>
                    <Grid item xs={9} sm={9} md={9}>
                        <Autocomplete
                            options={self.state.searchSuggestions}
                            className={self.props.classes.searchBox}
                            freeSolo
                            selectOnFocus
                            inputValue={self.state.searchQuery}
                            /*onInputChang is called when typing a new letter*/
                            onInputChange={this.searchOnChange}
                            /* onChange is called when an option is selected */
                            // Todo: fix this!!!
                            // When I add onChange, pressing enter breaks the website
                            // couldn't get it to work, similar issue here: https://github.com/mui-org/material-ui/issues/18123
                            // onChange={this.handleSelectSearch}
                            getOptionLabel={(option)=> option.title ? option.title : '' }
                            renderInput={(params) => (
                                <TextField {...params} label="Search Here" variant="outlined"
                                    // Try to get enter key to work without pressing on the search button
                                           onKeyDown={e => {
                                    if (e.keyCode === 13 && e.target.value) {
                                        // setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                                        console.log(e.target.value)
                                        // self.setState({searchQuery: e.target.value, displaySearchQuery: e.target.value})
                                        self.search()
                                    }}}
                                />
                                )}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={self.props.classes.submit}
                            onClick={this.search}
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid container xs={12} className={self.props.classes.title}>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h5" component="h5">
                                {resourceMap[this.state.resourceType]}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth >
                                <InputLabel id="select-category-label">Category</InputLabel>
                                <Select
                                    labelId="select-category-label"
                                    id="select-category"
                                    value={this.state.selectedCategory}
                                    onChange={this.handleSelectCategory}
                                    label="Category"
                                >
                                    <MenuItem value={"all"}>ALL</MenuItem>
                                    {
                                        categories.map((category, index) => {
                                            return (
                                                <MenuItem value={category}>{category}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    { this.state.resourceType !== 'Service' && 
                        (
                            <Grid container xs={12}>
                                <Grid item xs={9}>
                                    <Tabs value={activeTabIndex} onChange={this.handleChangeTab} variant="fullWidth" centered>
                                        <Tab label="Recent" />
                                        <Tab label="Trending" />
                                    </Tabs>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={this.redirectToAddPost} id="addPost"
                                        className={this.props.classes.write}>New
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
                
                <Grid container component={Paper} elevation={0} style={{minHeight: height, maxHeight: height, overflow: 'auto'}} >
                    { this.state.displayPosts.length?
                        (
                            <Grid container xs={12} className={this.props.classes.list}>
                                {
                                    this.state.displaySearchQuery && this.state.displaySearchQuery!== "" &&
                                    (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                            <Typography variant="subtitle1" component="subtitle1" color='textSecondary' className={this.props.classes.content}>
                                                Search result for "{this.state.displaySearchQuery}"
                                            </Typography>
                                            <IconButton edge="end" aria-label="edit" onClick={this.handleCancelSearch}>
                                                 <ClearIcon />
                                            </IconButton>
                                        </div>
                                    )
                                }
                                {
                                    this.state.displayPosts.map((post, index) => {
                                        return <PostTitle resourceType={this.state.resourceType} value={post} onClick={self.updateCurrentPost} classes={this.props.classes}/>
                                    })
                                }
                            </Grid>
                        ):
                        (
                            <Grid container component={Paper} elevation={0} className={self.props.classes.title} alignItems="flex-start" justify="center">
                                <Typography  variant="subtitle1" component="subtitle1" color='textSecondary'>
                                    No Result Found
                                </Typography>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>  
        )
    }

    renderContent(){
        if (this.state.displayPosts.length === 0){
            // Empty content
            return (
                <Grid 
                    container 
                    component={Paper} 
                    elevation={3} 
                    className={this.props.classes.root} 
                    alignItems="center"
                    justify="center"
                    style={{minHeight: 1055, overflow: 'auto'}}>
                    <Typography  variant="subtitle1" component="subtitle1" align="center" color='textSecondary'>
                        No Post Selected
                    </Typography>
                </Grid>
            )
        }else {
            if(!this.state.curPost){
                this.state.curPost = this.state.displayPosts[0]
            }
            const curPost = this.state.curPost
            return (
                    <Grid container xs component={Paper} elevation={3} style={{minHeight: 1055, maxHeight: 1055, overflow: 'auto'}} className={this.props.classes.post}>
                        <Grid container xs={12}>
                            <Grid item xs={9} sm={9} md={9}>
                                <PostHeader post={curPost}/>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3}>
                                <Vote vote={curPost.voteCount} postId={curPost.id} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h5" component="h5" className={this.props.classes.bold}>
                                    {curPost.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.content}>
                                {curPost.contentType && curPost.contentType === "html"
                                    ? <p className="list-group-item-text">{parse(curPost.content)}</p>
                                    : <p className="list-group-item-text">{curPost.content}</p>
                                }
                            </Grid>
                            <Grid item xs={12} className={this.props.classes.title}>
                                <Comments postId={curPost.id} showError={this.props.showError}/>
                            </Grid>
                        </Grid>
                    </Grid>
            )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={2} className={classes.layout}>
                    <Grid item xs={4} sm={4} md={4}>
                        {
                            this.renderPostList()
                        }
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        {
                            this.renderContent()
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(ShowPost));
