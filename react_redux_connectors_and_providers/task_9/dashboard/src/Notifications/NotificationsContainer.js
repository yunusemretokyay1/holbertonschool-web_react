import React from 'react';
import PropTypes from 'prop-types';
import { fetchNotifications, markAsAread, setNotificationFilter } from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';
import { connect } from 'react-redux';
import Notifications from "./Notifications";

class NotificationsContainer extends React.Component {
    componentDidMount() {
        this.props.fetchNotifications();
    }

    render() {
        return (<Notifications {...this.props} />);
    }
}

export function mapStateToProps(state) {
  return {
    listNotifications: getUnreadNotificationsByType(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: () => dispatch(fetchNotifications()),
    markNotificationAsRead: (id) => dispatch(markAsAread(id)),
    setNotificationFilter: (filter) => dispatch(setNotificationFilter(filter))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)

NotificationsContainer.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  fetchNotifications: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func
};

NotificationsContainer.defaultProps = {
  displayDrawer: false,
  listNotifications: {},
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  fetchNotifications: () => {},
  setNotificationFilter: () => {}
};

export { NotificationsContainer };
