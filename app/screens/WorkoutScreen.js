import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView, Modal } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import AddSetButton from '../Components/AddSetButton';
import WorkoutButton from '../Components/WorkoutButton';
import SetButton from '../Components/SetButton';
import { UserContext } from '../Components/UserContext';


// {
//     "belongsTo": "trevor",
//     "dateCreated": "4/17/2021",
//     "notes": [
//       {
//         "owner": "Trevor",
//         "note": "testing"
//       }
//     ],
//     "exercises": [
//       {
//         "exerciseID": 1,
//         "exerciseName": "Bench Press",
//         "reps": [
//           1
//         ],
//         "weight": [
//           150
//         ]
//       }
//     ]
//   }



function WorkoutScreen({ route, navigation }) {

    const { contextObject, setContextObject } = useContext(UserContext);
    const [contextWorkout, setContextWorkout] = useState(false);
    const [notesModalVisible, setNotesModalVisible] = useState(false);
    const [finishModalVisible, setFinishModalVisible] = useState(false);
    //const [workoutPosition, setWorkoutPosition] = useState(0)
    const [numberNotes, setNumberNotes] = useState(1);
    const [notes, setNotes] = useState("");
    const [note, setNote] = useState("");
    //const [weight, setWeight] = useState(100);
    //const [reps, setReps] = useState(10);


    var par = [
        { "exerciseID": 2, "exerciseName": "Dead-Lift" },
        { "exerciseID": 3, "exerciseName": "Squats" },
        { "exerciseID": '60732f6d992772fc8ae2c690', "exerciseName": "Bench Press" },
        { "exerciseID": 4, "exerciseName": "Press" }
    ]

    var tempNotes = [
        "Trevor Primus: Set 3 was hard so I didn't do set 4 on Squats.",
        "Trainer: Okay. Did you hurt yourself or just tired?",
        "Trevor Primus: I was just tired.",
        "Trainer: Okay. Next time try lowering the weight and doing an extra couple reps instead",
        "Trevor Primus: Okay"
    ]

    var workoutArray = [];
    var setsArray = [2, 3, 3, 3];
    var workoutPos = 0;
    var currentSetPos = 0;
    var weight = 100;
    var reps = 8;
    if (route.params != null) {
        weight = route.params.weight;
        reps = route.params.reps;
    }


    // useEffect(() => {
    //     console.log(weight)

    // });
    // var tempWeight = contextObject.workout[workoutPos].weight[setPos];

    // if (route.params != null) {
    //     if (route.params.workoutPosition != null) {
    //         if (route.params.workoutPosition != workoutPosition) {
    //             setWorkoutPosition(route.params.workoutPosition);
    //         } else {
    //             if (route.params.setArray != null) {
    //                 console.log('setArray')
    //                 setsArray = route.params.setArray;
    //             }
    //             if (route.params.setPosition != null) {
    //                 setPos = route.params.setPosition;
    //             }
    //         }
    //         workoutPos = route.params.workoutPosition;
    //     }
    // }

    function setWPosition() {
        contextObject.workoutPosition = route.params.workoutPosition;
        checkWorkout();
    }

    function checkWorkout() {
        var setsLength = contextObject.workout[workoutPos].weight.length;
        console.log('setslength ' + setsLength);
        if (setsLength != 0) {
            for (var index = 0; index < setsLength; index++) {
                setsArray[index] = 1;
            }
            if (setsLength < 4)
                setsArray[setsLength] = 2;
            currentSetPos = setsLength;
            contextObject.setPosition = setsLength;
        } else {
            currentSetPos = 0;
            contextObject.setPosition = 0;
        }

    }

    //Initialize the workout array held in the context. 
    //Should only run when the workout is first started.
    function startWorkout() {
        if (contextObject.workoutList.length != 0) {
            for (var index = 0; index < contextObject.workoutList.length; index++) {
                contextObject.workout.push({
                    "exerciseID": contextObject.workoutList[index].exerciseID,
                    "exerciseName": contextObject.workoutList[index].title,
                    "reps": [],
                    "weight": []
                });
            }
            setContextWorkout(true);
        }
    }

    //Updates the workout screen
    function updateWorkout() {
        //Checks to see if workout is just starting
        if (contextWorkout === false) {
            startWorkout();
        } else {
            //Checks if the buttons have set the route params
            if (route.params != null && route.params.workoutPosition != null) {
                workoutPos = route.params.workoutPosition;
                //Checks if the a different workout button then the one being displayed was pressed 
                if (route.params.workoutPosition != contextObject.workoutPosition) {
                    setWPosition();
                }
                //gets the new set position and new set button values
                else {
                    if (route.params.setArray != null) {
                        setsArray = route.params.setArray;
                    }
                    if (route.params.setPosition != null) {
                        currentSetPos = route.params.setPosition;
                        if (currentSetPos != contextObject.setPosition) {
                            if (contextObject.workout[workoutPos].weight[currentSetPos] != null) {
                                contextObject.workout[workoutPos].weight[contextObject.setPosition] = weight;
                                contextObject.workout[workoutPos].reps[contextObject.setPosition] = reps;
                                reps = contextObject.workout[workoutPos].reps[currentSetPos]
                                weight = contextObject.workout[workoutPos].weight[currentSetPos];
                                contextObject.setPosition = currentSetPos;
                            } else {
                                contextObject.workout[workoutPos].weight[contextObject.setPosition] = weight;
                                contextObject.workout[workoutPos].reps[contextObject.setPosition] = reps;
                                contextObject.setPosition = currentSetPos;
                            }
                        }
                    }
                }
            }
        }
    }

    function addNote(noteInput) {
        if (noteInput != '') {
            setNotes(notes + 'Note ' + numberNotes + ':' + noteInput + '\n');
            setNote('');
            setNumberNotes(numberNotes + 1);
        }
    };

    function setRep(direction) {
        if (direction === 'up') {
            reps += 1;
            navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setsArray, setPosition: currentSetPos, weight: weight, reps: reps });
        } else if (direction == 'down' && reps > 0) {
            reps -= 1;
            navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setsArray, setPosition: currentSetPos, weight: weight, reps: reps });
        }
    };

    function setWeights(direction) {
        if (direction === 'up') {
            weight += 2.5;
            navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setsArray, setPosition: currentSetPos, weight: weight, reps: reps });
            //contextObject.workout[workoutPos].weight[currentSetPos] += 2.5;
        } else if (direction == 'down' && weight > 0) {
            weight -= 2.5;
            navigation.navigate('Workout', { workoutPosition: workoutPos, setArray: setsArray, setPosition: currentSetPos, weight: weight, reps: reps });
        }
    };


    function CurrentExerciseName(exerciseName) {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.currentExerciseText}>{exerciseName}</Text>
            </View>
        );
    };

    function workoutMenu() {
        //Sets the values for the workout Array 
        for (var index = 0; index < contextObject.workoutList.length; index++) {
            if (index == workoutPos) {
                workoutArray[index] = true;
            } else {
                workoutArray[index] = false;
            }
        }
        //Returns the Workout buttons
        return (
            <ScrollView style={styles.buttonMenu} horizontal={true}>
                {workoutArray.map((exercise, index) => <WorkoutButton key={index} workoutPos={index} value={exercise} setArray={setsArray} setPos={currentSetPos} weight={weight} reps={reps} />)}
            </ScrollView>
        );
    };

    function setMenu() {
        //Returns the Set buttons
        return (
            <ScrollView style={styles.buttonMenu} horizontal={true}>
                {setsArray.map((setType, index) => <SetButton key={index} setIndex={index} buttonType={setType} setArray={setsArray} workoutPos={workoutPos} setPos={currentSetPos} weight={weight} reps={reps} />)}
                <AddSetButton />
            </ScrollView>
        );
    }

    // index = a.findIndex(x => x.prop2 ==="yutu");

    function weightMenu(x) {
        if (setsArray[x] === 1) {
            return (
                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Weight</Text>
                    <TouchableOpacity style={styles.upArrow} disabled={true}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{weight}</Text>
                    <TouchableOpacity style={styles.downArrow} disabled={true}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (

                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Weight</Text>
                    <TouchableOpacity style={styles.upArrow} onPress={() => setWeights('up')}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{weight}</Text>
                    <TouchableOpacity style={styles.downArrow} onPress={() => setWeights('down')}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
            );
        }
    }

    function repsMenu(x) {
        if (setsArray[x] === 1) {
            return (
                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Reps</Text>
                    <TouchableOpacity style={styles.upArrow} disabled={true}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{reps}</Text>
                    <TouchableOpacity style={styles.downArrow} disabled={true}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
            );

        } else {

            return (
                <View style={styles.repsContainer}>
                    <Text style={styles.repsText}>Reps</Text>
                    <TouchableOpacity style={styles.upArrow} onPress={() => setRep('up')}>
                        <Image source={require('../assets/UpArrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.weightButtonText}>{reps}</Text>
                    <TouchableOpacity style={styles.downArrow} onPress={() => setRep('up')}>
                        <Image source={require('../assets/DownArrow.png')} />
                    </TouchableOpacity>
                </View>
            );
        }
    }

    function addNoteButton() {
        if (note === '') {
            return (
                <TouchableOpacity style={styles.addNoteButton} disabled={true} >
                    <Text style={styles.notesButtonText}>+</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.addNoteButton} >
                    <Text style={styles.notesButtonText}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Navbar />
                {updateWorkout()}
                {console.log(weight)}
                {console.log(contextObject.workout)}
                {console.log('contextPos ' + contextObject.setPosition)}
                {console.log(setsArray)}
                {console.log('currentWorkoutPos ' + workoutPos)}
                {CurrentExerciseName(contextObject.workout[workoutPos].exerciseName)}
                <View style={styles.workoutScrollContainer}>
                    {workoutMenu()}
                </View>
                <View style={styles.setScrollContainer}>
                    {setMenu()}
                </View>
                <View style={styles.repWeightContainer}>
                    {repsMenu(contextObject.setPosition)}
                    {weightMenu(contextObject.setPosition)}
                </View>
            </View>
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setNotesModalVisible(true)}>
                    <Text style={styles.notesButtonText}>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => setFinishModalVisible(true)}>
                    <Text style={styles.finishButtonText}>Finish</Text>
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
                            placeholder="Notes.."
                            multiline={true}
                            placeholderTextColor='white'
                            onChangeText={(note) => setNote(note)}
                            value={note}
                        />
                        {addNoteButton()}
                    </View>
                    <Text style={styles.pastNotesTitle}>Past Notes</Text>
                    <ScrollView style={styles.notesScrollView}>
                        {tempNotes.map((n, index) => <Text key={index} style={styles.pastNotesText}>{n}</Text>)}
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={finishModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.finishModelView}>
                        <TouchableOpacity style={styles.exitNotesButton} onPress={() => setFinishModalVisible(false)}>
                            <Text style={styles.exitNotesButtonText}>x</Text>
                        </TouchableOpacity>
                        <Text style={styles.finishText}>Finish Workout</Text>
                        <TouchableOpacity style={styles.bottomButton} onPress={() => setFinishModalVisible(false)}>
                            <Text style={styles.finishButtonText}>Finish</Text>
                        </TouchableOpacity>
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
    top: {
        flex: 7
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
    textContainer: {
        alignItems: 'center',
        marginTop: '12%',
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
    bottomMenu: {
        flex: 1,
        // alignContent: 'flex-end',
        // justifyContent: 'flex-end',
        //bottom: 36,
        //top: '20%',
        width: '100%',
        //height: '100%',
        //marginTop: '50%',
        //position: 'absolute',
        flexDirection: 'row',
    },
    bottomButton: {
        //position: 'absolute',
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
    notesModelView: {
        flex: 1,
        borderRadius: 45,
        marginBottom: '25%',
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
    finishModelView: {
        borderRadius: 45,
        //marginBottom: '25%',
        width: '80%',
        height: '30%',
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
    modelButton: {
        position: 'absolute',
        width: '40%',
        height: 50,
        bottom: '5%',
        borderWidth: 3,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        backgroundColor: '#2D2D2D',

    },
    newTextView: {
        flex: 1.5,
        width: '100%',
        height: '40%',
        marginBottom: '5%'
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
    pastNotesText: {
        marginTop: '1%',
        color: 'white'
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
        //fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
    },
    finishText: {
        fontSize: 35,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 30
    },
    // notesInputView: {
    //     bottom: 0,
    //     marginLeft: '5%',
    //     marginTop: '5%',
    //     height: 250,
    //     height: 240,
    //     width: '90%',
    //     borderWidth: 2,
    //     borderColor: "#707070",
    //     backgroundColor: "white",
    //     padding: 20,
    //     textAlign: 'left',

    //     position: 'absolute',
    //     justifyContent: 'flex-end'
    // },


});

export default WorkoutScreen;