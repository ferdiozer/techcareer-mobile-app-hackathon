import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

export default (
    { borderRadius,
        onPress = () => { },
        title,
        icon,
        loading,
        padding,
        disabled = false,
        color
    }) => {
    return (
        <TouchableOpacity
            disabled={loading || disabled}
            style={[styles.touchableOpacity, { backgroundColor: color ? color : "#000" }, { borderRadius: borderRadius ? borderRadius : undefined, padding: padding ? padding : 14 }]}
            onPress={onPress}
        >
            <View style={styles.btnContainer}>
                {icon && <View styles={{ alignItems: 'center', justifyContent: 'center', alignItems: 'center', }}>{icon}</View>}
                {loading && <ActivityIndicator color="white" />}
                {title && <Text style={styles.btnText}>{title}</Text>}
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    touchableOpacity: {
        alignItems: 'center',
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

});
