import React, { useState, useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import HTML from 'react-native-render-html';

const OcrDetail = ({ route }) => {
    const [text, setText] = useState(route.params.resultText.toString());
    const [wordToHighlight, setWordToHighlight] = useState('');
    const [highlightedText, setHighlightedText] = useState(text);

    const handleWordToHighlightChange = (value) => {
        setWordToHighlight(value);
        const regex = new RegExp(`\\b(${value})\\b`, 'g');
        const newHighlightedText = text.replace(regex, '<mark><strong>$&</strong></mark>');
        setHighlightedText(newHighlightedText);
    };
    useEffect(() => {
        console.log(route.params.resultText)
    }, []);
    return (
        <View style={{ flex: 1, marginTop: 24 }}>
            <HTML style={{ marginBottom: 12 }} source={{ html: highlightedText }} />
            <TextInput
                placeholder="Enter word to highlight"
                value={wordToHighlight}
                onChangeText={handleWordToHighlightChange}
            />
        </View>
    );
};
export default OcrDetail;
