import { selectCourse, unSelectCourse, fetchCourses } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE, SET_COURSES, FETCH_COURSE_SUCCESS } from "./courseActionTypes";
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('Action creators tests', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    it('Tests the selectCourse action', () => {
        expect(selectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
    });
    it('Tests the unSelectCourse action', () => {
        expect(unSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
    });
    it('Tests that the fetch is working correctly', () => {
        const store = mockStore({});

        fetchMock.get('http://localhost:8564/courses.json', {
            status: 200,
            body: [],
        });

        const expectedActions = [
            {
                type: FETCH_COURSE_SUCCESS,
                data: []
            }
        ];

        return store.dispatch(fetchCourses()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
