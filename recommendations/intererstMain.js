import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import InterestItem from './components/interestItem';
import InterestInput from './components/interestInput';


export default function InterestMain() {
  const [enteredInterest, setEnteredInterest] = useState('');
  const [interests, setCurrentInterests] = useState([])
  const [addMode, setAddMode] = useState(false)
  
  const addInterest = (interestTitle) =>{
    if(interestTitle.length === 0) {
      return;
    }
    setCurrentInterests(currentInterests => [...currentInterests,{id: Math.random().toString(), value:  interestTitle}])
    setAddMode(false);
  }

  const removeInterest = (currentId) =>{
    setCurrentInterests(currentState => {
      return currentState.filter(filtered => filtered.id !== currentId)
    })
  }

  const cancelModal = () => {
    setAddMode(false);

  }
  return (
    <View style={styles.main} >
      <Button title="Add Interests" onPress={() => setAddMode(true)} />
{/* View for taking user input and storing instate */}
      <InterestInput 
      cancelModal={cancelModal}
      visible={addMode} 
      addInterest={addInterest} />
     
      
      <View>
        <FlatList 
        keyExtractor={(item, index) => item.id}
        data={interests}
        renderItem={itemData =>(
          <InterestItem
          id={itemData.item.id} 
          onDelete={removeInterest} 
          interests={itemData.item.value}/>
        )
        }/>
     
      </View>

     
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    padding: 50
  },
  
 
 
});
