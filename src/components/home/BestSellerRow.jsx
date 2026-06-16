const React = require('react');
const { Image, Text, View } = require('react-native');

function BestSellerRow({ items }) {
  return (
    <View className="mx-4 mb-5 flex-row gap-3">
      {items.map(item => (
        <View
          key={item.id}
          className="flex-1 overflow-hidden rounded-[18px] border border-[#e7dece] bg-white"
        >
          <Image source={item.image} resizeMode="cover" className="h-[110px] w-full" />
          <View className="px-3 py-3">
            <Text className="text-[13px] font-semibold text-[#221e19]">
              {item.title}
            </Text>
            <Text className="mt-1 text-[12px] text-[#b18334]">
              {item.price}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

module.exports = BestSellerRow;
