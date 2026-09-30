import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SaludoDos from './SaludoDos'

export default function Saludo() {
  return (
    <View>
      <Text>Este es el saludo 1</Text>
      <Text>Este es el saludo 11</Text>
      <Text>Este es el saludo 111</Text>
      <TouchableOpacity><Text>Esto es un boton?</Text></TouchableOpacity>
      <SaludoDos></SaludoDos>
    </View>
  )
}

const styles = StyleSheet.create({})