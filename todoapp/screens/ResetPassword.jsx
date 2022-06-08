import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/action';

const ResetPassword = ({ navigation }) => {
    const { message, error } = useSelector(state => state.message)

    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState();
    const dispatch = useDispatch()

    const changePasswordHandler = async () => {
        await dispatch(resetPassword(otp, newPassword));
        navigation.navigate("login");
    }

    useEffect(() => {
        if (message) {
            alert(message);
            dispatch({ type: "clearMessage" })
        }
        if (error) {
            alert(error);
            dispatch({ type: "clearError" })
        }
    }, [alert, message, dispatch, error])



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontSize: 20, margin: 20 }}>Change Password</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                />

                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <Button
                style={Styles.btn}
                onPress={changePasswordHandler}
                color="#fff"
            >
                Reset Password
            </Button>



        </View>
    )
}

export default ResetPassword


const Styles = StyleSheet.create({

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
})