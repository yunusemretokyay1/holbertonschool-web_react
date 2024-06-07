import rootReducer from "./rootReducer";
import { Map } from 'immutable';

describe('Test suite for rootReducer', () => {
    it('Tests root reducer\' initial state', () => {
        const expectedState = {
            courses: Map({}),
            notifications: Map({}),
            ui: Map({})
        };
        const rootState = rootReducer(undefined, {});

        expect(rootState).toHaveProperty('courses');
        expect(rootState).toHaveProperty('notifications');
        expect(rootState).toHaveProperty('ui');

        for (const state in expectedState) {
            expect(typeof rootState[state]).toEqual(typeof expectedState[state]);
        }
    });
});
