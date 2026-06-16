import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heart, Plus, Star } from 'lucide-react-native';
import { productDetails } from '../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../features/cart/store/cartSlice';
import {
  addWishlistItem,
  removeWishlistProduct,
} from '../../features/wishlist/store/wishlistSlice';

function NewArrivalsSection({ section }) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  const handleAddToCart = (event, item) => {
    event?.stopPropagation?.();

    const product = productDetails[item.productId];

    if (!product) {
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        selectedMetalId: product.defaultMetal,
        selectedSizeId: product.defaultSize,
        quantity: 1,
        unitPrice: product.price,
      }),
    );
  };

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
        note: 'Saved from new arrivals',
      }),
    );
  };

  return (
    <View className="mx-2 mt-4 rounded-[28px] bg-[#fbf7f1] px-3 pb-4 pt-5">
      <Text className="text-center text-[10px] font-bold tracking-[3.2px] text-[#c79635]">
        {section.label}
      </Text>

      <Text style={styles.title} className="mt-3 text-center">
        {section.title}
      </Text>

      <Text className="mt-3 px-5 text-center text-[14px] leading-[24px] text-[#6f6a63]">
        {section.description}
      </Text>

      <View className="mt-6 flex-row flex-wrap justify-between">
        {section.items.map(item => {
          const isWishlisted = wishlistItems.some(
            wishlistItem => wishlistItem.productId === item.productId,
          );

          return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.92}
            onPress={() =>
              navigation.navigate('ProductDetails', { productId: item.productId })
            }
            className="mb-3 w-[48%] overflow-hidden rounded-[20px] border border-[#efe6d8] bg-[#fffdf9]"
            style={styles.cardShadow}
          >
            <View className="relative">
              <Image
                source={item.image}
                resizeMode="cover"
                className="h-[138px] w-full bg-[#f7f0e6]"
              />
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={event => handleToggleWishlist(event, item)}
                className="absolute right-2 top-2 h-[30px] w-[30px] items-center justify-center rounded-full bg-white"
                style={styles.iconShadow}
              >
                <Heart
                  size={16}
                  color={isWishlisted ? '#bd8934' : '#534b44'}
                  fill={isWishlisted ? '#bd8934' : 'transparent'}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>

            <View className="px-3 pb-3 pt-[10px]">
              <Text
                numberOfLines={1}
                className="text-[14px] font-medium text-[#26221e]"
              >
                {item.title}
              </Text>

              <View className="mt-[6px] flex-row items-center">
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
                className="mt-[6px] min-h-[34px] text-[11px] leading-[16px] text-[#7c756e]"
              >
                {item.subtitle}
              </Text>

              <View className="mt-[10px] flex-row items-center justify-between">
                <Text className="text-[15px] font-bold text-[#171513]">
                  Rs {item.price}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={event => handleAddToCart(event, item)}
                  className="h-[30px] w-[30px] items-center justify-center rounded-full bg-[#1e1c19]"
                >
                  <Plus size={16} color="#ffffff" strokeWidth={2.3} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          );
        })}
      </View>
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
    fontSize: 27,
    lineHeight: 34,
    color: '#26211c',
  },
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
});

export default NewArrivalsSection;
