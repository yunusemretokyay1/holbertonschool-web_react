import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from "./notificationActionTypes";
import { markAsAread, setNotificationFilter } from "./notificationActionCreators";

describe('Notification Action creators tests', () => {
    it('Tests the login action', () => {
        expect(markAsAread(1)).toEqual({ type: MARK_AS_READ, index: 1 });
    });
    it('Tests the logout action', () => {
        const defaultAction = {
            type: SET_TYPE_FILTER,
            filter: 'DEFAULT'
        }
        const urgentAction = {
            type: SET_TYPE_FILTER,
            filter: 'URGENT'
        }
        expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual(defaultAction);
        expect(setNotificationFilter(NotificationTypeFilters.URGENT)).toEqual(urgentAction);
    });
});
