import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import Clipboard from '@react-native-clipboard/clipboard';
import color from '../constants/color';
import typography from '../constants/typography';
import { Logo } from '../image/index';
import { CameraShutterSvgrepoCom, ImageSquareSvgrepoCom, PdfFileSvgrepoCom } from '../components/icons';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');


  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const recognizedText = await TextRecognition.recognize(path);
      navigation.navigate('OcrDetail', { resultText: recognizedText })
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText('');
    }

    setIsLoading(false);
    setProgress(0);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({ uri: image.path });
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImgSrc({ uri: image.path });
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: color.bgBlue }]}>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <View style={{ flex: 6 }} />
        <View style={{ flex: 4 }}>
          <Image source={Logo}
            style={{
              height: 100,
              width: 100,

            }} />
        </View>
      </View>

      <View style={styles.options}>
        <Text style={[styles.welcome, { color: color.white }, typography.apply().DemiHello]}>WELCOME</Text>
        <Text style={[styles.instructions, { color: color.white }, typography.apply().Regular]}>Import an image to be coverted</Text>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.button}>
          <View style={styles.icon}>
            <CameraShutterSvgrepoCom width={24} height={24} color={color.black} opacity={0.8} />
          </View>
          <Text style={[{ color: color.black }, typography.apply().Demi]}>TAKE A PICTURE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.button}>
          <View style={styles.icon}>
            <ImageSquareSvgrepoCom width={24} height={24} color={color.black} opacity={0.8} />
          </View>
          <Text style={[{ color: color.black }, typography.apply().Demi]}>GALLERY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.button}>
          <View style={styles.icon}>
            <PdfFileSvgrepoCom width={24} height={24} color={color.black} opacity={0.8} />
          </View>
          <Text style={[{ color: color.black }, typography.apply().Demi]}>IMPORT PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  options: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 12
  },
  welcome: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 1,
    marginBottom: 24
  },
  button: {
    backgroundColor: color.yellow,
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24
  },
  icon: {
    marginLeft: 18,
    marginRight: 22
  }
});

export default Home;