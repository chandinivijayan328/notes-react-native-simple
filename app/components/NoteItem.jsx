import { useRef, useState } from "react";
import { View,Text,StyleSheet, TouchableOpacity, TextInput  } from "react-native";
const NoteItem = ({note,onDelete,onEdit}) =>{
    const [isEdting,setIsEditing] = useState(false);
    const [editedText,setEditedText] =useState(note.text);
    const inputRef = useRef(null);

    const handleSave = ()=>{
        if(editedText.trim() === '') return;
        onEdit(note.$id,editedText);
        setIsEditing(false)
    }
    return (
        <View style={styles.noteItem}>
            {isEdting ? (
                <TextInput
                ref={inputRef}
                value={editedText}
                onChangeText={setEditedText}
                style={styles.input}
                autoFocus
                onSubmitEditing={handleSave}
                returnKeyType='done'
                />
            ) : 
            (
                <Text style={styles.noteText}>{note.text}</Text>
            )}
            <View style={styles.actions}>
                {
                    isEdting ? (
                        <TouchableOpacity onPress={ ()=> {
                            handleSave();
                            inputRef.current?.blur();
                        }}>
                        <Text style={styles.edit}> 💾</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={ ()=> {setIsEditing(true)}}>
                        <Text style={styles.edit}> ✏️</Text>
                    </TouchableOpacity>
                    )
                }

                <TouchableOpacity onPress={ ()=> onDelete(note.$id)}>
                    <Text style={styles.deleteIcon}> 🗑️</Text>
                </TouchableOpacity>
            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    noteItem : {
        backgroundColor: 'aliceblue',
        border: '#837171',
        borderWidth: 0.5,
        border: 'outset',
        padding : 3,
        margin : 4,
        borderEndWidth : 2,
        borderBottomWidth : 2,
        flexDirection : 'row',
        justifyContent : 'space-between'
        
      },
      noteText : {
        color : 'slategrey'
      },
      deleteIcon :{
        fontSize : 18,
        color : 'red',
    },
    actions : {
        flexDirection : 'row',
        textAlign : 'right'
      },
      edit : {
        fontSize : 18,
        marginRight :10,
        color : 'blue'
      },
      input: {

      },
      input :{
        borderColor: '#8e8ecb',
        borderWidth: 2,
        borderRadius: 9,
        margin: 5,
        padding: 3
      },
})

export default NoteItem;