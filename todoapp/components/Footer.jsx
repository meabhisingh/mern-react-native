import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native"

const Footer = () => {

    const navigation = useNavigation()
    return (
        <View
            style={{
                padding: 30,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
                <Icon name="home" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Icon name="user" size={30} color="#900" />
            </TouchableOpacity>
        </View>
    )
}

export default Footer