import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
export function Page({children,title,subtitle}:{children:React.ReactNode,title:string,subtitle?:string}) {return <ScrollView style={{flex:1,backgroundColor:colors.bg}} contentContainerStyle={{padding:20,paddingBottom:48}}><Text style={s.title}>{title}</Text>{subtitle?<Text style={s.subtitle}>{subtitle}</Text>:null}{children}</ScrollView>}
export function Button({label,onPress,disabled=false}:{label:string,onPress:()=>void,disabled?:boolean}){return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={[s.button,disabled&&{opacity:.45}]}><Text style={s.buttonText}>{label}</Text></Pressable>}
export function Card({children}:{children:React.ReactNode}){return <View style={s.card}>{children}</View>}
export const s=StyleSheet.create({title:{fontSize:29,fontWeight:'800',color:colors.text,marginBottom:8},subtitle:{color:colors.muted,fontSize:15,marginBottom:22,lineHeight:22},button:{backgroundColor:colors.primary,padding:15,borderRadius:14,marginVertical:6,alignItems:'center'},buttonText:{color:'#08111F',fontWeight:'800'},card:{backgroundColor:colors.card,borderColor:colors.border,borderWidth:1,padding:16,borderRadius:18,marginBottom:16},text:{color:colors.text,fontSize:16},muted:{color:colors.muted}});
