import { ID } from "react-native-appwrite";
import { database } from "./appwrite";


const databaseService = {

    // list documents
    async getDocumnts(dbId,colId,queryParams) {
        try{
            const response =await database.listDocuments(dbId,colId,queryParams);
            return response.documents || [];

        }
        catch(error){
            console.error(error,"Erro getting the documents");
            return {error : error.message};
        }
    },

    // create Documents
    async createDocuments(dbId,colId,data,id = null){
        console.log("id in databaseservice",id);
        
        try{
            return await database.createDocument(dbId,colId,id || undefined,data)
        }
        catch(error){
            console.error('Error creating documents', error);
            return {error: error.message};
        }

    },

    // update Documents
    async updateDocument(dbId,colId,id,data){
        console.log("id in databaseservice",id);
        
        try{
            return await database.updateDocument(dbId,colId,id,data)
        }
        catch(error){
            console.error('Error updating the documents', error);
            return {error: error.message};
        }

    },

   // delete Documents
    async deleteDocument(dbId,colId,id){
        console.log("id in deleteDocument databaseservice",id);
        
        try{
            await database.deleteDocument(dbId,colId,id);
            return { success : true}
        }
        catch(error){
            console.error('Error deleteing documents', error);
            return {error: error.message};
        }

    }
}

export default databaseService;