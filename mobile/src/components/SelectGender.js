import React from "react"


import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    StyleSheet
} from 'react-native';


import { colors } from '../constants';


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const color1 = colors.primary;
const color2 = colors.secondary;


export default ({
    data,
    onChange
}) => {
    return (
        <View style={styles.containerGender}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginRight: 5 }}
                    onPress={() => onChange("gender", 0)} >
                    <Image
                        source={require('../assets/images/user-man.png')}
                        style={[styles.imageGender, {
                            borderColor: color1,
                            borderWidth: (data.gender == 0) ? 2 : 0,
                        }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 5 }}
                    onPress={() => onChange("gender", 1)} >
                    <Image
                        source={require('../assets/images/user-woman.png')}
                        style={[styles.imageGender, {
                            borderColor: color1,
                            borderWidth: (data.gender == 1) ? 2 : 0,
                        }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onChange("gender", -1)} >
                    <Image
                        source={require("../assets/images/user-unisex.png")}
                        style={[styles.imageGender, {
                            borderColor: color1,
                            borderWidth: (data.gender == -1) ? 2 : 0,
                        }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1,
        zIndex: 2
    },
    containerGender: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        marginTop: 10

    },
    imageGender: {
        height: HEIGHT / 23,
        width: HEIGHT / 23,
        borderRadius: (HEIGHT / 23) / 2,

    },
    circleParentView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 50,
        zIndex: 90,
    },
    circleSubView: {
        width: 100,
        height: 100,
        backgroundColor: colors.softlight,
        borderRadius: 50,
        bottom: -50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 90,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: color1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: WIDTH / 2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
