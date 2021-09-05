import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';


const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
            })
        }).catch(err => alert(err.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>Create a new account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type="text" value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder="Email" autofocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" autofocus type="password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <Button style={styles.button} raised onPress={register} title="Register" />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
