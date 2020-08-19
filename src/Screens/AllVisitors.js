/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    StyleSheet,

    Text, View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SQLiteDataBaseHelper from '../Persistance/SQLiteDataBaseHelper';

export default class AllVisitors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        try {
            SQLiteDataBaseHelper.instance.getVisitorRecords()
                .then((data) => {
                    console.log('data is, ', data)
                    if (data && data.length > 0) {
                        this.setState({
                            loading: false,
                            data: data
                        })
                    } else {
                        this.setState({
                            loading: false,
                            data: []
                        })
                    }
                })
        } catch (error) {
            console.error(error)
            this.setState({
                loading: false
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    (this.state.loading) ? <Text style={styles.errorText}>Loading data please wait...</Text>
                    : 
                        this.state.data && this.state.data.length > 0 ?
                            <FlatList
                            style={styles.flatListContainer}
                                data={this.state.data}
                                numColumns={1}
                                keyExtractor={(item, index) => 'list-item-' + index}
                                renderItem={(item) => this._renderItem(item)}
                            /> :
                            <Text style={styles.errorText}>No records Found</Text>
                }
            </View>

        );
    }

    _renderItem(data) {
        console.log('_renderItem item = ', data);
        return (
            <View style={styles.card}>
                    <Text style={styles.fieldHeader}>Name : <Text style={styles.fieldContent}>{data.item.name}</Text></Text>
                    {
                        (data.item.email) ? <Text style={styles.fieldHeader}>Email : <Text style={styles.fieldContent}>{data.item.email}</Text></Text> : null
                    }
                    <Text style={styles.fieldHeader}>Person to Visit : <Text style={styles.fieldContent}>{data.item.person_name}</Text></Text>
                    <Text style={styles.fieldHeader}>Type : <Text style={styles.fieldContent}>{data.item.type}</Text></Text>
                    <Text style={styles.fieldHeader}>Date : <Text style={styles.fieldContent}>{data.item.date}</Text></Text>
                    <Text style={styles.fieldHeader}>Time of Entry : <Text style={styles.fieldContent}>{data.item.entry_time}</Text></Text>
                    <Text style={styles.fieldHeader}>Time of Exit : <Text style={styles.fieldContent}>{data.item.exit_time}</Text></Text>

            </View>
        )
    }
};



const styles = StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 18,
    },
    fieldHeader: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    fieldContent: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    card: {
        flex: 1,
        margin: 10,
        padding: 10,  
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1.0,
        elevation: 10
    }
});