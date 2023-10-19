import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import { ArrowLeftSvgrepoCom, DotMenuMore2SvgrepoCom, ReloadSvgrepoCom } from '../components/icons';
import color from '../constants/color';
import typography from '../constants/typography';

const HomeBasicHeader = ({
    navigation,
    title = '',
    isNavBack = false,
    type = '',
    ...props
}) => {
    const forwardProfile = () => {
        navigation.navigate('ProfileStack');
    };

    const forwardBack = () => {
        navigation.goBack();
    };

    return (
        <>
            {
                title == 'Ana Sayfa' ?
                    <View style={[styles.container, { backgroundColor: color.bgBlue }]}>
                        <View style={styles.backgroundImage} {...props}>
                            <View>
                                <ArrowLeftSvgrepoCom width="128" height="48" />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('NotificationStack')}
                                    activeOpacity={0.8}
                                    style={styles.touchablePadding} >
                                    <View style={styles.iconView}>
                                        <DotMenuMore2SvgrepoCom height={28} width={28} fill={color.white} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileStack')}
                                    activeOpacity={0.8}
                                    style={styles.touchablePadding} >
                                    <View style={styles.iconView}>
                                        <DotMenuMore2SvgrepoCom height={28} width={28} fill={color.white} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    isNavBack ? (
                        <View style={[styles.navbackContainer, { backgroundColor: color.bgBlue }]}>
                            <TouchableOpacity
                                onPress={() => forwardBack()}
                                activeOpacity={0.8}
                                style={styles.touchablePadding} >
                                <ArrowLeftSvgrepoCom width={24} height={24} fill={color.white} />
                            </TouchableOpacity>

                            <Text style={[{ color: color.white }, typography.apply().Demi, styles.title]}>{title}</Text>
                            <View style={{ height: 24, width: 24 }} />
                            {/* <TouchableOpacity
                                onPress={() => { }}
                                activeOpacity={0.8}
                                style={[styles.touchablePadding, { backgroundColor: 'black' }]} >
                                <ReloadSvgrepoCom width="24" height="24" fill={color.white} />
                            </TouchableOpacity> */}
                        </View >
                    ) : (
                        <View style={styles.backgroundImage} {...props}>
                            <Text style={styles.textNavFalse}>{title}</Text>
                        </View>
                    )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 12,
        paddingHorizontal: 32,
        //borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 13,
        zIndex: 13,
    },
    navbackContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 24,
        //borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 13,
        zIndex: 13,
    },
    textNavFalse: {
        fontSize: 27,
        color: 'white',
        fontWeight: '500',
    },
    iconView: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#1FB4FF',
        padding: 6,
        marginLeft: 4
    },
    touchablePadding: {
        padding: 4
    },
    title: {
        fontSize: 18,
    },
});

export default HomeBasicHeader;
