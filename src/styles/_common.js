import { StyleSheet } from 'react-native'

export const mainBackgroundColor = '#0B123F';
export const mainHeaderColor = '#0F006B';
export const mainGreyColor = '#CACACA';
export const mainActionColor = '#FEBC11';
export const errorColor = '#FF3333';

export const btn = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 20,
        borderColor: mainGreyColor,
        borderWidth: 2,
    },
    text: {
        fontSize: 18,
        color: '#ffffff',
        paddingHorizontal: 10
    }
});

export const inputField = StyleSheet.create({
    inputName: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#fff',
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: mainGreyColor,
        backgroundColor: 'transparent'
    }
})

export const link = StyleSheet.create({
    linkBlock: {
        width: 286,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    linkBlockText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 7
    },
    linkBlockTextAction: {
        color: mainActionColor
    }
})

export const h2 = StyleSheet.create({
    text: {
        fontSize: 24,
        color: '#fff'
    }
})