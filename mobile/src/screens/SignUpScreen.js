import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Alert,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';

import _, { trim } from "lodash";
import Loading from '../components/Loading';


import { launchCamera, launchImageLibrary, PhotoQuality } from 'react-native-image-picker';
import { requestCameraPermission, requestPermissionsSTORAGE } from '../components/permission';

import { isEmail } from '../helpers';
import { appinfo, colors } from '../constants';
import ImageResizer from '../helpers/ImageResizer';
import { uploadAvatarPhoto } from '../actions/fileServer';
import { doSignUp, doSignIn } from '../actions/auth';

const color1 = colors.primary;
const color2 = colors.secondary;

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const SignInScreen = (props) => {
    const { navigation } = props

    const [data, setData] = React.useState({
        name: '',
        username: '',
        password: '',
        gender: -1,
        email: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
    });
    const [modalVisible, setModalVisible] = useState(false);

    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const loadingImage = props.loadingImage
    const { loading } = props

    const onChange = (key, val) => {
        setData({
            ...data,
            [key]: val,
        });
    }



    const send = async () => {
        const sendData = {
            email: trim(data.email),
            name: data.name,
            username: data.username,
            password: data.password,
            gender: data.gender,
            avatar: _.get(props, "user.avatar"),
            channel: appinfo.key
        }
        //channel
        if (data.password != data.confirm_password) {
            Alert.alert('Uyarı!', "Şifreler uyuşmuyor", [
                { text: 'Tamam' }
            ]);
            return;
        }

        if (!isEmail(data.email)) {
            Alert.alert('Uyarı!', "Geçersiz E-Mail", [
                { text: 'Tamam' }
            ]);
            return;
        }
        if (data.password.length < 4) {
            Alert.alert('Uyarı!', "Şifre 3 karakterden fazla olmalı", [
                { text: 'Tamam' }
            ]);
            return;
        }
        if (!data.name) {
            Alert.alert('Uyarı!', "İsim zorunlu", [
                { text: 'Tamam' }
            ]);
            return;
        }



        console.log("!!!!!!!!", sendData)



        props.doSignUp(sendData).then(result => {
            Alert.alert(`Aramıza hoşgeldin ${_.get(props, "user.name", "")}`, "Şimdi Giriş Yapabilirsin", [
                {
                    text: 'Tamam',
                    onPress: () => {
                        props.navigation.goBack()
                    }
                },
                {
                    text: 'Otomatik Giriş',
                    onPress: () => {
                        props.doSignIn({ email: data.email, password: data.password })
                    }
                },
            ], { cancelable: false });

        }).catch(err => {

        })
    }


    const onPressCamera = (action = "camera") => {
        requestPermissionsSTORAGE()
        requestCameraPermission()
        chooseFile(action)
        setModalVisible(false)
    }
    const chooseFile = (action) => {
        let options = {
            quality: 0.8,
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        if (action == "gallery") {
            launchImageLibrary(options, (response) => {
                console.log("launchImageLibrary", response)
                if (response.didCancel) return
                chooseFileAfter(response)
            })
        }
        else {
            launchCamera(options, (response) => {
                console.log("launchCamera", response)
                if (response.didCancel) return
                chooseFileAfter(response)
            })
        }
    }
    const chooseFileAfter = (response) => {
        if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.errorCode == 'camera_unavailable') {
            alert('Kamera cihazda kullanılamıyor');
            return;
        }
        else if (response.errorCode == 'permission') {
            Alert.alert('Kamera izni gerekiyor!', "erişim izni verin");
            return;
        }
        else {
            const fileImage = {
                name: response.fileName,
                type: response.type,
                uri:
                    Platform.OS === "android" ? response.uri : response.uri.replace("file://", "")
            }
            ImageResizer({ uri: fileImage.uri, size: 1000 }).then(resizedImage => {
                fileImage.uri = resizedImage.uri
                props.uploadAvatarPhoto({ photo: fileImage })
            })
        }
    }


    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color1} barStyle="light-content" />
            {
                loading && <Loading transparant={false} />
            }
            <View style={styles.header}>
                <Text style={styles.text_header}>Şimdi Kayıt Ol!</Text>

            </View>
            <TouchableOpacity style={styles.circleParentView}
                disabled={loadingImage}
                onPress={() => setModalVisible(true)}
            >

                {
                    _.get(props, "user.avatar") ?
                        <TouchableOpacity
                            disabled={loadingImage}
                            onPress={() => setModalVisible(true)}
                            style={styles.circleSubView1}
                        >
                            <Image source={{ uri: props.user.avatar }} style={styles.circleSubView} />
                        </TouchableOpacity>
                        :
                        <View style={styles.circleSubView}>
                            {
                                loadingImage
                                    ?
                                    <ActivityIndicator size="large" color={"#FFF"} />
                                    :
                                    <MaterialIcons name="add-a-photo" color={colors.primary} size={40} />
                            }
                        </View>
                }


            </TouchableOpacity>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>İsim</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Adını buraya girebilirsin"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => onChange("name", val)}
                            onSubmitEditing={() => ref_input1.current?.focus()}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>E-Posta</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            keyboardType='email-address'
                            placeholder="E-Posta adresin"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => onChange("email", val)}
                            onSubmitEditing={() => ref_input2.current?.focus()}
                            ref={ref_input1}
                        />
                        {isEmail(data.email) ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Şifre</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Şifren"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                            onSubmitEditing={() => ref_input3.current?.focus()}
                            ref={ref_input2}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Şifre Tekrarı</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Şifreni tekrar gir"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                            ref={ref_input3}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>




                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Kaydolarak
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Hizmet Koşulları</Text>
                        <Text style={styles.color_textPrivate}>{" "}ve</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Gizlilik Politikamızı</Text>
                        <Text style={styles.color_textPrivate}>{" "}kabul etmiş olursunuz</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => send()}
                        >
                            <LinearGradient
                                colors={[color1, color1]}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Kayıt Ol</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: color1,
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: color1
                            }]}>Griş Yap</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Profil fotoğrafı yükle</Text>

                        <TouchableOpacity
                            style={{ ...styles.openButton, marginBottom: 10 }}
                            onPress={() => onPressCamera("camera")}>
                            <Text style={styles.textStyle}>Kamerayı kullan</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ ...styles.openButton, marginBottom: 10 }}
                            onPress={() => onPressCamera("gallery")}>
                            <Text style={styles.textStyle}>Galeriden yükle</Text>
                        </TouchableOpacity>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: color2 }}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Kapat</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>


        </View>
    );
};


function bindAction(dispatch) {
    return {
        uploadAvatarPhoto: file => dispatch(uploadAvatarPhoto(file)),
        doSignUp: user => dispatch(doSignUp(user)),
        doSignIn: user => dispatch(doSignIn(user))
    };
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        user: state.auth.user,
        loadingImage: state.auth.loadingImage,
        success: state.auth.success,
        error: state.auth.error

    };
}

export default connect(mapStateToProps, bindAction)(SignInScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1,
        zIndex: 2
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
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
        left: 0,
        right: 0,
        top: 50,
        zIndex: 90,
        flex: 1,
        //  backgroundColor: "red",
        // height: HEIGHT / 10
    },
    circleSubView: {
        width: 100,
        height: 100,
        position: 'absolute',
        backgroundColor: colors.softlight,
        borderRadius: 50,
        //   bottom: -50,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 90,
    },
    circleSubView1: {
        width: 100,
        height: 100,
        backgroundColor: colors.softlight,
        borderRadius: 50,

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
