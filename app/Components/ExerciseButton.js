import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Components/UserContext';

function ExerciseButton({ title, exerciseID, index }) {

    // var xy = contextObject.workoutList.findIndex(y => y.exerciseID === eID);
    var x = <Image source={require('../assets/PlusIcon.png')} />
    if (index > -1) {
        x = <Image source={require('../assets/MinusIcon.png')} />
    }
    const navigation = useNavigation();
    const [addRemove, setAddRemove] = useState(false);
    const [addRemoveButton, setAddRemoveButton] = useState(x);
    const { contextObject, setContextObject } = useContext(UserContext);

    // function getExercises() {
    //     axios.get('http://68.172.33.6:9083/exercises/descending/' + branchID, { headers: { "Authorization": `Bearer ${myjwt}` } })
    //         .then(response => navigation.navigate('Home', { myJwt: myjwt, usertype: userType, user: username, branches: response.data, })).catch(e => console.log(e));
    // }

    function addExercise(eID) {
        if (addRemove == false && contextObject.workoutList.findIndex(y => y.exerciseID === eID)) {
            contextObject.workoutList.push({ exerciseID: eID, title: title });
            console.log(contextObject.workoutList);
            setAddRemove(true);
            setAddRemoveButton(<Image source={require('../assets/MinusIcon.png')} />);
        } else {
            var index = contextObject.workoutList.findIndex(y => y.exerciseID === eID);
            if (index !== -1) {
                contextObject.workoutList.splice(index, 1);
            }
            console.log(contextObject.workoutList);
            setAddRemove(false);
            setAddRemoveButton(<Image source={require('../assets/PlusIcon.png')} />);
        }
    }

    return (
        <View style={styles.centerButton} >
            {/* {console.log('Here ' + contextObject.workoutList.findIndex(x => x.exerciseID === exerciseID))}
            {console.log('index ' + index)}
            {console.log('eID ' + exerciseID)} */}
            <TouchableOpacity style={styles.plusButton} onPress={() => addExercise(exerciseID)}>
                {addRemoveButton}
            </TouchableOpacity>
            <Text style={styles.buttonText}>{title}</Text>
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
        justifyContent: 'flex-start',
        borderRadius: 7
    },
    buttonText: {
        fontSize: 30,
        // marginRight: "20%",
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
    buttonMenu: {
        top: 120,
        marginBottom: 100,
        width: '99%'
    },
    plusButton: {
        marginRight: 15,
        marginLeft: 15,

        alignSelf: 'center'
    },
    rightArrow: {
        position: 'absolute',
        right: '1%',
        alignSelf: 'center',
        marginRight: 10,
        marginLeft: 25
    },
    exerciseIcon: {
        position: 'absolute',
        right: '8%'
    },

});

export default ExerciseButton;