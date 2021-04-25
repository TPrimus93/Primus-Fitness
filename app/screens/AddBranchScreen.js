import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';



import Navbar from '../Components/Navbar';




//Branch Name, Discription, Gif(Maybe)

function AddBranchScreen() {

    const [branchName, setBranchName] = useState('');
    const [description, setDescription] = useState('');



    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.branchNameView}>
                <TextInput
                    style={styles.branchNameText}
                    placeholder="Branch Name"
                    textAlign='center'
                    onChangeText={(branchName) => setBranchName(branchName)}
                />
            </View>

            <View style={styles.descriptionView}>
                <TextInput
                    style={styles.descriptionText}
                    placeholder="Branch Description"
                    textAlign='center'
                    onChangeText={(description) => setDescription(description)}
                />
            </View>

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
        marginTop: '35%',
    },
    descriptionText: {
        color: 'white'
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
        padding: 20,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginTop: '20%',
    },

});


export default AddBranchScreen;