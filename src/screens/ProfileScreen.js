import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { btn, h2, profileImage, mainActionColor } from '../styles/_common'
import { fetchUser, signOut } from '../store/actions/userActions'
import Container from '../components/Container'


const ProfileScreen = ({
    currentUser,
    fetchUser,
    signOut
}) => {
    const navigation = useNavigation();

    useEffect(() => {
        if (!currentUser)
            fetchUser();
    }, [])
    if (!currentUser) {
        return <Container>
            <View style={styles.profileContainer}>
                <ActivityIndicator size="large" color={mainActionColor} />
            </View>
        </Container>
    }
    const onSignOut = () => {
        signOut(() => {
            navigation.navigate("Welcome");
            navigation.reset({
                index: 0,
                routes: [{ name: "Welcome" }]
            });
        });

    }
    return (
        <Container>
            <View style={styles.profileContainer}>
                <View style={styles.header}>
                    <Image style={profileImage.image}
                        source={currentUser.avatar ? { uri: currentUser.avatar } : require("../../assets/app-imgs/actor-not-found.jpg")} />
                    <View style={styles.headerData}>
                        <View style={styles.h1Wrapper}>
                            <Text style={[styles.text, styles.h1]}>{currentUser.nickname}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("WhatchList")}>
                            <Text style={[h2.text, styles.link]}>My watch list</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={h2.text}>Info</Text>
                {currentUser.email
                    ? <View style={styles.infoItem}>
                        <Feather name="mail" style={styles.icon} size={24} color={mainActionColor} />
                        <Text style={styles.text}>{currentUser.email}</Text>
                    </View>
                    : null
                }
                {currentUser.nickname
                    ? <View style={styles.infoItem}>
                        <FontAwesome5 name="facebook" style={styles.icon} size={24} color="blue" />
                        <Text style={styles.text}>@{currentUser.nickname.split(' ').join('')}</Text>
                    </View>
                    : null
                }
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[btn.wrapper, { width: '45%' }]}
                        onPress={() => navigation.navigate("EditProfile")}>
                        <Text style={btn.text}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[btn.wrapper, { width: '45%' }]}
                        onPress={onSignOut}>
                        <Text style={btn.text}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20
    },
    headerData: {
        justifyContent: 'space-around',
        marginLeft: 15,
        flex: 1
    },
    infoItem: {
        flexDirection: 'row',
        marginTop: 10,
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 35
    },
    text: {
        fontSize: 18,
        color: '#fff'
    },
    h1Wrapper: {
        flexDirection:'row'
    },
    h1: {
        fontSize: 32,
        flexWrap: 'wrap'
    },
    link: {
        color: mainActionColor
    },
    icon: {
        marginRight: 7
    }

})

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUser,
    signOut
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
