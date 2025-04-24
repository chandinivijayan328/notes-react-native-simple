import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

const AuthScreen = () => {
    const {login,register} = useAuth();
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(false);
    
    const handleAuth=async ()=>{
        if(!email.trim() || !password.trim()){
            setError('Email and Password are required!');
            return;
        }
        if(isRegistering && password !==confirmPassword){
            setError('Passwords do not match!');
            return;
        }
        let response;
        if(isRegistering){
            response = await register(email,password)
        }
        else{
            response = await login(email,password)
        }
        if(response?.error){
            Alert.alert('Error',response.error);
            return
        }
        router.replace('/notes')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {isRegistering ? 'Sign Up' : 'Login'}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput style={styles.input}
                placeholder="Email"
                placeholderTextColor='#aaa'
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput style={styles.input}
                placeholder="Password"
                placeholderTextColor='#aaa'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="none"
            />
            {
                isRegistering && (
                    <TextInput style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor='#aaa'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        textContentType="none"


                    />
                )
            }
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.switchText}>{isRegistering ? 'Already Have an Account ? Login!' : "Don't have an Account? Sign Up!"}</Text>

            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        color: '#100909',
        justifyContent: 'center',
        alignItems : 'center'
    },
    header : {
        fontSize : 28,
        fontWeight : 'bold',
        marginBottom : 20,
        color : '#333'
    },
    input: {
        width : '80%',
        padding : 12,
        borderWidth:1,
        borderColor : '#ddd',
        borderRadius : 8,
        marginBottom: 12,
        fontSize: 16
    },
    button : {
        paddingVertical:12,
        borderRadius :8,
        width : '80%',
        alignItems : 'center',
        marginTop : 10,
        backgroundColor : '#ff8c00'
    },
    buttonText : {
        color : '$fff',
        fontSize : 18,
        fontWeight : 'bold'
    },
    switchText : {
        marginTop : 10,
        fontSize : 16,
        color : '#ff8c00'
    },
    error : {
        color : 'red',
        marginBottom :10,
        fontSize:16
    }
}
);
export default AuthScreen;