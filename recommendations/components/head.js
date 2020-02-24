import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList, 
    TextInput,
    Button,
    TouchableOpacity } from 'react-native';


class Head extends Component{

    constructor(props){
        super(props);
     
    }
    
render(){
    return( 


        <View style={styles.container}>
            <Text>{this.props.data}</Text>
        </View>
    )
   
  
}
   

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    
})


export default Head 