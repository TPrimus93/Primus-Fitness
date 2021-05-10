import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../Components/UserContext';

function ExerciseButton({ title, description, exerciseID, index, picture }) {

    //sets the plus/minus icon image
    var x = <Image source={require('../assets/PlusIcon.png')} />
    if (index > -1) {
        x = <Image source={require('../assets/MinusIcon.png')} />
    }

    const [expand, setExpand] = useState(false);
    const [addRemove, setAddRemove] = useState(false);
    const [addRemoveButton, setAddRemoveButton] = useState(x);
    const { contextObject } = useContext(UserContext);

    //conditionally renders the plus/minus icon if exercise is in the current workout list
    function addExercise(eID) {
        if (addRemove == false && contextObject.workoutList.findIndex(y => y.exerciseID === eID)) {
            contextObject.workoutList.push({ exerciseID: eID, title: title, description: description, picture: picture });
            setAddRemove(true);
            setAddRemoveButton(<Image source={require('../assets/MinusIcon.png')} />);
        } else {
            var index = contextObject.workoutList.findIndex(y => y.exerciseID === eID);
            if (index !== -1) {
                contextObject.workoutList.splice(index, 1);
            }
            setAddRemove(false);
            setAddRemoveButton(<Image source={require('../assets/PlusIcon.png')} />);
        }
    }

    //gives the exercise button
    function expandExercise() {
        if (expand === false) {
            //returns the unexpanded exercise button
            return (
                <View style={styles.unexpandedButton} >
                    <TouchableOpacity style={styles.plusButton} onPress={() => addExercise(exerciseID)}>
                        {addRemoveButton}
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>{title}</Text>
                    <Image source={{ uri: 'data:image/gif;base64,' + picture }} style={styles.exerciseIcon} />
                    <TouchableOpacity style={styles.rightArrow} onPress={() => setExpand(!expand)}>
                        <Image source={require('../assets/RightArrowIcon.png')} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            //returns the expanded exercise button
            return (
                <View style={styles.expandedButton} >
                    <TouchableOpacity style={styles.expandedPlusButton} onPress={() => addExercise(exerciseID)}>
                        {addRemoveButton}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downArrow} onPress={() => setExpand(!expand)}>
                        <Image source={require('../assets/DownArrowIcon.png')} />
                    </TouchableOpacity>
                    <Text style={styles.expandedButtonText}>{title}</Text>
                    <Image source={{ uri: 'data:image/gif;base64,' + picture }} style={styles.expandedIcon} />
                    <Text style={styles.buttonText}>Description</Text>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
            );
        }
    }

    return (
        <View>
            {expandExercise()}
        </View>
    );
}

const styles = StyleSheet.create({
    unexpandedButton: {
        height: 100,
        borderColor: "#E51B23",
        borderWidth: 3,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 7
    },
    expandedButton: {
        height: 550,
        borderColor: "#E51B23",
        borderWidth: 3,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        borderRadius: 7
    },
    buttonText: {
        width: '45%',
        maxWidth: '45%',
        fontSize: 30,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center',
    },
    plusButton: {
        marginLeft: '5%',
        marginRight: '5%',
        alignSelf: 'center'
    },
    rightArrow: {
        alignSelf: 'center',
        marginLeft: '8%'
    },
    exerciseIcon: {
        alignSelf: 'center',
        marginLeft: '8%',
        width: 75,
        height: 75
    },
    downArrow: {
        position: 'absolute',
        top: 37,
        right: 20
    },
    expandedIcon: {
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: '5%',
        width: 200,
        height: 200
    },
    expandedPlusButton: {
        position: 'absolute',
        left: 22.5,
        top: 37,
    },
    expandedButtonText: {
        marginTop: '3%',
        fontSize: 30,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center',
    },
    descriptionText: {
        marginTop: '2%',
        marginLeft: 15,
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'left',
    }

});

export default ExerciseButton;