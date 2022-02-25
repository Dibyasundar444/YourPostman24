import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';


const txt = "Company Privacy Policy";

export default function T_C_Screen({navigation}){

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" color={"#fff"} size={38}/>
                </TouchableOpacity>
                <Text style={styles.headerTxt}>Terms & Conditions</Text>
            </View>
            <View style={styles.body}>
                <View style={{marginTop:30,marginLeft:20}}>
                    <Text style={{fontSize:22,color:"#000"}}>{txt}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdb915"
    },
    header: {
        marginLeft:10,
        marginTop:20,
    },
    headerTxt: {
        fontSize:24,
        color:"#fff",
        fontWeight:"bold",
        marginTop:30,
        marginBottom:20,
        marginLeft:10
    },
    body: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 35,
        flex: 1
    }
});