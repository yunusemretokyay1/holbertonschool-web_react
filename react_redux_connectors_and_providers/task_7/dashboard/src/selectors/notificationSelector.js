import { Map } from 'immutable';

export function filterTypeSelected(state) {
    return state.filter;
}

export function getNotifications(state) {
    const notifications = state.notifications;

    return Map(notifications);
}

export function getUnreadNotifications(state) {
    const notifications = state.notifications.get('messages');
    
    if (notifications) {
        const unread = notifications.valueSeq().filter((notif) => notif.get('isRead') === false);
        return unread;
    }
    return notifications;
}
