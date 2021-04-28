import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import ExerciseButton from '../Components/ExerciseButton';
import { UserContext } from '../Components/UserContext';


function StartWorkoutScreen({ route, navigation }) {
    const { contextObject, setContextObject } = useContext(UserContext);

    function consolelog() {
        console.log('exercises');
    }

    function startWorkout() {
        navigation.navigate('Workout');
    };
    return (
        <SafeAreaView style={styles.container}>
            {consolelog()}
            <Navbar />
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={false} >
                    {contextObject.workoutList.map((exercise) => <ExerciseButton key={exercise.exerciseID} title={exercise.title} exerciseID={exercise.exerciseID} workoutIndex={contextObject.workoutList.indexOf(exercise.exerciseID)} />)}
                </ScrollView>
                <TouchableOpacity style={styles.loginButton}
                    onPress={() => startWorkout()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
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
    buttonMenu: {
        top: 120,
        marginBottom: 100,
        width: '99%'
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

});

export default StartWorkoutScreen;