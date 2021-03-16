import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { View, Text, Platform, TouchableOpacity, Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { fetchUser, editProfile } from '../store/actions/userActions'
import { inputField, mainGreyColor, profileImage, btn, mainActionColor } from '../styles/_common'
import Container from '../components/Container'

const EditProfileScreen = ({
    currentUser,
    fetchUser,
    editProfile
}) => {
    const [nickname, setNickname] = useState(currentUser?.nickname);
    const [image, setImage] = useState(currentUser?.avatar);
    const [saving, setSaving] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (!currentUser) {
            fetchUser();
        }
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const onSave = () => {
        setSaving(true);
        let tempNick = nickname;
        if (!nickname.trim().length)
            tempNick = currentUser.nickname;
        editProfile({
            ...currentUser,
            avatar: image,
            nickname: tempNick
        },
            () => {
                setSaving(false);
                navigation.goBack();
            },
            () => {
                setSaving(false);
            }
        );
    }
    return (
        <Container>
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
                    {
                        image
                            ? <Image style={{ ...profileImage.image, ...imageStyles }} source={{ uri: image }} />
                            : <Image style={styles.image} source={require("../../assets/app-imgs/camera.png")} />
                    }
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Text style={inputField.inputName}>Nickname</Text>
                    <TextInput
                        style={inputField.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={nickname}
                        onChangeText={text => setNickname(text)}
                    />
                </View>
            </View>
            <View style={styles.actions}>
                {saving
                    ? <ActivityIndicator size="large" color={mainActionColor} />
                    : (
                        <TouchableOpacity
                            style={[btn.wrapper, { width: '45%', borderColor: mainActionColor }]}
                            onPress={onSave}
                        >
                            <Text style={btn.text}>Save</Text>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    style={[btn.wrapper, { width: '45%' }]}
                    onPress={() => navigation.goBack()}>
                    <Text style={btn.text}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

const imageStyles = {
    height: 90,
    width: 90,
    borderRadius: 45,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20
    },
    imageWrapper: {
        ...profileImage.image,
        ...imageStyles,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        ...imageStyles,
        backgroundColor: mainGreyColor,
        height: 75,
        width: 75,
        borderRadius: 34
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 15
    },
    input: {
        color: '#fff',
        fontSize: 18
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 35,
        paddingHorizontal: 10
    },
})

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUser,
    editProfile
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
