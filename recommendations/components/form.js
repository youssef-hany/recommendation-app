import React, { Component, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList, 
    TextInput,
    Button,
    TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { register } from '../tools/postService';
import { login } from '../tools/postService';
import  HttpService  from '../tools/getService';
import Loader from './loader';

const http = new HttpService();

class Form extends Component{

    constructor(props){
        super(props);
        this.state= {
            userEmail:'',
            userPass:'',
            name: '',
            userName: '',
            email: '',
            password: '',
            response: ''
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onuserNameChange = this.onuserNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }
    onNameChange = (val) => this.setState({name: val});	
    onuserNameChange = (val) => this.setState({userName: val});	
    onEmailChange = (val) => this.setState({email: val});	
    onPasswordChange = (val) => this.setState({password: val});	
    
    
    onRegister(){
        const newUser = {
            name: this.state.name,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }
        console.log('name: ' + this.state.name)
        register(newUser).then(response =>{
            if(response.error){
                console.log(response.error)
            }else{
                console.log(response.data.status)
            }
            
        })
    }
    onLogin(){
        const userData = {
            email : this.state.userEmail,
            password : this.state.userPass
        };
       login(userData).then(response => {
            console.log(response)
        }).catch(err => {
            console.log("cannot connect" + err)
        })
    }
    
render(){

  
}
   

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#455a64',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
   
 
});

mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(null, mapDispatchToProps)(Form)