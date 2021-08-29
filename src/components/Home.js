import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AsyncStorage, Button, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { saveClasses, setFilteredList, setEmail } from '../redux/indexActions';
import ClassList from './ClassList';
import ClassType from './ClassType';
const filter = require('../images/filter.png');
// import Question from './Question';

const Home = (props) => {
  const dispatch = useDispatch();
  const classesTotal = useSelector(state => state).dataReducer.classes;
  const classes = useSelector(state => state).dataReducer.filteredList;
  const pageNum = useSelector(state => state).dataReducer.pageNum;
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filterIndex, setFilterIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    getData();
    fetch('http://192.168.1.128:8000/notgym/classdetails')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const getData = async () => {
    const email = await AsyncStorage.getItem('Email', email);
    dispatch(setEmail(email));
    fetch('http://192.168.1.128:8000/notgym/users/?email=' + email)
      .then((response) => response.json())
      .then((json) => setTeacher(json));
  };

  function setTeacher(user) {
    setIsTeacher(user[0].is_teacher);
  }

  function setData(data) {
    dispatch(saveClasses(data));
    dispatch(setFilteredList(data));
    //GET THESE FROM DB ULTIMATELY
    const catsArray = data.map(x => x.type);
    let cats = catsArray.filter((item, i, ar) => ar.indexOf(item) === i);
    cats.unshift('All');
    setFilters(cats);
    setLoaded(true);
  }

  // const answers = useSelector(state => state);

  // function save() {
  //   console.log(answers);
  // }

  // function getList() {
  //   const getAnswers = async () => {
  //     let response = await fetch(
  //       'http://localhost:8000/answers/'
  //     );
  //     let json = await response.json();
  //     return json;
  //   };

  // }

  // function openModal() {
  //   setModalVisible(true);
  // }

  // const ClassList = () => {
  //   return classes.map((item, index) => {
  //     return (
  //       <View key={index}>
  //         <Text>{item.name}</Text>
  //       </View>
  //     );
  //   });
  // };

  // function filterItems(item, index) {

  //   setFilterIndex(index);
  // }

  // const FilterList = () => {
  //   return filters.map((item, index) => {
  //     return (
  //       <TouchableOpacity onPress={() => filterItems(item, index)} key={index}>
  //         {filterIndex === index ?
  //           <View style={styles.selectedItem}>
  //             <Text style={styles.selectedText}>{item}</Text>
  //           </View>
  //           :
  //           <View>
  //             <Text>{item}</Text>
  //           </View>
  //         }

  //       </TouchableOpacity>
  //     );
  //   });
  // };

  // function applyFilter() {
  //   let filteredClasses = classesTotal;
  //   if (filterIndex !== 0) {
  //     filteredClasses = classesTotal.filter(function (el) {
  //       return el.type === filters[filterIndex];
  //     });
  //   }
  //   dispatch(setFilteredList(filteredClasses));
  //   setModalVisible(!modalVisible);
  // }

  const showPage = () => {
    if (pageNum === 0) {
      return <ClassList />;
    } else {
      return <ClassType />;
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('Token');
      await AsyncStorage.removeItem('Email');
      props.navigation.navigate('Auth');
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.headingDiv}>
        <Text style={styles.heading}>Not The Gym</Text>
        <TouchableOpacity onPress={() => logout()}>
          <Text>Log Out</Text>
        </TouchableOpacity>
        {isTeacher &&
          <Text>Teacher Panel</Text>
        }
      </View>

      {!loaded ?
        <ActivityIndicator size="small" color="#0000ff" />
        :
        showPage()
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 20,
    // flex: 1,
    backgroundColor: '#F0F0F0',
    height: '100%'
  },
  buttonContainer: {
    marginBottom: 20,
  },
  filter: {
    width: 30,
    height: 30,
  },
  headingDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#02DB9A',
    padding: 20
    // width: '100%'
  },
  modalView: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // padding: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: 'white',
    padding: 20,
  },
  selectedItem: {
    backgroundColor: 'green',
  },
  selectedText: {
    color: 'white',
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 25
  }
});

export default Home;
