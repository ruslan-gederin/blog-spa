import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () =>
    <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
        <p><Link to="/" className=" btn btn-link post-details-controls">Go to blog's main page</Link></p>
    </div>

export default NotFound;