import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { auth, db, storage } from '../firebase'
import styled from 'styled-components';
import ImageListItem from '../components/ImageListItem';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation }) => {
    const [doc, setDoc] = useState([])
    const [imgData, setImgData] = useState([])
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await auth.currentUser.displayName
            if(user) {
                setUsername(user)
            }
            navigation.setOptions({
                title: user ? `Welcome, ${user}` : `Welcome`,
                headerLeft: null
            })
        }
        fetchUser();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const imageRef = db.collection('images')
            const snapshot = await imageRef.where('user', '==', username).get()
            if(snapshot.empty) {
                return;
            }
            setDoc(snapshot.docs.map(doc => ({
                id: doc.id,
                image: doc.data()
            })))
        }
        fetchData()
        setLoading(false)
    }, [doc])

    const addPhoto = async () => {
        
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result) {
            setImgData(result);
        }
        console.log(imgData.uri)
        const response = await fetch(imgData.uri)

        const blob = await response.blob()
        
        const name = imgData.uri?.substr(-20,imgData.uri.length - 1)
        
        const uploadTask = storage.ref(`images/${name}`).put(blob)
        
        uploadTask.on(
            "state_changed",
            (snapshot) => console.log('starting...'),
            (error) => console.log(error),
            () => {
                storage
                    .ref("images")
                    .child(name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("images").add({
                            timestamp: new Date().toISOString(),
                            caption: url.substr(-15 , url.length - 1), 
                            imgUrl: url,
                            user: username,
                        })
                    })
            }
        )
    }

    return (
        <MainView>
            <MainTitle>Your Photos</MainTitle>
            <ScrollView>
                { !loading ? (
                    doc.map(data => (
                        <ImageContainer onPress={() => navigation.navigate('Image', { 
                            image: data
                        })}>
                                <ImageListItem key={data.id} data={data} />
                        </ImageContainer>
                    ))
                ) : (
                    <Text>No Photos Yet...</Text>
                )}
            </ScrollView>
            <View>
                <Button 
                    buttonStyle={{ backgroundColor: "#403555" }} 
                    onPress={() => addPhoto()}
                    containerStyle={{ width: 200, marginTop: 10 }} 
                    title="Add Photo" 
                />
            </View>
        </MainView>
    )
}

export default HomeScreen

const MainView = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const MainTitle = styled.Text`
    padding: 25px;
    font-size: 21px;
    color: #553535;
`

const ImageContainer = styled.Pressable`
    width: 400px;
`