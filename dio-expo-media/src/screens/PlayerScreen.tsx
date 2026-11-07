import React,{useState} from 'react';
import {Text,Alert,View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useVideoPlayer,VideoView} from 'expo-video';
import {useAudioPlayer,useAudioPlayerStatus,setAudioModeAsync} from 'expo-audio';
import {Page,Button,Card,s} from '../components/UI';
export default function PlayerScreen(){const [videoUri,setVideoUri]=useState<string|null>(null);const [audioUri,setAudioUri]=useState<string|null>(null);const video=useVideoPlayer(videoUri,player=>{player.loop=false});const audio=useAudioPlayer(audioUri);const audioStatus=useAudioPlayerStatus(audio);
 async function pickVideo(){try{const result=await ImagePicker.launchImageLibraryAsync({mediaTypes:['videos'],allowsEditing:false});if(!result.canceled)setVideoUri(result.assets[0].uri)}catch(e){Alert.alert('Erro',String(e))}}
 async function pickAudio(){try{const DocumentPicker=await import('expo-document-picker');const result=await DocumentPicker.getDocumentAsync({type:'audio/*',copyToCacheDirectory:true});if(!result.canceled){await setAudioModeAsync({playsInSilentMode:true});setAudioUri(result.assets[0].uri)}}catch(e){Alert.alert('Erro',String(e))}}
 return <Page title="🎬 Player multimídia" subtitle="Assista a vídeos e ouça músicas armazenadas no aparelho."><Card><Text style={s.text}>Vídeo</Text><Button label="📂 Escolher vídeo" onPress={()=>{void pickVideo()}}/>{videoUri?<View style={{height:240,marginTop:12}}><VideoView player={video} style={{flex:1}} allowsFullscreen allowsPictureInPicture nativeControls/></View>:<Text style={s.muted}>Selecione um vídeo para começar.</Text>}</Card><Card><Text style={s.text}>Áudio</Text><Button label="🎵 Escolher áudio" onPress={()=>{void pickAudio()}}/>{audioUri?<><Text style={s.muted}>{audioUri.split('/').pop()}</Text><Button label={audioStatus.playing?'⏸ Pausar':'▶ Reproduzir'} onPress={()=>audioStatus.playing?audio.pause():audio.play()}/><Button label="⏹ Reiniciar" onPress={()=>{void audio.seekTo(0);audio.pause()}}/></>:<Text style={s.muted}>Selecione um arquivo de áudio.</Text>}</Card></Page>
}
