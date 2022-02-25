import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "./component/Modal";
import { modalData } from "./component/data";



export default function MyDeliveries({navigation}){

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{alignItems:"center",flex:1}}>
                    <Text style={{fontSize:24,color:"#fff",fontWeight:"bold"}}>My Deliveries</Text>
                </View>
            </View>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:10}}>
                <View style={{marginTop:20,overflow:"hidden"}}>
                    <View style={{marginLeft:10,marginBottom:10}}>
                        <Text style={{fontSize:16,color:"gray",fontWeight:"bold"}}>Pending Deliveries</Text>
                    </View>
                    {
                        modalData.map(item=>(
                            <Modal 
                                key={item.id}
                                imgSrc={item.id == 0 ? require("../../assets/image/home1.png") : require("../../assets/image/home2.png")}
                                type={item.type}
                                status={item.status}
                                price={item.price}
                                sender={item.sender}
                                receiver={item.receiver}
                                date={item.date}
                                time={item.time}
                                isPressed={()=>navigation.navigate("OrderDetails",{"key": item.id,"type": item.type,"status": item.status,"price": item.price,"date": item.date,"time": item.time})}
                            />
                        ))
                    }
                </View>
                <View style={{marginVertical:20}}>
                    <View style={{marginLeft:10,marginBottom:10}}>
                        <Text style={{fontSize:16,color:"gray",fontWeight:"bold"}}>Past Deliveries</Text>
                    </View>
                    {
                        modalData.map(item=>(
                            <Modal 
                                key={item.id}
                                imgSrc={item.id == 0 ? require("../../assets/image/home1.png") : require("../../assets/image/home2.png")}
                                type={item.type}
                                status={item.status}
                                price={item.price}
                                sender={item.sender}
                                receiver={item.receiver}
                                date={item.date}
                                time={item.time}
                                isPressed={()=>navigation.navigate("OrderDetails",{"key": item.id,"type": item.type,"status": item.status,"price": item.price,"date": item.date,"time": item.time})}
                            />
                        ))
                    }
                </View>    
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdb915",
        // overflow:"hidden"
    },
    header: {
        alignItems:"center",
        flexDirection:"row",
        marginLeft:10,
        marginTop:20,
        flex:0.1,
        marginBottom: 40
    },
    body: {
        backgroundColor: "#e8e4e3",
        borderTopLeftRadius: 20,
        overflow:"hidden",
        flex: 1,
    },
    profile: {
        position:"absolute",
        height: 100,
        width: 100,
        borderRadius: 100/2,
        backgroundColor: "#000",
        top: -20
    },
    nameView: {
        marginLeft: 20,
        marginTop:20
    },
    title: {
        fontSize: 22
    },
    subTitle: {
        fontSize: 16,
        marginTop: 10,
    },
    line: {
        borderWidth: 1,
        marginTop: 15,
        marginRight: 20,
        borderColor: "#fdb915"
    },
    
});