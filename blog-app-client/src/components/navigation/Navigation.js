import React, {Component} from 'react';
import NavItem from './NavItem';

export default class Navigation extends Component {

    render() {

        return (
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <NavItem navItemData={{route: '/', label: 'Home'}}/>
                    <NavItem navItemData={{route: '/add', label: 'Add'}}/>
                    <NavItem navItemData={{route: '/about', label: 'About'}}/>
                    <NavItem navItemData={{route: '/signin', label: 'Sign out'}}/>
                </ul>
            </div>
        );
    };
}
