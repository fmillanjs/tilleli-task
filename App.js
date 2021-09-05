import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { auth } from "./firebase";

const Stack = createStackNavigator()

const globalScreenOptions = {
    headerStyle: { backgroundColor: '#403555'},
    headerTitleStyle: { color: 'white' },
    headerTintColor: "white",
}

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setIsSignedIn(true)
            }
        })

        return unsubscribe;
    }, [])

    return (
        <NavigationContainer>
                <Stack.Navigator screenOptions={globalScreenOptions}>
                { !isSignedIn ? (
                    <>
                        <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{gestureEnabled: false}}/>
                    </>
                )}
                </Stack.Navigator>
        </NavigationContainer>
    );
}

