import { selectCourse } from "../actions/courseActionCreators";
import { displayNotificationDrawer } from "../actions/uiActionCreators";
import { appInitialState, uiReducer } from "./uiReducer";

describe('Test suite for uiReducer', () => {
    it('Tests uiReducer when no action is passed', () => {
        expect(uiReducer(undefined, {}).toJS()).toEqual(appInitialState);
    });
    it('Tests uiReducer when the action SELECT_COURSE is passed', () => {
        const action = selectCourse();
        expect(uiReducer(undefined, action).toJS()).toEqual(appInitialState);
    });
    it('Tests uiReducer when the action DISPLAY_NOTIFICATION_DRAWER is passed', () => {
        const expectedState = {
            ...appInitialState,
            isNotificationDrawerVisible: true
        };
        const action = displayNotificationDrawer();
        expect(uiReducer(undefined, action).toJS()).toEqual(expectedState);
    });
});
