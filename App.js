import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

// custom components
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

// image imports
const PlaceHolderImage = require("./assets/images/background-image.png");

export default function App() {
  const [imageuri, setImageUri] = useState(null);
  const [showAppOptions, setAppOptions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  // device permissions
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // useRef to save the image
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      // console.log(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      setAppOptions(true);
    } else {
      alert("No image was selected");
      setImageUri(null);
      setAppOptions(false);
    }
  };

  //save image
  const onSaveImageAsync = async () => {
    try{ 
        const localUri = await captureRef(imageRef, {height: 440, quality: 1})
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved to photos");
        }
    } catch (err) {
     console.log(err.message)
    }
  };

  //add sticker
  const onStickerAdd = () => {
    setIsVisible(true);
  };

  const onModalClose = () => {
    setIsVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceHolderImage} selectedImageSource={imageuri} />
          {pickedEmoji !== null ? <EmojiSticker imageSize={50} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.dflex}>
          <IconButton
            icon="refresh"
            label="Reset"
            onPress={() => {
              setAppOptions(false);
              setImageUri(null);
            }}
          />
          <CircleButton onPress={onStickerAdd} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme={"primary"} onPress={pickImageAsync} />
          <Button label="Use this photo" />
        </View>
      )}
      <EmojiPicker isVisible={isVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  dflex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 60,
  },
});
