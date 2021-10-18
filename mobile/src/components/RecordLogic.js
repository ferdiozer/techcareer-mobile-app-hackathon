import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, DeviceEventEmitter } from 'react-native';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import Pulse from 'react-native-pulse';

import voiceChanger from 'react-native-voice-changer';
import { AudioUtils } from 'react-native-audio';


import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../constants';
import effects from '../assets/effects';

import RNFS, { readFile, writeFile, write, downloadFile } from "react-native-fs";


const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;

export default class App extends Component {
    sound = null;
    state = {
        audioFile: '',
        recording: false,
        loaded: false,
        paused: true,
        playingIndex: null
    };

    componentDidMount() {
        const options = {
            sampleRate: 44100,
            channels: 1,
            bitsPerSample: 16,
            wavFile: 'record.wav'
        };

        AudioRecord.init(options);

        this.initMedia();
        this.mediaPlayerListner = DeviceEventEmitter.addListener('onMediaCompletion', () => this.setState({ playingIndex: null }));

    }

    componentWillUnmount() {
        this.stop();
    }

    initMedia = async () => {


        voiceChanger.setPath(AudioUtils.DocumentDirectoryPath + '/record.wav');

        voiceChanger.createDBMedia();
        effects.forEach(e => voiceChanger.insertEffect(JSON.stringify(e)));
    };

    start = () => {
        console.log('start record');
        this.setState({ audioFile: '', recording: true, loaded: false });
        AudioRecord.start();
    };

    stop = async () => {
        if (!this.state.recording) return;
        let audioFile = await AudioRecord.stop();
        this.setState({ audioFile, recording: false });
        console.log('audioFile', audioFile);

        //  this.play()
        //  voiceChanger.playEffect(1)
        this.props.onStopSound({ audioFile })
    };

    load = (audioFile = this.state.audioFile) => {
        return new Promise((resolve, reject) => {
            if (!audioFile) {
                return reject('file path is empty');
            }

            this.sound = new Sound(audioFile, '', error => {
                if (error) {
                    console.log('failed to load the file', error);
                    return reject(error);
                }
                this.setState({ loaded: true });
                return resolve();
            });
        });
    };

