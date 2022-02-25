import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomSheet } from "react-native-btr";
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../config";

const Data = [
  {
    id: "0",
    title: "Full Name",
  },
  {
    id: "1",
    title: "Email Address",
  },
  {
    id: "2",
    title: "Phone number",
  },
];
LogBox.ignoreLogs(["Setting a timer"]);

export default function ProfileScreen({ navigation, route }) {
  const navigateData = route.params;

  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(null);
  const [processRate, setProcessRate] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    user();
  },[]);

  const user=async()=>{
    try {
      let userData = await AsyncStorage.getItem('jwt');         
      let data = JSON.parse(userData);
      if(data !== null){
        setToken(data.access_token);
      }else{
        setToken(null);
      }
    }
    catch(err){
      console.log(err);
    }
  };

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const pickImage = async () => {
    const options = {
      storageOptions: {
          path: 'images',
          mediaType: 'photo'
      },
      includeBase64: true
    };
      launchImageLibrary(options, resp => {
          if(resp.didCancel){
              console.log("Canceled");
              setVisible(false);
          }
          else if(resp.error){
              console.log("Error: ", resp.error);
              setVisible(false);
          }
          else{
              const imgData = resp.assets[0];
              setImage(imgData);
              setEdit(true);
              setVisible(false);
          }
      })
  };


  const openCamera = async () => {
    const options = {
      storageOptions: {
          path: 'images',
          mediaType: 'photo'
      },
      includeBase64: true
    };
      launchCamera(options, resp => {
          if(resp.didCancel){
              console.log("Canceled");
              setVisible(false);
          }
          else if(resp.error){
              console.log("Error: ", resp.error);
              setVisible(false);
          }
          else{
              const imgData = resp.assets[0];
              setImage(imgData);
              setEdit(true);
              setVisible(false);
          }
      })
  };

  const update = async () => {
    setUploading(true);
    try{
        const task = storage()
        .ref("USER/profile_image/"+ image.fileName)
        .putString(image.base64,"base64");
        task.on('state_changed',
            function(snapshot){
                const rate = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProcessRate(`${rate}%`);
                setProcessing(true);
                console.log(rate);
            },
            function(err){
                console.log(err);
            },
            function(){
                task.snapshot.ref.getDownloadURL().then(function(url){
                  let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Authorization": token
                    }
                  };
                  axios.patch(`${API}/user/update`,{profileImg:url},axiosConfig)
                  .then(res=>{
                    console.log(res.data);
                    setUploading(false);
                    setSuccess(true);
                    setError(false);
                  })
                  .catch(err=>{
                    setError(true);
                    setUploading(false);
                    console.log("err", err);
                  })
                  return url;
                })
            }
        );                  
        task.then(() => {
            console.log('PDF uploaded to the bucket!');
            setProcessing(false);
        });               
    }
    catch(e){
        console.log(e);
    }
    setVisible(false);
  };

  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };
  if (error) {
    setTimeout(() => {
      setError(false);
    }, 4500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color={"#fff"} size={38} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 50,
            justifyContent: "space-around",
            flex: 0.9,
          }}
        >
          <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
            My Profile
          </Text>
          <TouchableOpacity
            style={{ right: -10, alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => alert("coming soon")}
          >
            <Image
              source={require("../../../assets/image/Wallet.jpg")}
              style={{ bottom: -3 }}
            />
            <Text style={{ color: "#fff", fontSize: 10 }}>
              {navigateData.points}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        {/* <View style={styles.edit}>
                    <TouchableOpacity style={{paddingVertical:2,paddingHorizontal:5}}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View> */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleBottomNavigationView}
          >
            {navigateData.profileImg ? (
              <Image
                style={styles.profile}
                source={
                  image ? { uri: image.uri } : { uri: navigateData.profileImg }
                }
              />
            ) : (
              <Image
                style={styles.profile}
                source={
                  image
                    ? { uri: image.uri }
                    : require("../../../assets/image/Profile.png")
                }
              />
            )}
          </TouchableOpacity>
        </View>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={{ fontWeight: "700", color: "#fdb915" }}>
                Choose Photo
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                width: "90%",
                borderWidth: 1,
                borderColor: "#aaa",
                backgroundColor: "#aaa",
              }}
            />
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <Text
                onPress={openCamera}
                style={{
                  marginBottom: 20,
                  fontWeight: "700",
                  color: "gray",
                }}
              >
                Open camera
              </Text>
              <Text
                onPress={pickImage}
                style={{
                  fontWeight: "700",
                  color: "gray",
                }}
              >
                Select from file
              </Text>
            </View>
          </View>
        </BottomSheet>
        <View style={{ marginTop: 0 }}>
          <FlatList
            data={Data}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
              <View key={item.item.id} style={styles.nameView}>
                <Text style={styles.title}>{item.item.title}</Text>
                <Text style={styles.subTitle}>
                  {item.item.id == 0
                    ? navigateData.name
                    : item.item.id == 1
                    ? navigateData.email
                    : navigateData.phoneNo}
                </Text>
                <View style={styles.line} />
              </View>
            )}
          />
        </View>
        {edit ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            {
              processing ? 
              <Text style={{color:"gray",textAlign:"center",marginBottom:10}}>
                Uploading {processRate}
              </Text> 
              : null
            }
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 20,
                backgroundColor: "#fdb915",
                borderRadius: 4,
              }}
              onPress={update}
            >
              {uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff" }}>Update</Text>
              )}
            </TouchableOpacity>
            {success ? 
              (
                <Text style={{ color: "green", fontSize: 12, marginTop: 20 }}>
                  Updated successfully
                </Text>
              ) : 
              error ? 
              (
                <Text style={{ color: "red", fontSize: 12, marginTop: 20 }}>
                  Update failed
                </Text>
              ) :
            null}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdb915",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 30,
    flex: 0.1,
    marginBottom: 50,
  },
  body: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    flex: 1,
  },
  profile: {
    // position:"absolute",
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#fff",
    top: -20,
    borderWidth: 0.5,
    borderColor: "gray",
    // resizeMode:'contain',
  },
  nameView: {
    marginLeft: 20,
    // marginTop:20
  },
  title: {
    fontSize: 20,
    color:"#000"
  },
  subTitle: {
    fontSize: 16,
    marginTop: 10,
    color:"#000"
  },
  line: {
    borderWidth: 1,
    marginTop: 15,
    marginRight: 20,
    borderColor: "#fdb915",
    marginBottom: 20
  },
  edit: {
    position: "absolute",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    right: 30,
    top: -10,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 180,
    alignItems: "center",
  },
});
