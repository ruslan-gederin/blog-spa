import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Navigation from '../../components/navigation/Navigation';
import NavigationCheck from '../../components/navigation/NavigationCheck';
import NavigationBrandCheck from '../../components/navigation/NavigationBrandCheck';

class NavBar extends Component {

    renderNavBar() {
        return (
            <NavigationCheck isAuth={this.props.authenticated}>
                <Navigation />
            </NavigationCheck>
        );
    }

    renderNavBarBrand() {
        return (
            <NavigationBrandCheck isAuth={this.props.authenticated}/>
        );
    }

    render() {
        return (
            <nav
                className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse navbar-component">
                <button className="navbar-toggler navbar-toggler-right" type="button"
                        data-toggle="collapse" data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {this.renderNavBar()}
                {this.renderNavBarBrand()}
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(NavBar);