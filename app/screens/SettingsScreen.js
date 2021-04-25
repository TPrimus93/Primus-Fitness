import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { setStatusBarStyle } from 'expo-status-bar';



function SettingsScreen() {

    function button(title) {
        return (
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <Navbar />
            <Text style={styles.nameText}>Settings</Text>
            <View style={styles.menuView}>
                {button('Username')}
                {button('Password')}
                {button('Birthday')}
                {button('Name')}
                {button('Weight')}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    buttonView: {
        marginBottom: '5%',
        justifyContent: 'center'
    },
    button: {
        width: '80%',
        height: 80,
        borderColor: "#707070",
        borderWidth: 4,
        marginBottom: '5%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#151515',
        elevation: 10
    },
    buttonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: 'center'
    },
    menuView: {
        marginTop: '10%',
    },
    nameText: {
        marginTop: '15%',
        fontSize: 30,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: 'center'
    }

});

export default SettingsScreen;