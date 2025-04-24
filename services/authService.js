import { ID } from "react-native-appwrite";
import { account } from "./appwrite";


const authService = {

    // Register a user
    async registerUser(email,password) {
        try{
            const response =await account.create(ID.unique(),email,password)
            return response;

        }
        catch(error){
            console.error(error,"Registration Failed, Please try Again");
            return {error : error.message || "Registration Failed, Please try Again"};
        }
    },

    // Login as a user
    async login(email,password) {
        try{
            const response =await account.createEmailPasswordSession(email,password)
            return response;

        }
        catch(error){
            console.error(error,"Login Failed, Please try Again");
            return {error : error.message || "Login Failed, Please check your credentials"};
        }
    },
    // Get Logged in User
    async getuser(){
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    // Loggout User
    async logout(){
        try {
            await account.deleteSession('current');
        } catch (error) {
            return { error : error.message | 'Logout failed'}
        }
    }
}

export default authService;