import React, {Component} from 'react';

const NavigationCheck = ({children, isAuth}) => {
    return isAuth ? children : <div></div>;
};

export default NavigationCheck;
