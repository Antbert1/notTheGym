import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TouchableWithoutFeedback, Button, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { saveClasses, setFilteredList } from '../redux/indexActions';
const filter = require('../images/filter.png');
// import Question from './Question';

const Home = () => {
  const dispatch = useDispatch();
  const classesTotal = useSelector(state => state).dataReducer.classes;
  const classes = useSelector(state => state).dataReducer.filteredList;
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filterIndex, setFilterIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  // const [classList, setClassList] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.128:8000/classdetails')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

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

  function openModal() {
    setModalVisible(true);
  }

  const ClassList = () => {
    return classes.map((item, index) => {
      return (
        <View key={index}>
          <Text>{item.name}</Text>
        </View>
      );
    });
  };

  function filterItems(item, index) {
    // let filteredClasses = classesTotal;
    // if (item !== 'All') {
    //   filteredClasses = classesTotal.filter(function (el) {
    //     return el.type === item;
    //   });

    // }

    // dispatch(setFilteredList(filteredClasses));
    setFilterIndex(index);
  }

  const FilterList = () => {
    return filters.map((item, index) => {
      return (
        <TouchableOpacity onPress={() => filterItems(item, index)} key={index}>
          {filterIndex === index ?
            <View style={styles.selectedItem}>
              <Text style={styles.selectedText}>{item}</Text>
            </View>
            :
            <View>
              <Text>{item}</Text>
            </View>
          }

        </TouchableOpacity>
      );
    });
  };

  function applyFilter() {
    let filteredClasses = classesTotal;
    if (filterIndex !== 0) {
      filteredClasses = classesTotal.filter(function (el) {
        return el.type === filters[filterIndex];
      });
    }
    dispatch(setFilteredList(filteredClasses));
    setModalVisible(!modalVisible);
  }

  const Filter = () => {
    return (
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          activeOpacity={1}
          onPressOut={() => { setModalVisible(false) }}
        >
          <View style={styles.modalView}>
            <TouchableWithoutFeedback
              activeOpacity={1}
              onPressOut={() => { }}
            >
              <View style={styles.modalInner}>
                <Text>Filter</Text>
                <FilterList />
                <TouchableOpacity onPress={() => applyFilter()} >
                  <View style={styles.button}>
                    <Text>Apply Filter</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback >
          </View>
        </TouchableWithoutFeedback >

      </Modal>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Filter />
      <View style={styles.headingDiv}>
        <Text style={styles.heading}>Not The Gym</Text>
        <View style={styles.filterDiv}>
          <TouchableOpacity onPress={() => openModal()} >
            <Image source={filter} style={styles.filter} />
          </TouchableOpacity>
        </View>
      </View>

      {!loaded ?
        <ActivityIndicator size="small" color="#0000ff" />
        :
        <View style={styles.content}>
          <ClassList />
        </View>
      }
      <View style={styles.buttonContainer}>
        {/* <Button title="Save asdf" onPress={() => save()} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    // backgroundColor: 'red',
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
});

export default Home;
