import { StyleSheet, View, Text , TouchableOpacity, Modal, TextInput} from "react-native"

const AddNoteModal = ({modalVisible,setModalVisible,newNote,setNewNote,addNote})=>{
    return (
                    <Modal 
                    style={styles.modalOverlay}
                    visible = {modalVisible} 
                    animationType="slide"
                    transparent
                    onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalTitle}>Add New Note</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Enter.."
                                value={newNote}
                                onChangeText={setNewNote}
                                ></TextInput>
        
                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity style={styles.cancelButton}
                                        onPress={()=>setModalVisible(false)}>
                                            <Text>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.saveButton}
                                        onPress={addNote}
                                        >
                                            <Text>Save</Text>
                                        </TouchableOpacity>
                                    </View>
        
                            </View>
                        </View>
        
                    </Modal>
    );
}
const styles = StyleSheet.create({
    modalOverlay : {
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.5)',
        justifyContent : 'center',
        alignItems : 'center',
        top: 100
      },
      modalContent : {
        backgroundColor : '#fff',
        padding : 20,
        borderRadius : 10,
        width : '80%',
        alignSelf: 'center',
        justifyContent : 'center',
        top: 100


      },
      modalTitle : {
        alignSelf: 'center',
        fontWeight :  600,
        marginBottom: 10
      },
      input :{
        borderColor: '#8e8ecb',
        borderWidth: 2,
        borderRadius: 9,
        margin: 5,
        padding: 3
      },
      modalButtons : {
        margin: 5,
        padding: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      cancelButton : {
        backgroundColor: '#ccc',
        alignItems: 'center',
        flex: 1,
        padding: 10,
        borderRadius: 7,
        margin: 5
      },
      saveButton : {
        backgroundColor: 'rgb(11 122 56)',
        alignItems: 'center',
        flex: 1,
        padding: 10,
        borderRadius: 7,
        margin: 5
      }
})
export default AddNoteModal;