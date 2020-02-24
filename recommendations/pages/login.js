import React, { Component, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList, 
    TextInput,
    Button,
    Alert,
    TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../actions/auth.actions';
import Logo from '../components/img/logo';
import { Actions } from 'react-native-router-flux';
import InputText from '../components/inputText';
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

class Login extends Component {
    goSignup(){
        Actions.signup()
    }
    onLogin = async (values) => {
        const user = {
            email: values.email,
            password: values.password
        }
       try {
            const response =  await this.props.dispatch(loginUser(user))
            if (response.success){
                console.log(response.resBody.status)
            }
            else{
                throw response.error
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
        const { handleSubmit, loginUser } = this.props
     
    return (
        <View style={styles.container}>
            <Logo />
            <Field
             name="email"
             placeholder="Email"
             component={this.renderTextInput} />
            <Field
             name="password"
             secureTextEntry = {true}
             placeholder="Password"
             component={this.renderTextInput} />

            <TouchableOpacity style={styles.btnTch} onPress={handleSubmit(this.onLogin)}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signUpCont}>
                <Text style={styles.signUpText}>Don't have an account yet?</Text>
    <TouchableOpacity onPress={this.goSignup}>
    <Text style={styles.signUpBtn}>Signup</Text>

    </TouchableOpacity>
            </View>
        </View>
            
        )
}

   
}
const validate = (values) =>{
    const errors = {};
    if(!values.email){
        errors.email = "Email is required"
    }
    if(!values.password){
        errors.password = "Password is required"
    }
    return errors;
}


mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "login" ,
        validate
    })
)(Login)