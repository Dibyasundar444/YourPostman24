import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RazorpayCheckout from 'react-native-razorpay';
import axios from "axios";
import { API } from "../../../config";



export default function PaymentMethods({navigation,route}){

    const preData = route.params;

    console.log(preData.Order);

    // let AMOUNT = preData.amount.toString();
    // let newAMOUNT = AMOUNT.substring(0, AMOUNT.length - 2);

    const[activeIndex, setActiveIndex] = useState(null);

    const segmentClicked=(index)=>{
        setActiveIndex(index);
    };

    const _makePayment=()=>{
        if(activeIndex === 0){
            alert("COP");
        }
        else if(activeIndex === 1){
            alert("COD");
        }
        else if(activeIndex === 2 || activeIndex === 3){
            var options = {
                description: 'Payment of courier',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_GiJIc1jG5WL47E',
                amount: preData.price,
                name: "YourPostman 24",
                order_id: preData.Order.id,
                prefill: {
                  email: preData.user.email,
                  contact: preData.user.phone,
                  name: preData.user.name
                },
                theme: {color: '#969557'}
            }
            RazorpayCheckout.open(options)
            .then( async data => {
                console.log(`Success: ${data.razorpay_payment_id,data.razorpay_signature}`);
                axios.post(`${API}/api/verify-payment`,{
                    receipt: preData.Order.receipt,
                    payment_id: data.razorpay_payment_id,
                    order_id: preData.Order.id,
                    signature: data.razorpay_signature,
                    order: preData.Order,
                }).then(res=>{
                    console.log(res.data);
                    // navigation.navigate("Booked Successfully",preData.user.name);
                }).catch(e=>console.log(e));
                })
            .catch((error) => {
                console.log(`Error: ${error.code} | ${error.description}`);
                alert("You have canceled the payment");
            });
        }
        else return null
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
                        <Text style={{fontSize:22,color:"#000"}}>Amount to pay ₹{preData.price}</Text>
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
            <TouchableOpacity style={styles.proceed} activeOpacity={0.6} onPress={_makePayment}>
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