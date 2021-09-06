import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons';

const ImageListItem = ({ data }) => {
    return (
        <ListItemView>
            <ThumImage source={{
                uri: data?.image?.imgUrl || 'https://blog.redbubble.com/wp-content/uploads/2017/10/placeholder_image_square.jpg',
            }} />
            <Caption>{data?.image?.caption || 'Image'} </Caption>
            <AntDesign style={{ paddingLeft: 70 }} name="caretright" size={24} color="black" />
        </ListItemView>
    )
}

export default ImageListItem

const ListItemView = styled.View`
    flex: 1;
    flex-direction: row;
    padding: 3px;
    width: 400px;
    align-items: center;
`

const ThumImage = styled.Image`
    width: 65px;
    height: 65px;
`

const Caption = styled.Text`
    padding-left: 20px;
    font-size: 18px;
    width: 200px;
`