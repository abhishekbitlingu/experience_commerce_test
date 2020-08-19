/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    Image, StyleSheet,

    Text, View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import APIHelper from '../Network/APIHelper';

export default class LatestNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        }
    }

    componentDidMount() {
        console.log("componentDidMount = ", APIHelper.instance)
        APIHelper.instance.getLatestNews(
            (data) => {
                console.log('News data = ', data)
                this.setState({
                    data: data.articles,
                    loading: false
                })
            },
            (error) => {
                console.log(error)
                this.setState({
                    data: [],
                    loading: false
                })
            }
        )
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
                {
                    (data.item.urlToImage) && <Image
                        source={{ uri: data.item.urlToImage }}
                        style={{ width: '100%', aspectRatio: 1.5 }} />
                }
                <Text style={{ fontWeight: 'bold', padding: 5 }}>{data.item.title}</Text>
            <Text style={{padding: 2}}>{data.item.description}</Text>
                <Text style={{padding: 2}}>Author : {data.item.author}</Text>
                <Text style={{padding: 2}}>Source : {data.item.source.name}</Text>

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