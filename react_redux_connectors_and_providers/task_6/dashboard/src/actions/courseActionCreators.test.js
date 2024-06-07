import { selectCourse, unSelectCourse } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

describe('Action creators tests', () => {
    it('Tests the selectCourse action', () => {
        expect(selectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
    });
    it('Tests the unSelectCourse action', () => {
        expect(unSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
    });
});
