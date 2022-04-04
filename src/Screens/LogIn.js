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
import { 
  LoginManager, 
  AccessToken, 
  GraphRequest, 
  GraphRequestManager 
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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

  const FBlogIn=()=>{
    LoginManager
    .logInWithPermissions(['public_profile','email'])
    .then(function (result) {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        AccessToken
          .getCurrentAccessToken()
          .then((data) => {
            let accessToken = data.accessToken;
            // alert(accessToken.toString())

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error)
                // alert('Error fetching data: ' + error.toString());
              } else {
                // console.log(result);
                const navData = {
                  id: result.id,
                  name: result.name,
                  email: result.email,
                  profileImg: result.picture.data.url
                };
                navigation.navigate('ChooseCustomer',navData);
              }
            }

            const infoRequest = new GraphRequest('/me', {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                }
              }
            }, responseInfoCallback);

            // Start the graph request.
            new GraphRequestManager()
              .addRequest(infoRequest)
              .start()

          })
      }
    }, function (error) {
      alert('Login fail with error: ' + error);
    });
  }
  const googleLogIn=()=>{
    GoogleSignin.configure({
      androidClientId: '564858245446-uv4sn6c7t28qtj6f0pajnstvnboksmik.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
          GoogleSignin.signIn().then((userInfo) => {
              console.log(JSON.stringify(userInfo))
              const navData = {
                id: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                profileImg: userInfo.user.photo
              };
              navigation.navigate('ChooseCustomer',navData);
          })
          .catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
          })
      }
      else{
        console.log("playservice error");
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    })
  };

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
          {/* <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {

                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      let accessToken = data.accessToken
                      alert(accessToken.toString())

                      const responseInfoCallback = (error, result) => {
                        if (error) {
                          console.log(error)
                          alert('Error fetching data: ' + error.toString());
                        } else {
                          console.log(result)
                          alert('Success fetching data: ' + result.toString());
                        }
                      }

                      const infoRequest = new GraphRequest(
                        '/me',
                        {
                          accessToken: accessToken,
                          parameters: {
                            fields: {
                              string: 'email,name,first_name,middle_name,last_name'
                            }
                          }
                        },
                        responseInfoCallback
                      );

                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start()

                    }
                  )

                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/> */}
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
