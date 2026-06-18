import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart } from 'lucide-react-native';
import { productDetails } from '../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addWishlistItem,
  removeWishlistProduct,
} from '../../features/wishlist/store/wishlistSlice';

const contentContainerStyle = {
  paddingLeft: 16,
  paddingRight: 8,
  paddingBottom: 8,
};

const offerPercent = 20;

const getOriginalPrice = price => {
  const numericPrice = Number(String(price).replace(/,/g, ''));

  if (!numericPrice) {
    return price;
  }

  return Math.round(numericPrice / (1 - offerPercent / 100)).toLocaleString(
    'en-IN',
  );
};

function BestSellerRow({ items }) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  const handleToggleWishlist = (event, item) => {
    event?.stopPropagation?.();

    const product = productDetails[item.productId];

    if (!product) {
      return;
    }

    const isWishlisted = wishlistItems.some(
      wishlistItem => wishlistItem.productId === product.id,
    );

    if (isWishlisted) {
      dispatch(removeWishlistProduct(product.id));
      return;
    }

    dispatch(
      addWishlistItem({
        id: `wishlist-${product.id}`,
        productId: product.id,
        note: 'Saved from home',
      }),
    );
  };

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
          className="mr-3 w-[118px] overflow-hidden rounded-[16px] border border-[#F4C23D] bg-[#FFFFFF]"
          style={styles.cardShadow}
        >
          {(() => {
            const isWishlisted = wishlistItems.some(
              wishlistItem => wishlistItem.productId === item.productId,
            );

            return (
          <View className="relative">
            <View className="overflow-hidden bg-[#FFF6DF]">
              <Image source={item.image} resizeMode="cover" className="h-[98px] w-full" />
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={event => handleToggleWishlist(event, item)}
              className="absolute right-2 top-2 h-[25px] w-[25px] items-center justify-center rounded-full bg-white"
              style={styles.iconShadow}
            >
              <Heart
                size={14}
                color={isWishlisted ? '#E42B1B' : '#087A34'}
                fill={isWishlisted ? '#E42B1B' : 'transparent'}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
            );
          })()}

          <View className="px-[10px] pb-[10px] pt-2">
            <Text
              numberOfLines={2}
              className="min-h-[31px] text-[10px] font-medium leading-[15px] text-[#202020]"
            >
              {item.title}
            </Text>

            <Text className="mt-[4px] text-[14px] font-bold text-[#087A34]">
              Rs {item.price}
            </Text>

            <View className="mt-[6px] flex-row items-center">
              <Text className="mr-1 text-[9px] text-[#7A7A7A]" style={styles.originalPrice}>
                Rs {getOriginalPrice(item.price)}
              </Text>
              <View className="rounded-[4px] bg-[#E42B1B] px-[6px] py-[2px] ml-2">
                <Text className="text-[8px] font-bold text-white">
                  {offerPercent}% OFF
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = {
  cardShadow: {
    shadowColor: '#8A6A1B',
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
  originalPrice: {
    textDecorationLine: 'line-through',
  },
};

export default BestSellerRow;
