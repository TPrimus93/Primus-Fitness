import React, { useState, useEffect, useContext } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { UserContext } from '../Components/UserContext';


function PastMonthWorkoutsScreen({ route, navigation }) {
    const { contextObject, setContextObject } = useContext(UserContext);
    const [info, setInfo] = useState("");

    function monthsButton(firstMonth, secondMonth, monthOne, monthTwo) {
        return (
            <View style={styles.monthButtonView}>
                {monthButton(monthOne, firstMonth)}
                {monthButton(monthTwo, secondMonth)}
            </View>
        );
    };

    function getDaysByMonth(monthName) {
        console.log(monthName);
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByMonth/' + contextObject.username + '/' + monthName + '-2021', { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('PastDaysWorkouts', { dates: response.data, month: monthName, year: route.params.dates[0].substring(24, 28), })).catch(e => console.log(e));
    }

    function monthButton(dis, nam) {
        if (dis == true) {
            return (
                <TouchableOpacity style={styles.monthButton} disabled={!dis} onPress={() => getDaysByMonth(nam)}>
                    <Text style={styles.monthButtonTextEnabled}>{nam}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.monthButton} disabled={!dis}>
                    <Text style={styles.monthButtonTextDisabled}>{nam}</Text>
                </TouchableOpacity>
            );
        }
    }

    function goBack() {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByUser/' + contextObject.username, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('PastYearWorkouts', { dates: response.data, })).catch(e => console.log(e));
    }

    function yearButton() {
        return (
            <View style={styles.yearButtonView}>
                <TouchableOpacity style={styles.yearButton} onPress={() => goBack()}>
                    <Text style={styles.yearButtonText}>{route.params.dates[0].substring(24, 28)}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    function monthMenu() {
        var butJan = false; var butFeb = false; var butMar = false; var butApr = false;
        var butMay = false; var butJun = false; var butJul = false; var butAug = false;
        var butSep = false; var butOct = false; var butNov = false; var butDec = false;
        var monthArray = route.params.dates;
        for (var index = 0; index < monthArray.length; index++) {
            switch (monthArray[index].substring(4, 7)) {
                case 'Jan':
                    butJan = true;
                    break;
                case 'Feb':
                    butFeb = true;
                    break;
                case 'Mar':
                    butMar = true;
                    break;
                case 'Apr':
                    butApr = true;
                    break;
                case 'May':
                    butMay = true;
                    break;
                case 'Jun':
                    butJun = true;
                    break;
                case 'Jul':
                    butJul = true;
                    break;
                case 'Aug':
                    butAug = true;
                    break;
                case 'Sep':
                    butSep = true;
                    break;
                case 'Oct':
                    butOct = true;
                    break;
                case 'Nov':
                    butNov = true;
                    break;
                case 'Dec':
                    butDec = true;
                    break;
                default:
                    break;
            }
        };

        return (
            <ScrollView style={styles.scrollContainer}>
                { monthsButton('Jan', 'Feb', butJan, butFeb)}
                { monthsButton('Mar', 'Apr', butMar, butApr)}
                { monthsButton('May', 'Jun', butMay, butJun)}
                { monthsButton('Jul', 'Aug', butJul, butAug)}
                { monthsButton('Sep', 'Oct', butSep, butOct)}
                { monthsButton('Nov', 'Dec', butNov, butDec)}
            </ScrollView>
        );
    };



    return (
        <View style={styles.container}>
            <Navbar />
            {console.log(route.params)}
            {yearButton()}
            {monthMenu()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
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
    monthButtonTextEnabled: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
    monthButtonTextDisabled: {
        fontSize: 25,
        color: '#707070',
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

export default PastMonthWorkoutsScreen;