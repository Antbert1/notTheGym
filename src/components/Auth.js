import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { setEmail } from '../redux/indexActions';
import Home from './Home';

const Auth = (props) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function register() {
        props.navigation.navigate('RegisterType');
    }

    function validate() {
        //Save username in Redux
        dispatch(setEmail(username));
        fetch(`http://192.168.1.128:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                saveData(res.token);
                props.navigation.navigate('Home');
            })
            .catch(error => console.log(error));
    }

    const saveData = async (token) => {
        await AsyncStorage.setItem('Token', token);
        await AsyncStorage.setItem('Email', username);
    };

    const getData = async () => {
        const token = await AsyncStorage.getItem('Token', token);
        if (token) {
            props.navigation.navigate('Home');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Text>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <View style={styles.buttonDiv}>
                <TouchableOpacity onPress={() => register()} >
                    <Text style={styles.register}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => validate()} >
                    <View style={styles.bookBtn}>
                        <Text style={styles.btnText}>Log In</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        height: '100%',
        padding: 20
    },
    buttonDiv: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 20
    },
    bookBtn: {
        backgroundColor: '#6627F2',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnText: {
        color: 'white'
    },
    header: {
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    register: {
        marginRight: 10
    }
});

export default Auth;
