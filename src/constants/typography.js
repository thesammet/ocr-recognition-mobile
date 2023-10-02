import { StyleSheet } from "react-native";

const typography = () => {
    return StyleSheet.create({
        Regular: {
            fontSize: 16,
            fontWeight: '400',
            fontFamily: 'AvenirNextLTPro-Regular'
        },
        Demi: {
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'AvenirNextLTPro-Demi'
        },
        DemiHello: {
            fontSize: 26,
            fontWeight: '600',
            fontFamily: 'AvenirNextLTPro-Demi'
        },
    });
}

export default typography;