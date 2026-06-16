import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart, Plus, Star } from 'lucide-react-native';

const contentContainerStyle = {
  paddingLeft: 16,
  paddingRight: 8,
  paddingBottom: 8,
};

function BestSellerRow({ items }) {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    >
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.92}
          onPress={() =>
            navigation.navigate('ProductDetails', { productId: item.productId })
          }
          className="mr-4 w-[132px] rounded-[22px] border border-[#efe6d8] bg-[#fffdf9] px-3 py-3"
          style={styles.cardShadow}
        >
          <View className="relative">
            <View className="overflow-hidden rounded-[18px] bg-[#f8f1e6]">
              <Image source={item.image} resizeMode="cover" className="h-[96px] w-full" />
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              className="absolute right-2 top-2 h-[28px] w-[28px] items-center justify-center rounded-full bg-white"
              style={styles.iconShadow}
            >
              <Heart size={15} color="#2a2724" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <Text
            numberOfLines={1}
            className="mt-3 text-[11px] font-medium text-[#26221e]"
          >
            {item.title}
          </Text>

          <View className="mt-2 flex-row items-center">
            <View className="flex-row">
              {[0, 1, 2, 3, 4].map(index => (
                <Star
                  key={`${item.id}-star-${index}`}
                  size={11}
                  color="#c49039"
                  fill="#c49039"
                  strokeWidth={1.6}
                />
              ))}
            </View>
            <Text className="ml-1 text-[10px] text-[#4d4742]">
              {item.rating} ({item.reviews})
            </Text>
          </View>

          <Text
            numberOfLines={2}
            className="mt-2 min-h-[32px] text-[10px] leading-[15px] text-[#7c756e]"
          >
            {item.subtitle}
          </Text>

          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-[16px] font-bold text-[#171513]">
             Rs {item.price}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              className="h-[32px] w-[32px] items-center justify-center rounded-full bg-[#1e1c19]"
            >
              <Plus size={18} color="#ffffff" strokeWidth={2.3} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = {
  cardShadow: {
    shadowColor: '#6f5430',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  iconShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
};

export default BestSellerRow;
