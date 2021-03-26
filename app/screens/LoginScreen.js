import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import HomeScreen from '../screens/HomeScreen';


function LoginScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {
        return <HomeScreen />;
    }

    return (
        <View style={styles.container} >
            <Image style={styles.logo} source={require('../assets/Primus_Fitness_Logo.png')} />
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Username"
                    textAlign='center'
                    onChangeText={(username) => setUsername(username)}
                />
            </View>
            <View style={styles.inputView} >
                <TextInput style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    textAlign='center'
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: 0.8
    },
    loginButton: {
        width: "75%",
        height: 75,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#222222",
        marginBottom: 50,
        marginTop: 50,
        elevation: 8,
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: "center",
    },
    inputText: {
        height: 50,
        color: 'white'
    },
    inputView: {
        height: 50,
        width: '60%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "#929292",
        padding: 20,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        top: 175,
        height: 200,
        width: 400
    }
});

export default LoginScreen;