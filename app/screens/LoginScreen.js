import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import axios from 'axios';

import { UserContext } from '../Components/UserContext';



function LoginScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { contextObject } = useContext(UserContext);

    //Checks if user is in database and password is correct
    function login() {
        axios.get('http://68.172.33.6:9081/user/loginAttempt/' + username + '/' + password)
            .then(response => loggedIn(response.data.jwt, response.data.userType, response.data.firstName + " " + response.data.lastName)).catch(e => console.log(e));
    }

    //sets app context and redirects to Home page
    function loggedIn(myjwt, userType, name) {
        contextObject.name = name;
        contextObject.username = username;
        contextObject.userType = userType;
        contextObject.jwt = myjwt;
        axios.get('http://68.172.33.6:9083/exercises/allRoots', { headers: { "Authorization": `Bearer ${myjwt}` } })
            .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', parentID: 'root', })).catch(e => console.log(e));
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
            <TouchableOpacity style={styles.loginButton}
                onPress={() => login()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
        justifyContent: 'flex-end',
        alignItems: 'center'
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
