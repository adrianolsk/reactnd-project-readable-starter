import React, {Component} from 'react';

class Comment extends Component {

    render() {
        let {comment} = this.props;
        return (
            <div>
                <p>{comment.author}</p>
                <span>{comment.body}</span>
                <p>Votes: {comment.voteScore}</p>
                <button onClick={() => this.props.onDelete(comment.id)}>DELETE</button>
                <button onClick={() => this.props.onVote(comment.id, 'upVote')}>Vote Up</button>
                <button onClick={() => this.props.onVote(comment.id, 'downVote')}>Vote Down</button>
                <hr/>
            </div>
        );
    }
}

export default Comment;