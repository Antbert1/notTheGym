import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TouchableWithoutFeedback, Button, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { setPageNum } from '../redux/indexActions';
const chevLeft = require('../images/chevLeft.png');
// import Question from './Question';


const RegisterType = (props) => {
    // const [isTeacher, setIsTeacher] = useState(false);

    function goToRegister(teacherFlag) {
        props.navigation.navigate('Register', { userType: teacherFlag });
        // dispatch(setPageNum(0));
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => goToRegister(false)} >
                <Text>Register as User</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToRegister(true)} >
                <Text>Register as Teacher</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // flex: 1
    },
    back: {
        width: 15,
        height: 20
    },
    classTitle: {
        fontSize: 20,
        marginTop: 20,
    },
    classBlurb: {
        paddingTop: 10,
    },
    blurbText: {
        fontSize: 16
    }
});

export default RegisterType;
