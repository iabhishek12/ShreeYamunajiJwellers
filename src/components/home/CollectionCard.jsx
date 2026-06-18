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
  const isBlueCard = item.dark;
  const backgroundClass = isBlueCard ? 'bg-[#0b63cee7]' : 'bg-[#F97316]';
  const overlayClass = isBlueCard ? 'bg-[#0B63CED9]' : 'bg-[#F97316CC]';

  return (
    <ImageBackground
      source={item.image}
      resizeMode="cover"
      imageStyle={cardImageStyle}
      className={`h-[154px] flex-1 overflow-hidden rounded-[20px] ${backgroundClass}`}
    >
      <View className={`flex-1 px-4 py-4 ${overlayClass}`}>
        <Text className="text-[15px] font-medium leading-[20px] text-white">
          {item.title}
        </Text>
        <Text className="mt-3 text-[11px] leading-[18px] text-[#FFFDF4]">
          {item.description}
        </Text>

        <TouchableOpacity activeOpacity={0.85} className="mt-auto flex-row items-center">
          <Text className="text-[13px] font-bold text-white">
            {item.ctaLabel}
          </Text>
          <ArrowRight
            size={15}
            color="#FFFFFF"
            strokeWidth={2.2}
            style={arrowSpacingStyle}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default CollectionCard;
