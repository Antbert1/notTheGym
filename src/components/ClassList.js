import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TouchableWithoutFeedback, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { setFilteredList, setSelectedClass, setPageNum } from '../redux/indexActions';
const filter = require('../images/filter.png');
// import Question from './Question';

const ClassList = () => {
    const dispatch = useDispatch();
    const classesTotal = useSelector(state => state).dataReducer.classes;
    const classes = useSelector(state => state).dataReducer.filteredList;
    // const [loaded, setLoaded] = useState(false);
    const [filters, setFilters] = useState([]);
    const [filterIndex, setFilterIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    // const [classList, setClassList] = useState([]);

    useEffect(() => {
        const catsArray = classesTotal.map(x => x.type);
        let cats = catsArray.filter((item, i, ar) => ar.indexOf(item) === i);
        cats.unshift('All');
        setFilters(cats);
    }, []);

    //   function setData(data) {
    //     dispatch(saveClasses(data));
    //     dispatch(setFilteredList(data));
    //     //GET THESE FROM DB ULTIMATELY
    //     const catsArray = data.map(x => x.type);
    //     let cats = catsArray.filter((item, i, ar) => ar.indexOf(item) === i);
    //     cats.unshift('All');
    //     setFilters(cats);
    //     setLoaded(true);
    //   }

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

    function openClass(item, index) {
        dispatch(setSelectedClass(item));
        dispatch(setPageNum(1));
    }

    const Classes = () => {
        return classes.map((item, index) => {
            return (
                <TouchableOpacity onPress={() => openClass(item, index)} key={index}>
                    <View style={styles.classOuter}>
                        <View style={styles.classHeader}>
                            <Text style={styles.className}>{item.name}</Text>
                        </View>
                        <View style={styles.classInner}>
                            <Text style={styles.classBlurb}>{item.blurb.substring(0, 200) + '...'}</Text>
                        </View>
                        <View style={styles.buttonDiv}>
                            <View style={styles.bookBtn}>
                                <Text style={styles.btnText}>BOOK NOW</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            );
        });
    };

    function filterItems(item, index) {
        setFilterIndex(index);
    }

    const FilterList = () => {
        return filters.map((item, index) => {
            return (
                <TouchableOpacity onPress={() => filterItems(item, index)} key={index}>
                    {filterIndex === index ?
                        <View style={[styles.selectedItem, styles.filterItem]}>
                            <Text style={[styles.selectedText, styles.filterText]}>{item}</Text>
                        </View>
                        :
                        <View style={styles.filterItem}>
                            <Text style={styles.filterText}>{item}</Text>
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
                                <View style={styles.modalHeader}>
                                    <Text style={styles.filterTitle}>Filter Classes by Type</Text>
                                </View>
                                <View style={styles.modalList}>
                                    <FilterList />
                                    <View style={styles.buttonFilter}>
                                        <TouchableOpacity onPress={() => applyFilter()} >
                                            <View style={styles.bookBtn}>
                                                <Text style={styles.btnText}>APPLY FILTER</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>

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
            <View style={styles.filterDiv}>
                <TouchableOpacity onPress={() => openModal()} >
                    <Image source={filter} style={styles.filter} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.showing}>
                    Showing {filters[filterIndex]}
                </Text>
                <Classes />
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
    filterDiv: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        minWidth: 300
        // margin: 20
        // padding: 20,
    },
    selectedItem: {
        backgroundColor: '#808080',
    },
    selectedText: {
        color: 'white',
    },
    classOuter: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        // padding: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
        elevation: 2,
        borderRadius: 15,
    },
    classHeader: {
        backgroundColor: '#F25227',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    classInner: {
        padding: 20,
    },
    className: {
        color: 'white',
        fontSize: 16,
        // fontWeight: '800'
    },
    buttonDiv: {
        alignItems: 'flex-end',
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
    modalHeader: {
        padding: 20
    },
    modalList: {
        // margin: 20
    },
    filterItem: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5,
    },
    filterText: {
        fontSize: 16
    },
    buttonFilter: {
        alignItems: 'center',
        // marginBottom: 20,
        marginTop: 20,
        marginBottom: 20
    },
    filterTitle: {
        fontSize: 18
    }
});

export default ClassList;
