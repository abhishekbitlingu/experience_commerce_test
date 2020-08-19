/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import React, { Component } from 'react';
import {
    Keyboard, Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu';
import SQLiteDataBaseHelper from '../Persistance/SQLiteDataBaseHelper';
import AppUtilities from './../Utilities/AppUtilities';

const pickerItems = [
    "Meeting",
    "Delivery",
    "Personal"
]

export default class AddVisitor extends Component {
    _menu = null;
    constructor(props) {
        super(props)
        this.state = {
            showTimePickerForEntry: false,
            showTimePickerForExit: false,
            name: "",
            email: "",
            type: "",
            personToVisit: "",
            dateOfEntry: "",
            timeOfEntry: "",
            timeOfExit: ""
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: "Add Visitor",
            headerRight: () => (
                <Menu
                style={{marginTop: 30}}
                    ref={this.setMenuRef}
                    button={<Text style={{paddingHorizontal: 20, fontSize: 17}} onPress={this.showMenu}>More</Text>}>
                    <MenuItem onPress={() => {
                        this.hideMenu()
                        this.props.navigation.navigate('all_visitors')
                    }}>All Visitors List</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={() => {
                        this.hideMenu()
                        this.props.navigation.navigate('latest_news')
                    }}>Latest News</MenuItem>
                </Menu>
            )
        })
        this.setState({
            dateOfEntry: AppUtilities.getFormattedDate(new Date())
        })
    }

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu() {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    render() {
        return (
            <KeyboardAwareScrollView
                getTextInputRefs={() => {
                    return [
                        this._textInputVisitorNameRef,
                        this._textInputVisitorEmailRef,
                        this._textInputPersonToVisitRef,
                    ]
                }}>
                <View style={styles.container}>
                    <TextInput
                        keyboardType='default'
                        ref={(r) => { this._textInputVisitorNameRef = r; }}
                        value={this.state.name}
                        onChangeText={(newValue) => this.setState({ name: newValue })}
                        placeholder="Enter Visitor's Name"
                        maxLength={40}
                        style={styles.inputContainer}
                    />
                    <TextInput
                        keyboardType='email-address'
                        ref={(r) => { this._textInputVisitorEmailRef = r; }}
                        maxLength={40}
                        onChangeText={(newValue) => this.setState({ email: newValue })}
                        value={this.state.email}
                        placeholder="Enter Visitor's Email"
                        style={styles.inputContainer}
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            mode='dropdown'
                            selectedValue={this.state.type}
                            style={styles.picker}
                            onValueChange={(itemValue) =>
                                this.setState({ type: itemValue })
                            }
                        >
                            <Picker.Item label="-- Select type of visit -- " value="" />
                            {
                                pickerItems.map((item) => (
                                    <Picker.Item key={item} label={item} value={item} />
                                ))
                            }
                        </Picker>
                    </View>
                    <TextInput
                        keyboardType='default'
                        ref={(r) => { this._textInputPersonToVisitRef = r; }}
                        maxLength={25}
                        onChangeText={(newValue) => this.setState({ personToVisit: newValue })}
                        value={this.state.personToVisit}
                        placeholder="Person to Visit"
                        style={styles.inputContainer}
                    />
                    <Text style={styles.dateText}>{this.state.dateOfEntry}</Text>

                    <Pressable onPress={() => {
                        Keyboard.dismiss();
                        this.setState({ showTimePickerForEntry: true })
                    }} style={styles.pickerContainer}>
                        <Text style={[styles.timeText, { color: AppUtilities.isEmpty(this.state.timeOfEntry) ? "grey" : "black" }]}>
                            {
                                AppUtilities.isEmpty(this.state.timeOfEntry)
                                    ? "Select Time of Entry" : this.state.timeOfEntry
                            }
                        </Text>
                        {this.state.showTimePickerForEntry &&
                            <DateTimePicker
                                value={(AppUtilities.isEmpty(this.state.timeOfEntry)) ? new Date() : new Date(
                                    +new Date().setHours(0, 0, 0, 0)
                                    + AppUtilities.parseDaytime(this.state.timeOfEntry)
                                )}
                                mode='time'
                                is24Hour={false}
                                display="default"
                                onChange={(event, newDate) => {
                                    if (newDate) {
                                        this.setState({
                                            showTimePickerForEntry: false,
                                            timeOfEntry: AppUtilities.getFormattedTime(newDate)
                                        })
                                    }
                                }}
                            />
                        }

                    </Pressable>

                    <Pressable onPress={() => {
                        Keyboard.dismiss();
                        this.setState({ showTimePickerForExit: true })
                    }}
                        style={styles.pickerContainer}>
                        <Text style={[styles.timeText, { color: AppUtilities.isEmpty(this.state.timeOfExit) ? "grey" : "black" }]}>
                            {AppUtilities.isEmpty(this.state.timeOfExit) ? "Select Time of Exit" : this.state.timeOfExit}
                        </Text>
                        {this.state.showTimePickerForExit &&
                            <DateTimePicker
                                value={(AppUtilities.isEmpty(this.state.timeOfEntry)) ? new Date() : new Date(
                                    +new Date().setHours(0, 0, 0, 0)
                                    + AppUtilities.parseDaytime(this.state.timeOfEntry)
                                )}
                                mode='time'
                                is24Hour={false}
                                display="default"
                                onChange={(event, newDate) => {
                                    if (newDate) {
                                        this.setState({
                                            showTimePickerForExit: false,
                                            timeOfExit: AppUtilities.getFormattedTime(newDate)
                                        })
                                    }
                                }}
                            />
                        }

                    </Pressable>

                    <Pressable onPress={this.validateData}
                        style={styles.submitButton} >
                        <Text style={{ fontSize: 20 }}>
                            Submit
                    </Text>
                    </Pressable>
                    <View style={{ flex: 1 }} />
                </View>
            </KeyboardAwareScrollView>
        );
    }

    validateData = () => {
        if (AppUtilities.isEmpty(this.state.name)) {
            AppUtilities.showAlert("Visitors name cannot be empty")
        } else if (!(AppUtilities.isEmpty(this.state.email) || AppUtilities.isValidEmail(this.state.email))) {
            AppUtilities.showAlert("Please enter a valid email")
        } else if (AppUtilities.isEmpty(this.state.type)) {
            AppUtilities.showAlert("Please select type of Visit")
        } else if (AppUtilities.isEmpty(this.state.personToVisit)) {
            AppUtilities.showAlert("Please enter the name of person you want to visit")
        } else if (AppUtilities.isEmpty(this.state.timeOfEntry)) {
            AppUtilities.showAlert("Please select the time of Entry")
        } else if (AppUtilities.isEmpty(this.state.timeOfExit)) {
            AppUtilities.showAlert("Please select the time of Exit")
        } else {
            this.submitRecord()
        }
    }

    submitRecord() {
        let data = {
            name: this.state.name,
            email: this.state.email,
            type: this.state.type,
            personToVisit: this.state.personToVisit,
            dateOfEntry: this.state.dateOfEntry,
            timeOfEntry: this.state.timeOfEntry,
            timeOfExit: this.state.timeOfExit
        }

        console.log('submit Record called')
        try {
            SQLiteDataBaseHelper.instance.insertVisitorRecord(data)
            .then((response) => {
                console.log('Response generated');
                if (response) {
                    AppUtilities.showAlert("Record inserted successfully")
                    this.setState({
                        showTimePickerForEntry: false,
                        showTimePickerForExit: false,
                        name: "",
                        email: "",
                        type: "",
                        personToVisit: "",
                        dateOfEntry: AppUtilities.getFormattedDate(new Date()),
                        timeOfEntry: "",
                        timeOfExit: ""
                    })
                } else {
                    AppUtilities.showAlert("Failed to insert")
                }
            })
        } catch(error) {
            AppUtilities.showAlert(error)
        }
        
    }
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    inputContainer: {
        height: 50,
        fontSize: 16,
        margin: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25
    },
    pickerContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25,
        marginHorizontal: 10,
        height: 50,
        margin: 15
    },
    picker: {
        width: '100%',
        height: 50,
        fontSize: 16,
        marginHorizontal: 10,
        paddingHorizontal: 15
    },
    dateText: {
        height: 50,
        textAlignVertical: 'center',
        fontSize: 16,
        margin: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25
    },
    timeText: {
        textAlignVertical: 'center',
        fontSize: 16,
        margin: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15
    },
    submitButton: ({ pressed }) => [{
        backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 120,
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25
    }],
});