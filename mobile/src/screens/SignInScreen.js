import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { doSignIn, onResetPassword } from '../actions/auth';
import { connect } from 'react-redux';

import _ from 'lodash'


import { useTheme } from 'react-native-paper';

import { colors as MYcolors } from '../constants';
import i18n from '../i18n';


const color1 = MYcolors.primary

const SignInScreen = (props) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        formtype: "login",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true
    });


    const passwordTextInputRef = useRef();

    const { loading } = props

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if (val && val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 3) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const onSubmit = () => {
        if (data.formtype === "login") {
            loginHandle()
        } else {
            onForgot()
        }
    }

    const onForgot = async () => {
        const email = data.username
        if (!email) {
            return
        }
        props.onResetPassword(email);
        const { success, error } = props

        if (success) {
            Alert.alert(i18n.t('message.success'), i18n.t('message.forgotSendded'), [
                {
                    text: i18n.t('okay'), onPress: () => {
                        setData({
                            ...data,
                            formtype: 'login',
                            username: ''
                        })
                    }
                }
            ]);
        }
    }

    const loginHandle = async () => {
        const userName = data.username;
        const password = data.password;
        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert(i18n.t('message.wrongEnter'), i18n.t('message.emptyUsernameOrPass'), [
                { text: i18n.t('message.okay') }
            ]);
            return;
        }
        props.doSignIn({ email: userName.trim(), password })
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color1} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>
                    {i18n.t('message.hello')}
                    </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>
                    {i18n.t('username')}
                </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        onSubmitEditing={() => { passwordTextInputRef?.current.focus(); }}
                        value={data.username}
                        placeholder={i18n.t('usernameOrEmail')}
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            {i18n.t('message.usernameMore3')}
                        </Text>
                    </Animatable.View>
                }


                {
                    data.formtype === "login"
                    &&
                    <View>
                        <Text style={[styles.text_footer, {
                            color: colors.text,
                            marginTop: 35
                        }]}>
                            {i18n.t('password')}
                        </Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                value={data.password}
                                placeholder={i18n.t('message.enterPassword')}
                                placeholderTextColor="#666666"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handlePasswordChange(val)}
                                ref={passwordTextInputRef}
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
                        {data.isValidPassword ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>
                                {i18n.t('message.requiredPassword')}
                                </Text>
                            </Animatable.View>
                        }
                    </View>
                }

                <TouchableOpacity onPress={() => setData({ ...data, formtype: data.formtype == "login" ? "forgot" : "login" })}>
                    <Text style={{ color: color1, marginTop: 15 }}>
                        {
                            data.formtype == "login"
                                ?
                                i18n.t('message.forgotPassword')
                                :
                                i18n.t('message.iRememberPassword')
                        }
                    </Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                       // disabled={loading}
                        onPress={() => onSubmit()}
                    >
                        <LinearGradient
                            colors={[color1, color1]}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>
                                {loading && <ActivityIndicator color={'#fff'} />}
                                {
                                    data.formtype == "login"
                                        ?
                                        i18n.t('login')
                                        :
                                        i18n.t('resetPassword')  
                                }
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: color1,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: color1
                        }]}>
                            {i18n.t('signUp')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};


function bindAction(dispatch) {
    return {
        doSignIn: user => dispatch(doSignIn(user)),
        onResetPassword: email => dispatch(onResetPassword(email))
    };
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        user: state.auth.user,
        success: state.auth.success,
        error: state.auth.error
    };
}

export default connect(mapStateToProps, bindAction)(SignInScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
});
