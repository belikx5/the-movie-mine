import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen'
import { mainActionColor, mainHeaderColor } from '../styles/_common';
import { Image } from 'react-native';

const MainFlowTabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeFlow = () => {
    const homeStackOptions = {
        headerStyle: {
            backgroundColor: mainHeaderColor
        },
        headerRight: () => <Image source={require('../../assets/app-imgs/TMM-logo-small-light.png')} />,
        headerTintColor: mainActionColor,
    }
    return (
        <HomeStack.Navigator initialRouteName="Details">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ ...homeStackOptions, headerLeft: () => null, title: 'TheMovieMine' }} />
            <HomeStack.Screen name="Details" component={DetailsScreen} options={{ ...homeStackOptions, title: 'Details' }} />
        </HomeStack.Navigator>
    )
}

export default () => {

    const tabsNavigatorOptions = {
        keyboardHidesTabBar: true,
        activeTintColor: mainActionColor,
        inactiveTintColor: '#fff',
        tabStyle: {
            backgroundColor: mainHeaderColor
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainHeaderColor }}>
            <MainFlowTabs.Navigator initialRouteName="Home" tabBarOptions={{ ...tabsNavigatorOptions }}>
                <MainFlowTabs.Screen
                    name="Home"
                    component={HomeFlow}
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: ({ color }) => <FontAwesome name="home" size={35} color={color} />
                    }}
                />
            </MainFlowTabs.Navigator>
        </SafeAreaView>
    )
}
