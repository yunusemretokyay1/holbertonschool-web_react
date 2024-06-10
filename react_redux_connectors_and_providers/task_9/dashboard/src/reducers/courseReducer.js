import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "../actions/courseActionTypes";
import coursesNormalizer from "../schema/courses";
import { Map } from 'immutable';

export const courseState = [];

export function courseReducer(state = Map(courseState), action) {
    switch (action.type) {
        case 'FETCH_COURSE_SUCCESS':
            const data = coursesNormalizer(action.data);
            Object.keys(data.entities.courses).forEach((item) => {
                data.entities.courses[item].isSelected = false
            });
            return state.merge(data.entities.courses);
        case SELECT_COURSE:
            return state.setIn([action.index.toString(), "isSelected"], true);
        case UNSELECT_COURSE:
            return state.setIn([action.index.toString(), "isSelected"], false);
        default:
            return state;
    }
}
