import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import validate from '../services/formValidation'
import { inputField, errorColor, mainGreyColor, btn, mainActionColor, link } from '../styles/_common'

const AuthForm = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
    });
    const [hidePassword, setHidePassword] = useState(true);

    useEffect(() => {
        //navigation.addListener("focus", () => {
        //clearError()
        // })
        //return () => navigation.removeListener("focus", () => { clearError() })
    }, [])

    const validateField = (fieldName, value) => {
        const res = validate(fieldName, value);
        if (res) setValidationErrors({ ...validationErrors, [fieldName]: res });
        else setValidationErrors({ ...validationErrors, [fieldName]: "" });
    };

    const isSubmitDisbled = () => {
        return !email ||
            !password ||
            validationErrors.email ||
            validationErrors.password
            ? true
            : false;
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={inputField.inputName}>Email</Text>
                <TextInput
                    style={validationErrors.email ? [inputField.input, styles.inputError] : inputField.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="example@example.com"
                    placeholderTextColor={mainGreyColor}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onEndEditing={(e) => validateField("email", email)}
                />
                <Text style={inputField.inputName}>Password:</Text>
                <View style={validationErrors.password ? [styles.passwordWrapper, styles.inputError] : styles.passwordWrapper}>
                    <TextInput
                        style={styles.passwordField}
                        secureTextEntry={hidePassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onEndEditing={(e) => validateField("password", password)}
                    />
                    {hidePassword ? (
                        <FontAwesome
                            name="eye"
                            size={24}
                            color={mainGreyColor}
                            onPress={() => setHidePassword(false)}
                        />
                    ) : (
                        <FontAwesome
                            name="eye-slash"
                            size={24}
                            color={mainGreyColor}
                            onPress={() => setHidePassword(true)}
                        />
                    )}
                </View>
                <TouchableOpacity style={isSubmitDisbled() ? [btn.wrapper, styles.orangeButton, styles.disabledButton] : [btn.wrapper, styles.orangeButton]} disabled={isSubmitDisbled()}>
                    <Text style={btn.text}>Submit</Text>
                </TouchableOpacity>
                {validationErrors.email || validationErrors.password ? (
                    validationErrors.email ? (
                        <Text style={styles.errorMessage}>{validationErrors.email}</Text>
                    ) : (
                        <Text style={styles.errorMessage}>{validationErrors.password}</Text>
                    )
                ) : null}
                {/* {auth.authError ? <Text style={styles.errorMessage}>{defineAuthError(auth.authError)}</Text> : null} */}
            </View>

            <View style={[link.linkBlock, styles.linkContainer]}>
                <Text style={link.linkBlockText}>Need an account?</Text>
                <TouchableOpacity>
                    <Text style={[link.linkBlockText, link.linkBlockTextAction]}>Sign up!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '70%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: '40%',
    },
    inputError: {
        borderColor: errorColor
    },
    errorMessage: {
        color: errorColor,
        fontSize: 16,
        textAlign: 'center'
    },
    passwordWrapper: {
        ...inputField.input,
        flexDirection: 'row',
        alignItems: 'center'
    },
    passwordField: {
        flex: 1,
        fontSize: 18,
        color: '#fff'
    },
    orangeButton: {
        alignSelf: 'center',
        width: '60%',
        marginTop: '10%',
        marginBottom: 10,
        borderColor: mainActionColor,
    },
    disabledButton: {
        borderColor: mainGreyColor,
        backgroundColor: 'rgba(202,202,202,0.2)',
    },
    linkContainer: {
        width: '100%',
        textAlign: 'center',
        alignSelf: 'flex-end'
    }
})

export default AuthForm
