import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator} from "react-native"
import NoteList from "../components/NoteList";
import AddNoteModal from "../components/AddNoteModal";
import noteService from "@/services/noteService";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

const noteScreen= () => {

    const router = useRouter();
    const {user,loading: authLoading} =useAuth();

    const [notes, SetNotes] = useState([]);
    const [modalVisible , setModalVisible] = useState(false);
    const [newNote , setNewNote] = useState('');
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);

    useEffect(() =>{
        if(!authLoading && !user){
            router.replace('/auth')
        }
    },[user,authLoading]);
    useEffect(() =>{
        if(user){
            console.log("inside useEffect")
            fetchNotes();   
        }

    },[user]);

    const fetchNotes = async () =>{
        setLoading(true);
        const response = await noteService.getNotes(user.$id);
        console.log(response,"response in fetchNotes function");
        
        if(response.error){
            setError(response.error);
            Alert.alert('Error', response.error);
        }
        else{
            SetNotes(response.data);
            setError(null)
        }
        setLoading(false);
    }

    const addNote = async () =>{
        if(newNote.trim() === '') return '';

        const response = await noteService.addNotes(user.$id,newNote);
        console.log(response,"response in addNote function");

        if(response.error){
            
            Alert.alert('Error', response.error);
        }
        else{
            SetNotes([...notes,response.data]);
        }
        setNewNote('');
        setModalVisible(false)
    }

    // Update Notes
    const editNote= async (id,newText)=>{
        if(newText.trim() === '') {
            Alert.alert('Error', 'Note Text Cannot be empty');
            return;
        }
        const response = await noteService.updateNotes(id,newText);
        if(response.error){
            
            Alert.alert('Error', response.error);
        }
        else{
            SetNotes(((prevNotes) => prevNotes.map((note)=> note.$id===id ? {...note,text:response.data.text} : note)));
        }

    }
    // Delete Notes function
    const onDelete = async (id)=>{
        Alert.alert('Delete Note','Are you sure you want to delete the note?',
            [
                {
                    text : 'Cancel',
                    style : 'cancel'
                },
                {
                    text : 'Delete',
                    style : 'destructive',
                    onPress: async ()=>{
                        const response = await noteService.deleteNotes(id);
                        if(response.error){
            
                            Alert.alert('Error', response.error);
                        }
                        else{
                            SetNotes(notes.filter((note) => note.$id !== id));
                        }
                        
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container} >

            { loading ? (
                <ActivityIndicator size="large" color='#007bff'></ActivityIndicator>
            ) : (
                <>
                {error &&<Text style={styles.errorText}>{error}</Text>}
                {/* Note List */}
                <NoteList notes={notes} onDelete={onDelete} onEdit={editNote}/>
                </>
            )}

            
            {/* Add Note Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>  + Add Notes</Text>
            </TouchableOpacity>

            {/* Add Note Modal */}
            <AddNoteModal 
            modalVisible ={modalVisible}
            setModalVisible = {setModalVisible}
            newNote = {newNote}
            setNewNote = {setNewNote}
            addNote={addNote}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding : 20,
        backgroundColor : '#fff',
        color : '#100909'
      },

      addButton : {
        backgroundColor: '#221e439e',
        marginBottom : 10,
        marginTop : 10,
        padding: 5,
        borderRadius: 13
      },
      buttonText : {
        textAlign: 'center'
      },
      errorText:{
        color : 'red',
        fontSize : 16,
        textAlign:'center',
        marginBottom : 10
      }

}
)
export default noteScreen