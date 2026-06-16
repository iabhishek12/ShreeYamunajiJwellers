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
    <SafeAreaView className="flex-1 bg-[#fbf7f1]">
      <StatusBar barStyle="dark-content" backgroundColor="#fbf7f1" />

      <View className="flex-1 bg-[#fbf7f1]">
        <View
          className="bg-[#fbf7f1] pb-2"
          style={{ paddingTop: Math.max(insets.top, 8) }}
        >
          <HomeHeader />
        </View>

        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="mx-4 mt-2 overflow-hidden rounded-[22px] bg-[#dec38b] px-5 py-5" style={styles.cardShadow}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text style={styles.title}>Wishlist</Text>
                <Text className="mt-2 max-w-[230px] text-[13px] leading-[20px] text-[#5f5142]">
                  Your saved jewelry pieces, ready when the moment feels right.
                </Text>
              </View>
              <View className="h-14 w-14 items-center justify-center rounded-full bg-[#fff6e5]">
                <Heart size={27} color="#bd8934" fill="#bd8934" strokeWidth={1.5} />
              </View>
            </View>

            <View className="mt-5 flex-row justify-between">
              {wishlistInsights.map(item => (
                <View key={item.id} className="w-[31%] rounded-[16px] bg-[#f7e4ba] px-2 py-3">
                  <Text className="text-center text-[18px] font-bold text-[#171411]">
                    {item.id === 'saved' ? items.length : item.value}
                  </Text>
                  <Text className="mt-1 text-center text-[10px] font-bold leading-[13px] text-[#6c5540]">
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mx-4 mt-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Sparkles size={18} color="#bd8934" strokeWidth={1.8} />
              <Text className="ml-2 text-[15px] font-bold text-[#181410]">
                Saved Pieces
              </Text>
            </View>
            <Text className="text-[12px] font-semibold text-[#7a7066]">
              {items.length} items
            </Text>
          </View>

          {items.length === 0 ? (
            <View className="mx-4 mt-5 items-center rounded-[20px] border border-[#d3b574] bg-[#dec38b] px-6 py-12">
              <Heart size={35} color="#bd8934" strokeWidth={1.8} />
              <Text className="mt-4 text-[18px] font-bold text-[#181410]">
                Your wishlist is empty
              </Text>
              <Text className="mt-2 text-center text-[13px] leading-[20px] text-[#62584f]">
                Save rings, pendants, and earrings you love so you can find them later.
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Home')}
                className="mt-5 flex-row items-center rounded-full bg-[#171717] px-5 py-3"
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
                  className="mb-4 w-[48%] overflow-hidden rounded-[18px] border border-[#d3b574] bg-[#dec38b]"
                  style={styles.cardShadow}
                >
                  <View className="relative bg-[#f7e9c7]">
                    <Image
                      source={item.product.gallery[0].image}
                      resizeMode="cover"
                      className="h-[130px] w-full"
                    />
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => dispatch(removeWishlistItem(item.id))}
                      className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white"
                      style={styles.smallShadow}
                    >
                      <Trash2 size={15} color="#2f2924" strokeWidth={1.9} />
                    </TouchableOpacity>
                  </View>

                  <View className="px-3 pb-3 pt-3">
                    <Text
                      numberOfLines={1}
                      className="text-[13px] font-bold text-[#181410]"
                      style={styles.productTitle}
                    >
                      {item.product.title}
                    </Text>

                    <View className="mt-2 flex-row items-center">
                      {[0, 1, 2, 3, 4].map(index => (
                        <Star
                          key={`${item.id}-star-${index}`}
                          size={11}
                          color="#8f6527"
                          fill="#8f6527"
                          strokeWidth={1.4}
                        />
                      ))}
                      <Text className="ml-1 text-[10px] font-medium text-[#5f5142]">
                        {item.product.rating}
                      </Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      className="mt-2 text-[11px] text-[#6b5b4b]"
                    >
                      {item.note}
                    </Text>

                    <View className="mt-3 flex-row items-center justify-between">
                      <Text className="text-[15px] font-bold text-[#111111]">
                        {formatCurrency(item.product.price)}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => handleMoveToCart(item)}
                        className="h-9 w-9 items-center justify-center rounded-full bg-[#171717]"
                      >
                        <ShoppingBag size={16} color="#ffffff" strokeWidth={2} />
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
    fontSize: 28,
    lineHeight: 34,
    color: '#171411',
  },
  productTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
  },
  cardShadow: {
    shadowColor: '#b5965b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  smallShadow: {
    shadowColor: '#5f4c30',
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
