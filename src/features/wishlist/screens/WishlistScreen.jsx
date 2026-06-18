import React, { useMemo } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import {
  wishlistBottomNavItems,
  wishlistInsights,
} from '../../../data/mock/wishlistMock';
import { productDetails } from '../../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart } from '../../cart/store/cartSlice';
import { removeWishlistItem } from '../store/wishlistSlice';

const green = '#087A34';
const gold = '#F4C23D';

const formatCurrency = value => `Rs ${Math.round(value).toLocaleString('en-IN')}`;

function WishlistScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  const items = useMemo(
    () =>
      wishlistItems
        .map(item => {
          const product = productDetails[item.productId];

          if (!product) {
            return null;
          }

          const selectedMetal =
            product.metals.find(metal => metal.id === product.defaultMetal) ??
            product.metals[0];
          const selectedSize =
            product.sizes.find(size => size.id === product.defaultSize) ??
            product.sizes[0];

          return {
            ...item,
            product,
            selectedMetal,
            selectedSize,
          };
        })
        .filter(Boolean),
    [wishlistItems],
  );

  const handleMoveToCart = item => {
    dispatch(
      addToCart({
        productId: item.product.id,
        selectedMetalId: item.selectedMetal.id,
        selectedSizeId: item.selectedSize?.id ?? null,
        quantity: 1,
      }),
    );
    dispatch(removeWishlistItem(item.id));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#087A34]">
      <StatusBar barStyle="light-content" backgroundColor="#087A34" />

      <View className="flex-1 bg-[#FFFDF4]">
        <View
          className="bg-[#087A34] pb-3"
          style={{ paddingTop: Math.max(insets.top, 4) }}
        >
          <HomeHeader />
        </View>

        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="mx-4 mt-2 overflow-hidden rounded-[18px] border border-[#F4C23D] bg-white px-4 py-4" style={styles.cardShadow}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text style={styles.title}>Wishlist</Text>
                <Text className="mt-1.5 max-w-[220px] text-[12px] leading-[18px] text-[#202020]">
                  Your saved jewelry pieces, ready when the moment feels right.
                </Text>
              </View>
              <View className="h-11 w-11 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
                <Heart size={22} color={green} fill={green} strokeWidth={1.5} />
              </View>
            </View>

            <View className="mt-4 flex-row justify-between">
              {wishlistInsights.map(item => (
                <View key={item.id} className="w-[31%] rounded-[13px] border border-[#F4C23D] bg-[#FFF6DF] px-2 py-2.5">
                  <Text className="text-center text-[15px] font-bold text-[#087A34]">
                    {item.id === 'saved' ? items.length : item.value}
                  </Text>
                  <Text className="mt-0.5 text-center text-[9px] font-bold leading-[12px] text-[#202020]">
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mx-4 mt-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Sparkles size={18} color={gold} strokeWidth={1.8} />
              <Text className="ml-2 text-[15px] font-bold text-[#087A34]">
                Saved Pieces
              </Text>
            </View>
            <Text className="text-[12px] font-semibold text-[#202020]">
              {items.length} items
            </Text>
          </View>

          {items.length === 0 ? (
            <View className="mx-4 mt-5 items-center rounded-[20px] border border-[#F4C23D] bg-white px-6 py-12">
              <Heart size={35} color={green} strokeWidth={1.8} />
              <Text className="mt-4 text-[18px] font-bold text-[#087A34]">
                Your wishlist is empty
              </Text>
              <Text className="mt-2 text-center text-[13px] leading-[20px] text-[#202020]">
                Save rings, pendants, and earrings you love so you can find them later.
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Home')}
                className="mt-5 flex-row items-center rounded-[14px] border border-[#F4C23D] bg-[#087A34] px-5 py-3"
              >
                <Text className="text-[12px] font-bold text-white">EXPLORE NOW</Text>
                <ArrowRight
                  size={15}
                  color="#ffffff"
                  strokeWidth={2}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="mx-4 mt-3 flex-row flex-wrap justify-between">
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.92}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      productId: item.product.id,
                    })
                  }
                  className="mb-3 w-[48%] overflow-hidden rounded-[16px] border border-[#F4C23D] bg-white"
                  style={styles.cardShadow}
                >
                  <View className="relative bg-[#FFF6DF]">
                    <Image
                      source={item.product.gallery[0].image}
                      resizeMode="cover"
                      className="h-[96px] w-full"
                    />
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => dispatch(removeWishlistItem(item.id))}
                      className="absolute right-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-white"
                      style={styles.smallShadow}
                    >
                      <Trash2 size={13} color="#E42B1B" strokeWidth={1.9} />
                    </TouchableOpacity>
                  </View>

                  <View className="px-2.5 pb-2.5 pt-2.5">
                    <Text
                      numberOfLines={1}
                      className="text-[12px] font-bold text-[#087A34]"
                      style={styles.productTitle}
                    >
                      {item.product.title}
                    </Text>

                    <View className="mt-1.5 flex-row items-center">
                      {[0, 1, 2, 3, 4].map(index => (
                        <Star
                          key={`${item.id}-star-${index}`}
                          size={10}
                          color={gold}
                          fill={gold}
                          strokeWidth={1.4}
                        />
                      ))}
                      <Text className="ml-1 text-[10px] font-medium text-[#202020]">
                        {item.product.rating}
                      </Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      className="mt-1.5 text-[10px] text-[#202020]"
                    >
                      {item.note}
                    </Text>

                    <View className="mt-2.5 flex-row items-center justify-between">
                      <Text className="text-[13px] font-bold text-[#087A34]">
                        {formatCurrency(item.product.price)}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handleMoveToCart(item)}
                        className="h-8 w-8 items-center justify-center rounded-full bg-[#087A34]"
                      >
                        <ShoppingBag size={14} color="#ffffff" strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <BottomBar items={wishlistBottomNavItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 23,
    lineHeight: 29,
    color: green,
  },
  productTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
  },
  cardShadow: {
    shadowColor: green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  smallShadow: {
    shadowColor: gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default WishlistScreen;
