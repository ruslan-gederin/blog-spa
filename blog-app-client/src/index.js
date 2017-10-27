import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {BrowserRouter, Route, Switch, NotFoundRoute} from 'react-router-dom';
import promise from 'redux-promise';

import PostsList from './containers/post/PostsList';
import AddPost from './containers/post/AddPost';
import PostDetails from './containers/post/PostDetails';
import NavBar from './containers/navbar/NavBar';
import About from './components/about/About';
import Signin from './containers/authentication/Signin';
import Signup from './containers/authentication/Signup';
import RequireAuth from './containers/authentication/RequireAuthentication';
import NotFound from './components/navigation/NotFound';

import reduxThunk from 'redux-thunk';

import { AUTH_USER } from './actions';


//apply redux-promise middleware
const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

/*const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
    // we need to update application state
    store.dispatch({ type: AUTH_USER });
}
*/



ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/add" component={RequireAuth(AddPost)}/>
                    <Route path="/about" component={RequireAuth(About)}/>
                    <Route path="/post/:id" component={RequireAuth(PostDetails)}/>
                    <Route exact path="/" component={RequireAuth(PostsList)}/>
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.main'));

