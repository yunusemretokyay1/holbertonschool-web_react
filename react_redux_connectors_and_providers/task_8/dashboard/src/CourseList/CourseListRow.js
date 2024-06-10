import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ id, isHeader, textFirstCell, textSecondCell, isChecked, onChangeRow }) {
    let content;
    const bg = {
        backgroundColor: isHeader ? '#deb5b545': '#f5f5f5ab'
    };
    const styleCheckedRow = isChecked ? css(styles.rowChecked) : '';
    
    if (isHeader) {
        if (!textSecondCell) {
            content = (<th className={css(styles.firstTr, styles.th)} colSpan={2}>{textFirstCell}</th>)
        } else {
            content = (
                <>
                    <th className={css(styles.th)}>{textFirstCell}</th>
                    <th className={css(styles.th)}>{textSecondCell}</th>
                </>
            );
        }
    } else {
        content = (
            <>
                <td><input type="checkbox" onChange={() => onChangeRow(id, !isChecked)} checked={isChecked}/> {textFirstCell}</td>
                <td>{textSecondCell}</td>
            </>
        );
    }
    return (
        <tr style={bg} className={styleCheckedRow}>
            {content}
        </tr>
    );
}

CourseListRow.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    isChecked: PropTypes.bool,
    onChangeRow: PropTypes.func
};

CourseListRow.defaultProps = {
    id: '',
    isHeader: false,
    textSecondCell: null,
    isChecked: false,
    onChangeRow: () => {}
};

const styles = StyleSheet.create({
    firstTr: {
        textAlign: 'center'
    },
    th: {
        padding: '.4rem 0',
        borderBottom: 'solid 2px rgb(227, 220, 220)'
    },
    rowChecked: {
        background: '#e6e4e4'
    }
});

export default CourseListRow;
