import React, { Component, useState } from 'react';
import { 
    StyleSheet, 
    View,
    StatusBar,
     } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Routes from './components/routes';

 class Main extends Component {
    // state = {
    //     isLoggedIn: this.props.authData ? this.props.authData.isLoggedIn : false
    // } 
    // static getDerivedStateFromProps (nextProps, nextState){
    //     if(nextProps.authData && nextProps.authData.isLoggedIn && nextProps.authData.isLoggedIn !== nextState.isLoggedIn){
    //         return {
    //             isLoggedIn: nextProps.authData.isLoggedIn
    //         }

    //     }else{
    //         return null

    //     }
    // }
    // shouldComponentUpdate(nextProps, nextState){
    //     const {authData: {isLoggedIn}} = nextProps
    //     if(isLoggedIn !== nextState.isLoggedIn){
    //         c
    //         return true
    //     }
    //     else{
    //         if(!isLoggedIn){
    //             return true
    //         }
          
    //         return true

    //     }
    //  }
   
    render(){

    const {authData} = this.props;
    return (
   
        <View style={styles.container}>
            <StatusBar
            backgroundColor="#1c313a"
            barStyle="light-content"
            />
        <Routes isLoggedIn={this.props.authData ? this.props.authData.isLoggedIn : false}/>
        </View>
  
            
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


mapStateToProps = (state) =>({
   authData: state.authReducer.authData
})
export default connect(mapStateToProps, null)(Main)