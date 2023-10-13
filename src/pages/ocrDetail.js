import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

const OcrDetail = ({ route }) => {
    const [propText, setPropText] = useState(route.params.resultText);
    const [wordToHighlight, setWordToHighlight] = useState('');
    const [highlightedText, setHighlightedText] = useState(propText);

    const handleWordToHighlightChange = (value) => {
        setWordToHighlight(value);
        const regex = new RegExp(`\\b(${value.toLowerCase()})\\b`, 'g');
        const newHighlightedText = propText.toLowerCase().replace(regex, '<mark><strong>$&</strong></mark>');
        setHighlightedText(newHighlightedText);
    };

    const finalText = propText.map((text, index) => {
        return (
            <Text key={index} style={{ fontSize: 18, textAlign: 'left' }}>
                {text}
            </Text>
        );
    });

    useEffect(() => {
        console.log(propText)
    }, []);
    return (

        <ScrollView style={{ flex: 1, marginTop: 32, marginHorizontal: 12 }} >
            {/*  <HTML source={{ html: highlightedText }} /> */}
            {finalText}
        </ScrollView>
    );
};
export default OcrDetail;
