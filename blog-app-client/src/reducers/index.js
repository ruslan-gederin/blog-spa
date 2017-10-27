import { combineReducers } from 'redux';
import PostsReducer from './postsReducer';
import AuthReducer from './authReducer'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
