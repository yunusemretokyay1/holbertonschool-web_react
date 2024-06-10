import { Map } from 'immutable';
import { createSelector } from 'reselect'

export function filterTypeSelected(state) {
    return state.filter;
}

export function getNotifications(state) {
    const notifications = state.notifications;

    return Map(notifications);
}

export const getUnreadNotificationsByType = createSelector(
    (state) => state.notifications.get('filter'),
    (state) => state.notifications.get('messages'),
    (filter, listNotifications) => {
        if (!listNotifications) return listNotifications;
        else if (filter === 'URGENT') {
            return listNotifications.valueSeq().filter((notif) => notif.get('isRead') === false && notif.get('type') === 'urgent');
        }
        return listNotifications.valueSeq().filter((notif) => notif.get('isRead') === false);
    }
);
