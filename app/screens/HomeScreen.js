import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";


function HomeScreen() {

    return (
        <SafeAreaView style={styles.container} >

            <Image style={styles.logo} opacity={0.8} source={require('../assets/Primus_Fitness_Logo.png')} />
            <TouchableOpacity style={styles.barbell}>
                <Image source={require('../assets/metro-barbell.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.featherMenu} >
                <Image source={require('../assets/feather-menu.png')} />
            </TouchableOpacity>
            <View style={styles.buttonMenu}>
                <TouchableOpacity style={styles.centerButton} >
                    <Text style={styles.buttonText}>Weight Training</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.centerButton} >
                    <Text style={styles.buttonText}>Recovery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.centerButton} >
                    <Text style={styles.buttonText}>Plyometrics</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        position: 'absolute',
        top: 60,
        left: 20,
        height: 61,
        width: 102
    },
    barbell: {
        position: 'absolute',
        top: 78,
        right: 70,
        elevation: 8,
    },
    featherMenu: {
        position: 'absolute',
        top: 78,
        right: 20,
        elevation: 8,
    },
    centerButton: {
        width: 175,
        height: 175,
        borderRadius: 90,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#E51B23",
        marginBottom: 50,
        marginTop: 50,
        elevation: 8,
        justifyContent: "center",

    },
    buttonText: {
        fontSize: 25,
        color: 'black',
        fontWeight: "bold",
        alignSelf: "center",
        opacity: 0.8,
        textAlign: 'center'
    },
    buttonMenu: {
        top: 50
    }


});

export default HomeScreen;