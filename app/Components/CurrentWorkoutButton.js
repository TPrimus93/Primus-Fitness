import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

function CurrentWorkoutButton() {
    return (
        <TouchableOpacity style={styles.currentExerciseButton}>
            <Image style={styles.currentExerciseImage} source={require('../assets/DeadliftIcon.png')} />
        </TouchableOpacity>

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


});

export default CurrentWorkoutButton;