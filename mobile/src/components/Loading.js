import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default ({ transparant = true, color }) => {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: transparant ? undefined : 'rgba(164, 144, 142, 0.42)'
        }}
        >
            <View
                style={{
                    zIndex: 10000,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3
                }}>
                <ActivityIndicator size={'large'} color={color || "#000"} />
            </View>
        </View>
    )
}