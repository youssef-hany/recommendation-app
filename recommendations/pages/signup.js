import React, { Component, useState } from 'react';

import { 
    StyleSheet, 
    Text, 
    View,
    Alert,
    FlatList, 
    TextInput,
    Button,
    TouchableOpacity } from 'react-native';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createNewUser } from '../actions/auth.actions'
import InputText from '../components/inputText';
import Logo from '../components/img/logo';
import { Actions } from 'react-native-router-flux';
import Loader from '../components/loader';

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    signUpCont:{
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical:16,
        flexDirection: 'row'
    },
    inputBox: {
        marginVertical: 16,
        width:300,
        paddingVertical: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 25,
        paddingHorizontal: 16,
        color: '#ffffff'
    },
    btnTch:{
        width:300,
        backgroundColor: '#1c313a', 
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,

    },
    btnText: {
        fontSize: 16,
        fontWeight:'500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signUpText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 16,  
    },
    signUpBtn: {
        color: '#ffffff',
        fontSize:16,
        fontWeight: '500'
    },
    errorText : {
        color: '#ffffff',
        fontSize: 14,
        paddingHorizontal: 16,
        paddingBottom: 8
    }
})

class Signup extends Component {
    goLogin(){
        Actions.login()
    }

    onRegister = async (values) => {
        const newUser = {
            name: values.name,
            userName: values.userName,
            email: values.email,
            password: values.password
        }
        
        try {
            const response =  await this.props.dispatch(createNewUser(newUser))
            if (response.success){
            }
            else{
                throw response.resBody.error
            }
        } catch (error) {
            let errorText = 'Something went wrong';
            if(error){
                errorText = error;
            }

            Alert.alert(
               'Login Error!',
                errorText,
               [
                   {
                        text: 'Cancel',
                        onPress: () => console.log('cancel pressed'),
                        style: 'cancel',
                    },
               ],
               {cancelable: false},
           );
       }
    }
    renderTextInput = (field) => {
        const {
        meta: {touched, error}, 
        label, 
        secureTextEntry, 
        maxLength, 
        keyboardType,
        placeholder, 
        input: {onChange, ...restInput}} = field

        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
            {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        )
    }
   
    
    render(){
        const { handleSubmit, createUser } = this.props
    return (
        <View style={styles.container}>
           {createUser.isLoading && <Loader />}
            <Logo />
            <View>
            
            <Field
             name="name"
             placeholder="Name"
             validate = {minValue3, required}
             component={this.renderTextInput} />
            <Field
             name="userName"
             validate = {minValue4, required}
             placeholder="User Name"
             component={this.renderTextInput} />
            <Field
             name="email"
             placeholder="Email"
             validate = {email }
             warn = {aol}
             component={this.renderTextInput} />
            <Field
             name="password"
             validate = {minValue8,  required}
             secureTextEntry = {true}
             placeholder="Password"
             component={this.renderTextInput} />

            <TouchableOpacity style={styles.btnTch} onPress={handleSubmit(this.onRegister)}>
                <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
    </View>
            <View style={styles.signUpCont}>
                <Text style={styles.signUpText}>Already have an account?</Text>
                <TouchableOpacity onPress={this.goLogin}>
                    <Text  style={styles.signUpBtn} >Signin</Text>
                </TouchableOpacity>
            </View>
        </View>
            
        )
}

   
}

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue8 = minValue(8)
const minValue4 = minValue(4)
const minValue3 = minValue(3)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
  const validate = (values) =>{
    const errors = {};
    if(!values.name){
        errors.name = "Name is required"
    }
    if(!values.userName){
        errors.userName = "User Name is required"
    }
    if(!values.email){
        errors.email = "Email is required"
    }
    if(!values.password){
        errors.password = "Password is required"
    }
    return errors;
}

mapStateToProps = (state) => ({
    createUser: state.authReducer.createUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "register" ,
        validate
    })
)(Signup)