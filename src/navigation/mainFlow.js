import React from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from "react-native-safe-area-context"
import { FontAwesome, Entypo } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen'
import WhatchListScreen from '../screens/WhatchListScreen'
import { mainActionColor, mainHeaderColor } from '../styles/_common'

const MainFlowTabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const WhatchListStack = createStackNavigator();

const stackOptions = {
    headerStyle: {
        backgroundColor: mainHeaderColor
    },
    headerRight: () => <Image source={require('../../assets/app-imgs/TMM-logo-small-light.png')} />,
    headerTintColor: mainActionColor,
}

const WatchListFlow = () => {
    return (
        <WhatchListStack.Navigator initialRouteName="WhatchList">
            <WhatchListStack.Screen name="WhatchList" component={WhatchListScreen} options={{...stackOptions, headerLeft: () => null, title: 'Watch List'}} />
        </WhatchListStack.Navigator>
    )
}

const HomeFlow = () => {
    
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ ...stackOptions, headerLeft: () => null, title: 'TheMovieMine' }} />
            <HomeStack.Screen name="Details" component={DetailsScreen} options={{ ...stackOptions, title: 'Details' }} />
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
                    name="WhatchList"
                    component={WatchListFlow}
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: ({ color }) => <Entypo name="list" size={35} color={color} />
                    }}
                />
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
