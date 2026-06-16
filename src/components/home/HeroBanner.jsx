import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const heroImageStyle = {
  borderRadius: 18,
};

function HeroBanner({ banner }) {
  return (
    <ImageBackground
      source={banner.image}
      resizeMode="cover"
      imageStyle={heroImageStyle}
      className="mx-4 mt-5 h-[180px] overflow-hidden rounded-[18px] bg-[#f6efe4]"
    >
      <View className="flex-1 flex-row bg-[#fff8ef33]">
        <View className="w-[56%] px-4 py-4">
          <Text className="text-[10px] font-extrabold  text-[#c08d39]">
            {banner.eyebrow}
          </Text>
          <Text className="mt-2 text-[16px] font-bold leading-[22px] text-[#221d18]">
            {banner.title}
          </Text>
          <Text className="text-[16px] font-bold leading-[20px] text-[#c28d39]">
            {banner.accentTitle}
          </Text>
          <Text className="mt-2 max-w-[155px] text-[11px] font-600 leading-[15px] text-[#655f59] flex-wrap text-left">
           Timeless designs, crafted with care and precision.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            className="mt-4 h-[38px] w-[112px] flex-row items-center justify-center rounded-[14px] bg-[#1f1c18]"
          >
            <Text className="mr-2 text-[13px] font-bold text-white">
              {banner.ctaLabel}
            </Text>
            <ArrowRight size={16} color="#ffffff" strokeWidth={2.3} />
          </TouchableOpacity>
        </View>
        <View className="flex-1" />
      </View>
    </ImageBackground>
  );
}

export default HeroBanner;
