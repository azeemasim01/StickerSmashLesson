import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

// custom components
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';

// image imports
const PlaceHolderImage = require('./assets/images/background-image.png');

export default function App() {
  const [imageuri, setImageUri] = useState(null);
  const [showAppOptions, setAppOptions] = useState(false);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false, quality: 1 });
    if (!result.canceled) {
      // console.log(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      setAppOptions(true);
    } else {
      alert('No image was selected');
      setImageUri(null);
      setAppOptions(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceHolderImage} selectedImageSource={imageuri} />
      </View>
      {showAppOptions ? (
        <View style={styles.dflex}>
          <IconButton icon='refresh' label='Reset' onPress={()=>{setAppOptions(false); setImageUri(null)}} />
          <CircleButton />
          <IconButton icon='save-alt' label='Save' />
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label='Choose a photo' theme={'primary'} onPress={pickImageAsync} />
          <Button label='Use this photo' />
        </View>
      )}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  dflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 60,
  },
});
