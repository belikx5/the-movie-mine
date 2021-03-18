import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { mainActionColor, mainBackgroundColor } from './src/styles/_common'
import MainFlowTabs from './src/navigation/mainFlow'
import store from './src/store'
import firebase from './src/config/firebase'
require('./src/services/reportError')

import WelcomeScreen from './src/screens/WelcomeScreen'
import AuthScreen from './src/screens/AuthScreen'
import ResolveAuthScreen from './src/screens/ResolveScreen'

const AuthFlowHeaderStyles = {
  headerRight: () => <Image style={{height: 50, width: 60}} source={require('./assets/app-imgs/TMM-logo-small.png')} />,
  headerTintColor: mainActionColor,
  headerStyle: {
    backgroundColor: mainBackgroundColor,
  }
}

const ChatStack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        setLoading(false);
      return unsubscribe;
    });
  }, [])

  if(loading)
    return null;
    
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <ChatStack.Navigator initialRouteName="ResolveAuth" screenOptions={{ headerStatusBarHeight: 40 }}>
            <ChatStack.Screen name="ResolveAuth" component={ResolveAuthScreen} options={{ header: () => null }} />
            <ChatStack.Screen name="Welcome" component={WelcomeScreen} options={{ header: () => null }} />
            <ChatStack.Screen name="Auth" component={AuthScreen} options={({ route }) => ({ ...AuthFlowHeaderStyles, title: route.params.title })} />
            <ChatStack.Screen name="MainFlow" component={MainFlowTabs} options={{ header: () => null }} />
          </ChatStack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>


  );
}

