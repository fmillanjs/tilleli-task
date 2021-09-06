import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home")
            }
        })

        return unsubscribe;
    }, [])
    
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            const user = userCredential.user
        }).catch((error) => console.log(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: 'https://media-exp1.licdn.com/dms/image/C4D0BAQHhUwDRcHcqlQ/company-logo_200_200/0/1626275246201?e=1639008000&v=beta&t=sUXZgZeAp75HcbiZFwy_rXnb0ds06j4r7zNpvLmsOBs'
            }}
            style={{ width: 150, height: 150}}
            />
            <View style={styles.inputContainer} >
                <Input 
                    placeholder="Email" 
                    autofocus 
                    type="email" 
                    value={ email }
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password" 
                    value={ password }
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <Button 
                buttonStyle={{ backgroundColor: "#403555" }} 
                containerStyle={styles.button} 
                onPress={() => signIn()} 
                title="Login" 
            />
            <Button 
                titleStyle={{ color: "#403535"}}  
                buttonStyle={{ borderColor: "#403535", backgroundColor: "#ffffff", color: "#403535"}} 
                onPress={() => navigation.navigate("Register")} 
                containerStyle={styles.button} 
                type="outline" 
                title="Register" 
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        paddingTop: 20,
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
