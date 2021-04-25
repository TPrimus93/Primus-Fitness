import React, { useContext } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import axios from 'axios';

import Navbar from '../Components/Navbar';
import { UserContext } from '../Components/UserContext';


function PastDaysWorkoutScreen({ route, navigation }) {
    const { contextObject, setContextObject } = useContext(UserContext);

    var tempArray = [1, 8, 17, 18, 19, 23];

    function consolelog() {
        console.log(route.params);
        // console.log(tempArray.includes(17));
    }

    function getWorkout(day) {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByDate/' + contextObject.username + '/' + route.params.month + '-' + day + '-' + route.params.year, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => alert(JSON.stringify(response.data))).catch(e => console.log(e));
    }

    function goBack() {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByYear/' + contextObject.username + '/' + route.params.year, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('PastMonthWorkouts', { dates: response.data, })).catch(e => console.log(e));
    }

    function daysButton(day) {
        return (
            <View style={styles.dayButtonView}>
                {dayButton(day - 4)}
                {dayButton(day - 3)}
                {dayButton(day - 2)}
                {dayButton(day - 1)}
                {dayButton(day)}
            </View>
        );
    };

    function dayButton(day) {
        if (route.params.dates.includes(day)) {
            return (
                <TouchableOpacity style={styles.dayButton} disabled={false} onPress={() => getWorkout(day)}>
                    <Text style={styles.dayButtonTextEnabled}>{day}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.dayButton} disabled={true}>
                    <Text style={styles.dayButtonTextDisabled}>{day}</Text>
                </TouchableOpacity>
            );
        };
    };

    function monthButton() {
        return (
            <View style={styles.monthButtonView}>
                <TouchableOpacity style={styles.monthButton} onPress={() => goBack()}>
                    <Text style={styles.monthButtonText}>{route.params.month}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {consolelog()}
            <Navbar />
            {monthButton()}
            <View style={styles.scrollContainer} >
                {daysButton(5)}
                {daysButton(10)}
                {daysButton(15)}
                {daysButton(20)}
                {daysButton(25)}
                {daysButton(30)}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    scrollContainer: {
        marginTop: '10%',
        alignItems: 'center'
    },
    dayButton: {
        width: 60,
        height: 60,
        borderColor: "#707070",
        borderWidth: 4,
        marginRight: '2%',
        marginLeft: '2%',
        marginBottom: '2%',
        marginTop: '2%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#151515',
        elevation: 10
    },
    dayButtonView: {
        // marginLeft: '8%',
        // marginRight: '5%',
        // marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dayButtonTextEnabled: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
    dayButtonTextDisabled: {
        fontSize: 25,
        color: '#707070',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
    monthButton: {
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
    monthButtonView: {
        marginTop: '10%',
        marginBottom: 1,
    },
    monthButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
});

export default PastDaysWorkoutScreen;