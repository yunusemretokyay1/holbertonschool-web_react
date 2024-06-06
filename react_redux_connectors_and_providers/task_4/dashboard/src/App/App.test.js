import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from "./App";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { fromJS } from 'immutable';

describe('Tests the App component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<App />);
    });
    it('Tests that App renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('should contain the Notifications component', () => {
        expect(wrapper.find('Notifications')).toHaveLength(1);
    });
    it('should contain the Header component', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
    });
    it('should contain the Login component', () => {
        expect(wrapper.find('Login')).toHaveLength(1);
    });
    it('should contain the Footer component', () => {
        expect(wrapper.find(Footer)).toHaveLength(1);
    });
    it('checks that CourseList is not displayed', () => {
        expect(wrapper.find('CourseList')).toHaveLength(0);
    });
});

describe('Tests the App component when isLoggedIn is true', () => {
    let user;
    let listNotifications
    beforeAll(() => {
        user = {
            email: 'hello@world.com',
            password: 'test123!',
            isLoggedIn: true
        };
        listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
            { id: 3, type: 'urgent', html: {__html: <strong>hello</strong>} }
        ];
    });
    it('Tests that the Login component is not included.', () => {
        const wrapper = shallow(<App isLoggedIn={true}/>);
        expect(wrapper.find('Login')).toHaveLength(0);
    });
    it('should contain the Notifications component', () => {
        const wrapper = shallow(<App isLoggedIn={true}/>);
        expect(wrapper.find('CourseList')).toHaveLength(1);
    });
    it('checks that markNotificationAsRead works as intended', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.state().listNotifications.length).toEqual(3);
        wrapper.instance().markNotificationAsRead(1);
        expect(wrapper.state().listNotifications.length).toEqual(2);
    });
});

describe('Tests suite to test the mapStateToProps function', () => {
    it('Tests that the function returns the right object when passing a specific state', () => {
        let state = {
            ui: fromJS({
                isUserLoggedIn: true
            })
        };
        expect(mapStateToProps(state)).toEqual({ isLoggedIn: true });
    });
});
