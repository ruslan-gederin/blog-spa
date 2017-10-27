import React from "react";
import {Link} from 'react-router-dom';

const NavItem = ({navItemData}) => {

    return (
        <li className="nav-item ">
            <Link className="nav-link" to={navItemData.route}>{navItemData.label}</Link>
        </li>
    );

};

export default NavItem;