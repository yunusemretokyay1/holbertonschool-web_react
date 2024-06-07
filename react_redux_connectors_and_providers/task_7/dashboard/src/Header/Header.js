import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/uiActionCreators';

class Header extends React.Component {
    render() {
        return (
            <>
                <header className={css(styles.appHeader)}>
                    <img src={this.props.src} alt={this.props.alt} className={css(styles.appHeaderImg)}/>
                    <h1>{this.props.text}</h1>
                </header>
                {this.props.user ? (
                    <section id='logoutSection'>
                        Welcome <strong>{this.props.user.email}</strong> <a onClick={() => {this.props.logout()}}><em>(logout)</em></a>
                    </section>
                ) : null}
                
            </>
        );
    }
}

const styles = StyleSheet.create({
    appHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '1.2rem',
        color: '#e11d3f',
        bordeBottom: 'solid #e11d3f'
    },
      
    appHeaderImg: {
        width: 250
    }
});

export function mapStateToProps(state) {
    return {
        user: state.ui.get('user')
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
}

Header.defaultProps = {
    user: null,
    logout: () => {}
}

export { Header };
