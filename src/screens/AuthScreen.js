import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signIn, signUp, clearAuthError } from '../store/actions/userActions'
import AuthForm from '../components/AuthForm'
import Container from '../components/Container'

const AuthScreen = ({ route, navigation, signIn, signUp, clearAuthError, auth }) => {
    const formSigninProps = {
        navigation,
        onSubmit: signIn,
        clearAuthError,
        auth,
        linkQuestion: 'Need an account?',
        linkValue: 'Sign up!'   
    };
    const formSignupProps = {
        ...formSigninProps,
        onSubmit: signUp,
        linkQuestion: 'Already have an account?',
        linkValue: 'Sign in!' 
    }
    return (
        <Container>
            {route.params.title === "Sign in"
                ? <AuthForm {...formSigninProps} />
                : <AuthForm {...formSignupProps} />}
        </Container>
    )
}
const mapStateToProps = (state) => ({
    auth: state.user.auth
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    signIn,
    signUp,
    clearAuthError
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
