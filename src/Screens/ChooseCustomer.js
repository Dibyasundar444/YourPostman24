import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChooseCustomer = ({ navigation, route }) => {

    const preData = route.params;

  const [values, setValues] = useState({
    businessCustomer: false,
    Bname: "",
    GST: "",
    PAN: "",
    Aadhaar: "",
  });

  const {
    businessCustomer,
    Bname,
    GST,
    PAN,
    Aadhaar,
  } = values;

  let postData = !businessCustomer
    ? {
        name: preData.name,
        email: preData.email,
        // password: "password",
        // phoneNo: "phoneNo",
        profileImg: preData.profileImg,
        businessCustomer: businessCustomer,
      }
    : {
        name: preData.name,
        email: preData.email,
        // password: "password",
        // phoneNo: "phoneNo",
        profileImg: preData.profileImg,
        businessCustomer: businessCustomer,
        businessName: Bname,
        gstNumber: GST,
        panCardNo: PAN,
        adhaarCardNumber: Aadhaar,
      };

      let setData = !businessCustomer
      ? {
        user: 
        {
          name: preData.name,
          email: preData.email,
          // password: "password",
          // phoneNo: "phoneNo",
          profileImg: preData.profileImg,
          businessCustomer: businessCustomer,
        }
      }
      : {
          user: 
          {
            name: preData.name,
            email: preData.email,
            // password: "password",
            // phoneNo: "phoneNo",
            profileImg: preData.profileImg,
            businessCustomer: businessCustomer,
            businessName: Bname,
            gstNumber: GST,
            panCardNo: PAN,
            adhaarCardNumber: Aadhaar,
          }
        };


      const _continue=async()=>{
        try{
            const NewSetData = JSON.stringify(setData);
            // console.log(setData);
            await AsyncStorage.setItem('jwt',NewSetData)
            .then(res=>{
                navigation.navigate("HomeScreen");
            })
        }
        catch(err){
            console.log("storage err:", err);
        }
        
      };

  return (
    <View style={styles.container}>
      <View style={styles.scontainer}>
        <ScrollView style={{ marginTop: 10 }}>
          <Text
            style={{ fontSize: 17, marginHorizontal: 10, marginTop: hp(3), color:"#000" }}
          >
            Are You a Bussiness Customer ?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.containertext}>
              <RadioButton
                style={styles.radioCircle}
                status={businessCustomer == true ? "checked" : "unchecked"}
                onPress={() => setValues({ ...values, businessCustomer: true })}
                color="#000"
              />
              <Text style={styles.radioText}>yes</Text>
            </View>
            <View style={styles.containertext}>
              <RadioButton
                style={styles.radioCircle}
                status={businessCustomer == false ? "checked" : "unchecked"}
                onPress={() =>
                  setValues({ ...values, businessCustomer: false })
                }
                color="#000"
              />
              <Text style={styles.radioText}>No</Text>
            </View>
          </View>
          {businessCustomer ? (
            <>
              <Text
                style={{ fontSize: 17, marginHorizontal: 10, marginTop: hp(3), color:"#000" }}
              >
                Name of the Business
              </Text>
              <TextInput
                placeholder="Name of the business"
                placeholderTextColor="grey"
                style={{
                  fontSize: 17,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  marginTop: hp(1),
                  color:"#000"
                }}
                value={Bname}
                onChangeText={(val) => setValues({ ...values, Bname: val })}
                // onBlur={errorHandler3}
              />
              <Text
                style={{ fontSize: 17, marginHorizontal: 10, marginTop: hp(3), color:"#000" }}
              >
                GST Number
              </Text>
              <TextInput
                placeholder="GST number"
                placeholderTextColor="grey"
                style={{
                  fontSize: 17,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  marginTop: hp(1),
                  color:"#000"
                }}
                value={GST}
                onChangeText={(val) => setValues({ ...values, GST: val })}
                // onBlur={errorHandler3}
              />
              <Text
                style={{ fontSize: 17, marginHorizontal: 10, marginTop: hp(3), color:"#000" }}
              >
                PAN Card Number
              </Text>
              <TextInput
                placeholder="PAN Card number"
                placeholderTextColor="grey"
                style={{
                  fontSize: 17,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  marginTop: hp(1),
                  color:"#000"
                }}
                value={PAN}
                onChangeText={(val) => setValues({ ...values, PAN: val })}
                // onBlur={errorHandler3}
              />
              <Text
                style={{ fontSize: 17, marginHorizontal: 10, marginTop: hp(3), color:"#000" }}
              >
                Aadhaar Card Number
              </Text>
              <TextInput
                placeholder="Aadhaar Card number"
                placeholderTextColor="grey"
                style={{
                  fontSize: 17,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  marginTop: hp(1),
                  color:"#000"
                }}
                value={Aadhaar}
                onChangeText={(val) => setValues({ ...values, Aadhaar: val })}
                // onBlur={errorHandler3}
              />
            </>
          ) : null}
        </ScrollView>
      </View>
      <View style={styles.absContinue}>
        <TouchableOpacity
        style={styles.button3}
        activeOpacity={0.7}
        onPress={_continue}
        >
            <Text style={styles.loremIpsum2}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseCustomer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdb915",
    flex: 1,
  },
  scontainer: {
    borderTopLeftRadius: 30,
    width: wp("130%"),
    backgroundColor: "#fff",
    marginTop: hp(8),
    height: hp("100%"),
    flex: 1,
  },
  button3: {
    alignItems: "center",
    backgroundColor: "#fdb915",
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom:10
  },
  loremIpsum2: {
    fontSize: 17,
    color: "#fff",
  },
  containertext: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  radioCircle: {},
  radioText: {
    marginVertical: 5,
    marginHorizontal: 10,
    color:"#000"
  },
  absContinue: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    right: 0,
    left: 0
  },
});
