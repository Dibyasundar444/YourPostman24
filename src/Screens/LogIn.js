import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "../config";


const LogIn = ({ navigation }) => {

  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  
  useEffect(() => {
  }, []);

  const errorHandler1=()=>{
    if (email=="") {
      setError1(true);
    } else{
      setError1(false);
    }
  };
  const errorHandler2=()=>{
    if (password=="") {
      setError2(true);
    } else{
      setError2(false);
    }
  };

  const submitHandler=async()=>{
    if (email=="" | password=="") {
      null
    }else {
      setLoading(true);
      axios.post(`${API}/user/login`,{"email": email, "password": password})
      .then(async resp => {  
        console.log("resp",resp);
          try {
            const jsonValue = JSON.stringify(resp.data);
            await AsyncStorage.setItem('jwt',jsonValue);
            // console.log(jsonValue);
          } 
          catch (e) {
            console.log(e);
          }
          setLoading(false);
          navigation.navigate("HomeScreen");
      })
      .catch(e=>{
        console.log(e);
        setLoading(false);
      })
    }
  };

  const FBlogIn=()=>{};
  const googleLogIn=()=>{};

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          borderTopLeftRadius: 30,
          backgroundColor: "#fff",
          marginTop: hp(15),
        }}
        contentContainerStyle={{paddingBottom:50}}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            marginTop: hp(5),
            color: "grey",
            fontSize: 22,
            textAlign:"center"
          }}
        >
          Signin
        </Text>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          style={{
            marginTop: hp(10),
            fontSize: 18,
            marginHorizontal: 23,
            borderBottomWidth: 1,
            color:"#000"
          }}
          value={email}
          onChangeText={(val)=>setEmail(val)}
          keyboardType="email-address"
          onBlur={errorHandler1}
        />
        {
          error1 === true ? <Text style={{color:"red",marginLeft:20,fontSize:12}}>* required field</Text> : null
        }
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={{
            marginTop: hp(10),
            fontSize: 18,
            marginHorizontal: 23,
            borderBottomWidth: 1,
            color:"#000"
          }}
          value={password}
          onChangeText={(val)=>setPassword(val)}
          onBlur={errorHandler2}
        />
        {
          error2 ? <Text style={{color:"red",marginLeft:20,fontSize:12}}>* required field</Text> : null
        }
        <View style={{alignItems:"center"}}>
          <TouchableOpacity
            style={styles.button3}
            onPress={submitHandler}
          >
            {
              loading ? <ActivityIndicator color="#fff" size={30} />
              :
              <Text style={styles.loremIpsum2}>Continue</Text>
            }
          </TouchableOpacity>
        </View>
        <View style={{alignItems:"center",marginVertical:10}}>
          <Text>Don't have an account?</Text>
          <Text style={{color:"#e0ab24"}}
            onPress={()=>navigation.navigate("Register")}
          >Register here</Text>
        </View>
        <Text
          style={{
            textAlign:"center",
            fontSize: 20,
            color:"gray"
          }}
        >
          or Continue with
        </Text>
        <View style={{}}>
          <View style={{ flexDirection: "row",justifyContent:"space-evenly", marginTop: 30 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#2834a1",
                padding: 15,
                paddingHorizontal: 37,
                borderRadius: 10
              }}
              onPress={FBlogIn}
            >
              <Text style={{ color: "#fff" }}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#f54c6e",
                padding: 15,
                paddingHorizontal: 37,
                borderRadius: 10
              }}
              onPress={googleLogIn}
            >
              <Text style={{ color: "#fff" }}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0ab24",
    flex: 1,
  },
  button3: {
    alignItems: "center",
    marginTop: hp(4),
    width: wp(60),
    height: hp(7),
    backgroundColor: "#e0ab24",
    borderRadius: 16,
    justifyContent:"center"
  },
  loremIpsum2: {
    fontSize: 17,
    color: "#fff",
  },
});

export default LogIn;
