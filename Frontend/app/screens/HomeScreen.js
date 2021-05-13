import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ScrollView, Modal, Image } from "react-native";

import Navbar from '../Components/Navbar';
import BranchButton from '../Components/BranchButton';
import { UserContext } from '../Components/UserContext';
import axios from 'axios';

function HomeScreen({ route, navigation, }) {

    const { contextObject } = useContext(UserContext);
    const [branchModalVisible, setBranchModalVisible] = useState(false);

    //Displays the branch menu
    function menu() {
        if (route.params != null) {
            return (
                <View style={styles.scrollContainer}>
                    <ScrollView style={styles.buttonMenu} horizontal={false} >
                        {route.params.branches.map((branch) => <BranchButton key={branch._id.$oid} title={branch.branchName} bID={branch._id.$oid} ctype={branch.childrenType} />)}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    //displays the add Branch popup
    function addBranchModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={branchModalVisible}
            >
                {addMenu()}
            </Modal>
        );
    }

    //handles the add branch button on Press
    function addBranchFunction() {
        setBranchModalVisible(false);
        navigation.navigate('CreateBranch', { parentID: route.params.parentID, });
    }

    //handles the add exercise button on Press
    function addExerciseFunction() {
        setBranchModalVisible(false);
        navigation.navigate('CreateExercise', { parentID: route.params.parentID, });
    }

    //conditionally renders the add branch/exercise popup menu
    function addMenu() {
        if (route.params.childrenType === 'branch') {
            return (
                <View style={styles.branchModalView}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => addBranchFunction()}>
                        <Text style={styles.modalButtonText}>Add Branch</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.modalButton} onPress={() => setBranchModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.branchModalView}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => addBranchFunction()}>
                        <Text style={styles.modalButtonText}>Add Branch</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.modalButton} onPress={() => addExerciseFunction()}>
                        <Text style={styles.modalButtonText}>Add Exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setBranchModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    //conditionally renders the add branch menu button based on user type 
    function addBranch() {
        if (contextObject.userType === 'trainer') {
            return (
                <TouchableOpacity style={styles.addBranchButton} onPress={() => setBranchModalVisible(true)}>
                    <Text style={styles.addBranchButtonText}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    function goBack() {
        if (route.params != null && route.params.parentID != 'root') {
            return (
                <TouchableOpacity style={styles.rightArrow} onPress={() => getParent()}>
                    <Image source={require('../assets/goBackIcon.png')} />
                </TouchableOpacity>
            );
        }
    }

    function getParent() {
        axios.get('http://68.172.33.6:9083/exercises/ascending/' + route.params.parentID, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => goBackFunction(response.data)).catch(e => console.log(e));
    }
    function goBackFunction(id) {
        if (id != 'roots') {
            axios.get('http://68.172.33.6:9083/exercises/descending/' + id, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
                .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', parentID: id, })).catch(e => console.log(e));
        } else {
            axios.get('http://68.172.33.6:9083/exercises/allRoots', { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
                .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', parentID: 'root', })).catch(e => console.log(e));
        }
    }

    return (
        <SafeAreaView style={styles.container} >
            <Navbar />
            {console.log(route.params.parentID)}
            {goBack()}
            {menu()}
            {addBranch()}
            {addBranchModal()}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    scrollContainer: {
        alignItems: 'center'
    },
    centerButton: {
        width: 175,
        height: 175,
        borderRadius: 90,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#E51B23",
        marginBottom: 50,
        marginTop: 50,
        elevation: 8,
        justifyContent: "center",

    },
    buttonText: {
        fontSize: 25,
        color: 'black',
        fontWeight: "bold",
        alignSelf: "center",
        opacity: 0.8,
        textAlign: 'center'
    },
    buttonMenu: {
        marginTop: '10%',
        marginBottom: 100,
    },
    addBranchButton: {
        position: 'absolute',
        right: 15,
        width: '2%',
        height: '5%',
        bottom: 50,
        borderRadius: 90,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    addBranchButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
    },
    branchModalView: {
        flex: 1,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalButton: {
        width: '100%',
        height: 60,
        borderWidth: 3,
        borderRadius: 25,
        alignItems: 'center',
        bottom: 1,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    modalButtonText: {
        fontSize: 20,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
    },
    rightArrow: {
        alignSelf: 'center',
        marginLeft: '24%',
        top: '1.75%',
    },
});

export default HomeScreen;

/* <TouchableOpacity style={styles.centerButton} onPress={() => console.log(route.params.myJwt)}>
                        <Text style={styles.buttonText}>Weight Training</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centerButton} >
                        <Text style={styles.buttonText}>Recovery</Text>
                    </TouchableOpacity>
                    <BranchButton title={'Extra'} /> */