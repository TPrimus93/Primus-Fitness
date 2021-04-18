import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import CurrentWorkoutButton from '../Components/CurrentWorkoutButton';
import NextWorkoutButton from '../Components/NextWorkoutButton';
import CurrentSetButton from '../Components/CurrentSetButton';
import NextSetButton from '../Components/NextSetButton';
import AddSetButton from '../Components/AddSetButton';
import { set } from 'react-native-reanimated';



function WorkoutScreen() {
    const [numberNotes, setNumberNotes] = useState(1);
    const [notes, setNotes] = useState("");
    const [note, setNote] = useState("");
    const [weight, setWeight] = useState(10);
    const [reps, setReps] = useState(10);
    const [sets, setSets] = useState(3);

    function addNote(noteInput) {
        if (noteInput != '') {
            setNotes(notes + 'Note ' + numberNotes + ':' + noteInput + '\n');
            setNote('');
            setNumberNotes(numberNotes + 1);
        }
    };

    function setRep(direction) {
        if (direction == 'up') {
            setReps(reps + 1);
        } else if (direction == 'down' && reps > 0) {
            setReps(reps - 1);
        }
    };

    function setWeights(direction) {
        if (direction == 'up') {
            setWeight(weight + 2.5);
        } else if (direction == 'down' && weight > 0) {
            setWeight(weight - 2.5);
        }
    };


    function setsMenu() {

    }

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
                    <TouchableOpacity style={styles.upArrow} onPress={() => setRep('up')}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{reps}</Text>
                    <TouchableOpacity style={styles.downArrow} onPress={() => setRep('down')}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.weightContainer}>
                    <Text style={styles.repsText}>Weight</Text>
                    <TouchableOpacity style={styles.upArrow} onPress={() => setWeights('up')}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{weight}</Text>
                    <TouchableOpacity style={styles.downArrow} onPress={() => setWeights('down')}>
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
                    value={note}
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
        bottom: 0,
        marginLeft: '5%',
        height: 240,
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
        position: 'absolute',
        justifyContent: 'flex-end'
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
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