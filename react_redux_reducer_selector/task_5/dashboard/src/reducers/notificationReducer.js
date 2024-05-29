import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from "../actions/notificationActionTypes";
import { notificationsNormalizer } from "../schema/notifications";
import { Map } from 'immutable';

export const notificationsState = {
    notifications: [],
    filter: 'DEFAULT'
};

export function notificationReducer(state = Map(notificationsState), action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            const data = notificationsNormalizer(action.data);
            Object.keys(data.entities.notifications).forEach((item) => {
                data.entities.notifications[item].isRead = false;
            });
            return state.merge(data.entities);
        case MARK_AS_READ:
            return state.setIn(['notifications', action.index.toString(), 'isRead'], true);
        case SET_TYPE_FILTER:
            return state.set('filter', action.filter)
        default:
            return state;
    }
}
