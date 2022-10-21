import React, { useState } from 'react';
import styles from '../assets/styles';

import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import CustomButton from '../components/CustomButton';

import Fontisto from 'react-native-vector-icons/Fontisto';


import { colors } from '../constants';

import _ from "lodash"
import moment from "moment"
import GeneralModal from '../components/GeneralModal';
import { connect } from 'react-redux';
import ImageResizer from '../helpers/ImageResizer';
import { uploadAvatarPhoto } from '../actions/fileServer';
import { doLogout, updateUserProfile } from '../actions/auth';
import { getAge, renderGender } from '../helpers';
import { requestCameraPermission, requestPermissionsSTORAGE } from '../components/permission';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Loading from '../components/Loading';
import i18n, { setLanguage } from '../i18n';



import UserAvatar from '../components/UserAvatar';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Profile = (props) => {
  const { user } = props
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  //   birth_date: moment(user.birth_date).isValid() ? new Date(user.birth_date) : new Date(),
  const [data, setData] = useState({
    name: user.name,
    username: user.username,
    password: '',
    gender: user.gender || -1,
    email: user.email,
    birth_date: user.birth_date ? new Date(user.birth_date) : new Date(),
    bio: user.bio,
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true
  });


  const onPressButton = (item) => {
    console.log(item)
    switch (item.key) {
      case "logout":
        props.onLogout()
        break;
      case "editing":
        setEditing(true)
        break;
      case "gallery":
        onPressCamera("gallery")
        break;
      case "camera":
        onPressCamera("camera")
        break;
      default:
        break;
    }
    setModalVisible(false)
  }

  //////////////////////////    -----   ////////////
  const doUpdateProfile = async () => {
    console.log("!!!!do update")
    const postData = {
      name: data.name,
      gender: data.gender,
      birth_date: data.birth_date,
      bio: data.bio,
      action: "profile"
    }
    await props.updateUserProfile(postData)
    setEditing(false)
  }


  const modalButtons = [

    { title:i18n.t('edit'), key: "editing" },
    { title: i18n.t('loadFromGallery'), key: "gallery" },
    { title: i18n.t('useCamera'), key: "camera" },
    { title: i18n.t('logout') , key: "logout" },
  ]






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
      alert(i18n.t('message.camera_unavailable'));
      return;
    }
    else if (response.errorCode == 'permission') {
      Alert.alert(i18n.t('message.permission_title'),i18n.t('message.permission_desc'));
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
        //  updateProfileAvatar(fileImage);
        props.uploadAvatarPhoto({ photo: fileImage, action: "profileAvatarUpdate" })
      })
    }
  }



  const iconViewSize = WIDTH / 10


  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      {props.loading && <Loading />}
      <GeneralModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={i18n.t('other')}
        buttons={modalButtons}
        onPressButton={onPressButton}
      />
      <ScrollView style={styles.containerProfile}>
        <ImageBackground
          // source={image} 
          source={{ uri: user.avatar }}
          style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}
              //style={styles.topIconLeft}
              style={{
                width: iconViewSize,
                height: iconViewSize,
                borderRadius: iconViewSize / 2,
                backgroundColor: 'rgba(0,0,0,0.4)',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Fontisto name="arrow-left" color={colors.white} size={iconViewSize / 2.5} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: iconViewSize,
                height: iconViewSize,
                borderRadius: iconViewSize / 2,
                backgroundColor: 'rgba(0,0,0,0.4)',
                justifyContent: 'center',
                alignItems: 'center'
              }} onPress={() => setModalVisible(true)}
            >
              <Fontisto name="more-v-a" color={colors.white} size={iconViewSize / 2.5} />
            </TouchableOpacity>

          </View>
          {
            !user.avatar
            &&
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <UserAvatar size={iconViewSize * 5} type={"user-astronaut"} />
            </View>
          }


        </ImageBackground>

        {
          editing
            ?

            <View style={styles.containerProfileEditItem}>
              <Text>
                {i18n.t('name')}
              </Text>
              <TextInput
                value={data.name ? data.name : user.name}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(name) => setData({ ...data, name })}
              />
              <Text>
                {i18n.t('aboutUs')}
              </Text>
              <View style={styles.textInput}>
                <TextInput
                  underlineColorAndroid={"transparent"}
                  value={data.bio}
                  onChangeText={(bio) => setData({ ...data, bio })}
                  multiline={true}
                  numberOfLines={5}
                />
              </View>



              <View style={{ height: 30 }} />

              <CustomButton onPress={() => doUpdateProfile()} title={i18n.t('update')}/>
              <CustomButton onPress={() => setEditing(false)} title={i18n.t('cancel')} color={colors.secondary} />

            </View>
            :
            <View style={{ flex: 1 }}>

              <ProfileItem
                name={_.get(user, "name")}
                bio={_.get(user, "bio")}
                age={moment(user.created).fromNow()}
                //age={user.birth_date ? getAge(user.birth_date) : undefined}
                gender={renderGender(user.gender)}
              //  info1={"Türkiye"}
                //   info2={info2}
                info3={user.lastOnline ? moment(user.lastOnline).fromNow() : undefined}
              />


            </View>

        }


 
           {/* <TouchableOpacity onPress={() => setLanguage("tr")}>
                        <Text>
                          Türkçe
                        </Text>
                      </TouchableOpacity>
        
                      <TouchableOpacity onPress={() => setLanguage("en")}>
                        <Text>
                          ENG
                        </Text>
                      </TouchableOpacity> */}


      </ScrollView>
    </ImageBackground>
  );
};


function bindAction(dispatch) {
  return {
    uploadAvatarPhoto: file => dispatch(uploadAvatarPhoto(file)),
    updateUserProfile: file => dispatch(updateUserProfile(file)),
    onLogout: () => dispatch(doLogout()),
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

export default connect(mapStateToProps, bindAction)(Profile);


