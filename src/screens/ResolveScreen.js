import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Container from '../components/Container'
import { tryLocalSignin } from '../store/actions/userActions'


const ResolveScreen = ({ navigation, tryLocalSignin }) => {
    
    useEffect(() => {
        tryLocalSignin(
            () => navigation.navigate('MainFlow'),
            () => navigation.navigate('Welcome')
        )
    }, [])

    return <Container />
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    tryLocalSignin
}, dispatch) 

export default connect(null, mapDispatchToProps)(ResolveScreen) 
