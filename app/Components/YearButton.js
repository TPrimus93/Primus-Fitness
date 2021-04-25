import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Components/UserContext';


function yearButton({ year }) {
    const navigation = useNavigation();
    const { contextObject, setContextObject } = useContext(UserContext);

    function goToMonths() {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByYear/' + contextObject.username + '/' + year, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('PastMonthWorkouts', { dates: response.data, })).catch(e => console.log(e));
    }

    return (
        <View style={styles.yearButtonView}>
            <TouchableOpacity style={styles.yearButton} onPress={() => goToMonths()}>
                <Text style={styles.yearButtonText}>{year}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
export default yearButton;