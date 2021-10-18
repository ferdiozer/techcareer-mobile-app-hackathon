import { PermissionsAndroid } from "react-native";
export const requestCameraAndAudioPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ]);
        if (
            granted["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.CAMERA"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log("You can use the cameras & mic");
        } else {
            console.log("Permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
}

export const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Uygulama Kamerası İzni",
                message: "Uygulamanın kameranıza erişmesi gerekiyor",
                buttonNeutral: "Daha sonra sor",
                buttonNegative: "İptal",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

export const requestPermissionsSTORAGE = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Dosya Erişimine izin veriniz',
                'message': 'izniniz gerekiyor ' +
                    '.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can write file")
        } else {
            console.log("File read permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

