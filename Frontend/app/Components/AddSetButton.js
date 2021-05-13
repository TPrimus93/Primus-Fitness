import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AddSetButton({ setArray, workoutPos, setPos, weight, reps }) {

    const navigation = useNavigation();

    //handles adding a set to the workouts
    function addSet() {
        setArray.push(3);
        navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setArray, setPosition: setPos, weight: weight, reps: reps });
    }

    return (
        <View style={styles.setContainer}>
            <TouchableOpacity style={styles.setButtonAdd} onPress={() => addSet()}>
                <Text style={styles.buttonAddText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        alignItems: 'center'
    },
    setButtonAdd: {
        width: 40,
        height: 40,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    buttonAddText: {
        fontSize: 18,
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center'
    },

});

export default AddSetButton;