import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { setStatusBarStyle } from 'expo-status-bar';



function PastWorkoutsScreen() {

    function monthsButton(firstMonth, secondMonth) {
        return (
            <View style={styles.monthButtonView}>
                <TouchableOpacity style={styles.monthButton}>
                    <Text style={styles.monthButtonText}>{firstMonth}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.monthButton}>
                    <Text style={styles.monthButtonText}>{secondMonth}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    function yearButton(year) {
        return (
            <View style={styles.yearButtonView}>
                <TouchableOpacity style={styles.yearButton}>
                    <Text style={styles.yearButtonText}>{year}</Text>
                </TouchableOpacity>
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <Navbar />
            {yearButton(2021)}
            <ScrollView style={styles.scrollContainer}>
                {monthsButton('Jan', 'Feb')}
                {monthsButton('Mar', 'Apr')}
                {monthsButton('May', 'Jun')}
                {monthsButton('Jul', 'Aug')}
                {monthsButton('Sep', 'Oct')}
                {monthsButton('Nov', 'Dec')}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
    },
    navbarView: {
        position: 'relative',
    },
    scrollContainer: {
        marginTop: '2%'
    },
    monthButton: {
        width: '40%',
        height: 80,
        borderColor: "#707070",
        borderWidth: 4,
        marginLeft: '6%',
        marginRight: '2%',
        marginBottom: '7%',
        marginTop: '5%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#151515',
        elevation: 10
    },
    monthButtonView: {
        flexDirection: 'row',
    },
    monthButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
    yearButton: {
        width: '25%',
        height: 50,
        borderColor: "#707070",
        borderWidth: 4,
        marginBottom: '2%',
        marginTop: '16%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#151515',
        elevation: 10
    },
    yearButtonView: {
        marginBottom: 1,
    },
    yearButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },


});

export default PastWorkoutsScreen;