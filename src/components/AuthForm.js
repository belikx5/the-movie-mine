import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import validate from '../services/formValidation'
import defineAuthError from '../services/authErrorDefine'
import * as commonStyles from '../styles/_common'

const AuthForm = ({ 
    navigation, 
    clearAuthError, 
    onSubmit, 
    auth, 
    linkQuestion, 
    linkValue 
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
    });
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.addListener("focus", clearAuthError);

        return () => navigation.removeListener("focus", clearAuthError);
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
    const handleSubmit = () => {
        Keyboard.dismiss();
        const emailError = validate("email", email);
        const passwordError = validate("password", password);

        if (!emailError && !passwordError) {
            setLoading(true);
            onSubmit(email, password, () => {
                navigation.navigate('MainFlow');
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MainFlow"}]
                });
            }, () => setLoading(false));
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <Text style={commonStyles.inputField.inputName}>Email</Text>
                <TextInput
                    style={validationErrors.email ? [commonStyles.inputField.input, styles.inputError] : commonStyles.inputField.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="example@example.com"
                    placeholderTextColor={commonStyles.mainGreyColor}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onEndEditing={() => validateField("email", email)}
                />
                <Text style={commonStyles.inputField.inputName}>Password:</Text>
                <View style={validationErrors.password ? [styles.passwordWrapper, styles.inputError] : styles.passwordWrapper}>
                    <TextInput
                        style={styles.passwordField}
                        secureTextEntry={hidePassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onEndEditing={() => validateField("password", password)}
                    />
                    {hidePassword ? (
                        <FontAwesome
                            name="eye"
                            size={24}
                            color={commonStyles.mainGreyColor}
                            onPress={() => setHidePassword(false)}
                        />
                    ) : (
                        <FontAwesome
                            name="eye-slash"
                            size={24}
                            color={commonStyles.mainGreyColor}
                            onPress={() => setHidePassword(true)}
                        />
                    )}
                </View>
                {loading
                    ? <ActivityIndicator size="small" color={commonStyles.mainActionColor} />
                    : (
                        <TouchableOpacity
                            style={isSubmitDisbled() ? [commonStyles.btn.wrapper, styles.orangeButton, styles.disabledButton] : [commonStyles.btn.wrapper, styles.orangeButton]}
                            disabled={isSubmitDisbled()}
                            onPress={handleSubmit}
                        >
                            <Text style={commonStyles.btn.text}>Submit</Text>
                        </TouchableOpacity>
                    )}
                {validationErrors.email || validationErrors.password ? (
                    validationErrors.email ? (
                        <Text style={styles.errorMessage}>{validationErrors.email}</Text>
                    ) : (
                        <Text style={styles.errorMessage}>{validationErrors.password}</Text>
                    )
                ) : null}
                {auth.error ? <Text style={styles.errorMessage}>{defineAuthError(auth.error)}</Text> : null}
            </View>

            <View style={[commonStyles.link.linkBlock, styles.linkContainer]}>
                <Text style={commonStyles.link.linkBlockText}>{linkQuestion}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Auth", { title: linkValue === "Sign in!" ? "Sign in" : "Sign up" })}>
                    <Text style={[commonStyles.link.linkBlockText, commonStyles.link.linkBlockTextAction]}>{linkValue}</Text>
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
        borderColor: commonStyles.errorColor
    },
    errorMessage: {
        color: commonStyles.errorColor,
        fontSize: 16,
        textAlign: 'center'
    },
    passwordWrapper: {
        ...commonStyles.inputField.input,
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
        borderColor: commonStyles.mainActionColor,
    },
    disabledButton: {
        borderColor: commonStyles.mainGreyColor,
        backgroundColor: 'rgba(202,202,202,0.2)',
    },
    linkContainer: {
        width: '100%',
        textAlign: 'center',
        alignSelf: 'flex-end'
    }
})

export default AuthForm
