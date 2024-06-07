import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';
import { connect } from 'react-redux';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeRow = this.onChangeRow.bind(this);
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    onChangeRow(id, checked) {
        if (checked) this.props.selectCourse(id);
        else this.props.unSelectCourse(id);
    }

    render() {
        const { listCourses } = this.props
        let content;

        if (listCourses.length === 0) content = <CourseListRow textFirstCell='No course available yet' isHeader={false} />;
        else {
            content = listCourses.map((course) => {
                return <CourseListRow key={course.id}
                id={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isHeader={false}
                isChecked={course.isSelected}
                onChangeRow={this.onChangeRow}/>
        });
        }

        return (
            <table className={css(styles.courseList)} id="CourseList">
                <thead>
                    <CourseListRow className={css(styles.firstRow, styles.th)} textFirstCell="Available courses" isHeader={true}/>
                    <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true}/>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        );
    }
    
}

CourseList.propTypes = {
    listCourses: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    fetchCourses: PropTypes.func,
    selectCourse: PropTypes.func,
    unSelectCourse: PropTypes.func
};

CourseList.defaultProps = {
    listCourses: [],
    fetchCourses: () => {},
    selectCourse: () => {},
    unSelectCourse: () => {}
};

const styles = StyleSheet.create({
    courseList: {
        border: 'solid 1px rgb(227, 220, 220)',
        width: '100%',
        textAlign: 'left'
    },
    
});

export function mapStateToProps(state) {
    return {
        listCourses: getListCourses(state)
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        fetchCourses: () => dispatch(fetchCourses()),
        selectCourse: (index) => dispatch(selectCourse(index)),
        unSelectCourse: (index) => dispatch(unSelectCourse(index))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);

export { CourseList };
