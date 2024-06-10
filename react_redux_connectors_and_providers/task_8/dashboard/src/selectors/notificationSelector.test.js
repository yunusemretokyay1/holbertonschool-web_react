import { notificationReducer } from "../reducers/notificationReducer";
import { FETCH_NOTIFICATIONS_SUCCESS } from "../actions/notificationActionTypes";
import { filterTypeSelected, getNotifications, getUnreadNotifications } from "./notificationSelector";
import { markAsAread } from "../actions/notificationActionCreators";
import { Map, fromJS } from 'immutable';

describe('Test suite for notification selcetors', () => {
    it('Tests that filterTypeSelected works as expected', () => {
        const state = notificationReducer(undefined, {});
        expect(filterTypeSelected(state.toJS())).toEqual(state.toJS().filter);
    });
    it('Tests that getNotifications returns a list of the message entities within the reducer', () => {
        const action = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
              { id: 1, type: "default", value: "New course available" },
              { id: 2, type: "urgent", value: "New resume available" },
              { id: 3, type: "urgent", value: "New data available"}
            ]
        };
        const state = notificationReducer(undefined, action);
        expect(getNotifications(state.toJS())).toEqual(Map(state.toJS().notifications));
    });
    it('Tests that getUnreadNotifications returns a list of the message entities within the reducer', () => {
        const initialState = {
            notifications: fromJS({})
        };
        const fetchAction = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
                {
                  "id": "5debd76480edafc8af244228",
                  "author": {
                    "id": "5debd764a7c57c7839d722e9",
                    "name": {
                      "first": "Poole",
                      "last": "Sanders"
                    },
                    "email": "poole.sanders@holberton.nz",
                    "picture": "http://placehold.it/32x32",
                    "age": 25
                  },
                  "context": {
                    "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
                    "isRead": true,
                    "type": "urgent",
                    "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                  }
                },
                {
                    "id": "5debd764507712e7a1307303",
                    "author": {
                      "id": "5debd7648ba8641ce0a34ea4",
                      "name": {
                        "first": "Norton",
                        "last": "Grimes"
                      },
                      "email": "norton.grimes@holberton.nz",
                      "picture": "http://placehold.it/32x32",
                      "age": 37
                    },
                    "context": {
                      "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
                      "isRead": false,
                      "type": "urgent",
                      "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. "
                    }
                  }
            ]
        }
        initialState.notifications = notificationReducer(undefined, fetchAction);
        const unread = getUnreadNotifications(initialState);
        expect(unread.count()).toBe(1);
        expect(unread.toJS()[0]['guid']).toBe('cec84b7a-7be4-4af0-b833-f1485433f66e');
    });
});
