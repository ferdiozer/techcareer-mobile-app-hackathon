
import React, { useState } from 'react';
import { View, Dimensions, Text, StyleSheet, Alert, TextInput, TouchableOpacity, Linking } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import Button from "../components/CustomButton"

import { HELP_URL } from '../constants/url';
import { colors } from '../constants';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const FeedbackScreen = (props) => {

  const initData = {
    subject: '',
    message: '',
    loading: false
  }

  const [data, setData] = useState(initData);

  const submit = () => {
    const { subject, message } = data
    if (!subject || !message) {

      Alert.alert(
        'Uyarı',
        'Gerekli alanları doldurup gönderin',
        [
          {
            text: 'Tamam',
            onPress: () => {
              console.log('submit alertTAMAM')
            },
            style: 'cancel',
          }
        ],
        { cancelable: false },
      );
    }
    else {
      service();
    }
    console.log("gönder data:", data);
  }

  const service = async () => {
    setData({ ...data, loading: true })
    try {
      //   await HomeStore.sendFeedback({ title: data.subject, description: data.message })
      Alert.alert(
        'Başarılı',
        'Mesajınızı aldık. Teşekkürler',
        [
          {
            text: 'Tamam',
            onPress: () => props.navigation.navigate("Home"),
            style: 'cancel',
          }
        ],
        { cancelable: true },
      );
      setData(initData)
    } catch (error) {
      setData({ ...data, loading: false })
    }
  }

  return (
    <View style={styles.container}>
      <Header back title={"Bizimle iletişime geçin"} />
      <View style={styles.body}>
        <View style={styles.inputView}>
          <TextInput
            placeholder={'Konu'}
            style={styles.textInput}
            underlineColorAndroid={"transparent"}
            value={data.subject}
            onChangeText={(subject) => setData({ ...data, subject })}
          />
        </View>

        <View style={[styles.inputView, { borderRadius: 20 }]}>
          <TextInput
            placeholder={'Lütfen İçerik Hakkında Detay Giriniz'}
            style={styles.textInputMulti}
            underlineColorAndroid={"transparent"}
            value={data.message}
            onChangeText={(message) => setData({ ...data, message })}
            multiline={true}
            numberOfLines={6}
          />
        </View>

      </View>
      <View style={styles.footer}>
        <Button loading={data.loading} borderRadius={50} onPress={() => submit()} title="Gönder" />
      </View>
      <TouchableOpacity style={styles.footer2} onPress={() => { Linking.openURL(HELP_URL); }}>
        <Text style={styles.footerText}>Daha fazlası için</Text>
        <View style={styles.footerIcon}>
          <Entypo name={'chevron-thin-right'} size={WIDTH / 30} color={'#FFF'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 50
  },
  inputView: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20
  },
  textInput: {
    paddingHorizontal: 20
  },
  textInputMulti: {
    justifyContent: 'flex-start'
  },
  footer: {
    flex: 1,
    paddingHorizontal: 20
  },
  footer2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 20
  },
  footerText: {
    color: '#7f8c8d'
  },
  footerIcon: {
    backgroundColor: "#7f8c8d",
    marginLeft: 5,
    padding: 5,
    width: WIDTH / 20,
    height: WIDTH / 20,
    borderRadius: (WIDTH / 20) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
