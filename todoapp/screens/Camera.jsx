import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const CameraComponent = ({ navigation, route }) => {
  const cameraRef = useRef(null);

  const [facing, setFacing] = useState("front");
  const [permission, requestPermission] = useCameraPermissions();

  const openImagePickerAsync = async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (data.canceled) return;

    const image = data.assets[0].uri;

    if (route.params.updateProfile)
      return navigation.navigate("profile", { image });
    else return navigation.navigate("register", { image });
  };

  const clickPicture = async () => {
    const camera = cameraRef.current;

    if (!camera) return;

    const data = await camera.takePictureAsync();

    if (!data.uri) return alert("Error taking picture");
    if (route.params.updateProfile)
      return navigation.navigate("profile", { image: data.uri });
    else return navigation.navigate("register", { image: data.uri });
  };

  if (!permission) {
    return <View />;
  }
  if (permission.granted === false) {
    return (
      <View>
        <Text>No access to camera</Text>

        <Button onPress={requestPermission}>
          <Text>Allow Camera Access</Text>
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        pictureSize="720x720"
      ></CameraView>

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 10,
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Icon
          name="image"
          size={40}
          color="#fff"
          onPress={openImagePickerAsync}
        />
        <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />

        <Icon
          name="flip-camera-android"
          size={40}
          color="#fff"
          onPress={toggleCameraFacing}
        />
      </View>
    </View>
  );
};

export default CameraComponent;
