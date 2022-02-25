import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Clipboard from '@react-native-clipboard/clipboard';


const price = "1050.00";
const text1 = "Your Pickup has been arranged";
const text2 = "Thanks for choosing us for";
const text3 = "delivering your valuable stuffs."
const { width } = Dimensions.get("window")


export default function PickupAssigned({navigation,route}){

    const navigateData = route.params;
    const [isOpen, setIsOpen] = useState(false);
    const link = "https://link/will/be/here";


    const proceed=()=>{
        setIsOpen(true);
    };

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: link,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };
    

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" color={"#fff"} size={38}/>
                </TouchableOpacity>
                <Text style={styles.headerTxt}>Pickup Assigned</Text>
            </View>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems:"center",height:200,marginTop:20}}>
                        <Image source={require("../../../../image/appIcon.png")} 
                            style={{resizeMode:"contain",width:"100%",height:"100%"}}
                        />
                    </View>
                    <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold",marginTop:30,color:"#000"}}>{text1}</Text>
                    <Text style={{textAlign:"center",fontSize:13,fontWeight:"bold",marginTop:20,color:"#000"}}>{text2}</Text>
                    <Text style={{textAlign:"center",fontSize:13,fontWeight:"bold",color:"#000"}}>{text3}</Text>
                    <View style={styles.card}>
                        <View style={{flexDirection:"row",marginTop:10,width:width/1.5}}>
                            <View style={{marginTop:10}}>
                                <Ionicons name="md-location-sharp" size={24} color="#fdb915" />
                            </View>
                            <View style={{marginLeft:30}}>                               
                                <Text style={{color:"gray",fontWeight:"bold",color:"#000"}}>Walmart</Text>                                                            
                                <Text style={{fontSize:18,color:"#000"}}>Emili Williamson</Text>                                                          
                                <Text style={{fontSize:14,color:"#000"}}>{navigateData.slocation}</Text>                                                           
                                <Text style={{fontSize:14,color:"#000"}}>10013, United States</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",marginVertical:10,width:width/1.5}}>
                            <View style={{marginTop:10}}>
                                <FontAwesome name="location-arrow" size={24} color="#fdb915" />
                            </View>
                            <View style={{marginLeft:30}}>                               
                                <Text style={{color:"gray",fontWeight:"bold",color:"#000"}}>City Garden</Text>                                                             
                                <Text style={{fontSize:18,color:"#000"}}>{navigateData.rname}</Text>                                                                
                                <Text style={{fontSize:14,color:"#000"}}>{navigateData.rlocation}</Text>                                 
                                <Text style={{fontSize:14,color:"#000"}}>10013, United States</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                
            </View>
            <TouchableOpacity style={styles.proceed} activeOpacity={0.6} onPress={proceed}>
                <Text style={styles.txtProceed}>Track my courier</Text>
            </TouchableOpacity>
            {isOpen ? 
                <View style={{position:"absolute",left:0,right:0,top:0,bottom:0,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)"}}>
                    <View style={{backgroundColor:"#fff",borderRadius:10,height:200,width:"90%"}}>
                        <Entypo name="circle-with-cross" size={32} color="red" style={{alignSelf:"flex-end",marginRight:0}} 
                            onPress={()=>setIsOpen(false)}
                        />
                        <View style={{alignItems:"center",marginTop:10}}>
                            <Text style={{fontWeight:"700",color:"#e0ab24"}}>Track my courier</Text>
                            <View style={{width:"90%",backgroundColor:"#dce4f7",height:40,marginTop:10,borderRadius:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                <Text style={{marginLeft:10,color:"gray"}}>{link}</Text> 
                                <TouchableOpacity onPress={()=>Clipboard.setString(link)}>
                                    <Ionicons name="copy-outline" color="#e0ab24" size={24} style={{marginRight:10}} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                style={{flexDirection:"row",alignItems:"center",borderRadius:5,backgroundColor:"#e0ab24",paddingVertical:5,paddingHorizontal:15,marginTop:20}}
                                onPress={onShare}
                            >
                                <AntDesign name="sharealt" size={20} color="blue" />
                                <Text style={{marginLeft:5,color:"#000"}}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            :
            null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0ab24"
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
        flex: 1,
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
    card: {
        backgroundColor:"#e1f7f3",
        borderRadius:20,
        marginTop:20,
        marginHorizontal:20,
        elevation:16,
        alignItems:"center",
        marginBottom:100
    },
});