import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmojiPicker = ({isVisible, children, onClose}) => {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

export default EmojiPicker

const styles = StyleSheet.create({})