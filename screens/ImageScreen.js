import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { Button } from 'react-native-elements';

const ImageScreen = ({ route, navigation }) => {
    const [item, setItem] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [caption, setCaption] = useState(route.params.image.image.caption)

    const url = route.params.image.image.imgUrl

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back"
        })
    }, [navigation])

    useEffect(() => {
        db.collection("images").doc(route.params.image.id).onSnapshot(snap => {
            setCaption(snap.data().caption)
        })
        setLoading(false)
    }, [loading])


    const saveCaption = () => {
        db.collection("images").doc(route.params.image.id).update({
            timestamp: new Date().toISOString(),
            caption: input, 
        })
        setLoading(true)
    }

    const deleteImage = () => {
        db.collection("images").doc(route.params.image.id).delete()
        setLoading(true)
    }

    return (
        <ImageView>
            <Photo source={{
                uri: url || 'https://blog.redbubble.com/wp-content/uploads/2017/10/placeholder_image_square.jpg',
            }} />
            <Caption>{caption}</Caption>
            <EditCaption placeholder="Edit Caption." onChangeText={(val) => setInput(val)}/>
            <Button 
                containerStyle={{width: 200, height: 50, marginTop: -100, marginBottom: 50}} 
                type="raised" 
                title="Save Caption" 
                onPress={() => saveCaption()}
            />
            <Button 
                titleStyle={{ color: "#403535"}}  
                buttonStyle={{ borderColor: "#403535", backgroundColor: "#ffffff", color: "#403535"}} 
                onPress={() => deleteImage()} 
                containerStyle={{width: 200, height: 100,marginTop: 10}} 
                type="outline" 
                title="Delete" 
            />
        </ImageView>
    )
}

export default ImageScreen


const ImageView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const Photo = styled.Image`
    top: -30px;
    width: 80%;
    height: 40%;
`
const Caption = styled.Text`
    marginBottom: 100px;
    font-size: 21px;
`
const EditCaption = styled.TextInput`
    font-size: 21px;
    padding-bottom: 100px;
`

