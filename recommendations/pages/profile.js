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
import { logoutUser, changeProfile, updateUser } from '../actions/auth.actions'
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import ImgToBase64 from 'react-native-image-base64';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'; 
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { imageUpdate, getPostsById } from '../tools/postService';
import  HttpService from '../tools/getService';
import { Actions } from 'react-native-router-flux';
const http = new HttpService();
const BASE_URL = 'http://172.20.10.4:3001/'
let url = '';
let extention = '';
let posts = []
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: '',
            posts: []
          };
       
    }
     
    onBackBtn = () =>{
        Actions.feed()
    }
      
      componentDidMount() {
        this.getPermissionAsync();
        this.onUpdatePage()

      }
    onLogout = async () =>{
    await this.props.dispatch(logoutUser()).then(response =>{
    })
        
    }
    onUpdatePage = async () =>{
        var userData = {
            email: this.props.getUser.userData.email,
            _id: this.props.getUser.userData._id
        }
        await this.props.dispatch(updateUser(userData)).then(response =>{
        })
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

    profileImgUpdate = async (image) => {
        if (image.uri){
            var Data = {
                _id: this.props.getUser.userData._id,
                email: this.props.getUser.userData.email,
                file: image,
                token: this.props.authData.token
            }
     

            
            try{
            const response =  await this.props.dispatch(changeProfile(Data))
            if (response.success){
                url = this.props.getUser.userData.profileImg ? this.props.getUser.userData.profileImg : '' 
                extention = url ? url.split("\\") : '';
                
              

            }
            else{
                throw response.error
            }
        } catch (error) {
            let errorText = 'Something went wrong';
            if(error){
                errorText = error;
            }
         
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
    onChoosePhoto = async () => {
       
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            aspect: [4,3]
          });

        if (!result.cancelled) {
            this.processImg(result.uri)
            this.profileImgUpdate(result)
          }
        
    }
    getUserPosts = async () =>{
       await getPostsById(this.props.getUser.userData._id).then(response =>{
            [posts] = response
        })
    }

    render(){
        let { image } = this.state;
        let {getUser: { userData }} = this.props
        url = userData ? userData.profileImg : '';
        extention = url ? url.replace(/\\/g, "/") : '/';
        let imageUrl = BASE_URL + extention
        posts = userData ? userData.posts : null
        
        return (
        <SafeAreaView style={styles.container}>
           
            

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={this.onBackBtn}> 
                        <View>
                        <Ionicons name="ios-arrow-back" size={24} color="#52575D" />
                        </View> 
                       
                    </TouchableOpacity>
                  
                    <Ionicons name="md-more" size={24} color="#52575D" />

                </View>
                <View style = {{alignSelf: "center"}}>
                    <View style={styles.profileImg}>
                        <Image 
                    
                        source={(url && (!image)) ? {uri: imageUrl} :  (image) ? {uri: image} : (require('../assets/profileImg.jpg'))} 
                        style={styles.image} 
                        resizeMode="center"
                        ></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                    <TouchableOpacity onPress={this.onChoosePhoto}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{marginTop:6, marginLeft: 2}}></Ionicons>
                    </TouchableOpacity> 
                       
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.textStyle, {fontWeight: "200", fontSize: 36}]}>{userData ? userData.name : ''}</Text>
                    <Text style={[styles.textStyle, {color: "#AEB5BC", fontSize: 14}]}>{userData ? userData.job ? userData.job : 'No Job Specified' : ''}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.textStyle, {fontSize: 24}]}>400</Text>
                        <Text style={[styles.textStyle, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, {borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
                        <Text style={[styles.textStyle, {fontSize: 24}]}>4,000</Text>
                        <Text style={[styles.textStyle, styles.subText]}>followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.textStyle, {fontSize: 24}]}>600</Text>
                        <Text style={[styles.textStyle, styles.subText]}>following</Text>
                    </View>

                </View>
                <View style={{marginTop: 32}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        
                            {
                            
                               
                                posts ?    posts.map((postList, index) =>{
                                        if(postList){
                                            var Postsurl = postList.postImg ? postList.postImg.replace(/\\/g, "/") : ''
                                            var name = postList.name
                                            var title = postList.title
                                            var tags = postList.tags
                                            return(
                                                <View key={index} style={styles.postContainer}>
                                                <Image source={url ? {uri: BASE_URL+  Postsurl} : require('../assets/profileImg.jpg')} style={styles.postImage}></Image>
                                                </View>
                                            )
                                        }
                                    })
                                : null
                       
                            }
                            

                       
                    </ScrollView>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={styles.recentItem}>
                    <View style={styles.recentitemIndicator}></View>
                    <View style={{width:250}}>
                        <Text style={styles.textStyle}>
                            Started following {" "}<Text style={{fontWeight: "400"}}> Jake and</Text> <Text style={{fontWeight:"400"}}> design to code</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.recentItem}>
                    <View style={styles.recentitemIndicator}></View>
                    <View style={{width:250}}>
                        <Text style={styles.textStyle}>
                            Started following {" "}<Text style={{fontWeight: "400"}}> Luke</Text>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnTch} onPress={this.onLogout}>
                     <Text style={styles.btnText}>Log out</Text>
                 </TouchableOpacity> 
            </ScrollView>
        </SafeAreaView>
            
        )
}

   
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    textStyle :{
        fontFamily:"HelveticaNeue",
        color: '#52575D',
    },
    subText:{
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    postImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 10,
        margin: 5
    },
    titleBar:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm:{
        backgroundColor: "#41444B",
        opacity: 0.8,
        position: "absolute",
        top: 20,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active:{
    
        backgroundColor:"#34FF89",
        position: "absolute",
        bottom: 160,
        left: 160,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10 
    },
    add:{
        backgroundColor:"#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer:{
        alignItems: "center",
        alignSelf: "center",
        marginTop: 10
    },
    statsContainer:{
        flexDirection: "row",
        alignSelf:"center",
        marginTop: 32
    },
    statsBox:{
        alignItems: "center",
        flex: 1
    },
    postContainer:{
        flexDirection: "row",
        width: 200,
        height: 250,
        borderRadius: 7,
        overflow: "hidden",
        marginHorizontal: 10,
    },
    recent:{
        marginLeft:78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem:{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    recentitemIndicator: {
        backgroundColor:"#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20,
        marginLeft: 20
    },
    btnTch:{
        width:'auto',
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
})


mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
    authData: state.authReducer.authData
})

mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);