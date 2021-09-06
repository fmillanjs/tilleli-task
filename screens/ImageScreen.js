import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'

const ImageScreen = ({ navigation }) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back"
        })
    }, [navigation])

    return (
        <View>
            <Image source={{
                uri: 'https://blog.redbubble.com/wp-content/uploads/2017/10/placeholder_image_square.jpg',
            }} />
            <TextInput>Caption</TextInput>
            <Button title="Delete" />
        </View>
    )
}

export default ImageScreen
