import * as JSONData from '../../dist/notifications.json';
import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const message = new schema.Entity('messages', {}, {
    idAttribute: 'guid'
});

const notification = new schema.Entity('notifications', {
    author: user,
    context: message
});

const normalizedData = normalize(JSONData.default, [notification]);

export { normalizedData };

export default function getAllNotificationsByUser(userId) {
    const allContexts = [];
    const notifications = normalizedData.entities.notifications;
    const messages = normalizedData.entities.messages;

    for (const notifId in notifications) {
        if (notifications[notifId].author === userId) {
            allContexts.push(messages[notifications[notifId].context])
        }
    }

    return allContexts;
}

export function notificationsNormalizer(data) {
    return normalize(data, [notification]);
}
