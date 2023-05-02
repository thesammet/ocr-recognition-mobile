import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import HTML from 'react-native-render-html';

const OcrDetail = ({ route }) => {
    const [text, setText] = useState(route.params.resultText.toString());
    const [wordToHighlight, setWordToHighlight] = useState('');
    const [highlightedText, setHighlightedText] = useState(text);

    const handleWordToHighlightChange = (value) => {
        setWordToHighlight(value);
        const regex = new RegExp(`\\b(${value.toLowerCase()})\\b`, 'g');
        const newHighlightedText = text.toLowerCase().replace(regex, '<mark><strong>$&</strong></mark>');
        setHighlightedText(newHighlightedText);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, marginTop: 32, marginHorizontal: 8 }} >
                <HTML source={{ html: highlightedText }} />
                <TextInput
                    style={{ marginTop: 12 }}
                    placeholder="Enter the whole word to search"
                    value={wordToHighlight}
                    onChangeText={handleWordToHighlightChange}
                    autoCapitalize="none"
                />
            </View>
        </TouchableWithoutFeedback>
    );
};
export default OcrDetail;
