import React, {Component} from 'react';

const NavigationBrandCheck = ({isAuth}) => {
    return isAuth ?  <text className="navbar-brand">You are logged in as: {localStorage.getItem('user')}</text>
        : <text className="navbar-brand">Please singin or signup</text>;
};

export default NavigationBrandCheck;
