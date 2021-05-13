import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Navbar from '../Components/Navbar';
import { UserContext } from '../Components/UserContext';

function AddBranchScreen({ navigation, route }) {

    const [branchName, setBranchName] = useState('');
    const { contextObject } = useContext(UserContext);

    //Handles the axios Post for adding a branch to database
    function createBranch() {
        if (route.params.parentID == 'root') {
            axios.post('http://68.172.33.6:9083/exercises/addExerciseBranch', {
                branchName: branchName,
                childrenType: "",
                children: [],
                nodeType: "root",
                parentNode: ""
            }, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } }).catch(e => console.log(e));
        } else {
            var objectID = 'ObjectId(' + route.params.parentID + ')';
            axios.post('http://68.172.33.6:9083/exercises/addExerciseBranch', {
                branchName: branchName,
                childrenType: "",
                children: [],
                nodeType: "child",
                parentNode: objectID
            }, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } }).catch(e => console.log(e));
        }
        axios.get('http://68.172.33.6:9083/exercises/allRoots', { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', })).catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    Create Group
                </Text>
            </View>
            <View style={styles.branchNameView}>
                <TextInput
                    style={styles.branchNameText}
                    placeholder="Group Name"
                    textAlign='center'
                    multiline={true}
                    placeholderTextColor='white'
                    onChangeText={(branchName) => setBranchName(branchName)}
                />
            </View>

            <TouchableOpacity style={styles.submitButton}
                onPress={() => createBranch()}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    branchNameText: {
        height: 50,
        color: 'white'
    },
    branchNameView: {
        height: 75,
        width: '60%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "#929292",
        padding: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
    },
    descriptionText: {
        color: 'white',
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    descriptionView: {
        height: 250,
        width: '75%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "#929292",
        alignSelf: 'center',
        marginTop: '20%',
        justifyContent: 'flex-start',
        textAlign: 'left'
    },
    submitButton: {
        width: "75%",
        height: 75,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#222222",
        elevation: 8,
        justifyContent: "center",
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50
    },
    buttonText: {
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: "center",
    },
    titleText: {
        fontSize: 45,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: "center",
    },
    titleView: {
        alignContent: 'center',
        marginTop: '15%'
    }

});


export default AddBranchScreen;
