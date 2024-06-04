import { Map } from 'immutable';

export function filterTypeSelected(state) {
    return state.filter;
}

export function getNotifications(state) {
    const notifications = state.notifications;

    return Map(notifications);
}

export function getUnreadNotifications(state) {
    const notifications = state.notifications;
    const unreadNotifications = Object.values((notifications)).filter((notif) => !notif.isRead);

    return Map(unreadNotifications.map((notif) => [notif.id, notif]));
}
