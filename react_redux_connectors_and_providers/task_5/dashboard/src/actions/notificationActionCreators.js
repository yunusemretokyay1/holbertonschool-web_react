import {
    MARK_AS_READ,
    SET_TYPE_FILTER,
    SET_LOADING_STATE,
    FETCH_NOTIFICATIONS_SUCCESS
} from "./notificationActionTypes";

export function markAsAread(index) {
    return {
        type: MARK_AS_READ,
        index
    };
}

export function setNotificationFilter(filter) {
    return {
        type: SET_TYPE_FILTER,
        filter
    };
}
