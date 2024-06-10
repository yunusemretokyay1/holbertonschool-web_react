import React from 'react';
import { NotificationsContainer } from "./NotificationsContainer";
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

describe('Tests the NotificationsContainer component', () => {
    let listNotifications;
    beforeAll(() => {
        listNotifications = fromJS([
            { guid: 1, type: 'default', value: 'New course available' },
            { guid: 2, type: 'urgent', value: 'New resume available' },
            { guid: 3, type: 'urgent', html: {__html: '<u>test</u>'} }
        ]);
    });
    it('Tests that the function fetchNotifications is called when the component is mounted', () => {
        const fetchNotifications = jest.fn();
        shallow(<NotificationsContainer displayDrawer={true} listNotifications={listNotifications} fetchNotifications={fetchNotifications}/>);
        expect(fetchNotifications).toHaveBeenCalledTimes(1);
    });
});
