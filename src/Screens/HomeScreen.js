import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({ navigation }) {

  const [userData, setUserData] = useState({name:"",profileImg:"",email:"",phone:""});

  useEffect(() => {
    AsyncStorage.getItem('jwt').then(resp => {
        if(resp !== null ){
            const parsed = JSON.parse(resp).user;
            setUserData({name:parsed.name, profileImg:parsed.profileImg,email:parsed.email,phone:parsed.phoneNo})
        } else {
            return null;
        }
    }).catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.image4Stack}>
            <Image
              source={require("../assets/image/banner.png")}
              resizeMode="contain"
              style={styles.image4}
            ></Image>
            <TouchableOpacity style={styles.button2} 
            onPress={()=>navigation.navigate("ArrangeDelivery",userData)} activeOpacity={0.8}>
              <View style={styles.image5Row}>
                <Image
                  source={require("../assets/image/home1.png")}
                  resizeMode="contain"
                  style={styles.image5}
                />
                <View style={styles.arrangeDeliveryColumn}>
                  <Text style={styles.arrangeDelivery}>Arrange Delivery</Text>
                  <Text style={styles.loremIpsum}>
                    Arrange delivery of anything.{"\n"}Anytime &amp; Anywhere
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.button3} onPress={()=>navigation.navigate("FoodDelivery")}>
            <View style={styles.image6Row}>
              <Image
                source={require("../image/home2.png")}
                resizeMode="contain"
                style={styles.image6}
              ></Image>
              <View style={styles.getFoodDeliveredColumn}>
                <Text style={styles.getFoodDelivered}>Get Food Delivered</Text>
                <Text style={styles.loremIpsum3}>
                  Order our deliveryman for food{"\n"}from any restaurant you
                  want
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button4} onPress={()=>navigation.navigate("GroceryDelivery")}>
            <View style={styles.image7Row}>
              <Image
                source={require("../image/home3.png")}
                resizeMode="contain"
                style={styles.image7}
              ></Image>
              <View style={styles.loremIpsum5Column}>
                <Text style={styles.loremIpsum5}>Get Grocery Delivered</Text>
                <Text style={styles.orderOurDeli}>
                  Order our deliveryman for food{"\n"}from any restaurant you
                  want
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
          <View style={styles.rect4Stack}>
            <View style={styles.rect4}>
              <View style={styles.promotionalAdsStackRow}>
                <View style={styles.promotionalAdsStack}>
                  <Text style={styles.promotionalAds}>Promotional Ads</Text>
                  <ImageBackground
                    source={require("../assets/image/promo1.png")}
                    resizeMode="contain"
                    style={styles.image8}
                    imageStyle={styles.image8_imageStyle}
                  >
                    <Text style={styles.loremIpsum6}>
                      Order from us{"\n"}and get 20%{"\n"}Discounts
                    </Text>
                  </ImageBackground>
                </View>
                <ImageBackground
                  source={require("../assets/image/promo2.png")}
                  resizeMode="contain"
                  style={styles.image9}
                  imageStyle={styles.image9_imageStyle}
                >
                  <Text style={styles.loremIpsum7}>
                    Order from us {"\n"}and We&#39;ll pay{"\n"}delivery charge
                  </Text>
                </ImageBackground>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.rect}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("myDeliveries")}>
            <View style={styles.imageFiller}></View>
            <Image
              source={require("../assets/image/ic_feeds.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
          </TouchableOpacity>
          <View style={styles.rect2}>
            <View style={styles.image2Filler}></View>
            <Image
              source={require("../assets/image/ic_home_active.png")}
              resizeMode="contain"
              style={styles.image2}
            ></Image>
          </View>
        </View>
        <View style={styles.buttonRowFiller}></View>
        <View style={styles.rect3}>
          <View style={styles.image3Filler}></View>
          <TouchableOpacity onPress={() => navigation.navigate("Account",userData)}>
            <Image
              source={require("../assets/image/ic_profile.png")}
              resizeMode="contain"
              style={styles.image3}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254,237,191,1)",
  },
  scrollArea: {
    width: wp("100%"),
    backgroundColor: "rgba(254,237,191,1)",
    marginTop: 11,
  },
  scrollArea_contentContainerStyle: {
    height: hp("100%"),
    width: 600,
  },
  image4: {
    top: 25,
    width: 400,
    height: 289,
    position: "absolute",
    left: 0,
  },
  button2: {
    top: 290,
    left: 15,
    width: "90%",
    // height: 100,
    position: "absolute",
    backgroundColor: "rgba(254,254,254,1)",
    borderRadius: 10,
  },
  image5: {
    width: 65,
    height: 100,
  },
  arrangeDelivery: {
    // fontFamily: "roboto-700",
    color: "rgba(252,194,23,1)",
    fontSize: 16,
  },
  loremIpsum: {
    // fontFamily: "roboto-700",
    color: "rgba(188,186,186,1)",
    // height: 40,
    // width: 195,
    // marginTop: 15,
  },
  arrangeDeliveryColumn: {
    // width: 195,
    marginLeft: 19,
    marginTop: 12,
    marginBottom: 9,
  },
  image5Row: {
    // height: 100,
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 61,
  },
  image4Stack: {
    width: 375,
    height: 378,
  },
  button3: {
    width: 345,
    height: 100,
    backgroundColor: "rgba(254,254,254,1)",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 15,
  },
  image6: {
    width: 65,
    height: 100,
  },
  getFoodDelivered: {
    // fontFamily: "roboto-700",
    color: "rgba(252,194,23,1)",
    width: 200,
    height: 20,
    fontSize: 16,
  },
  loremIpsum3: {
    // fontFamily: "roboto-700",
    color: "rgba(188,186,186,1)",
    width: 195,
    height: 40,
    marginTop: 15,
  },
  getFoodDeliveredColumn: {
    width: 200,
    marginLeft: 19,
    marginTop: 12,
    marginBottom: 9,
  },
  image6Row: {
    height: 100,
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 56,
  },
  button4: {
    width: 345,
    height: 100,
    backgroundColor: "rgba(250,250,250,1)",
    borderRadius: 11,
    marginTop: 10,
    marginLeft: 15,
  },
  image7: {
    width: 65,
    height: 100,
  },
  loremIpsum5: {
    // fontFamily: "roboto-700",
    color: "rgba(252,194,23,1)",
    width: 200,
    height: 20,
    fontSize: 16,
  },
  orderOurDeli: {
    // fontFamily: "roboto-700",
    color: "rgba(188,186,186,1)",
    width: 195,
    height: 37,
    marginTop: 25,
  },
  loremIpsum5Column: {
    width: 200,
    marginLeft: 19,
    marginTop: 12,
    marginBottom: 9,
  },
  image7Row: {
    height: 100,
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 56,
  },
  rect4: {
    top: 0,
    left: 0,
    width: "100%",
    height: 235,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
  },
  promotionalAds: {
    top: 4,
    left: 5,
    position: "absolute",
    // fontFamily: "roboto-regular",
    color: "rgba(188,186,186,1)",
  },
  image8: {
    top: 0,
    left: 0,
    width: 170,
    height: 200,
    position: "absolute",
    borderRadius: 35,
    overflow: "hidden",
  },
  image8_imageStyle: {},
  loremIpsum6: {
    // fontFamily: "roboto-regular",
    color: "rgba(188,186,186,1)",
    fontSize: 14,
    marginTop: 57,
    marginLeft: 10,
  },
  promotionalAdsStack: {
    width: 170,
    height: 200,
  },
  image9: {
    width: 170,
    height: 200,
    marginLeft: 15,
  },
  image9_imageStyle: {},
  loremIpsum7: {
    // fontFamily: "roboto-700",
    color: "rgba(188,186,186,1)",
    width: 119,
    height: 60,
    marginTop: 57,
    marginLeft: 10,
  },
  promotionalAdsStackRow: {
    width: 300,
    height: 200,
    flexDirection: "row",
    flex: 1,
    marginRight: 9,
    marginLeft: 11,
  },
  rect: {
    left: 1,
    height: 95,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    bottom: 0,
    right: 0,
    flexDirection: "row",
  },
  button: {
    width: 55,
    height: 55,
    backgroundColor: "rgba(253,253,253,1)",
  },
  imageFiller: {
    flex: 1,
  },
  image: {
    width: 27,
    height: 44,
    marginBottom: 1,
    marginLeft: 14,
  },
  rect2: {
    width: 60,
    height: 46,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 79,
  },
  image2Filler: {
    flex: 1,
  },
  image2: {
    width: 30,
    height: 38,
    marginBottom: 5,
    marginLeft: 14,
  },
  buttonRow: {
    height: 55,
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 24,
    marginBottom: 40,
  },
  buttonRowFiller: {
    flex: 1,
    flexDirection: "row",
  },
  rect3: {
    width: 47,
    height: 46,
    backgroundColor: "rgba(253,252,252,1)",
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 32,
    marginBottom: 40,
  },
  image3Filler: {
    flex: 1,
    flexDirection: "row",
  },
  image3: {
    width: 29,
    height: 41,
    alignSelf: "flex-end",
    marginRight: 9,
    marginBottom: 2,
  },
  rect4Stack: {
    height: 235,
    marginTop: 30,
    marginLeft: -1,
  },
});

export default Home;
