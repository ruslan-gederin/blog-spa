import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signupUser} from '../../actions';
import SigninAlert from '../../components/authentication/SigninAlert'

class Signup extends Component {


    handleFormSubmit({email, password}) {
        this.props.signupUser({email, password}, () => {
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

    render (){
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2>Register New Bootlegger</h2>
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Field
                            name="email"
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
                            placeholder="enter your password here"
                            icon="fa fa-key"
                            type="password"
                            component={this.renderField}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Field
                            name="passwordConfirm"
                            placeholder="confirm your password here"
                            icon="fa fa-repeat"
                            type="password"
                            component={this.renderField}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3"></div>

                    <div className="col-md-6">
                        {this.renderAlert()}
                        <button type="submit" className="btn btn-success"><i className="fa fa-user-plus"></i> Register</button>
                        <Link to="/signin" className=" btn btn-link post-details-controls">Signin</Link>
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

    if (!values.passwordConfirm) {
        errors.passwordConfirm = "Please fill password confirmation";
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}
export default reduxForm({
                            validate,
                             form: 'signin',
                             fields: ['email', 'password', 'passwordConfirm']
                         })(connect(mapStateToProps, {signupUser})(Signup));
