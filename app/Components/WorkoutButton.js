import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function WorkoutButton({ workoutPos, value, setArray, setPos }) {

    const navigation = useNavigation();

    function returnButton() {
        if (value == true) {
            return (
                <TouchableOpacity style={styles.currentExerciseButton} onPress={() => navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos })}>
                    <Image style={styles.currentExerciseImage} source={require('../assets/DeadliftIcon.png')} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.nextExerciseButton} onPress={() => navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos })}>
                    <Image style={styles.nextExerciseImage} source={require('../assets/DeadliftIcon.png')} />
                </TouchableOpacity>
            );
        }
    };

    return (
        <View>
            { returnButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    currentExerciseImage: {
        height: 90,
        width: 90,
        alignSelf: 'center',
        marginTop: 25
    },
    currentExerciseButton: {
        width: 140,
        height: 140,
        borderRadius: 27,
        borderColor: '#707070',
        backgroundColor: '#2D2D2D',
        marginRight: 33
    },
    nextExerciseImage: {
        height: 55,
        width: 55,
        alignSelf: 'center',
        marginTop: 22
    },
    nextExerciseButton: {
        width: 100,
        height: 100,
        borderRadius: 27,
        borderColor: '#707070',
        backgroundColor: '#2D2D2D',
        marginRight: 33,
        marginTop: 25
    },


});

export default WorkoutButton;