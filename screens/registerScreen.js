import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button , Input, Image,Text} from 'react-native-elements';
import { auth } from '../firebase';

const registerScreen = ({navigation}) => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[imageUrl, setimageUrl] = useState('')

    useLayoutEffect( () => {
        navigation.setOptions({
            headerBackTitle : "Back to Login"
        })
    }, [navigation]);
    
    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName : name,
                photoURL: imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
            })
        }).catch((error) => alert(error.messages))
    };

    return (
        <KeyboardAvoidingView behavior="padding" style = {styles.container}>
            <StatusBar style='light'/>
            <Text h3 style={{marginBottom: 50}}>Create Account</Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full Name'
                    autoFocus type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder='Password'
                    secureTextEntry type="password" 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder='Profile Picture'
                    type='text'
                    value={imageUrl}
                    onChangeText={(text) => setimageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button containerStyle={styles.button} raised title='Register' onPress={register }/>
            <View style={{height:100}}></View>
        </KeyboardAvoidingView>
    )
}

export default registerScreen

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer:{
        width: 300
    },
    button:{
        marginTop: 10,
        width: 200
    }
})
