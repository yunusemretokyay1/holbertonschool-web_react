import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function Footer(props) {
    const { user } = props;
    return (
      <>
        <p>{props.text}</p>
        {user ? (
          <p><a href="">Contact us</a></p>
        ) : null}
      </>
    );
}

Footer.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object
};

Footer.defaultProps = {
  text: null,
  user: null
};

export function mapStateToProps(state) {
  return {
    user: state.ui.get('user')
  };
}

export default connect(mapStateToProps)(Footer);
