import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "./courseActionTypes";

export function selectCourse(index) {
    return {
        type: SELECT_COURSE,
        index
    };
}

export function unSelectCourse(index) {
    return {
        type: UNSELECT_COURSE,
        index
    };
}

export function setCourses(data) {
    return {
        type: FETCH_COURSE_SUCCESS,
        data
    };
}

export function fetchCourses() {
    return function(dispatch) {
        return fetch('http://localhost:8564/courses.json')
        .then((data) => data.json())
        .then((data) => dispatch(setCourses(data)))
        .catch((err) => console.log(err));
    };
}
