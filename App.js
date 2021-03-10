import React from 'react';
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { setNavigator } from './src/services/customNavigation'
import store from './src/store'

import WelcomeScreen from './src/screens/WelcomeScreen'
import SigninScreen from './src/screens/SigninScreen'
import { Image } from 'react-native';
import { mainActionColor, mainBackgroundColor } from './src/styles/_common';

const ChatStack = createStackNavigator();

// const AuthFlow = () => {
//   return (
//     <NavigationContainer>
//       <ChatStack.Navigator  >
//         <ChatStack.Screen component={WelcomeScreen} />
//       </ChatStack.Navigator>
//     </NavigationContainer>
//   )
// }
const AuthFlowHeaderStyles = {
  headerRight: () => <Image source={require('./assets/app-imgs/TMM-logo-small.png')} />,
  headerTintColor: mainActionColor,
  headerStyle: {
    backgroundColor: mainBackgroundColor,
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={(navigator) => {
          setNavigator(navigator);
        }}>
        <ChatStack.Navigator screenOptions={{ headerStatusBarHeight: 40 }}>
          <ChatStack.Screen name="Welcome" component={WelcomeScreen} options={{ header: () => null }} />
          <ChatStack.Screen name="Signin" component={SigninScreen} options={{ ...AuthFlowHeaderStyles, title: "Sign in" }} />
          <ChatStack.Screen name="Signup" component={SigninScreen} options={{ ...AuthFlowHeaderStyles, title: "Sign up" }} />
        </ChatStack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

