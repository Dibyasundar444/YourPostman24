import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Modal({imgSrc,type,status,price,sender,receiver,date,time,isPressed}){
    return(
        <TouchableOpacity style={styles.modal} activeOpacity={0.6} onPress={isPressed}>
            <View style={styles.view1}>
                <View>
                    <Image source={imgSrc} style={{width:40,height:40}} />
                </View>
                <View style={{marginLeft:10}}>
                    <Text style={{fontSize:14,fontWeight:"bold"}}>{type}</Text>
                    <Text style={{color:"gray"}}>{date}, {time}</Text>
                </View>
                <View style={styles.view1_3}>
                    <Text style={{fontSize:12,color:"#fdb915",}}>{status}</Text>
                    <Text style={{right:-40,fontSize:12,color:"gray"}}>₹ {price}</Text>
                </View>
            </View>
            <View style={styles.view2}>
                <View style={styles.view2_1}>
                    <View style={{marginLeft:10}}>
                        <Text style={{color:"#000"}}>{sender}</Text>
                    </View>
                    <View style={styles.view2_1_2}>                                
                        <Ionicons name="md-location-sharp" color="#fdb915" size={18} />
                        <Text style={styles.dotLine}>.......</Text>
                        <FontAwesome name="location-arrow" color="#fdb915" size={18} />
                    </View>
                    <View style={{marginRight:10}}>
                        <Text style={{color:"#000"}}>{receiver}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    modal: {
        elevation: 5,
        backgroundColor: "#fff",
        opacity: 0.9,
        marginBottom: 15,
        borderRadius: 10,
        height: 120,
        marginHorizontal:10
    },
    view1: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:5,
        marginHorizontal:10
    },
    view1_3: {
        marginTop:5,
        flex:1,
        marginHorizontal:-15
    },
    view2: {
        justifyContent:"flex-end",
        flex:1
    },
    view2_1: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        height:50,
        backgroundColor:"#f0eceb",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    view2_1_2: {
        flexDirection:"row",
        alignItems:"center",
        marginRight: -30
    },
    dotLine: {
        marginHorizontal:10,
        fontSize:24,
        marginBottom:15,
        color:"gray"
    }
});