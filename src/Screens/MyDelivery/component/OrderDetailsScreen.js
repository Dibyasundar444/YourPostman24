import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    Image, 
    ScrollView 
} from "react-native";
import MapView from "react-native-maps";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const info = "Birthday Gift containig Flower Vas. Carry carefully as it is secured";

export default function OrderDetailsScreen({navigation}){

    const route = useRoute();
    const { type, date, time, status, price, key } = route.params;

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons name="chevron-back" color="#fdb915" size={38}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTxt}>Order ID 12345_{key}</Text>
                </View>
                <View style={styles.view1}>
                    <View style={{marginLeft:10}}>
                        <Image source={key==0 ? require("../../../assets/image/home1.png"):require("../../../assets/image/home2.png")} style={{width:40,height:40}} />
                    </View>
                    <View style={{marginLeft:-40}}>
                        <Text style={{fontSize:14,fontWeight:"bold",color:"#000"}}>{type}</Text>
                        <Text style={{color:"gray"}}>{date},</Text>
                        <Text style={{color:"gray"}}>{time}</Text>
                    </View>
                    <View style={styles.view1_3}>
                        <Text style={{fontSize:12,color:"#fdb915",fontWeight:"bold"}}>{status}</Text>
                        <Text style={{right:-40,fontSize:12,color:"gray"}}>₹ {price}</Text>
                    </View>
                </View>
            </View>
            <MapView style={styles.map} initialRegion={{latitude:22.5726,longitude: 88.3639,latitudeDelta: 0.0922,longitudeDelta: 0.0421}} />
            <View style={styles.floatView}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:250}}>
                    <View style={[styles.floatSubView1,{marginTop:10}]}>
                        <View>
                            <Image source={require("../../../assets/image/profile1.jpg")} style={styles.floatSubView1_1}/>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontSize:18,color:"#000"}}>James Haydon</Text>
                            <Text style={{color:"gray",fontWeight:"bold"}}>Delivery Man</Text>
                        </View>
                        <View style={styles.call}>
                            <MaterialIcons name="call" size={24} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.floatSubView2}>
                        <View style={styles.arrow_up}>
                            <Entypo name="chevron-up" size={24} color="#fff" />
                        </View>
                        <View style={{flexDirection:"row",marginLeft:15,marginTop:10}}>
                            <View style={{marginTop:10}}>
                                <Ionicons name="md-location-sharp" size={24} color="#fdb915" />
                            </View>
                            <View style={{marginLeft:30}}>                               
                                <Text style={{color:"gray",fontWeight:"bold"}}>Walmart</Text>                                                            
                                <Text style={{fontSize:18,color:"#000"}}>Emili Williamson</Text>                                                          
                                <Text style={{fontSize:14,color:"#000"}}>128 Mott St, New York, Ny</Text>                                                           
                                <Text style={{fontSize:14,color:"#000"}}>10013, United States</Text>                              
                            </View>
                        </View>
                        <View style={{flexDirection:"row",marginTop:10,marginLeft:15,marginBottom:20}}>
                            <View style={{marginTop:10}}>
                                <FontAwesome name="location-arrow" size={24} color="#fdb915" />
                            </View>
                            <View style={{marginLeft:30}}>                               
                                <Text style={{color:"gray",fontWeight:"bold"}}>City Garden</Text>                                                             
                                <Text style={{fontSize:18,color:"#000"}}>Emili Williamson</Text>                                                                
                                <Text style={{fontSize:14,color:"#000"}}>128 Mott St, New York, Ny</Text>                                 
                                <Text style={{fontSize:14,color:"#000"}}>10013, United States</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.floatSubView2}>
                        <View style={{marginHorizontal:20,marginVertical:10}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                <View>
                                    <Text style={{color:"gray",fontWeight:"bold",fontSize:13}}>Courier Type</Text>
                                    <Text style={{color:"#000"}}>Box Courier</Text>
                                </View>        
                                <View>
                                    <Text style={{color:"gray",fontWeight:"bold",fontSize:13}}>Product Secure</Text>
                                    <Text style={{color:"#000"}}>Yes</Text>
                                </View>                     
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                <View>
                                    <Text style={{color:"gray",fontWeight:"bold",fontSize:13}}>Height Width Length</Text>
                                    <Text style={{color:"#000"}}>60 × 75 × 124 (cm)</Text>
                                </View>        
                                <View style={{marginRight:width/6}}>
                                    <Text style={{color:"gray",fontWeight:"bold",fontSize:13}}>Weight</Text>
                                    <Text style={{color:"#000"}}>10 kg</Text>
                                </View>                     
                            </View>
                            <View style={{marginVertical:10}}>
                                <Text style={{fontWeight:"bold",fontSize:13,color:"gray"}}>Courier Info</Text>
                                <Text style={{color:"#000"}}>{info}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.floatSubView1}>
                        <View style={{marginLeft:20}}>
                            <Text style={{color:"#000"}}>Economy Delivery</Text>
                            <Text style={{fontSize:13,fontWeight:"bold",color:"gray"}}>Payment via Cash on Pickup</Text>
                        </View>
                        <Text style={{marginRight:20,fontSize:16,fontWeight:"bold",color:"#000"}}>₹ {price}</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    map: {
        height: height,
        width: width,
    },
    header: {
        marginLeft:10,
        marginTop:10,
        height: 150
    },
    headerTxt: {
        fontSize:20,
        marginBottom:20,
        marginLeft:40,
        color:"#000"
    },
    view1: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:5,
        marginHorizontal:10
    },
    view1_3: {
        marginTop:-10,
    },
    floatView: {
        position: "absolute",
        top: 150,  
        left:0,
        right:0,
        bottom:0
        // height: height

    },
    floatSubView1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // width: width-20,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        borderRadius: 70/2,
        height: 70,
        marginBottom: 10
    },
    floatSubView1_1: {
        width:50,
        height:50,
        borderRadius:50/2,
        marginLeft:15
    },
    floatSubView2: {
        backgroundColor:"#fff",
        borderRadius:20,
        marginBottom:10,
        marginHorizontal:10
    },
    arrow_up: {
        position:"absolute",
        height:50,
        width:50,
        borderRadius:50/2,
        backgroundColor:"#fdb915",
        alignItems:"center",
        justifyContent:"center",
        right:0,
        marginTop:10,
        marginRight:15
    },
    call: {
        width:50,
        height:50,
        borderRadius:50/2,
        marginRight:15,
        backgroundColor:"#fdb915",
        justifyContent:"center",
        alignItems:"center"
    }
});