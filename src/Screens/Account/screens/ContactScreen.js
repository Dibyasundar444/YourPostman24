import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


const txt = "Let us know your feedback,  queries or issue regarding app or features.";

export default function ContactScreen({navigation}){

    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

    var postData = {
        "name": value1,
        "phone": value2,
        "message" : value3
    };
      
    let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzk5Njc5YTdmZmI4MDAxNjUyNDEzZSIsImlhdCI6MTY0MDYxMjQ0MSwiZXhwIjoxNjQxMjE3MjQxfQ.pMVin7HxUhVkwCJcWuVEH5smC1xNDiXtjJntUvMl8KI",
        }
    };

    const onSubmit =()=>{
        if (value1=="" | value2=="" | value3=="") {
            console.log("plz check input fields")
        } else {
            axios.post("https://digicourierapp.herokuapp.com/api/customerfeed",postData,axiosConfig)
            .then((res)=>{
                console.log(postData);
                if(res.status === 200){
                    console.log(res.data);
                    setIsUpdated(true);
                } else console.log({"server error":res});
            })
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" color={"#fff"} size={38}/>
                </TouchableOpacity>
                <Text style={styles.headerTxt}>Contact us</Text>
            </View>
            <View style={styles.body}>
                <ScrollView style={{marginBottom:50}}>
                    <View style={{marginTop:20,marginLeft:20}}>
                        <Text style={{fontSize:22,marginRight:20,color:"#000"}}>{txt}</Text>
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>Full Name</Text>
                        <TextInput 
                            style={styles.subTitle}
                            placeholder="Enter Full name"
                            placeholderTextColor="gray"
                            value={value1}
                            onChangeText={(text)=>setValue1(text)}
                        />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>Phone number</Text>
                        <TextInput 
                            style={styles.subTitle}
                            placeholder="Enter phone number"
                            placeholderTextColor="gray"
                            value={value2}
                            onChangeText={(text)=>setValue2(text)}
                        />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>Your Message</Text>
                        <TextInput 
                            style={styles.subTitle}
                            placeholder="Enter your message"
                            placeholderTextColor="gray"
                            value={value3}
                            onChangeText={(text)=> setValue3(text)}
                        />
                        <View style={styles.line}/>
                    </View>
                    {isUpdated === true ? <Text style={{color:"blue",fontSize:12,textAlign:"center",marginBottom:20}}>Thank you for your feedback</Text> : null}
                </ScrollView>
                <View style={{justifyContent:"flex-end",flex:1}}>
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.6}
                        onPress={onSubmit}
                    >
                        <Text style={{color:"#fff",fontWeight:"bold"}}>Send message</Text>
                    </TouchableOpacity>
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
    },
    nameView: {
        marginLeft: 20,
        // marginTop:20
    },
    title: {
        fontSize: 22
    },
    subTitle: {
        fontSize: 16,
        marginTop: 10,
        color:"#000",
        paddingBottom:0
    },
    line: {
        borderWidth: 1,
        marginTop: 15,
        marginRight: 20,
        borderColor: "#fdb915"
    },
    button: {
        backgroundColor: "#fdb915",
        height: 60,
        borderTopLeftRadius: 35,
        alignItems: "center",
        justifyContent: "center"
    }
});