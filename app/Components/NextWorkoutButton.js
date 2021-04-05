import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

function NextWorkoutButton() {
    return (
        <TouchableOpacity style={styles.nextExerciseButton}>
            <Image style={styles.nextExerciseImage} source={require('../assets/DeadliftIcon.png')} />
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
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

export default NextWorkoutButton;