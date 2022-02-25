import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
var hobbies = [
  { label: "English", value: 0 },

  { label: "हिंदी", value: 1 },
];
export default function LanguageScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <RadioForm
          style={styles.radio}
          radio_props={hobbies}
          onPress={(value) => {}}
          buttonSize={10}
          buttonOuterSize={15}
          buttonColor={"grey"}
          radioStyle={{ marginTop: 20 }}
          selectedButtonColor={"grey"}
          selectedLabelColor={"grey"}
          labelStyle={{ fontSize: 17, color: "grey" }}
          initial={-1}
        />
      </View>

      <Text style={styles.changeLanguage}>Change Language</Text>
      <View>
        <TouchableOpacity style={styles.button3}>
          <Text style={styles.loremIpsum2}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdb915",
    borderTopLeftRadius: 0,
  },
  rect: {
    width: 434,
    height: 656,
    backgroundColor: "#E6E6E6",
    borderTopLeftRadius: 41,
    marginTop: 190,
    padding: 20,
    justifyContent: "space-between",
  },
  radio: {
    height: 5000,
    width: 100,
    marginTop: 20,
    marginLeft: 40,
  },
  changeLanguage: {
    // fontFamily: "roboto-700",
    color: "rgba(254,254,254,1)",
    fontSize: 25,
    marginTop: -754,
    marginLeft: 23,
  },
  button3: {
    width: 239,
    height: 50,
    backgroundColor: "rgba(250,166,9,1)",
    borderRadius: 44,
    marginTop: hp(70),
    marginLeft: 58,
  },
  loremIpsum2: {
    // fontFamily: "roboto-regular",
    color: "rgba(251,247,247,1)",
    fontSize: 25,
    marginTop: 10,
    marginLeft: 65,
  },
});
