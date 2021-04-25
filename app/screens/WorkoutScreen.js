import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
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
    //const [workoutPosition, setWorkoutPosition] = useState(0)
    const [numberNotes, setNumberNotes] = useState(1);
    const [notes, setNotes] = useState("");
    const [note, setNote] = useState("");
    const [weight, setWeight] = useState(100);
    const [reps, setReps] = useState(10);
    const [workout, setWorkout] = useState([]);
    const [currentExercise, setCurrentExercise] = useState({});


    var par = [
        { "exerciseID": 2, "exerciseName": "Dead-Lift" },
        { "exerciseID": 3, "exerciseName": "Squats" },
        { "exerciseID": '60732f6d992772fc8ae2c690', "exerciseName": "Bench Press" },
        { "exerciseID": 4, "exerciseName": "Press" }
    ]

    var workoutArray = [];
    var setsArray = [2, 3, 3, 3];
    var workoutPos = 0;
    var setPos = 0;
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
        if (setsLength != 0) {
            for (var index = 0; index < setsLength; index++) {
                setsArray[index] = 1;
            }
            if (setsLength < 4)
                setsArray[setsLength - 1] = 2;
        }
    }

    function startWorkout() {

        if (route.params != null && route.params.workoutPosition != null) {
            workoutPos = route.params.workoutPosition;
            if (route.params.workoutPosition != contextObject.workoutPosition) {
                setWPosition();
            } else {
                if (route.params.setArray != null) {
                    // for (var index = 0; index < contextObject.workout[workoutPos].weight.length; index++) {
                    //     setsArray[index] = 1;
                    // }
                    console.log('setArray')
                    setsArray = route.params.setArray;
                }
                if (route.params.setPosition != null) {
                    setPos = route.params.setPosition;
                }
            }
        }

        if (contextObject.workout.length != 0) {
            if (contextObject.workout[workoutPos].weight[setPos] != null) {
                if (weight != contextObject.workout[workoutPos].weight[setPos])
                    setWeight(contextObject.workout[workoutPos].weight[setPos]);
            } else {
                contextObject.workout[workoutPos].weight[setPos] = weight;
            }
        }

        if (contextWorkout == false && contextObject.workoutList.length != 0) {
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

        //setCurrentExercise(contextObject.workout[workoutPosition]);
    }

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
            contextObject.workout[workoutPos].weight[setPos] += 2.5;
        } else if (direction == 'down' && weight > 0) {
            setWeight(weight - 2.5);
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
        console.log(workoutPos);
        for (var index = 0; index < par.length; index++) {
            //console.log("here");
            if (index == workoutPos) {
                workoutArray[index] = true;
            } else {
                workoutArray[index] = false;
            }
        }

        return (
            <ScrollView style={styles.buttonMenu} horizontal={true}>
                {workoutArray.map((exercise, index) => <WorkoutButton key={index} workoutPos={index} value={exercise} setArray={setsArray} setPos={setPos} />)}
            </ScrollView>
        );
    };

    function setMenu() {
        //console.log(setsArray);
        return (
            <ScrollView style={styles.buttonMenu} horizontal={true}>
                {setsArray.map((setType, index) => <SetButton key={index} setIndex={index} buttonType={setType} setArray={setsArray} workoutPos={workoutPos} setPos={setPos} />)}
                <AddSetButton />
            </ScrollView>
        );
    }


    // function workoutButton(pos) {
    //     if (pos == true) {
    //         return (
    //             <CurrentWorkoutButton />
    //         );
    //     } else {
    //         return (
    //             <NextWorkoutButton />
    //         );
    //     }
    // };
    // index = a.findIndex(x => x.prop2 ==="yutu");

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            {startWorkout()}
            {console.log(route.params)}
            {console.log(contextObject.workout)}
            {CurrentExerciseName('Dead-Lifts')}
            <View style={styles.workoutScrollContainer}>
                {/* {console.log(par.findIndex(x => x.exerciseID === '60732f6d992772fc8ae2c690'))} */}
                {workoutMenu()}
            </View>
            <View style={styles.setScrollContainer}>
                {setMenu()}
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
            </View>
            <View style={styles.bottomMenu}>
                {/* <TextInput
                    style={styles.notesInputText}
                    placeholder="Notes.."
                    textAlign='left'
                    onChangeText={(note) => setNote(note)}
                    value={note}
                /> */}
                {/* <TouchableOpacity style={styles.setButtonAdd} onPress={() => addNote(note)}>
                    <Text style={styles.buttonAddText}>+</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.bottomButton} onPress={() => addNote(note)}>
                    <Text style={styles.notesButtonText}>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => addNote(note)}>
                    <Text style={styles.finishButtonText}>Finish</Text>
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
        width: '100%',
        height: '10%',
        position: 'absolute',
        bottom: 1,
        flexDirection: 'row',
    },
    bottomButton: {
        width: '40%',
        height: '70%',
        borderWidth: 3,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
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
    }
});

export default WorkoutScreen;