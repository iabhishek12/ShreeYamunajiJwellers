import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const cardImageStyle = {
  borderRadius: 20,
};

const arrowSpacingStyle = {
  marginLeft: 8,
};

function CollectionCard({ item }) {
  return (
    <ImageBackground
      source={item.image}
      resizeMode="cover"
      imageStyle={cardImageStyle}
      className={`h-[154px] flex-1 overflow-hidden rounded-[20px] ${
        item.dark ? 'bg-[#09100e]' : 'bg-[#f4ede2]'
      }`}
    >
      <View className={`flex-1 px-4 py-4 ${item.dark ? 'bg-[#07100cb8]' : 'bg-[#fff9f133]'}`}>
        <Text className={`text-[15px] font-medium leading-[20px] ${item.dark ? 'text-white' : 'text-[#211d19]'}`}>
          {item.title}
        </Text>
        <Text className={`mt-3 text-[11px] leading-[18px] ${item.dark ? 'text-[#f0ece7]' : 'text-[#67615b]'}`}>
          {item.description}
        </Text>

        <TouchableOpacity activeOpacity={0.85} className="mt-auto flex-row items-center">
          <Text className={`text-[13px] font-bold ${item.dark ? 'text-white' : 'text-[#1f1b17]'}`}>
            {item.ctaLabel}
          </Text>
          <ArrowRight
            size={15}
            color={item.dark ? '#ffffff' : '#1f1b17'}
            strokeWidth={2.2}
            style={arrowSpacingStyle}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default CollectionCard;
