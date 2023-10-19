import Toast from 'react-native-toast-message';
let tabHeight = 80;

export const successMessage = (text1, text2 = '') => {
    Toast.show({
        type: 'success',
        text1: text1,
        text2: text2,
        visibilityTime: 1000,
        autoHide: true,
        position: 'bottom',
        bottomOffset: tabHeight * 1.5 + 10,
    });
};

export const errorMessage = (text1, text2 = '') => {
    Toast.show({
        type: 'error',
        text1: text1,
        text2: text2,
        visibilityTime: 1000,
        autoHide: true,
        position: 'bottom',
        bottomOffset: tabHeight * 1.5 + 10,
    });
};

export const warningMessage = (text1, text2 = '') => {
    Toast.show({
        type: 'warning',
        text1: text1,
        text2: text2,
        visibilityTime: 1000,
        autoHide: true,
        position: 'bottom',
        bottomOffset: tabHeight * 1.5 + 10,
    });
};

export const infoMessage = (text1, text2 = '') => {
    Toast.show({
        type: 'info',
        text1: text1,
        text2: text2,
        visibilityTime: 1000,
        autoHide: true,
        position: 'bottom',
        bottomOffset: tabHeight * 1.5 + 10,
    });
};
