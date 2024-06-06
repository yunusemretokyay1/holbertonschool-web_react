import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { fetchNotifications } from '../actions/notificationActionCreators';
import { connect } from 'react-redux';

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const buttonStyle = {
      background: 'transparent',
      border: 'none',
      position: "absolute",
      top: 2,
      right: 2
    }
    const menuItemStyle = css(this.props.displayDrawer ? styles.hidden : styles.menuItem);
    let content;
  
    if (this.props.listNotifications.length === 0) content = <p>No new notification for now</p>;
    else {
      content = Object.values(this.props.listNotifications).map((notif) =>
      <NotificationItem key={notif.guid} type={notif.type} value={notif.value} html={notif.html} markAsRead={this.props.markNotificationAsRead} id={notif.guid}/>);
    }
    const { handleDisplayDrawer, handleHideDrawer } = this.props;
    return (
      <>
        <div className={menuItemStyle} onClick={handleDisplayDrawer}>
          Your notifications
        </div>
        {this.props.displayDrawer ? (
          <div className={css(styles.notifications, styles.small)} id="Notifications">
            {this.props.listNotifications.length === 0 ? content : (<p>Here is the list of notifications</p>)}
            <button aria-label='Close' onClick={handleHideDrawer} style={buttonStyle}>
              <img src={closeIcon} alt='Close icon' width={10}/>
            </button>
            {this.props.listNotifications.length === 0 ? null : (<ul className={css(styles.noPadding)}>{content}</ul>)}
          </div>
        ) : null}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.object,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: {},
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {}
};

export function mapStateToProps(state) {
  return {
    listNotifications: state.notifications.get('messages')
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: () => dispatch(fetchNotifications()),
    markNotificationAsRead: () => dispatch()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

const opacityAnimationFrames = {
  '0%': {
      opacity: 0.5,
  },
    '100%': {
      opacity: 1,
  },
};

const bounceAnimationFrames = {
  '0%': {
      transform: 'translateY(0px)',
  },
  '50%': {
      transform: 'translateY(-5px)',
  },
  '100%': {
      transform: 'translateY(5px)',
  },
};

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    marginRight: '.5rem',
    marginBottom: '.5rem',
    background: '#fff8f8',
    float: 'right',
    ':hover': {
      cursor: 'pointer',
      animationName: [opacityAnimationFrames, bounceAnimationFrames],
      animationDuration: '1s, 0.5s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: '3',
    },
  },

  hidden: {
    display: 'none'
  },

  notifications: {
      position: 'absolute',
      right: '1rem',
      padding: '1rem',
      width: '20rem',
      border: 'dashed #e11d3f'
  },
  small: {
    '@media (max-width: 900px)': {
      padding: 0,
      fontSize: 20,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'white',
      zIndex: 10
    }
  },
  noPadding: {
    '@media (max-width: 900px)': {
      padding: 0,
    }
  },
});

export { Notifications };