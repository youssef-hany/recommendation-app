import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const InterestItem = props => {
    return (

        <TouchableOpacity activeOpacity={0.7} onPress={props.onDelete.bind(this, props.id)}>
        <View style={styles.listItem} >
          <Text>{props.interests}</Text> 
        </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    listItem:{
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ccc',
        borderColor:'black',
        borderWidth: 1
      }

});
export default InterestItem;