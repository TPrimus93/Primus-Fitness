import React, { useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../Components/UserContext';


function WorkoutButton({ workoutPos, value, setArray, setPos, weight, reps }) {


    const { contextObject } = useContext(UserContext);

    const navigation = useNavigation();

    //renders the workout buttons
    function returnButton() {
        if (value == true) {
            return (
                <TouchableOpacity style={styles.currentExerciseButton} onPress={() => navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos, weight: weight, reps: reps })}>
                    <Image style={styles.currentExerciseImage} source={{ uri: 'data:image/gif;base64,' + contextObject.workoutList[workoutPos].picture }} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.nextExerciseButton} onPress={() => navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos, weight: weight, reps: reps })}>
                    <Image style={styles.nextExerciseImage} source={{ uri: 'data:image/gif;base64,' + contextObject.workoutList[workoutPos].picture }} />
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
        borderRadius: 25,
        borderColor: '#707070',
        backgroundColor: '#2D2D2D',
        marginRight: 33
    },
    nextExerciseImage: {
        height: 55,
        width: 55,
        alignSelf: 'center',
        marginTop: 22,
        borderRadius: 25
    },
    nextExerciseButton: {
        width: 100,
        height: 100,
        borderRadius: 25,
        borderColor: '#707070',
        backgroundColor: '#2D2D2D',
        marginRight: 33,
        marginTop: 25
    },


});

export default WorkoutButton;