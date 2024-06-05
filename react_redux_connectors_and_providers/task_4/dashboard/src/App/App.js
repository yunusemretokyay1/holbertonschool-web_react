import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton_logo.jpg';
import { getFullYear, getFooterCopy } from '../utils/utils';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { user } from './AppContext';
import AppContext from './AppContext';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout
} from '../actions/uiActionCreators';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: {__html: getLatestNotification()} }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.state = {
      user,
      listNotifications
    };
  }

  handleKey(e) {
    const isCtrl = e.ctrlKey;

    if (isCtrl && e.key === 'h') {
      e.preventDefault();
      alert('Logging you out');
      this.props.logout();
    }
  }

  markNotificationAsRead(id) {
    const updatedList = this.state.listNotifications.filter((notification) => {
      return notification.id !== id;
    });
    this.setState({listNotifications: updatedList});
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  render() {
    const footerText = `Copyright ${getFullYear()} - ${getFooterCopy(true)}`;
    const { listNotifications } = this.state;
    const { displayDrawer, displayNotificationDrawer, hideNotificationDrawer } = this.props;
    const { login, logout } = this.props;
    const value = {user: this.state.user};
    return (
      <AppContext.Provider value={value}>
        <Notifications listNotifications={listNotifications}
                       displayDrawer={displayDrawer}
                       handleDisplayDrawer={displayNotificationDrawer}
                       handleHideDrawer={hideNotificationDrawer}
                       markNotificationAsRead={this.markNotificationAsRead}/>
        <div className={css(styles.app)}>
          <Header text='School dashboard' src={logo} alt='Holberton logo'/>
          <div className={css(styles.body)}>
            {this.props.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list ">
                <CourseList listCourses={listCourses}/>
              </BodySectionWithMarginBottom> 
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login text="Login to access the full dashboard" logIn={login}/>
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>This is some random text</p>
            </BodySection>
          </div>
          <div className={css(styles.footer)}>
            <Footer text={footerText} />
          </div>
        </div>
      </AppContext.Provider>

    );
  }
}

export function mapStateToProps(state) {
  return {
    isLoggedIn: state.get('isUserLoggedIn'),
    displayDrawer: state.get('isNotificationDrawerVisible')
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    displayNotificationDrawer: () => dispatch(displayNotificationDrawer()),
    hideNotificationDrawer: () => dispatch(hideNotificationDrawer()),
    login: (email, password) => dispatch(loginRequest(email, password)),
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  app: {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  body: {
    marginTop: '1rem',
    minHeight: '100%',
    padding: '0 3rem'
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTop: 'solid #e11d3f'
  }
});

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {},
  logout: () => {}
};

export { App };
