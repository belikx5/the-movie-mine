import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { mainActionColor, inputField, mainGreyColor } from '../styles/_common';

const SeacrhBar = ({ setSearchTerm }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(text);
        }, 400)

        return () => clearTimeout(timer)
        
    }, [text])
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchField}
                autoCorrect={false}
                placeholder="Search movies here..."
                placeholderTextColor="rgba(243,243,243,0.5)"
                value={text}
                onChangeText={text => setText(text)}
            />
            <TouchableOpacity>
                <Feather name="search" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...inputField.input,
        width: '95%',
        marginHorizontal: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchField: {
        flex: 1,
        fontSize: 24,
        color: '#fff'
    }
})
export default SeacrhBar
