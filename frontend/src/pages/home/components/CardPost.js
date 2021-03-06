import React, {Component} from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deletePostAsync, votePostAsync} from "../../../actions/posts";
import {getCommentsAsync} from "../../../actions/comments";
import PropTypes from 'prop-types';

class CardPost extends Component {

    componentDidMount() {
        const {id} = this.props.post;
        this.props.getComments(id)
    }

    onDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            this.props.deletePost(id);
        }
    }

    onVote = (postId, vote) => {
        this.props.votePost(postId, vote);
    }


    render() {
        let {id, title, author, timestamp, category, voteScore, body} = this.props.post;
        let comments = this.props.comments.filter(x => x.parentId === id);
        return (
            <div className="card">

                <div className="title">
                    <Link to={`/${category}/${id}`}>
                        {title}
                    </Link>
                    <div className="buttons">
                        <Link className='button' to={`/edit/${id}`}><i className='fa fa-pencil'/></Link>
                        <button onClick={() => this.onDelete(id)} className="remove"><i className='fa fa-trash '/>
                        </button>
                    </div>
                </div>
                <div className="content">
                    <Link to={`/${category}/${id}`}>
                        {body.substring(0, 100)}
                        {body.length > 100 ? ( <b> ... Keep reading </b>  ) : ""}
                    </Link>
                </div>
                <Link to={`/${category}/${id}`}>
                    <div className="author">
                        <div className={"letter " + author[0].toLowerCase()}>{author[0]}</div>
                        <div className="name">{author}</div>
                        <div className="time">{moment(timestamp).fromNow()}</div>
                    </div>
                </Link>
                <div className="footer">

                    <div>
                        <Link to={`/${category}`}>
                            <span className="meta"><i className="fa fa-tag"/> {category}</span>
                        </Link>
                        <Link to={`/${category}/${id}`}>
                            <span className="meta"><i className="fa fa-comments"/> {comments.length} Comments</span>
                        </Link>
                    </div>

                    <div className="buttons">
                        <button onClick={() => this.onVote(id, 'upVote')}><i className='fa fa-thumbs-up'/></button>
                        <span>{voteScore}</span>
                        <button onClick={() => this.onVote(id, 'downVote')}><i className='fa fa-thumbs-down'/></button>
                    </div>
                </div>
            </div>
        );
    }
}

CardPost.propTypes = {
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => ({
    comments: state.comments
});

const mapDispatchToProps = dispatch => ({
    deletePost: (postId) => dispatch(deletePostAsync(postId)),
    votePost: (postId, vote) => dispatch(votePostAsync(postId, vote)),
    getComments: (postId) => dispatch(getCommentsAsync(postId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CardPost);
