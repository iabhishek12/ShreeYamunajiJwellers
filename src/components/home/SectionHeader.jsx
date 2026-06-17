import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

function SectionHeader({ actionLabel, onPress, title }) {
  return (
    <View className="mx-4 mt-8 mb-4 flex-row items-center justify-between">
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row items-center"
        onPress={onPress}
      >
        <Text className="mr-2 text-[12px] font-bold tracking-[1.2px] text-[#c08d39]">
          {actionLabel}
        </Text>
        <ArrowRight size={16} color="#c08d39" strokeWidth={2.2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 23,
    lineHeight: 28,
    color: '#171513',
  },
});

export default SectionHeader;
