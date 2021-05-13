import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function PastSetButton({ setIndex, workoutPos, setPos }) {

    const navigation = useNavigation();

    var setText = 'Set ' + (setIndex + 1);

    //renders the past set button
    function finishedSetButton() {
        return (
            <View style={styles.setContainer}>
                <TouchableOpacity style={styles.setButtonDark} onPress={() => finishedSetClick()}>
                    <Text style={styles.buttonLightText} >{setText}</Text>
                </TouchableOpacity>
                <Image source={require('../assets/CheckIcon.png')} />
            </View>
        );
    }

    //handles the set button on Press
    function finishedSetClick() {
        setPos = setIndex;
        navigation.navigate('PastWorkout', { workoutPosition: workoutPos, setPosition: setPos });
    }

    return (
        <View>
            {finishedSetButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        alignItems: 'center'
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

export default PastSetButton;