    play = async () => {
        if (!this.state.loaded) {
            try {
                await this.load();
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ paused: false });
        Sound.setCategory('Playback');

        this.sound.play(success => {
            if (success) {
                console.log('successfully finished playing');
                this.props.onPlay({})
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({ paused: true });
        });
    };

    pause = () => {
        this.sound.pause();
        this.setState({ paused: true });
    };

    onPlayItem = async (item) => {
        //audio:{ effectId ,path }
        const { effectId, path } = item.audio
        console.log("onPlayItem:::", { effectId, path, item })

        let itemEfectId = Number(effectId)
        if (isNaN(itemEfectId)) itemEfectId = 0

        //eğer yoksa devam etme
        if (!effectId || !path) return


        //çalma işlemi
        try {
            //eğer aynı iteme tıklıyorsa 
            const { playingAudio } = this.props
            if (playingAudio._id == item._id) {
                //   await AudioRecord.stop();
                this.sound.stop()
                this.props.onPlay({})
                return
            }


            downloadFile({
                fromUrl: path,
                toFile: AudioUtils.DocumentDirectoryPath + '/record.wav'
            }).promise.then((r) => {
                // this.setState({ isDone: true })
                // console.log("!!!RES:SERVER:::", response)
                //this.play()
                //voiceChanger.playEffect(itemEfectId)
                this.load(path).then(res => {
                    this.sound.setVolume(0)
                    this.play()
                    voiceChanger.playEffect(itemEfectId)
                })

            });

            //  console.log("!!!RES:SERVER:::", response)

            //this.play()
            //voiceChanger.playEffect(itemEfectId)

            // this.load(path).then(res => {
            //     this.play()
            //     voiceChanger.playEffect(itemEfectId)
            // })


            //const base64String = await readFile(path, "base64");
            //const customLocalPath = AudioUtils.DocumentDirectoryPath + '/record.wav'
            //writeFile(customLocalPath, base64String, "base64");
            //   voiceChanger.setPath(path)
            //voiceChanger.createDBMedia();
            // effects.forEach(e => voiceChanger.insertEffect(JSON.stringify(e)));

            /*
            const base64String = await readFile(path, "base64");
            console.log("base64String::", base64String)
            // voiceChanger.setPath(base64String);
            write(customLocalPath, base64String).then(result => {
                console.log("result::::", result)
                voiceChanger.playEffect(itemEfectId)
            })
            */

            //  voiceChanger.setPath(Buffer.from(path));
            //voiceChanger.playEffect(itemEfectId)
            this.props.onPlay(item)
        } catch (error) {
            console.log("ERROR:onPlayItem", error)
        }


    }

    render() {
        const iconSize = this.props.iconSize || 22
        const item = this.props.item

        const playing = this.props.playing || false
        const { recording, paused, audioFile } = this.state;

        const { playingIndex } = this.state;


        const type = this.props.type || "normal"

        if (type == "normal") {
            return (
                <View style={styles.container}>
                    <View style={styles.rowCenter}>
                        {recording && <Pulse color="#F53830"
                            numPulses={5}
                            diameter={250}
                            initialDiameter={100}
                            speed={15}
                            duration={800}
                            style={styles.pulse} />}
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: fullHeight / 20,
                                width: fullHeight / 20,
                                backgroundColor: !recording ? colors.primary : colors.danger,
                                borderRadius: (fullHeight / 20) / 10
                            }}
                            onPress={() => !recording ? this.start() : this.stop()}
                        >
                            {
                                //    <EntypoIcon name={"controller-stop"} color={'#FFF'} size={(fullHeight / 30)} />
                                !recording ?
                                    <EntypoIcon name={"mic"} color={'#FFF'} size={(fullHeight / 30)} /> :

                                    <Ionicons
                                        color={'#FFF'} size={(fullHeight / 30)}
                                        size={22} name="ios-send-sharp" />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else if (type == "messageItem") {
            return (
                <TouchableOpacity onPress={() => this.onPlayItem(item)} style={styles.container}>
                    <View style={styles.rowCenter}>
                        <View />
                        <View>
                            {
                                playing
                                &&
                                <Pulse
                                    color={colors.primary}
                                    numPulses={5}
                                    diameter={120}
                                    initialDiameter={10}
                                    speed={2}
                                    duration={1600}
                                    style={styles.pulse} />
                            }
                            {!playing && <FeatherIcon name="play" color={colors.primary} size={iconSize} />}
                            {playing && <EntypoIcon name="controller-stop" color={colors.primary} size={iconSize} />}


                        </View>


                    </View>


                </TouchableOpacity>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.rowCenter}>
                        <View />


                        {
                            //  <View style={{}}>
                            //      <TouchableOpacity
                            //          style={styles.roundedBtn}
                            //          disabled={!audioFile}
                            //          icon={paused ? "play-arrow" : "pause"}
                            //          mode="contained"
                            //          onPress={() => paused ? this.play() : this.pause()}
                            //      >
                            //          <Text>
                            //              {paused ? "Play" : "Pause"}
                            //          </Text>
                            //      </TouchableOpacity>
                            //  </View>
                        }

                        <View>

                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: fullWidth / 4,
                                    width: fullWidth / 4,
                                    backgroundColor: !recording ? colors.primary : colors.danger,
                                    borderRadius: (fullWidth / 4) / 2
                                }}
                                onPress={() => !recording ? this.start() : this.stop()}
                            >
                                {recording && <Pulse color="#F53830"
                                    numPulses={5}
                                    diameter={250}
                                    initialDiameter={100}
                                    speed={15}
                                    duration={800}
                                    style={{

                                    }} />}
                                {!recording ?
                                    <EntypoIcon name={"mic"} color={'#FFF'} size={(fullWidth / 10)} />
                                    :
                                    <Ionicons
                                        color={'#FFF'} size={(fullWidth / 10)}
                                        size={22} name="ios-send-sharp" />
                                }

                            </TouchableOpacity>
                        </View>


                    </View>


                </View>
            );
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: "column",
        //  backgroundColor: 'red'
    },
    rowCenter: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    rowSecondary: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    secondaryBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    secondaryBtn: {
        resizeMode: "stretch",
        aspectRatio: 1,
        width: "55%",
        height: undefined
    },
    roundedBtn: {
        borderRadius: 50,
        overflow: 'hidden',
    }
});