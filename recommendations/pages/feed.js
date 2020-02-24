import React, { Component, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'; 
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { imageUpdate, getPosts, getUserById } from '../tools/postService';
import  HttpService from '../tools/getService';
import { Actions } from 'react-native-router-flux';
import profile from './profile';

const http = new HttpService();
const defaultImg = require('../assets/profilePlaceholder.png');
let url = '';
let extention = '';
const BASE_URL = 'http://172.20.10.4:3001/'

class Feed extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            users: [],
            newPost: [],
            url: '',
            pUrl: ''
          };
        this.getPosts = this.getPosts.bind(this)
        this.getPermissionAsync = this.getPermissionAsync.bind(this)
        this.showRel = this.showRel.bind(this)
        
    }

    onImgPress = () =>{
        Actions.profile()
    }
   
      componentDidMount() {
        this.getPermissionAsync();
        this.getPosts(this.props.getUser.userData._id);
    
      }
      componentWillUnmount(){
          this.getPosts()
          this.addPosts()

      }
    onLogout = async () =>{
    await this.props.dispatch(logoutUser()).then(response =>{
    })
        
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);
          if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
          }
        }
      }

    


    processImg = async (imageUri) => {
        let processedImg = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: {width: 200} }
            ],
            {format: 'jpeg'}
        );
        this.setState({
            image: processedImg.uri
        })
    }
    onCamera = async () =>{
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            aspect: [4,3]
          });

        if (!result.cancelled) {
            this.processImg(result.uri)
            this.addPosts(result)

          }
    }
    addPosts = async (image) =>{
        var profileImg = this.props.getUser.userData.profileImg
        profileImg = profileImg.replace(/\\/g,"/")
        var PostData = {
            email:  this.props.getUser.userData.email,
            name:  this.props.getUser.userData.name,
            profileImg:  profileImg,
            _id:  this.props.getUser.userData._id,
            title:  '',   
            tags:  '',
            file: image

        }
        if(image.uri){
           
        
        try{
            
            var response =  await http.addPost(PostData)
            if (response.success){
                console.log(this.props.getUser.userData.email + ' added a new post')
                this.getPosts(this.props.getUser.userData._id)
                
                
                
            }
            else{
                console.log('response.success is false: ' + response)
            }
        } catch (error) {
            let errorText = 'Something went wrong';
            if(error){
                console.log(error)
            }
         
        }
        this.setState({ state: this.state });
        this.forceUpdate();
                
    }
    }
    getPosts = async (id) => {
        try{
        const response =  await getPosts(id)
        if (response.success){
            this.setState({
                posts: response.posts
            })
        }
        else{
            this.setState({
                posts: defaultImg
            })
        }
    } catch (error) {
        let errorText = 'Something went wrong';
        if(error){
            errorText = error;
        }
     
    }
}
    showRel = async (postList) =>{
       const userData = await getUserById(postList.userId)
           return userData
    
    }
    
    render(){
        let { posts } = this.state;
        let {getUser: { userData }} = this.props
        let profUrlImg = userData ? userData.profileImg : '';
        profUrlImg = profUrlImg.replace(/\\/g,"/")
    return (
        <SafeAreaView >
           <View style={styles.titleBar}>
           <TouchableOpacity onPress={this.onCamera}>  
                <Ionicons name="ios-camera" size={35} color="#52575D" />
                
            </TouchableOpacity>
            <Text style ={styles.title}>Recom-</Text>
            <TouchableOpacity onPress={this.onImgPress}>  
                <Image  source={{uri: BASE_URL + profUrlImg}} style={styles.profImgTop}></Image>
            </TouchableOpacity>
           </View>
            <ScrollView  showsVerticalScrollIndicator={false}>
               {posts.map((postList, index) =>{
                   if(postList){
                       
                       
                    var url = postList.postImg ? postList.postImg.replace(/\\/g, "/") : ''
                    var Purl = postList.profileImg ? postList.profileImg.replace(/\\\\/g, "/") : ''
                    
                    var name = postList.name
                    var title = postList.title
                    var getUsers = null
                    var userList = null
                    
                   }else{
                    
                   }
           
            
            
        if(posts){
            return ( 
                <React.Fragment  key = {index}>
                    <View style={styles.mediaImageContainer}>
                    <View style ={[styles.container, {margin:20 , borderColor: "#DFD8C8", borderTopWidth: 1}]}>
                        <View style={styles.profImg}>
                            <Image  source={{uri: BASE_URL + Purl}} style={styles.profImg}></Image>
                         </View>
                         <View style = {styles.textView}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.subText}>Jan 15, 2019</Text>
                         </View>
                   

                    </View>
     
                    <View style = {styles.imageTextCont}>
                    
                        <Text style={styles.textStyle}>{title ? title : 'TITLE'}</Text>
                   
                     <Image  source={{uri: BASE_URL + url}} style={styles.image}></Image>
                     

                    </View>
                   
                    </View>
                    
               </React.Fragment>)
        }
          
           
              
 
        })}
                
              
            </ScrollView>

                
        </SafeAreaView>


        
            
        )
}

   
}
const styles = StyleSheet.create({
    profImgTop: {
        margin: 10,
        marginTop: 0,
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: "hidden",

    },
    textView:{
        flexDirection: "column"
    },
    subText:{
        marginTop: 0,
      
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    textStyle :{
        
        marginLeft: 20,
        marginBottom: 10,
        fontFamily:"HelveticaNeue",
        color: '#52575D',
    },
    profImg: {
        marginLeft: 0,
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: "hidden",

    },
    name: {
        fontFamily:"HelveticaNeue",
        color: '#52575D',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginLeft: 10
    },
    title: {
        fontFamily:"HelveticaNeue",
        color: '#52575D',
        margin: 10,
        marginLeft: 20
    },
    container: {
        flexDirection: "row",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        
    },
    titleBar:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginHorizontal: 16
    },
    profileImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    imageTextCont: {
        marginLeft: 0,
        width: '100%',
        minHeight: 500,
        margin: 10,
        overflow: "hidden",
        marginHorizontal: 10,
        
    },
    mediaImageContainer:{
        marginLeft: 0,
        width: '100%',
        minHeight: 500,
        margin: 10,
        overflow: "hidden",
        marginHorizontal: 10,
    },
  
})


mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
    authData: state.authReducer.authData
})

mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);