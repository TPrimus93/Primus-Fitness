import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function SetButton({ setIndex, buttonType, setArray, workoutPos, setPos }) {

    const navigation = useNavigation();

    var setText = 'Set ' + (setIndex + 1);

    function finishedSetButton() {
        setArray[setIndex] = 1;
        //console.log(setArray);
        return (
            <View style={styles.setContainer}>
                <TouchableOpacity style={styles.setButtonDark} onPress={() => navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos })}>
                    <Text style={styles.buttonLightText} >{setText}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/CheckIcon.png')} />
            </View>
        );
    }

    function currentSetButton() {
        if (setArray.indexOf(2) != setIndex)
            setArray[setIndex] = 1;
        //console.log(setArray);
        return (
            <View style={styles.setContainer}>
                <TouchableOpacity style={styles.setButtonDark} onPress={() => navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos })}>
                    <Text style={styles.buttonLightText} >{setText}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/EllipseFilled.png')} />
            </View>
        );
    }

    function nextSetButton() {

        return (
            <View style={styles.setContainer}>
                <TouchableOpacity style={styles.setButtonLight} onPress={() => nextSetClick()}>
                    <Text style={styles.buttonDarkText}>{setText}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/EllipseClear.png')} />
            </View>
        );
    }

    function nextSetClick() {
        setPos = setArray.indexOf(3);
        setArray[setPos] = 2;
        setArray[setArray.indexOf(2)] = 1;
        navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos });
    }

    function currentSetClick() {

    }

    function finishedSetClick() {

    }

    function getSetButton() {
        switch (buttonType) {
            case 1:
                return (
                    <View>
                        { finishedSetButton()}
                    </View>
                );
                break;
            case 2:
                return (
                    <View>
                        {currentSetButton()}
                    </View>
                );
                break;
            case 3:
                return (
                    <View>
                        {nextSetButton()}
                    </View>
                );
                break;
            default:
                break;
        }

    }

    return (
        <View>
            {getSetButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        alignItems: 'center'
    },
    setButtonLight: {
        width: 85,
        height: 40,
        borderRadius: 18,
        borderColor: "#707070",
        borderWidth: 1,
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    buttonDarkText: {
        fontSize: 18,
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center'
    },
    setButtonDark: {
        width: 85,
        height: 40,
        borderRadius: 18,
        backgroundColor: '#2D2D2D',
        borderColor: "#707070",
        borderWidth: 1,
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    buttonLightText: {
        fontSize: 18,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center'
    },

});

export default SetButton;