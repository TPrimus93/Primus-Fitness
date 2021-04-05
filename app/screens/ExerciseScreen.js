import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import ExerciseButton from '../Components/ExerciseButton';


function ExerciseScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={false} >
                    <ExerciseButton />
                    <ExerciseButton />
                    <TouchableOpacity style={styles.centerButton} >
                        <Text style={styles.buttonText}>Plyometrics</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    centerButton: {
        height: 80,
        borderColor: "#E51B23",
        borderWidth: 3,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    buttonText: {
        marginTop: 5,
        fontSize: 35,
        marginRight: "20%",
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left'
    },
    buttonMenu: {
        top: 120,
        marginBottom: 100,
        width: '99%'
    },
    plusButton: {
        marginRight: 15,
        marginLeft: 15,
        marginTop: 25,

    },
    rightArrow: {
        marginTop: 25,
        marginRight: 10,
        marginLeft: 25
    },
    exerciseIcon: {

    }

});

export default ExerciseScreen;