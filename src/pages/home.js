import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import color from '../constants/color';
import typography from '../constants/typography';
import { Logo } from '../image/index';
import { CameraShutterSvgrepoCom, ImageSquareSvgrepoCom, PdfFileSvgrepoComBlack } from '../components/icons';
import DocumentPicker from 'react-native-document-picker'
import { errorMessage, successMessage } from '../utils/showToast';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../redux/actions/index';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
  freeStyleCropEnabled: true
};

function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);
    try {
      const recognizedTextArray = await TextRecognition.recognize(path);
      navigation.navigate('OcrDetail', { resultText: recognizedTextArray })
    } catch (err) {
      console.error(err);
      errorMessage("Error occured! Try again")
    }
    setIsLoading(false);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
      errorMessage("Error occured! Try again")
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
      errorMessage("Error occured! Try again")
    }
  };

  /* const recognizeFromPdf = async () => {
    const pdfParser = new PDFParser();
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'pageSheet',
      });
      RNFS.readFile(response[0].uri, (err, pdfBuffer) => {
        if (!err) {
          pdfParser.on("readable", meta => console.log("PDF Metadata", meta));
        }
      })

      await recognizeTextFromImage(response[0].uri);
    } catch (err) {
      console.error(err);
    }
  }; */

  /* const dispatch = useDispatch();

  const count = useSelector((store) => store.count);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  }; */

  return (
    <>
      {isLoading ?
        (<View style={{ flex: 1, backgroundColor: color.bgBlue, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={color.white} />
          <Text style={[{ color: color.white, textAlign: 'center', paddingTop: 12 }, typography.apply().Demi]}>Text is being prepared...</Text>
        </View>) :
        (<View style={[styles.container, { backgroundColor: color.bgBlue }]}>
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
              onPress={() => { recognizeFromCamera() }}
              style={styles.button}>
              <View style={styles.icon}>
                <CameraShutterSvgrepoCom width={24} height={24} color={color.black} opacity={0.8} />
              </View>
              <Text style={[{ color: color.black }, typography.apply().Demi]}>TAKE A PICTURE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { recognizeFromPicker() }}
              style={styles.button}>
              <View style={styles.icon}>
                <ImageSquareSvgrepoCom width={24} height={24} color={color.black} opacity={0.8} />
              </View>
              <Text style={[{ color: color.black }, typography.apply().Demi]}>GALLERY</Text>
            </TouchableOpacity>
            {/* <Text style={styles.title_text}>Counter App</Text>
            <Text style={styles.counter_text}>{count}</Text>

            <TouchableOpacity onPress={handleIncrement} style={styles.btn}>
              <Text style={styles.btn_text}> Increment </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDecrement}
              style={{ ...styles.btn, backgroundColor: '#6e3b3b' }}>
              <Text style={styles.btn_text}> Decrement </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
          onPress={() => { recognizeFromPdf() }}
          style={styles.button}>
          <View style={styles.icon}>
            <PdfFileSvgrepoComBlack width={24} height={24} color={color.black} opacity={0.8} />
          </View>
          <Text style={[{ color: color.black }, typography.apply().Demi]}>IMPORT PDF</Text>
        </TouchableOpacity> */}
          </View>
        </View>)}
    </>
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