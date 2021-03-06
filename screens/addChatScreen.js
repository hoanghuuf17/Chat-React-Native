import { db } from '../firebase';
import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const addChatScreen = ({navigation}) => {
    const[input, setInput] = useState('');

    const createChat =  async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() =>{
            navigation.goBack()
        }).catch((error) => {alert(error)})
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title : 'Add New Chat',
            headerBackTitle : "Chats"
        })
    }, [])

    return (
        <View style={styles.container}>
        <Input
            placeholder="Enter the chat name"
            value ={input}
            onChangeText={(text) =>setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign"  size={24} color="black"/>
            }
            />
        <Button disabled={!input} onPress={createChat} title="Create New Chat" />
        </View>
    )
}

export default addChatScreen

const styles = StyleSheet.create({
    container:{}
})
