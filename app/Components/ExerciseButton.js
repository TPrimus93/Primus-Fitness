import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

function ExerciseButton() {
    return (
        <View style={styles.centerButton} >
            <TouchableOpacity style={styles.plusButton}>
                <Image source={require('../assets/PlusIcon.png')} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Push-ups</Text>
            <Image style={styles.exerciseIcon} source={require('../assets/PushUpsIcon.png')} />
            <TouchableOpacity style={styles.rightArrow}>
                <Image source={require('../assets/RightArrowIcon.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
    buttonText: {
        marginTop: 5,
        fontSize: 35,
        marginRight: "20%",
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left'
    },
    buttonMenu: {
        top: 120,
        marginBottom: 100,
        width: '99%'
    },
    plusButton: {
        marginRight: 15,
        marginLeft: 15,
        marginTop: 25,

    },
    rightArrow: {
        marginTop: 25,
        marginRight: 10,
        marginLeft: 25
    },

});

export default ExerciseButton;