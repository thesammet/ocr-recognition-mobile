import { BaseToast } from 'react-native-toast-message';

// add extra toast type
export const toastConfig = {
    warning: props => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#ffcc00', backgroundColor: '#fff' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
            }}
        />
    ),
};
