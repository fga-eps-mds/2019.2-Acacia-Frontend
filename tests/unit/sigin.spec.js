import Vue from 'vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('actions', () => {
    let http;
    let store;

    beforeAll(() => {
        http = new MockAdapter(axios);
        store = new Vue.observable({});
    });

    afterEach(() => {
        http.reset();
    });

    afterAll(() => {
        http.restore();
    });

    it('calls login and sets the flash messages', () => {
        const fakeData = {'email':  'email', 'password': 'password'};
        http.onPost('signin').reply(200, { data: fakeData });
        return store.dispatch('login')
            .then(() => expect(store.state.messages).toHaveLength(1));
    });
    // etc.
});
