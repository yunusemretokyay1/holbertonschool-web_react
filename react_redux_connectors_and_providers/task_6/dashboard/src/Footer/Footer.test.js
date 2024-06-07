import React from 'react';
import { shallow } from 'enzyme';
import { Footer} from "./Footer";

describe('Tests the Footer component', () => {
    it('Tests that Footer renders without crashing', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toBe(true);
    });
    it('Tests that the component at the very least renders the text “Copyright”', () => {
        const wrapper = shallow(<Footer text='Copyright'/>);
        const p = wrapper.find('p');
        expect(p.text()).toBe(`Copyright`);
    });
    it('Tests that the link is not displayed when the user is logged out within the context', () => {
        const wrapper = shallow(<Footer text='Copyright'/>);
        expect(wrapper.find('a')).toHaveLength(0);
    });
    it('Tests that the link is displayed when the user is logged in within the context', () => {
        const wrapper = shallow(<Footer text='Copyright' user={{}}/>);
        expect(wrapper.find('a')).toHaveLength(1);
    });
});
