import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchPost, deletePost} from '../../actions';


class PostDetails extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id, () => {
            this.props.history.push('/signin');
        });
    }

    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    renderDeleteButton(){
            if (localStorage.getItem('role') !== 'user'){
                return (
                    <button
                        onClick={this.onDeleteClick.bind(this)}
                        className="float-right post-details-controls btn btn-link">
                        Delete post
                    </button>
                );
            } else {
                return (
                   <div></div>
                );
            }
    }

    render() {
        const {post} = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (

            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">

                    {this.renderDeleteButton()}
                    <Link to="/" className="float-right btn btn-link post-details-controls">Back to main page </Link>
                    <div className="row"><h2>{post.title}</h2></div>
                    <div className="row"><p>{post.post}</p></div>
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }

}

function mapStateToProps({posts}, ownProps) {
    return {post: posts [ownProps.match.params._id]};

}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostDetails);