import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import {fetchPosts} from '../../actions';

class PostsList extends Component {

    componentDidMount() {
        this.props.fetchPosts(() => {
            this.props.history.push("/signin");
        });
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <div>
                    <div className="row">
                        <div key={post._id}>
                            <div className="row"><h2>{post.title}</h2></div>
                            <div className="row"><p>{post.preview}</p></div>
                            <div className="row">
                                <p><Link className="btn btn-secondary" to={`/post/${post._id}`}
                                         role="button">View details &raquo;</Link></p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            );
        });
    }

    renderPostCount() {
        return (
            <div >
                <h5>Number of posts: {Object.keys(this.props.posts).length}</h5>
            </div>
        );
    }

    renderLatestPosts() {
        return _.map(this.props.posts, post => {
            return (
                <div key={post._id}>
                    <Link to={`/post/${post._id}`} className="list-group-item">{post.title}</Link>
                </div>
            );
        }).slice(0, 5);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        {this.renderPostCount()}
                        <ul className="list-group">
                            <h5>Latest posts</h5>
                            <br/>
                            {this.renderLatestPosts()}
                        </ul>
                    </div>

                    <div className="col-md-8">
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};
}

//connect component with action creator
export default connect(mapStateToProps, {fetchPosts})(PostsList)
