import React, { Component, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList, 
    TextInput, 
    StatusBar,
    Button } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Main from './main';
import persistStore from './config/store';

const persist = persistStore()

export default class App extends Component{

render(){
    return (
        <Provider store={persist.store}>
            <PersistGate loading={null} persistor={persist.persistor}>
                <Main />
            </PersistGate>
        </Provider>
    
            
        )
}
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#455a64',
        flex: 1,
        justifyContent:'center'
    },
    appName:{
        color:'#ffffff',
        fontSize:18
    }
});