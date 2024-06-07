import React from 'react';
import { shallow } from 'enzyme';
import { Notifications } from './Notifications';

describe('Tests the Notifications component with an empty array', () => {
    let fetchNotifications;
    beforeEach(() => {
        fetchNotifications = jest.fn();
    })
    afterEach(() => {
        jest.restoreAllMocks();
    })
    it('Tests that Notifications renders without crashing', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={fetchNotifications}/>);
        expect(wrapper.exists()).toBe(true);
    });
    it('Tests that Notifications renders 0 list item', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={fetchNotifications}/>);
        expect(wrapper.find('NotificationItem')).toHaveLength(0);
    });
    it('Tests that Notifications renders the good text', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={fetchNotifications}/>);
        const p = wrapper.find('[className^="notifications"] p');
        expect(wrapper.find('[className^="notifications"] p')).toHaveLength(1);
        expect(p.text()).toBe('No new notification for now');
    });
    it('Tests that the menu item is being displayed when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications  fetchNotifications={fetchNotifications}/>);
        expect(wrapper.find('[className^="menuItem"]')).toHaveLength(1);
    });
    it('Tests that the .Notifications is not being displayed when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications fetchNotifications={fetchNotifications} />);
        expect(wrapper.find('[className^="notifications"]')).toHaveLength(0);
    });
    it('Tests that the menu item is being displayed when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={fetchNotifications}/>);
        expect(wrapper.find('[className^="hidden"]')).toHaveLength(1);
    });
    it('Tests that the menu item is being displayed when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={fetchNotifications}/>);
        expect(wrapper.find('[className^="hidden"]')).toHaveLength(1);
    });
});

describe('Tests the Notifications component', () => {
    let wrapper;
    let listNotifications;
    let fetchNotifications;
    beforeAll(() => {
        listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: {__html: '<u>test</u>'} }
        ];
    });
    beforeEach(() => {
        fetchNotifications = jest.fn();
        wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} fetchNotifications={fetchNotifications}/>);
    })
    afterEach(() => {
        jest.restoreAllMocks();
    })
    it('Tests that Notifications renders 3 list items', () => {
        expect(wrapper.find('NotificationItem')).toHaveLength(3);
    });
    it('Tests that Notifications renders the good text', () => {
        const p = wrapper.find('[className^="notifications"] p');
        expect(wrapper.find('[className^="notifications"] p')).toHaveLength(1);
        expect(p.text()).toBe('Here is the list of notifications');
    });
    it('Tests that the first NotificationItem element renders the right html', () => {
        const p = wrapper.find('[className^="notifications"] NotificationItem:first-child');
        expect(p).toHaveLength(1);
    });
    it('Tests that when updating the props of the component with the same list, the component doesn’t rerender', () => {
        const renderSpy = jest.spyOn(Notifications.prototype, 'render');
        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} fetchNotifications={fetchNotifications}/>);

        wrapper.setProps({ listNotifications: listNotifications });
    
        expect(renderSpy).toHaveBeenCalledTimes(1);
        jest.restoreAllMocks();
    });
    it('Tests that when updating the props of the component with a longer list, the component does rerender', () => {
        const updatedList = [
            {id: 1,type: 'default',value: 'New course available'},
            {id: 2,type: 'urgent',value: 'New resume available'},
            {id: 3,type: 'urgent',html: {__html: '<u>test</u>'}},
            {id: 4,type: 'urgent',html: {__html: '<u>test</u>'}}
        ];
        const renderSpy = jest.spyOn(Notifications.prototype, 'render');
        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} fetchNotifications={fetchNotifications}/>);

        wrapper.setProps({ listNotifications: updatedList });
    
        expect(renderSpy).toHaveBeenCalledTimes(2);
        jest.restoreAllMocks();
    });
    it('checks that clicking on the menu item calls handleDisplayDrawer', () => {
        const handleDisplayDrawer = jest.fn();
        const wrapper = shallow(<Notifications listNotifications={listNotifications}
                                               handleDisplayDrawer={handleDisplayDrawer} fetchNotifications={fetchNotifications}/>);
        const menuItem = wrapper.find('[className^="menuItem"]');
        menuItem.simulate('click');
        expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
        handleDisplayDrawer.mockClear();
    });
    it('checks that clicking on the button calls handleHideDrawer', () => {
        const mockConsole = jest.spyOn(console, 'log').mockImplementation(() => {});
        const handleHideDrawer = jest.fn();
        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications}
                                               handleHideDrawer={handleHideDrawer} fetchNotifications={fetchNotifications}/>);
        const button = wrapper.find('button');
        button.simulate('click');
        expect(handleHideDrawer).toHaveBeenCalledTimes(1);
        handleHideDrawer.mockClear();
    });
    it('Tests that the function fetchNotifications is called when the component is mounted', () => {
        const fetchNotifications = jest.fn();
        shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} fetchNotifications={fetchNotifications}/>);
        expect(fetchNotifications).toHaveBeenCalledTimes(1);
    });
});
