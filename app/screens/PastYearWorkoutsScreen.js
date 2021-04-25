import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import YearButton from '../Components/YearButton';
import { UserContext } from '../Components/UserContext';


function PastYearWorkoutsScreen({ route }) {
    const { contextObject, setContextObject } = useContext(UserContext);


    return (
        <View style={styles.container}>
            {console.log(route.params)}
            <Navbar />
            <ScrollView style={styles.scrollContainer}>
                {route.params.dates.map((date) => <YearButton key={date} year={date} />)}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    scrollContainer: {
        marginTop: '30%'
    },
    yearButton: {
        width: '80%',
        height: 80,
        borderColor: "#707070",
        borderWidth: 4,
        marginBottom: '2%',
        marginTop: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#151515',
        elevation: 10
    },
    yearButtonView: {
        marginTop: '5%'
    },
    yearButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
});

export default PastYearWorkoutsScreen;