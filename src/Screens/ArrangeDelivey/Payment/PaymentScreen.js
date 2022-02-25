import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const price = "1050.00";
export default function PaymentScreen({navigation,route}){

    const navigateData = route.params;
    // console.log(navigateData);

    const[activeIndex, setActiveIndex] = useState();

    const segmentClicked=(index)=>{
        setActiveIndex(index);
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" color={"#fff"} size={38}/>
                </TouchableOpacity>
                <Text style={styles.headerTxt}>Payment modes</Text>
            </View>
            <View style={styles.body}>
               <View style={{marginLeft:20}}>
                    <View style={{marginVertical:20}}>
                        <Text style={{fontSize:22,color:"#000"}}>Amount to pay ₹{price}</Text>
                    </View>
                    <TouchableOpacity style={styles.bodeView1_1} active={activeIndex==0} onPress={()=>segmentClicked(0)} activeOpacity={0.6}>
                        <FontAwesome name={activeIndex==0?"dot-circle-o":"circle-thin"} size={20} color="#fdb915" />
                        <View style={styles.title}>
                            <Text style={{fontSize:16,color:"#000"}}>Cash on Pickup</Text>
                            <Text style={{color:"gray"}}>Pay while pick a delivery</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bodeView1_1} active={activeIndex==1} onPress={()=>segmentClicked(1)} activeOpacity={0.6}>
                        <FontAwesome name={activeIndex==1?"dot-circle-o":"circle-thin"} size={20} color="#fdb915" />
                        <View style={styles.title}>
                            <Text style={{fontSize:16,color:"#000"}}>Cash on Delivery</Text>
                            <Text style={{color:"gray"}}>Pay while drop a delivery</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bodeView1_1} active={activeIndex==2} onPress={()=>segmentClicked(2)} activeOpacity={0.6}>
                        <FontAwesome name={activeIndex==2?"dot-circle-o":"circle-thin"} size={20} color="#fdb915" />
                        <View style={styles.title}>
                            <Text style={{fontSize:16,color:"#000"}}>Debit/Credit card</Text>
                            <Text style={{color:"gray"}}>Pay from your card</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bodeView1_1} active={activeIndex==3} onPress={()=>segmentClicked(3)} activeOpacity={0.6}>
                        <FontAwesome name={activeIndex==3?"dot-circle-o":"circle-thin"} size={20} color="#fdb915" />
                        <View style={styles.title}>
                            <Text style={{fontSize:16,color:"#000"}}>UPI payment</Text>
                            <Text style={{color:"gray"}}>Pay using upi id</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.proceed} activeOpacity={0.6} onPress={()=>navigation.navigate("Pickup Assigned",navigateData)}>
                <Text style={styles.txtProceed}>Proceed to Payment</Text>
            </TouchableOpacity>
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
        flexDirection:"row"
    },
    headerTxt: {
        fontSize:24,
        color:"#fff",
        marginBottom:20,
        marginLeft:30
    },
    body: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 35,
        flex: 1
    },
    proceed:{
        borderTopRightRadius:30,
        backgroundColor:"#fdb915",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:0,
        width:"100%"
    },
    txtProceed: {
        color:"#fff",
        fontWeight:"bold",
        marginVertical:15
    },
    title: {
        marginLeft:30,
        marginTop:20
    },
    bodeView1_1: {
        flexDirection:"row",
        alignItems:"center"
    }
});