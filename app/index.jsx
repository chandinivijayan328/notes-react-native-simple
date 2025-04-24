import { Text, View, StyleSheet,Image, TouchableOpacity, ActivityIndicator} from "react-native";
import PostItImage from "@/assets/images/42430.jpg"
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";


const HomeScreen = () => {
  const router = useRouter();
  const {user,loading}=useAuth()

  useEffect(()=>{
    if(!loading & user){
      router.replace('/notes')
    }
    if(!loading & !user){
      router.replace('/auth')
    }
  },[user,loading]);
  if(loading){
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007"/>
      </View>
    )
  }
  return (
    <View
      style={styles.container}
    >
      <Image source={PostItImage} style={styles.image}/>
      <Text style={styles.title}>Welcome to Notes!.</Text>
      <Text  style={styles.subtitle}>Write down your thoughts anytime, anywhere.</Text>

      <TouchableOpacity  style={styles.button} onPress={() => router.push('./notes')}>
        <Text>Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding : 20,
    backgroundColor : '#fff',
    color : '#100909'
  },
  image: {
    width : 100,
    height : 100,
    marginBottom : 20,
    borderRadius : 10
  },
  title : {
    fontSize : 20,
    fontWeight : 'bold'
  },
  subtitle : {
    fontSize: 13,
    marginTop : 10
  },
  button: {
    backgroundColor: '#221e439e',
    marginBottom : 10,
    marginTop : 10,
    padding: 5,
    borderRadius: 13
  },
  centeredContainer : {
    alignItems : 'center',
    justifyContent:'center',
    textAlign : 'center'
  }

})

export default HomeScreen;