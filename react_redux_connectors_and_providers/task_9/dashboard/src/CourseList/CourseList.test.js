import React from "react";
import { shallow } from 'enzyme';
import { CourseList } from "./CourseList";

describe('Tests the CourseList component with an empty array', () => {
    it('Tests that CourseList renders without crashing', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper.exists()).toBe(true);
    });
    it('Tests that CourseList rendrers correctly if we do not pass a list prop', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper.find('CourseListRow')).toHaveLength(3);
    });
});

describe('Tests the CourseList component', () => {
  let listCourses;
  beforeEach(() => {
    listCourses = [
      {
        id: 1,
        name: 'ES6',
        credit: 60
      },
      {
        id: 2,
        name: 'Webpack',
        credit: 20
      },
      {
        id: 3,
        name: 'React',
        credit: 40
      }
    ];
  });
  it('Tests that CourseList rendrers correctly if we pass a list prop', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses}/>);
    expect(wrapper.find('CourseListRow')).toHaveLength(5);
  });
  it('Tests that the action is dispatched when the component is mounted', () => {
    const fetchCourses = jest.fn();
    const wrapper = shallow(<CourseList listCourses={listCourses} fetchCourses={fetchCourses}/>);
    expect(fetchCourses).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks();
  });
  it('Tests that the two actions are correctly dispatched when the onChangeRow function is called', () => {
    const selectCourse = jest.fn();
    const unSelectCourse = jest.fn();
    const wrapper = shallow(<CourseList listCourses={listCourses}
    selectCourse={selectCourse}
    unSelectCourse={unSelectCourse}/>);
  
    wrapper.instance().onChangeRow(1, true);
    wrapper.instance().onChangeRow(1, false);
  
    expect(selectCourse).toHaveBeenCalledTimes(1);
    expect(unSelectCourse).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks();
  });
});
