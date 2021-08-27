import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { saveClasses, setFilteredList } from '../redux/indexActions';
import Home from './Home';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_teacher, setIsTeacher] = useState(false);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [postcode, setPostcode] = useState('');
    const [name, setName] = useState('');


    function register() {
        fetch(`http://192.168.1.128:8000/notgym/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, is_teacher, first_name, last_name, postcode, name })
        })
            .then(res => res.json())
            .then(res => {
                props.navigation.navigate('Auth');
            })
            .catch(error => console.log(error));
    }



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
            <Text style={styles.header}>Register</Text>
            <Text>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Text>First Name</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={text => setFirstName(text)}
                value={first_name}
            />
            <Text>Last Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={text => setLastName(text)}
                value={last_name}
            />
            <Text>Postcode</Text>
            <TextInput
                style={styles.input}
                placeholder="Postcode"
                onChangeText={text => setPostcode(text)}
                value={postcode}
            />
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setName(text)}
                value={name}
            />
            <View style={styles.buttonDiv}>
                <TouchableOpacity onPress={() => register()} >
                    <View style={styles.bookBtn}>
                        <Text style={styles.btnText}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        // height: '100%',
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

export default Register;
