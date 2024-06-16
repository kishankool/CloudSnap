import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType, FlashMode } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from './CameraButton';
import axios from 'axios'; 
import auth from "@react-native-firebase/auth";
import { mediaAPIString } from "../utils/API";

export default function CameraViewComponent() {
  const userId = auth().currentUser.uid;
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [media, setMedia] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasAudioPermission(audioStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setMedia({ uri: data.uri, type: 'image' });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const data = await cameraRef.current.recordAsync();
        console.log(data);
        setMedia({ uri: data.uri, type: 'video' });
        setIsRecording(false);
      } catch (error) {
        console.log(error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  const saveMedia = async () => {
    if (media) {
      try {
        const asset = await MediaLibrary.createAssetAsync(media.uri);
        console.log('Media saved to library:', asset.uri);
        await uploadFileToBackend(asset);
        alert('Media saved and uploaded! 🎉');
        setMedia(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const uploadFileToBackend = async (asset) => {
    const formData = new FormData();
    formData.append('media', {
      uri: asset.uri,
      name: asset.filename || 'media',
      type: asset.mediaType === 'video' ? 'video/mp4' : 'image/jpeg'
    });

    try {
      const response = await axios.post(`${mediaAPIString}/upload/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded:', response.data.location);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera and/or audio</Text>;
  }

  return (
    <View style={styles.container}>
      {!media ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              marginTop: 10,
            }}
          >
            <CameraButton
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <CameraButton
              onPress={() =>
                setFlash(
                  flash === FlashMode.off ? FlashMode.on : FlashMode.off
                )
              }
              icon="flash"
              color={flash === FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: media.uri }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {media ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <CameraButton
              title="Re-take"
              onPress={() => setMedia(null)}
              icon="retweet"
            />
            <CameraButton title="Upload to Cloud" onPress={saveMedia} icon="check" />
          </View>
        ) : (
          <>
            <CameraButton
              title="Take a picture"
              onPress={takePicture}
              icon="camera"
            />
            {isRecording ? (
              <CameraButton
                title="Stop Recording"
                onPress={stopRecording}
                icon="stop"
                iconFamily="MaterialIcons"
              />
            ) : (
              <CameraButton
                title="Record Video"
                onPress={startRecording}
                icon="videocam"
                iconFamily="MaterialIcons"
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
