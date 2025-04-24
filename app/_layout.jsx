import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";


const HeaderLogout = ()=>{
  const {user,logout} = useAuth();

  return user ? (
    <TouchableOpacity onPress={logout} style={styles.logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#ff8c00',
        },
        headerTintColor: '#fff', // turns header font color to white
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 500
        },
        headerRight : ()=><HeaderLogout/>,
        contentStyle: {
          padding: 10,
          backgroundColor: '#fff'
        }
      }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        <Stack.Screen name="auth" options={{ headerTitle: "Login" }} />
      </Stack>
    </AuthProvider>
  )
};
const styles =StyleSheet.create({
  logout:{
    marginRight: 15,
    paddingVertical : 5,
    paddingHorizontal : 10,
    backgroundColor : 'black',
    borderRadius : 8
  },
  logoutText : {
    color : '#fff',
    fontSize : 16,
    fontWeight : 'bold'
  }
})
