import React, {useState} from 'react'
import { 
    StyleSheet, 
    View, 
    TextInput, 
    Button, 
    Modal } from 'react-native';

const InterestInput = props => {
    const [enteredInterest, setEnteredInterest] = useState('')

    const InputOnChange  = (enteredInterest) => {
        setEnteredInterest(enteredInterest)
        
    }
    const addInterestHandler = () => {
        props.addInterest(enteredInterest);
        setEnteredInterest('');
    }
    
    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.interestView}>
                <TextInput
                placeholder="Interests" 
                style={styles.interestinput}
                onChangeText={InputOnChange}
                value = {enteredInterest}
                />
                <View style={styles.btnCont}> 
                <Button title="Cancel"
                 color="red" 
                 onPress={props.cancelModal}/>
                <Button title="Add" 
                styles={styles.addBtn}  
                onPress={addInterestHandler}/>
                </View>
                
            </View>

        </Modal>
       
    )
}
const styles = StyleSheet.create({
    interestinput:{

        width:'80%',
        borderColor:"black", 
        borderWidth:1,
        padding: 10
      },
    btnCont:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'60%',
        marginTop: 20
      },    
    interestView: { 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
      },
      addBtn: {
        width: '30%'
      },
})

export default InterestInput;