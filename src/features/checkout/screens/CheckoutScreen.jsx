import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
  Tag,
  Truck,
  Wallet,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import { cartBottomNavItems } from '../../../data/mock/cartMock';
import {
  checkoutExpectedDelivery,
  checkoutOffers,
  checkoutPaymentMethods,
  checkoutSteps,
} from '../../../data/mock/checkoutMock';
import { productDetails } from '../../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearCart } from '../../cart/store/cartSlice';
import { createMockOrderFromCheckout } from '../../orders/services/ordersService';
import { addOrder } from '../../orders/store/ordersSlice';

const formatCurrency = value => `Rs ${Math.round(value).toLocaleString('en-IN')}`;

const paymentIconMap = {
  card: CreditCard,
  cash: Banknote,
  wallet: Wallet,
};

const green = '#087A34';

function CheckoutScreen({ navigation, route }) {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { items, totalQuantity } = useAppSelector(state => state.cart);
  const { addresses, selectedAddressId } = useAppSelector(state => state.addressBook);
  const [selectedPaymentId, setSelectedPaymentId] = useState('card');
  const [selectedOfferId, setSelectedOfferId] = useState('welcome');
  const [couponCode, setCouponCode] = useState('YAMUNA10');
  const [couponMessage, setCouponMessage] = useState('YAMUNA10 applied');
  const [giftWrapEnabled] = useState(true);
  const selectedAddress =
    addresses.find(address => address.id === selectedAddressId) ?? addresses[0];

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
          const unitPrice = item.unitPrice ?? product.price;

          return {
            ...item,
            product,
            selectedMetal,
            selectedSize,
            unitPrice,
            lineTotal: unitPrice * item.quantity,
          };
        })
        .filter(Boolean),
    [items],
  );

  const subtotal = cartItems.reduce((total, item) => total + item.lineTotal, 0);
  const deliveryFee = 0;
  const offerDiscount = cartItems.length > 0 && selectedOfferId === 'welcome'
    ? Math.round(subtotal * 0.1)
    : 0;
  const giftWrapFee = giftWrapEnabled && cartItems.length > 0 ? 99 : 0;
  const taxes = cartItems.length > 0 ? Math.round((subtotal - offerDiscount) * 0.04) : 0;
  const total = subtotal - offerDiscount + deliveryFee + giftWrapFee + taxes;
  const appliedOffer = checkoutOffers.find(offer => offer.id === selectedOfferId);

  useEffect(() => {
    const nextOfferId = route.params?.selectedOfferIdFromOffers;
    const nextCouponCode = route.params?.couponCodeFromOffers;

    if (!nextOfferId || !nextCouponCode) {
      return;
    }

    setSelectedOfferId(nextOfferId);
    setCouponCode(nextCouponCode);
    setCouponMessage(`${nextCouponCode} applied`);
    navigation.setParams({
      selectedOfferIdFromOffers: undefined,
      couponCodeFromOffers: undefined,
    });
  }, [navigation, route.params?.couponCodeFromOffers, route.params?.selectedOfferIdFromOffers]);

  const handleApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();
    const matchedOffer = checkoutOffers.find(offer => offer.code === normalizedCode);

    if (matchedOffer) {
      setSelectedOfferId(matchedOffer.id);
      setCouponCode(matchedOffer.code);
      setCouponMessage(`${matchedOffer.code} applied`);
    } else {
      setCouponMessage('Invalid coupon code');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      return;
    }

    const order = createMockOrderFromCheckout({
      cartItems,
      deliveryFee,
      giftWrapFee,
      offerDiscount,
      paymentId: selectedPaymentId,
      selectedAddress,
      subtotal,
      taxes,
      total,
    });

    dispatch(addOrder(order));
    dispatch(clearCart());
    navigation.navigate('Orders');
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
          <View className="mx-4 mt-2">
            <Text style={styles.title}>Checkout</Text>
            <Text className="mt-1 text-[13px] text-[#202020]">
              Secure checkout for {totalQuantity} item{totalQuantity === 1 ? '' : 's'}
            </Text>
          </View>

          <View className="mx-4 mt-4 flex-row items-center rounded-[18px] border border-[#F4C23D] bg-white px-4 py-4">
            {checkoutSteps.map((step, index) => (
              <View key={step.id} className="flex-1 flex-row items-center">
                <View
                  className={`h-7 w-7 items-center justify-center rounded-full ${
                    step.done ? 'bg-[#087A34]' : 'border border-[#F4C23D] bg-white'
                  }`}
                >
                  {step.done ? (
                    <Check size={15} color="#ffffff" strokeWidth={2.2} />
                  ) : (
                    <Text className="text-[11px] font-bold text-[#087A34]">
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text
                  numberOfLines={1}
                  className={`ml-2 text-[11px] font-bold ${
                    step.done ? 'text-[#087A34]' : 'text-[#202020]'
                  }`}
                >
                  {step.label}
                </Text>
                {index < checkoutSteps.length - 1 ? (
                  <View className="mx-2 h-px flex-1 bg-[#F4C23D]" />
                ) : null}
              </View>
            ))}
          </View>

          <View className="mx-4 mt-5 rounded-[18px] border border-[#F4C23D] bg-white p-4" style={styles.cardShadow}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
                  <MapPin size={20} color={green} strokeWidth={1.8} />
                </View>
                <View className="ml-3">
                  <Text className="text-[15px] font-bold text-[#087A34]">
                    Delivery Address
                  </Text>
                  {selectedAddress ? (
                    <Text className="mt-1 text-[12px] text-[#202020]">
                      {selectedAddress.label}
                    </Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('AddressBook')}
                className="flex-row items-center"
              >
                <Text className="text-[12px] font-bold text-[#087A34]">CHANGE</Text>
                <ChevronRight size={15} color={green} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {selectedAddress ? (
              <>
                <Text className="mt-4 text-[14px] font-semibold text-[#087A34]">
                  {selectedAddress.name}
                </Text>
                <Text className="mt-1 text-[13px] leading-[20px] text-[#202020]">
                  {selectedAddress.line1}
                </Text>
                <Text className="text-[13px] leading-[20px] text-[#202020]">
                  {selectedAddress.line2}
                </Text>
                <View className="mt-3 flex-row items-center">
                  <Phone size={14} color={green} strokeWidth={1.8} />
                  <Text className="ml-2 text-[12px] font-medium text-[#202020]">
                    {selectedAddress.phone}
                  </Text>
                </View>
              </>
            ) : (
              <Text className="mt-4 text-[13px] leading-[20px] text-[#202020]">
                Add a delivery address to continue checkout.
              </Text>
            )}
          </View>

          <View className="mx-4 mt-5 rounded-[18px] border border-[#F4C23D] bg-white p-4" style={styles.cardShadow}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-10 w-10 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
                  <Truck size={20} color={green} strokeWidth={1.8} />
                </View>
                <View className="ml-3">
                  <Text className="text-[15px] font-bold text-[#087A34]">
                    {checkoutExpectedDelivery.title}
                  </Text>
                  <Text className="mt-1 text-[12px] text-[#202020]">
                    {checkoutExpectedDelivery.subtitle}
                  </Text>
                </View>
              </View>
              <Text className="text-[12px] font-bold text-[#087A34]">
                {checkoutExpectedDelivery.priceLabel}
              </Text>
            </View>
            <Text className="mt-4 rounded-[14px] border border-[#F4C23D] bg-[#FFF6DF] px-3 py-3 text-[12px] leading-[18px] text-[#202020]">
              Your order will be packed in tamper-safe jewelry packaging and shipped with tracking.
            </Text>
          </View>

          <View className="mx-4 mt-5 rounded-[16px] border border-[#F4C23D] bg-white p-3.5" style={styles.cardShadow}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Tag size={20} color={green} strokeWidth={1.8} />
                <Text className="ml-2 text-[14px] font-semibold text-[#087A34]">
                  Offers & Rewards
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-3 text-[11px] font-semibold text-[#087A34]">
                  Saved {formatCurrency(offerDiscount)}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('Offers', { selectedOfferId })
                  }
                  className="flex-row items-center"
                >
                  <Text className="text-[11px] font-semibold text-[#087A34]">SEE ALL</Text>
                  <ChevronRight size={14} color={green} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-3 flex-row items-center rounded-[13px] border border-[#F4C23D] bg-white px-3 py-2">
              <TextInput
                value={couponCode}
                onChangeText={value => {
                  setCouponCode(value.toUpperCase());
                  setCouponMessage('');
                }}
                placeholder="Enter coupon code"
                placeholderTextColor="#202020"
                autoCapitalize="characters"
                className="flex-1 text-[12px] font-medium text-[#202020]"
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleApplyCoupon}
                className="ml-3 rounded-full bg-[#087A34] px-3.5 py-2"
              >
                <Text className="text-[11px] font-semibold text-white">APPLY</Text>
              </TouchableOpacity>
            </View>

            {couponMessage ? (
              <Text
                className={`mt-2 text-[11px] font-medium ${
                  appliedOffer?.code === couponCode.trim().toUpperCase()
                    ? 'text-[#087A34]'
                    : 'text-[#b54b38]'
                }`}
              >
                {couponMessage}
              </Text>
            ) : null}

            {checkoutOffers.slice(0, 2).map(offer => {
              const selected = offer.id === selectedOfferId;

              return (
                <TouchableOpacity
                  key={offer.id}
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedOfferId(offer.id);
                    setCouponCode(offer.code);
                    setCouponMessage(`${offer.code} applied`);
                  }}
                  className={`mt-2.5 rounded-[13px] border px-3 py-2.5 ${
                    selected
                      ? 'border-[#087A34] bg-[#FFF6DF]'
                      : 'border-[#F4C23D] bg-white'
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[12px] font-semibold text-[#087A34]">
                      {offer.title}
                    </Text>
                    {selected ? (
                      <CheckCircle2 size={16} color={green} strokeWidth={2} />
                    ) : null}
                  </View>
                  <Text className="mt-1 text-[11px] leading-[16px] text-[#202020]">
                    {offer.subtitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="mx-4 mt-5 rounded-[18px] border border-[#F4C23D] bg-white p-4" style={styles.cardShadow}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <CreditCard size={20} color={green} strokeWidth={1.8} />
                <Text className="ml-2 text-[15px] font-bold text-[#087A34]">
                  Payment Method
                </Text>
              </View>
              <ShieldCheck size={20} color={green} strokeWidth={1.8} />
            </View>

            {checkoutPaymentMethods.map(method => {
              const selected = method.id === selectedPaymentId;
              const Icon = paymentIconMap[method.icon];

              return (
                <TouchableOpacity
                  key={method.id}
                  activeOpacity={0.9}
                  onPress={() => setSelectedPaymentId(method.id)}
                  className={`mt-3 flex-row items-center justify-between rounded-[15px] border px-3 py-3 ${
                    selected
                      ? 'border-[#087A34] bg-[#FFF6DF]'
                      : 'border-[#F4C23D] bg-white'
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="h-9 w-9 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
                      <Icon size={18} color={green} strokeWidth={1.8} />
                    </View>
                    <View className="ml-3">
                      <Text className="text-[13px] font-bold text-[#087A34]">
                        {method.title}
                      </Text>
                      <Text className="mt-1 text-[12px] text-[#202020]">
                        {method.subtitle}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`h-5 w-5 items-center justify-center rounded-full border ${
                      selected ? 'border-[#087A34]' : 'border-[#F4C23D]'
                    }`}
                  >
                    {selected ? (
                      <View className="h-2.5 w-2.5 rounded-full bg-[#087A34]" />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="mx-4 mt-5 rounded-[18px] border border-[#F4C23D] bg-white p-4" style={styles.cardShadow}>
            <Text className="text-[15px] font-bold text-[#087A34]">
              Review Items
            </Text>

            {cartItems.map(item => (
              <View key={item.id} className="mt-4 flex-row items-center">
                <View className="h-[54px] w-[54px] overflow-hidden rounded-[12px] bg-[#FFF6DF]">
                  <Image
                    source={item.product.gallery[0].image}
                    resizeMode="cover"
                    className="h-full w-full"
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-[13px] font-bold text-[#087A34]"
                  >
                    {item.product.title}
                  </Text>
                  <Text className="mt-1 text-[12px] text-[#202020]">
                    Qty {item.quantity}
                    {item.selectedSize ? ` | Size ${item.selectedSize.label}` : ''}
                  </Text>
                </View>
                <Text className="text-[13px] font-bold text-[#087A34]">
                  {formatCurrency(item.lineTotal)}
                </Text>
              </View>
            ))}
          </View>

          <View className="mx-4 mt-5 rounded-[18px] border border-[#F4C23D] bg-white p-4" style={styles.cardShadow}>
            <Text className="text-[14px] font-bold text-[#087A34]">
              ORDER SUMMARY
            </Text>

            <View className="mt-4 flex-row justify-between">
              <Text className="text-[14px] text-[#202020]">Subtotal</Text>
              <Text className="text-[14px] font-semibold text-[#087A34]">
                {formatCurrency(subtotal)}
              </Text>
            </View>
            <View className="mt-3 flex-row justify-between">
              <Text className="text-[14px] text-[#202020]">Offer Discount</Text>
              <Text className="text-[14px] font-bold text-[#087A34]">
                - {formatCurrency(offerDiscount)}
              </Text>
            </View>
            <View className="mt-3 flex-row justify-between">
              <Text className="text-[14px] text-[#202020]">Delivery</Text>
              <Text className="text-[14px] font-semibold text-[#087A34]">
                {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
              </Text>
            </View>
            
            <View className="mt-3 flex-row justify-between">
              <Text className="text-[14px] text-[#202020]">Taxes</Text>
              <Text className="text-[14px] font-semibold text-[#087A34]">
                {formatCurrency(taxes)}
              </Text>
            </View>

            <View className="my-5 h-px bg-[#F4C23D]" />

            <View className="flex-row justify-between">
              <Text className="text-[18px] font-bold text-[#087A34]">Payable Total</Text>
              <Text className="text-[18px] font-bold text-[#087A34]">
                {formatCurrency(total)}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handlePlaceOrder}
              className={`mt-6 flex-row items-center justify-center rounded-[13px] py-4 ${
                cartItems.length === 0 ? 'bg-[#8a8580]' : 'bg-[#087A34]'
              }`}
              disabled={cartItems.length === 0}
            >
              <Text className="text-[15px] font-bold tracking-[2px] text-white">
                PLACE ORDER
              </Text>
              <ArrowRight
                size={21}
                color="#ffffff"
                strokeWidth={2}
                style={styles.ctaIcon}
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
    fontSize: 26,
    lineHeight: 32,
    color: green,
  },
  cardShadow: {
    shadowColor: green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  ctaIcon: {
    marginLeft: 14,
  },
});

export default CheckoutScreen;
