import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import CurrentWorkoutButton from '../Components/CurrentWorkoutButton';
import NextWorkoutButton from '../Components/NextWorkoutButton';
import CurrentSetButton from '../Components/CurrentSetButton';
import NextSetButton from '../Components/NextSetButton';
import AddSetButton from '../Components/AddSetButton';



function WorkoutScreen() {
    const [notes, setNotes] = useState("");
    const [note, setNote] = useState("");
    const [weight, setWeight] = useState("100");
    const [reps, setReps] = useState('10');

    function addNote(noteInput) {
        (noteInput) => setNotes(noteInput);
        alert()
    };


    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <View style={styles.workoutScrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={true}>
                    <CurrentWorkoutButton />
                    <NextWorkoutButton />
                    <NextWorkoutButton />
                    <NextWorkoutButton />
                    <NextWorkoutButton />
                </ScrollView>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.currentExerciseText}>Dead-lifts</Text>
            </View>
            <View style={styles.setScrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={true}>
                    <CurrentSetButton props={'Set 1'} />
                    <NextSetButton props={'Set 2'} />
                    <NextSetButton props={'Set 3'} />
                    <NextSetButton props={'Set 4'} />
                    <AddSetButton />
                </ScrollView>
            </View>
            <View style={styles.repWeightContainer}>
                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Reps</Text>
                    <TouchableOpacity style={styles.upArrow} >
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.weightButtonText}
                        textAlign='center'
                        value={reps}
                        onChangeText={(reps) => setReps(reps)}
                    />
                    <TouchableOpacity style={styles.downArrow} >
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.weightContainer}>
                    <Text style={styles.repsText}>Weight</Text>
                    <TouchableOpacity style={styles.upArrow} >
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.weightButtonText}
                        textAlign='center'
                        value={weight}
                        onChangeText={(weight) => setNote(weight)}
                    />
                    <TouchableOpacity style={styles.downArrow} >
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.notesInputView}>
                <TextInput
                    style={styles.notesInputText}
                    placeholder="Notes.."
                    textAlign='left'
                    onChangeText={(note) => setNote(note)}
                />
                <TouchableOpacity style={styles.setButtonAdd} onPress={() => addNote(note)}>
                    <Text style={styles.buttonAddText}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    workoutScrollContainer: {
        alignItems: 'center',
        marginTop: '30%',
        marginLeft: '5%',
        marginRight: '2%'
    },
    setScrollContainer: {
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    textContainer: {
        alignItems: 'center',
    },
    repWeightContainer: {
        marginTop: '5%',
        marginLeft: '12%',
        flexDirection: 'row'
    },
    repsContainer: {
        alignItems: 'center'
    },
    weightContainer: {
        alignItems: 'center',
        marginLeft: '37%'
    },
    currentExerciseText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'relative'
    },
    buttonMenu: {
        marginLeft: '5%',
        width: '100%'
    },
    notesInputView: {
        marginLeft: '5%',
        marginTop: '5%',
        height: 250,
        width: '90%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "white",
        padding: 20,
        textAlign: 'left',

    },
    notesInputText: {
        height: 50,
        textAlign: 'left'
    },
    repsText: {
        marginBottom: 25,
        fontSize: 25,
        fontWeight: 'bold'
    },
    weightButtonText: {
        width: 100,
        height: 50,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#707070",
        fontSize: 25,
        fontWeight: 'bold'
    },
    weightText: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    upArrow: {
        marginBottom: 25
    },
    downArrow: {
        marginTop: 25
    },
    setButtonAdd: {
        width: 40,
        height: 40,
        borderRadius: 45,
        borderColor: "#707070",
        backgroundColor: 'grey',
        borderWidth: 1,
        marginLeft: '90%',
        marginTop: '32%'
    },
    buttonAddText: {
        marginTop: 3.5,
        fontSize: 18,
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center'
    },
});

export default WorkoutScreen;