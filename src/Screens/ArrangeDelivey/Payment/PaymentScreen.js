import { View, Text } from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

export default function PaymentScreen() {

    const _razorpay=()=>{
        var options = {
            description: 'Payment of seat booking',
            image: 'anything',
            currency: 'INR',
            key: 'rzp_test_nxRhnTn0h9BeAk',
            amount: 12350,
            name: "Buslala",
            order_id: "Data.id",//Replace this with an order_id created using Orders API.
            prefill: {
              email: "email",
              contact: "1234567890",
              name: "name"
            },
            theme: {color: '#969557'}
          }
          RazorpayCheckout.open(options).then( async data => {
            alert(`Success: ${data.razorpay_payment_id}`);
            // axios.post("https://buslala-backend-api.herokuapp.com/api/user/verify-payment",{
            //     payment_id: data.razorpay_payment_id,
            //     order_id: Data.id,
            //     signature: data.razorpay_signature,
            //     order: Data,
            // }).then(res=>{
            //     if(res.status==200){
            //         console.log(res.data);
            //         navigation.navigate("Booked Successfully",name);
            //     }
            //     else console.log(res.status);
            // }).catch(e=>console.log(e));
          }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
            alert("You have canceled the payment");
          });
    };
  return (
    <View>
      <Text>PaymentScreen</Text>
    </View>
  )
}