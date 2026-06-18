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
      className="mx-4 mt-5 h-[180px] overflow-hidden rounded-[18px] bg-[#FFD44D]"
    >
      <View className="flex-1 flex-row">
        <View className="w-[56%] bg-[#FFD44D99] px-4 py-4">
          <Text className="text-[10px] font-extrabold  text-[#087A34]">
            {banner.eyebrow}
          </Text>
          <Text className="mt-2 text-[16px] font-bold leading-[22px] text-[#087A34]">
            {banner.title}
          </Text>
          <Text className="text-[16px] font-bold leading-[20px] text-[#B72516]">
            {banner.accentTitle}
          </Text>
          <Text className="mt-2 max-w-[155px] text-[11px] font-600 leading-[15px] text-[#202020] flex-wrap text-left">
           Timeless designs, crafted with care and precision.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            className="mt-4 h-[38px] w-[112px] flex-row items-center justify-center rounded-[14px] bg-[#087A34]"
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
