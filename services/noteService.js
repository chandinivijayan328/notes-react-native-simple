import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite DB and collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_NOTES_COL_ID;


const noteService = {
    // Get Notes
    async getNotes(userId) {
        if(!userId){
            console.error("Error: No user Id");
            return {
                data:[],
                error : "user id is missing"
            }
        }

        try {
            const response = await databaseService.getDocumnts(dbId,colId,[
                Query.equal('user_id',userId)
            ]);
            return {data : response}

        } catch (error) {
            return {
                data:[],
                error : error.message
            }
        }
        
    },

    // Add Notes
    async addNotes(user_id,text){
        if(!text){
            return { error : 'Notes cannot be empty!'};
        }
        const data = {
            text : text,
            createdAt : new Date().toISOString(),
            user_id:user_id
        }
        const response = await databaseService.createDocuments(dbId,colId,data,ID.unique())
        if(response.error){
            return {error: response.error};
        }
        return {data : response}
    },

    // Update Notes
    async updateNotes(id,text){
        if(!text){
            return { error : 'Notes cannot be empty!'};
        }
        const data = {
            text : text,
        }
        const response = await databaseService.updateDocument(dbId,colId,id,data)
        if(response.error){
            return {error: response.error};
        }
        return {data : response}
    },

    // Delete Note
    async deleteNotes(id){
        if(!id){
            return { error : 'ID cannot be empty!'};
        }
        const response = await databaseService.deleteDocument(dbId,colId,id)
        if(response.error){
            return {error: response.error};
        }
        return {success : true};
    }


}

export default noteService;
