import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import axios from 'axios';

import Navbar from '../Components/Navbar';
import { UserContext } from '../Components/UserContext';


function PastDaysWorkoutScreen({ route, navigation }) {
    const { contextObject } = useContext(UserContext);

    //sets the month, year, and datesArray variables
    var tempArray = route.params.dates;
    var tempMonth = route.params.month;
    var tempYear = route.params.year;

    //initialize the numdays variable
    var numDays = 0;

    //sets numdays to the number of days in that month
    switch (tempMonth) {
        case 'Jan':
        case 'Mar':
        case 'May':
        case 'Jul':
        case 'Aug':
        case 'Oct':
        case 'Dec':
            numDays = 31;
            break;
        case 'Apr':
        case 'Jun':
        case 'Sep':
        case 'Nov':
            numDays = 30;
            break;
        case 'Feb':
            if (((tempYear % 4 == 0) &&
                !(tempYear % 100 == 0))
                || (tempYear % 400 == 0))
                numDays = 29;
            else
                numDays = 28;
            break;
        default:
            console.log("Invalid month.");
            break;
    }

    //gets the workout performed on a specific day
    function getWorkout(day) {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByDate/' + contextObject.username + '/' + route.params.month + '-' + day + '-' + route.params.year, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => goToPastWorkout(response.data[0].exercises, response.data[0].notes, response.data[0]._id)).catch(e => console.log(e));
    }

    // goToPastWorkout(response.data[0].exercises, response.data[0].notes)

    //set past workout context and forwards user to that workout page
    function goToPastWorkout(pastWorkout, notes, workoutID) {
        contextObject.pastWorkout = pastWorkout;
        contextObject.pastNotes = notes;
        contextObject.pastWorkoutID = workoutID;
        navigation.navigate('PastWorkout');
    }

    //brings user back to past workout months page
    function goBack() {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByYear/' + contextObject.username + '/' + route.params.year, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('PastMonthWorkouts', { dates: response.data, })).catch(e => console.log(e));
    }

    //renders the day button based on numDays
    function monthDays() {
        if (numDays === 28) {
            return (
                <View style={styles.scrollContainer} >
                    {daysButton(5)}
                    {daysButton(10)}
                    {daysButton(15)}
                    {daysButton(20)}
                    {daysButton(25)}
                    <View style={styles.dayButtonView}>
                        {dayButton(26)}
                        {dayButton(27)}
                        {dayButton(28)}
                    </View>
                </View>
            );
        } else if (numDays === 29) {
            return (
                <View style={styles.scrollContainer} >
                    {daysButton(5)}
                    {daysButton(10)}
                    {daysButton(15)}
                    {daysButton(20)}
                    {daysButton(25)}
                    <View style={styles.dayButtonView}>
                        {dayButton(26)}
                        {dayButton(27)}
                        {dayButton(28)}
                        {dayButton(29)}
                    </View>
                </View>
            );
        } else if (numDays === 31) {
            return (
                <View style={styles.scrollContainer} >
                    {daysButton(5)}
                    {daysButton(10)}
                    {daysButton(15)}
                    {daysButton(20)}
                    {daysButton(25)}
                    {daysButton(30)}
                    <View style={styles.dayButtonView}>
                        {dayButton(31)}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.scrollContainer} >
                    {daysButton(5)}
                    {daysButton(10)}
                    {daysButton(15)}
                    {daysButton(20)}
                    {daysButton(25)}
                    {daysButton(30)}
                </View>
            );
        }
    }

    //renders 5 days in a row
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

    //conditionally renders the day button if its in the dateArray
    function dayButton(day) {
        if (tempArray.includes(day)) {
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

    //renders the month that was selected
    function monthButton() {
        return (
            <View style={styles.monthButtonView}>
                <TouchableOpacity style={styles.monthButton} onPress={() => goBack()}>
                    <Text style={styles.monthButtonText}>{tempMonth}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Navbar />
            {monthButton()}
            {monthDays()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    scrollContainer: {
        width: '100%',
        marginTop: '10%',
        alignSelf: 'center',
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
        flexDirection: 'row',
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