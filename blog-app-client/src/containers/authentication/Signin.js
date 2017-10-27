import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {signinUser, signoutUser} from '../../actions';
import SigninAlert from '../../components/authentication/SigninAlert'

class Signin extends Component {

    componentWillMount() {
        this.props.signoutUser();
    }

    handleFormSubmit({email, password}) {
        this.props.signinUser({email, password}, () => {
            this.props.history.push("/");
        });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <SigninAlert
                    alert = {this.props.errorMessage}
                />
            );
        }
    }

    renderField(field) {
        const formGroupClassName = `form-group ${field.meta.touched && field.meta.error
            ? 'has-danger' : ''}`;

        return (
            <div className={formGroupClassName}>
                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon"><i className={field.icon}></i></div>
                    <input
                        className="form-control form-control-danger"
                        type={field.type}
                        placeholder={field.placeholder}
                        {...field.input}
                    />

                </div>
                <div className="form-control-feedback">
                    {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        )
    }

    render() {

        const {handleSubmit, fields: {email, password}} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2>Please Login</h2>
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Field
                            name="email"
                            label="User email"
                            placeholder="you@example.com"
                            icon="fa fa-at"
                            type="text"
                            component={this.renderField}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Field
                            name="password"
                            label="User password"
                            placeholder="Password"
                            icon="fa fa-key"
                            type="password"
                            component={this.renderField}
                        />
                    </div>
                </div>


                <div className="row login-btn">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {this.renderAlert()}
                        <button type="submit" className="btn btn-success"><i
                            className="fa fa-sign-in"></i> Login
                        </button>
                        <Link to="/signup" className=" btn btn-link post-details-controls">Signup</Link>
                    </div>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Please fill email";
    }

    if (!values.password) {
        errors.password = "Please fill password";
    }

    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

export default reduxForm({
                             validate,
                             form: 'signin',
                             fields: ['email', 'password']
                         })(connect(mapStateToProps, {signinUser, signoutUser})(Signin));


