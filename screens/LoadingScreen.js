import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'
import { auth } from '../firebase'


const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home")
                
            } else {
                navigation.replace("Login")
                
            }
        })

        return unsubscribe;
    }, [])

    return (
        <Loading>
            <ActivityIndicator size="large" color="#999999"/>
        </Loading>
    )
}

export default LoadingScreen

const Loading = styled.View`
    flex: 1;
    justify-content: center;
`