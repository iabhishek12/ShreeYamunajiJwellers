const React = require('react');
const { Image, Text, TouchableOpacity, View } = require('react-native');
const { ArrowRight } = require('lucide-react-native');

function HeroBanner({ banner }) {
  return (
    <View className="mx-4 mt-5 overflow-hidden rounded-[18px] bg-[#f6efe4]">
      <View className="flex-row">
        <View className="flex-1 px-4 py-4">
          <Text className="text-[11px] font-extrabold tracking-[1.8px] text-[#c08d39]">
            {banner.eyebrow}
          </Text>
          <Text className="mt-2 text-[17px] font-medium leading-[22px] text-[#221d18]">
            {banner.title}
          </Text>
          <Text className="text-[17px] font-semibold leading-[22px] text-[#c28d39]">
            {banner.accentTitle}
          </Text>
          <Text className="mt-3 max-w-[150px] text-[12px] leading-[20px] text-[#655f59]">
            {banner.description}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            className="mt-4 h-[38px] w-[112px] flex-row items-center justify-center rounded-[14px] bg-[#1f1c18]"
          >
            <Text className="mr-2 text-[14px] font-bold text-white">
              {banner.ctaLabel}
            </Text>
            <ArrowRight size={16} color="#ffffff" strokeWidth={2.3} />
          </TouchableOpacity>
        </View>

        <Image
          source={banner.image}
          resizeMode="cover"
          className="h-[170px] w-[160px]"
        />
      </View>
    </View>
  );
}

module.exports = HeroBanner;
