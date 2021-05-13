import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView, Modal } from 'react-native';

import Navbar from '../Components/Navbar';
import PastWorkoutButton from '../Components/PastWorkoutButton';
import PastSetButton from '../Components/PastSetButton';
import { UserContext } from '../Components/UserContext';
import axios from 'axios';



function PastWorkoutScreen({ route, navigation }) {

    const { contextObject } = useContext(UserContext);
    //const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");
    const [notesModalVisible, setNotesModalVisible] = useState(false);
    const [addWorkoutModalVisible, setAddWorkoutModalVisible] = useState(false);


    var workoutArray = [];
    var workoutPos = 0;
    var currentSetPos = 0;

    if (route.params != null && route.params.setPosition != null) {
        currentSetPos = route.params.setPosition;
    }
    if (route.params != null && route.params.workoutPosition != null) {
        workoutPos = route.params.workoutPosition;
        if (workoutPos != contextObject.pastWorkoutPosition) {
            contextObject.pastWorkoutPosition = workoutPos;
            currentSetPos = 0;
        }
    }

    function setMenu() {
        //Returns the Set buttons
        return (
            <ScrollView style={styles.buttonMenu} horizontal={true}>
                {contextObject.pastWorkout[workoutPos].reps.map((setType, index) => <PastSetButton key={index} setIndex={index} buttonType={setType} workoutPos={workoutPos} setPos={currentSetPos} />)}
            </ScrollView>
        );
    }

    function workoutMenu() {
        //Sets the values for the workout Array 
        for (var index = 0; index < contextObject.pastWorkout.length; index++) {
            if (index == workoutPos) {
                workoutArray[index] = true;
            } else {
                workoutArray[index] = false;
            }
        }
        //Returns the Workout buttons
        return (
            <ScrollView style={styles.buttonMenu} horizontal={true}>
                {workoutArray.map((exercise, index) => <PastWorkoutButton key={index} workoutPos={index} value={exercise} setPos={currentSetPos} />)}
            </ScrollView>
        );
    };


    //Sets name title to the current workout
    function CurrentExerciseName(exerciseName) {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.currentExerciseText}>{exerciseName}</Text>
            </View>
        );
    };

    function repsWeightMenu() {
        return (
            <View style={styles.repWeightContainer}>

                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Reps</Text>
                    <TouchableOpacity style={styles.upArrow} disabled={true}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{contextObject.pastWorkout[workoutPos].reps[currentSetPos]}</Text>
                    <TouchableOpacity style={styles.downArrow} disabled={true}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Weight</Text>
                    <TouchableOpacity style={styles.upArrow} disabled={true}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{contextObject.pastWorkout[workoutPos].weight[currentSetPos]}</Text>
                    <TouchableOpacity style={styles.downArrow} disabled={true}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    // xios.post('http://68.172.33.6:9082/workouts/postWorkout', {
    //         belongsTo: contextObject.username,
    //         dateCreated: new Date(),
    //         notes: contextObject.notes,
    //         exercises: tempWorkout
    //     }, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } }).catch(e => console.log(e))

    function addNote() {
        var tempNote = contextObject.name + ': ' + note;
        axios.put('http://68.172.33.6:9082/workouts/updateNotes', {
            "_id": contextObject.pastWorkoutID.$oid,
            "addedNote": tempNote
        }, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } }).catch(e => console.log(e));
        contextObject.pastNotes.push(tempNote);
        setNote('');
        navigation.navigate('PastWorkout');
    };

    function addNoteButton() {
        if (note === '') {
            return (
                <TouchableOpacity style={styles.addNoteButton} disabled={true} >
                    <Text style={styles.notesButtonText}>+</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.addNoteButton} onPress={() => addNote()}>
                    <Text style={styles.notesButtonText}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    function performWorkout() {
        for (var index = 0; index < contextObject.pastWorkout.length; index++) {
            var eID = contextObject.pastWorkout[index].exerciseID;
            var title = contextObject.pastWorkout[index].exerciseName;
            var description = contextObject.pastWorkout[index].description;
            var picture = contextObject.pastWorkout[index].picture;
            contextObject.workoutList.push({ exerciseID: eID, title: title, description: description, picture: picture });
        }
        setAddWorkoutModalVisible(false);
        navigation.navigate('StartWorkout');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            {CurrentExerciseName(contextObject.pastWorkout[workoutPos].exerciseName)}
            <View style={styles.workoutScrollContainer}>
                {workoutMenu()}
            </View>
            <View style={styles.setScrollContainer}>
                {setMenu()}
            </View>
            {repsWeightMenu()}
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setNotesModalVisible(true)}>
                    <Text style={styles.notesButtonText}>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setAddWorkoutModalVisible(true)}>
                    <Text style={styles.finishButtonText}>Perfom</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={notesModalVisible}
            >
                <View style={styles.notesModelView}>
                    <View style={styles.newTextView}>
                        <TouchableOpacity style={styles.exitNotesButton} onPress={() => setNotesModalVisible(false)}>
                            <Text style={styles.exitNotesButtonText}>x</Text>
                        </TouchableOpacity>
                        <Text style={styles.notesTitle}>Notes</Text>
                        <TextInput
                            style={styles.notesInputText}
                            placeholder="Add Note..."
                            multiline={true}
                            placeholderTextColor='white'
                            onChangeText={(note) => setNote(note)}
                            value={note}
                        />
                        {addNoteButton()}
                    </View>
                    <Text style={styles.pastNotesTitle}>Past Notes</Text>
                    <ScrollView style={styles.notesScrollView}>
                        {contextObject.pastNotes.map((n, index) => <Text key={index} style={styles.pastNotesText}>{n}</Text>)}
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addWorkoutModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.finishModelView}>
                        <Text style={styles.finishText}>Perform Workout</Text>
                        <View style={styles.repWeightContainer}>
                            <TouchableOpacity style={styles.addWorkoutModalButton} onPress={() => performWorkout()}>
                                <Text style={styles.finishButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addWorkoutModalButton} onPress={() => setAddWorkoutModalVisible(false)}>
                                <Text style={styles.notesButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: '12%',
    },
    workoutScrollContainer: {
        alignItems: 'center',
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '2%'
    },
    setScrollContainer: {
        alignItems: 'center',
        marginTop: '3%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    repWeightContainer: {
        marginTop: '10%',
        width: '100%',
        flexDirection: 'row'
    },
    repsContainer: {
        width: '30%',
        marginLeft: '10%',
        marginRight: '10%',
        alignItems: 'center'
    },

    buttonMenu: {
        marginLeft: '5%',
        width: '100%'
    },
    bottomMenu: {
        bottom: 36,
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
    },
    bottomButton: {
        width: '40%',
        height: 60,
        borderWidth: 3,
        borderRadius: 25,
        alignItems: 'center',
        bottom: 1,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        justifyContent: 'center',
        backgroundColor: '#2D2D2D',
    },
    addWorkoutModalButton: {
        width: '40%',
        height: 60,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        backgroundColor: 'black',
    },


    notesButtonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center'
    },
    finishButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center'
    },
    currentExerciseText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center'
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
    notesInputText: {
        top: '10%',
        borderWidth: 3,
        borderRadius: 45,
        width: '80%',
        height: '60%',
        textAlign: 'left',
        paddingHorizontal: 25,
        paddingVertical: 25,
        textAlignVertical: 'top',
        color: 'white',
        alignSelf: 'center'
    },
    pastNotesText: {
        marginTop: '1%',
        color: 'white'
    },
    finishText: {
        fontSize: 35,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
        //marginBottom: 30
    },

    finishModelView: {
        borderRadius: 45,
        width: '80%',
        height: '28%',
        backgroundColor: '#2D2D2D',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    notesModelView: {
        flex: 1,
        borderRadius: 45,
        marginBottom: '10%',
        width: '80%',
        height: '50%',
        backgroundColor: '#2D2D2D',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    newTextView: {
        flex: 1.5,
        width: '100%',
        height: '40%',
        marginBottom: '5%'
    },
    notesScrollView: {
        flex: 1,
        height: '40%',
        width: '80%',
        marginTop: '5%',
        marginBottom: '25%'
    },


    addNoteButton: {
        position: 'absolute',
        top: '70%',
        right: '15%',
        width: 40,
        height: 40,
        borderWidth: 3,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    exitNotesButton: {
        position: 'absolute',
        top: 20,
        right: 1,
        width: 1,
        height: 20,
        bottom: '5%',
        // borderWidth: 3,
        // borderRadius: 90,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        // backgroundColor: 'black',
    },
    exitNotesButtonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
    },
    notesTitle: {
        fontSize: 30,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: '5%'
    },
    pastNotesTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: '5%'
    },

    upArrow: {
        marginBottom: 25
    },
    downArrow: {
        marginTop: 25
    },

});


export default PastWorkoutScreen;