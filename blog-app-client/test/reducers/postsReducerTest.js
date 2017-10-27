import {expect} from '../testHelper';
import {FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST} from '../../src/actions/index';
import postsReducer from '../../src/reducers/postsReducer';

describe('Posts Reducer', () => {
    const initialState = {};

    const postFromApi = {
        id: 'testid', title: 'title', preview: 'preview', post: 'post'
    };

    const stateAfterFetch = {
        testid: postFromApi
    };

    it('handles action with unknown type', () => {
        expect(postsReducer(initialState, {})).to.eql(initialState);
    });

    it('handles DELETE_POST action', () => {
        const action = { type: DELETE_POST, payload: 'payload' };
        expect(postsReducer(initialState, action)).to.eql(initialState);
    });

    it('handles CREATE_POST action', () => {
        const action = { type: CREATE_POST, payload: 'payload' };
        expect(postsReducer(initialState, action)).to.eql(initialState);
    });

    it('handles FETCH_POST action', () => {
        const action = { type: FETCH_POST, payload: {data: postFromApi} };
        expect(postsReducer(initialState, action)).to.eql(stateAfterFetch);
    });
});