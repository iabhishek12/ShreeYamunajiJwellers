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
  ChevronDown,
  Heart,
  Info,
  Minus,
  Plus,
  Tag,
  Trash2,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import { iconMap } from '../../../components/home/iconMap';
import { cartAssuranceItems, cartBottomNavItems } from '../../../data/mock/cartMock';
import { productDetails } from '../../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearCart,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from '../store/cartSlice';

const formatCurrency = value => `Rs ${Math.round(value).toLocaleString('en-IN')}`;

function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { items, totalQuantity } = useAppSelector(state => state.cart);

  const cartItems = useMemo(
    () =>
      items
        .map(item => {
          const product = productDetails[item.productId];

          if (!product) {
            return null;
          }

          const selectedMetal =
            product.metals.find(metal => metal.id === item.selectedMetalId) ??
            product.metals[0];
          const selectedSize = product.sizes.find(size => size.id === item.selectedSizeId);

          return {
            ...item,
            product,
            selectedMetal,
            selectedSize,
            lineTotal: (item.unitPrice ?? product.price) * item.quantity,
          };
        })
        .filter(Boolean),
    [items],
  );

  const subtotal = cartItems.reduce((total, item) => total + item.lineTotal, 0);
  const taxes = cartItems.length > 0 ? Math.round(subtotal * 0.04) : 0;
  const total = subtotal + taxes;
  const savings = cartItems.length > 0 ? 2999 : 0;

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
          <View className="mx-4 mt-2 flex-row items-center justify-between">
            <Text style={styles.title}>Your Cart ({totalQuantity})</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => dispatch(clearCart())}
              className="flex-row items-center"
            >
              <Text className="mr-2 text-[14px] font-medium text-[#6c625a]">
                Move all to Wishlist
              </Text>
              <Heart size={22} color="#4a443f" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>

          {cartItems.length === 0 ? (
            <View className="mx-4 mt-5 items-center rounded-[15px] border border-[#eee4d8] bg-white px-4 py-8">
              <Text className="text-[18px] font-semibold text-[#181410]">
                Your cart is empty
              </Text>
              <Text className="mt-2 text-center text-[13px] leading-[20px] text-[#70665d]">
                Add your favourite pieces and they will appear here.
              </Text>
            </View>
          ) : (
            cartItems.map(item => (
              <View
                key={item.id}
                className="mx-4 mt-3 flex-row rounded-[15px] border border-[#eee4d8] bg-white p-2.5"
                style={styles.cardShadow}
              >
                <View className="h-[78px] w-[78px] overflow-hidden rounded-[12px] bg-[#f8f0e4]">
                  <Image
                    source={item.product.gallery[0].image}
                    resizeMode="cover"
                    className="h-full w-full"
                  />
                </View>

                <View className="ml-3 flex-1">
                  <View className="flex-row items-start justify-between">
                    <View className="mr-2 flex-1">
                      <Text
                        numberOfLines={1}
                        className="text-[13px] font-bold text-[#181410]"
                        style={styles.productTitle}
                      >
                        {item.product.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="mt-1 text-[11px] text-[#746b63]"
                      >
                        {item.product.subtitle}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => dispatch(removeCartItem(item.id))}
                      className="h-7 w-7 items-center justify-center rounded-full"
                    >
                      <Trash2 size={18} color="#2f2a25" strokeWidth={1.9} />
                    </TouchableOpacity>
                  </View>

                  <Text className="mt-1 text-[14px] font-bold text-[#111111]">
                    {formatCurrency(item.unitPrice ?? item.product.price)}
                  </Text>

                  <View className="mt-2 flex-row flex-wrap items-center">
                    {item.selectedSize ? (
                      <View className="mr-2 flex-row items-center rounded-full border border-[#ede5da] bg-white px-2.5 py-1.5">
                        <Text className="text-[11px] text-[#4c453e]">
                          Size: {item.selectedSize.label}
                        </Text>
                        <ChevronDown
                          size={12}
                          color="#2f2a25"
                          strokeWidth={2}
                          style={styles.optionIcon}
                        />
                      </View>
                    ) : null}

                    <View className="mt-1.5 flex-row items-center rounded-full border border-[#ede5da] bg-white px-2.5 py-1.5">
                      <View
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.selectedMetal.color }}
                      />
                      <Text className="ml-2 text-[11px] text-[#4c453e]">
                        {item.selectedMetal.label}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-2 w-[104px] flex-row items-center justify-between rounded-[12px] border border-[#ece3d8] bg-white px-1.5 py-0.5">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => dispatch(decrementCartItem(item.id))}
                      className="h-7 w-7 items-center justify-center"
                    >
                      <Minus size={15} color="#171411" strokeWidth={2} />
                    </TouchableOpacity>
                    <Text className="text-[14px] font-semibold text-[#171411]">
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => dispatch(incrementCartItem(item.id))}
                      className="h-7 w-7 items-center justify-center"
                    >
                      <Plus size={15} color="#171411" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}

          <View className="mx-4 mt-6 flex-row rounded-[14px] bg-[#fbf4eb] px-2 py-3">
            {cartAssuranceItems.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <View
                  key={item.id}
                  className={`flex-1 flex-row items-center justify-center px-2 ${
                    index < cartAssuranceItems.length - 1
                      ? 'border-r border-[#ded3c5]'
                      : ''
                  }`}
                >
                  <Icon size={20} color="#1d1a17" strokeWidth={1.7} />
                  <View className="ml-2 flex-1">
                    <Text className="text-[10px] font-bold leading-[13px] text-[#29241f]">
                      {item.title}
                    </Text>
                    <Text className="text-[10px] font-bold leading-[13px] text-[#29241f]">
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            className="mx-4 mt-6 rounded-[15px] border border-[#eee4d8] bg-white px-3.5 py-4"
            style={styles.cardShadow}
          >
            <Text className="text-[13px] font-bold tracking-[2px] text-[#1f1b17]">
              PRICE DETAILS
            </Text>

            <View className="mt-4 flex-row justify-between">
              <Text className="text-[14px] text-[#302b26]">
                Subtotal ({totalQuantity} items)
              </Text>
              <Text className="text-[14px] font-semibold text-[#171411]">
                {formatCurrency(subtotal)}
              </Text>
            </View>

            <View className="mt-4 flex-row justify-between">
              <Text className="text-[14px] text-[#302b26]">Shipping</Text>
              <Text className="text-[14px] font-bold text-[#2f8b55]">FREE</Text>
            </View>

            <View className="mt-3 flex-row justify-between">
              <View className="flex-row items-center">
                <Text className="text-[14px] text-[#302b26]">Taxes</Text>
                <Info
                  size={12}
                  color="#80766d"
                  strokeWidth={2}
                  style={styles.infoIcon}
                />
              </View>
              <Text className="text-[14px] font-semibold text-[#171411]">
                {formatCurrency(taxes)}
              </Text>
            </View>

            <View className="my-5 h-px bg-[#eee6dc]" />

            <View className="flex-row justify-between">
              <Text className="text-[16px] font-bold text-[#111111]">Total</Text>
              <Text className="text-[16px] font-bold text-[#111111]">
                {formatCurrency(total)}
              </Text>
            </View>

            <View className="mt-3 flex-row items-center">
              <Tag size={16} color="#4a9a64" strokeWidth={1.9} />
              <Text className="ml-2 text-[12px] font-semibold text-[#4a9a64]">
                You are saving {formatCurrency(savings)} on this order
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Checkout')}
              className={`mt-5 flex-row items-center justify-center rounded-[11px] py-3.5 ${
                cartItems.length === 0 ? 'bg-[#8a8580]' : 'bg-[#171717]'
              }`}
              disabled={cartItems.length === 0}
            >
              <Text className="text-[14px] font-bold tracking-[2px] text-white">
                PROCEED TO CHECKOUT
              </Text>
              <ArrowRight
                size={19}
                color="#ffffff"
                strokeWidth={2}
                style={styles.checkoutIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomBar items={cartBottomNavItems} />
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
    fontSize: 22,
    lineHeight: 25,
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
    shadowColor: '#d8c1a0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  checkoutIcon: {
    marginLeft: 14,
  },
  infoIcon: {
    marginLeft: 5,
  },
  optionIcon: {
    marginLeft: 8,
  },
});

export default CartScreen;
