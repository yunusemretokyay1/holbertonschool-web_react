export function getListCourses(state) {
    const courses = state.courses;
    if (courses) {
        return courses.valueSeq();
    }
    return courses;
}
