import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {createPost} from '../../actions';

class AddPost extends Component {

    renderTitleField(field) {
        const formGroupClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={formGroupClassName}>
                <label><b>{field.title}</b></label>
                <input
                    className="form-control form-control-danger"
                    type="text"
                    {...field.input}
                    placeholder="Enter post title here"
                />
                <div className="form-control-feedback">
                    {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        )
    }

    renderTextAreaField(field) {
        const formGroupClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={formGroupClassName}>
                <label><b>{field.label}</b></label>
                <textarea
                    {...field.input}
                    className="form-control form-control-danger"
                    type="text"
                    rows={field.rows}
                    placeholder={field.placeholder}
                />
                <div className="form-control-feedback">
                    {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        }, () => {this.props.history.push("/signin")});
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="row">
                <div className="col-md-2"/>
                <div className="col-md-8">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            name="title"
                            label="Post title"
                            component={this.renderTitleField}
                        />
                        <Field
                            name="preview"
                            component={this.renderTextAreaField}
                            rows="3"
                            label="Post preview"
                            placeholder="Enter post preview here. This text will be displayed in main page of the blog"
                        />
                        <Field
                            name="post"
                            component={this.renderTextAreaField}
                            rows="6"
                            label="Post"
                            placeholder="Enter post text here. It will be displayed when you will select one particular post"
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/" className="btn btn-danger">Cancel</Link>
                    </form>
                </div>
                <div className="col-md-2"/>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Please add post title";
    }

    if (!values.preview) {
        errors.preview = "Please add post preview";
    }

    if (!values.post) {
        errors.post = "Please add post";
    }

    return errors;
}

export default reduxForm({
                             validate,
                             form: 'AddPostForm'
                         })(
    connect(null, {createPost})(AddPost));
