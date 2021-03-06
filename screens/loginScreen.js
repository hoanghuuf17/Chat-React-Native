import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button , Input, Image} from 'react-native-elements';
import { auth } from '../firebase';

const loginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(()=>{
        const unSubscrible = auth.onAuthStateChanged((authUser) => {
        console.log(authUser)
            console.log(authUser)
            if(authUser){
                navigation.replace("Home");
            }
        });

        return unSubscrible;
    },[])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error)=> alert(error));
    }   

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light"/>

            <Image 
                source ={{
                    uri : "https://chymebot.com/wp-content/uploads/2017/01/facebook-chat-logo-png-19.png",
                }}
                style={{width:200, height:200}}
            />
            <View style={styles.imputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus type="Email" 
                    value={email} 
                    onChangeText={text=>setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry type="password" 
                    value={password}
                    onChangeText={text=>setPassword(text)}
                    onSubmitEditing={signIn}
                    />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button onPress={()=> navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register"/>
            <View style={{height: 100}}></View>
        </KeyboardAvoidingView>
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center',
        padding : 10,
        backgroundColor: 'white',
    },
    imputContainer :{
        width:300
    },  
    button:{
        width: 200,
        marginTop: 10,
    },
});