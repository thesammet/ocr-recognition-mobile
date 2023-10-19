import React, { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Share,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard
} from 'react-native';
import HTML from 'react-native-render-html';
import HomeBasicHeader from '../components/HomeBasicHeader';
import color from '../constants/color';
import typography from '../constants/typography';
import { ShareSvgrepoCom, CopySvgrepoCom, SearchAlt2SvgrepoCom, PdfFileSvgrepoCom, ClearInverseReflectHorizontalSvgrepoCom, CloseSvgrepoCom } from '../components/icons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFS from 'react-native-fs';
import { useKeyboard } from '@react-native-community/hooks';
import { errorMessage, successMessage } from '../utils/showToast';

const OcrDetail = ({ route, navigation }) => {
    const [propText, setPropText] = useState(route.params.resultText);
    const [wordToHighlight, setWordToHighlight] = useState('');
    const [keyboardShowBool, setKeyboardShowBool] = useState(false);
    const [highlightedText, setHighlightedText] = useState(propText);
    const keyboard = useKeyboard();
    const [admissionComment, onChangeAdmissionComment] = useState('');

    const handleWordToHighlightChange = (value) => {
        onChangeAdmissionComment(value)
        setWordToHighlight(value);
        const regex = new RegExp(`\\b(${value.toLowerCase()})\\b`, 'g');
        const newHighlightedText = propText?.toString().toLowerCase().replace(regex, '<mark><strong>$&</strong></mark>');
        setHighlightedText(newHighlightedText);
    };

    const createPDF = async (value) => {
        const formattedString = propText.join('\n');
        let options = {
            html: `<p>${formattedString}</p>`,
            fileName: `appName1`,
            directory: 'Documents',
        };

        const file = await RNHTMLtoPDF.convert(options)
        const downloadPath = RNFS.DownloadDirectoryPath;
        RNFS.copyFile(file.filePath, downloadPath);
    };

    const copyToClipboard = () => {
        const formattedString = propText.join('\n');
        Clipboard.setString(formattedString);
        successMessage("Text is successfully copied to clipboard.")
    };

    const onShare = async () => {
        try {
            const formattedString = propText.join('\n');
            const result = await Share.share({
                message:
                    formattedString
            });
            if (result.action === Share.sharedAction) {
                successMessage("Text is successfully shared.")
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            errorMessage("Error occured when shared your text.")
        }
    };

    const finalText = propText.map((text, index) => {
        return (
            <Text key={index} style={{ fontSize: 18, textAlign: 'left' }}>
                {text}
            </Text>
        );
    });

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                position: 'relative',
            }}
            {...(Platform.OS === 'ios' && { behavior: 'padding' })}
            keyboardVerticalOffset={20}>

            <HomeBasicHeader navigation={navigation} title="Scan Result" isNavBack={true} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}>
                {admissionComment.length > 0 ?
                    <HTML source={{ html: highlightedText }} /> :
                    finalText
                }
            </ScrollView>

            {keyboardShowBool &&
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{
                        flexDirection: 'column', alignContent: 'center', alignItems: 'center',
                        backgroundColor: color.white
                    }}>
                        <View
                            style={[
                                styles.commentInputContainer,
                                {
                                    backgroundColor: color.bgBlue,
                                    bottom: keyboard.keyboardShown
                                        ? 36
                                        : 10,
                                },
                            ]}>
                            <TextInput
                                style={[styles.commentInput, { color: color.white }]}
                                onChangeText={(val) => { handleWordToHighlightChange(val) }}
                                value={admissionComment}
                                multiline={true}
                                autoFocus={false}
                                textAlignVertical="center"
                                verticalAlign="center"
                                placeholder={"Search"}
                                placeholderTextColor={color.white}
                                keyboardType="default"
                            />
                            <TouchableOpacity
                                onPress={(value) => {
                                    onChangeAdmissionComment('');
                                    Keyboard.dismiss()
                                }}
                                activeOpacity={0.8}>
                                <ClearInverseReflectHorizontalSvgrepoCom width="36" height="36" />
                            </TouchableOpacity>
                        </View>
                        {
                            !keyboard.keyboardShown &&
                            <TouchableOpacity
                                onPress={() => {
                                    onChangeAdmissionComment('');
                                    setKeyboardShowBool(false)
                                }}
                                style={[styles.button, { paddingBottom: 64, paddingTop: 8 }]}
                                activeOpacity={0.6}>
                                <CloseSvgrepoCom width={30} height={30} />
                            </TouchableOpacity>}
                    </View>
                </TouchableWithoutFeedback>}

            {!keyboard.keyboardShown &&
                <View style={styles.bottomContainer}>
                    {/*  <TouchableOpacity
                        onPress={() => { createPDF() }}
                        style={styles.button}
                        activeOpacity={0.6}>
                        <PdfFileSvgrepoCom width={30} height={30} />
                        <Text style={[styles.bottomText, typography.apply().Demi]}>PDF</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => { copyToClipboard() }}
                        style={styles.button}
                        activeOpacity={0.6}>
                        <CopySvgrepoCom width={30} height={30} />
                        <Text style={[styles.bottomText, typography.apply().Demi]}>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setKeyboardShowBool(true) }}
                        style={styles.button}
                        activeOpacity={0.6}>
                        <SearchAlt2SvgrepoCom width={30} height={30} />
                        <Text style={[styles.bottomText, typography.apply().Demi]}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { onShare() }}
                        style={styles.button}
                        activeOpacity={0.6}>
                        <ShareSvgrepoCom width={30} height={30} />
                        <Text style={[styles.bottomText, typography.apply().Demi]}>Share</Text>
                    </TouchableOpacity>
                </View>}

        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: color.bgBlue
    },
    scroll: {
        backgroundColor: color.white,
    },
    scrollContent: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: color.white,
    },
    bottomContainer: {
        backgroundColor: color.bgBlue,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 8,
    },
    bottomText: {
        color: color.white,
        marginTop: 4,
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
    },
    commentInputContainer: {
        borderRadius: 24,
        paddingRight: 16,
        paddingVertical: 4,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.65,
        elevation: 3,
        zIndex: 3,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 24,
    },
    commentInput: {
        fontSize: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        flex: 1
    },
    noComment: {
        textAlign: 'center',
        marginTop: 24,
    },
})
export default OcrDetail;
