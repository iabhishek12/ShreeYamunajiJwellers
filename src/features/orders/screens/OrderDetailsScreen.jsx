import React from 'react';
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
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  Download,
  Map,
  MapPin,
  MessageCircle,
  Package,
  Tags,
  Truck,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import { categoryBottomNavItems } from '../../../data/mock/categoryMock';
import { productDetails } from '../../../data/mock/productMock';
import { useAppSelector } from '../../../store/hooks';

const fallbackImage = require('../../../assets/images/products/signature-pendant.jpg.jpeg');

const gold = '#bd8934';
const darkGold = '#a66d16';
const green = '#2f8b55';
const ink = '#191714';
const ivory = '#fbf7f1';

const detailsBottomNavItems = categoryBottomNavItems.map(item => ({
  ...item,
  active: item.id === 'orders',
}));

const statusStyles = {
  Delivered: {
    icon: Truck,
    backgroundColor: '#e5f5eb',
    color: '#2f684f',
  },
  Shipped: {
    icon: Package,
    backgroundColor: '#e7f0fb',
    color: '#2e5e91',
  },
  Processing: {
    icon: Package,
    backgroundColor: '#fff5dc',
    color: '#8a661e',
  },
  'Return Completed': {
    icon: Truck,
    backgroundColor: '#ededed',
    color: '#4e4a46',
  },
};

const timelineSteps = [
  { id: 'placed', label: 'Order Placed', dateOffset: 0, icon: Package },
  { id: 'confirmed', label: 'Confirmed', dateOffset: 0, icon: CheckCircle2 },
  { id: 'shipped', label: 'Shipped', dateOffset: 2, icon: Truck },
  { id: 'out', label: 'Out for Delivery', dateOffset: 5, icon: Truck },
  { id: 'delivered', label: 'Delivered', dateOffset: 5, icon: Truck },
];

const formatCurrency = value => `Rs ${Math.round(value || 0).toLocaleString('en-IN')}`;

const getOrderQuantity = order =>
  order.items.reduce((total, item) => total + item.quantity, 0);

const getTimelineDate = (order, offset) => {
  const base = new Date(order.createdAt || Date.now());
  base.setDate(base.getDate() + offset);

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
  }).format(base);
};

const getCompletedStepCount = status => {
  if (status === 'Delivered') {
    return 5;
  }
  if (status === 'Shipped') {
    return 3;
  }
  if (status === 'Processing') {
    return 2;
  }

  return 1;
};

function OrderItemRow({ item, isLast }) {
  const product = productDetails[item.productId];
  const image = product?.gallery?.[0]?.image || fallbackImage;
  const title = item.title || product?.title || 'Jewellery Item';
  const detailParts = [
    item.selectedSizeLabel ? `Size: ${item.selectedSizeLabel}` : null,
    item.selectedMetalLabel || 'Yellow Gold',
  ].filter(Boolean);

  return (
    <View
      className={`mt-[14px] flex-row items-center ${
        isLast ? '' : 'border-b border-[#ece4d9] pb-3'
      }`}
    >
      <Image
        source={image}
        resizeMode="cover"
        className="h-[66px] w-[76px] rounded-[10px] bg-[#f6efe6]"
      />
      <View className="ml-[13px] flex-1">
        <Text numberOfLines={1} className="text-[14px] font-semibold text-[#191714]">
          {title}
        </Text>
        <Text numberOfLines={1} className="mt-[7px] text-[12px] font-semibold text-[#6f6860]">
          {detailParts.join(' | ')}
        </Text>
      </View>
      <View className="ml-[10px] items-end">
        <Text className="text-[14px] font-black text-[#191714]">
          {formatCurrency(item.lineTotal)}
        </Text>
        <Text className="mt-[10px] text-[12px] font-extrabold text-[#6f6860]">
          Qty: {item.quantity}
        </Text>
      </View>
    </View>
  );
}

function OrderDetailsScreen({ navigation, route }) {
  const orderId = route.params?.orderId;
  const order = useAppSelector(state =>
    state.orders.items.find(item => item.id === orderId),
  );

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-[#fbf7f1]">
        <StatusBar barStyle="dark-content" backgroundColor={ivory} />
        <View className="flex-1 justify-center px-6">
          <Text style={styles.screenTitle} className="text-[24px] font-bold leading-[25px] text-[#191714]">
            Order Details
          </Text>
          <Text className="mt-2 text-[13px] font-bold text-[#6f6860]">
            This order is no longer available.
          </Text>
          <TouchableOpacity
            activeOpacity={0.86}
            className="mt-[18px] self-start rounded-[12px] bg-[#191714] px-4 py-3"
            onPress={() => navigation.navigate('Orders')}
          >
            <Text className="text-[13px] font-bold text-white">Back to Orders</Text>
          </TouchableOpacity>
        </View>
        <BottomBar items={detailsBottomNavItems} />
      </SafeAreaView>
    );
  }

  const summary = order.summary || {
    subtotal: order.items.reduce((total, item) => total + item.lineTotal, 0),
    offerDiscount: 0,
    deliveryFee: 0,
    giftWrapFee: 0,
    taxes: 0,
    total: order.total,
  };
  const address = order.address;
  const status = statusStyles[order.status] || statusStyles.Processing;
  const StatusIcon = status.icon;
  const completedStepCount = getCompletedStepCount(order.status);
  const itemCount = getOrderQuantity(order);

  return (
    <SafeAreaView className="flex-1 bg-[#fbf7f1]">
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View className="flex-row items-start">
          <TouchableOpacity
            activeOpacity={0.82}
            className="mr-2 mt-0.5 h-8 w-8 items-center justify-center rounded-full bg-white"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={ink} strokeWidth={2} />
          </TouchableOpacity>

          <View className="flex-1">
            <Text style={styles.screenTitle} className="text-[25px] font-bold leading-[30px] text-[#191714]">
              Order Details
            </Text>
            <Text className="mt-1 text-[14px] font-bold text-[#191714]">
              Order #{order.id}
            </Text>
            <Text className="mt-1 text-[12px] font-medium text-[#6f6860]">
              Placed on {order.placedOn} at {order.placedAtTime || '10:30 AM'}
            </Text>
          </View>

          <View
            className="mt-1.5 flex-row items-center rounded-[9px] px-2.5 py-1.5"
            style={{ backgroundColor: status.backgroundColor }}
          >
            <StatusIcon size={17} color={status.color} strokeWidth={2} />
            <Text className="ml-1.5 text-[12px] font-bold" style={{ color: status.color }}>
              {order.status}
            </Text>
          </View>
        </View>

        <View className="relative mt-4 rounded-[12px] border border-[#ece4d9] bg-white px-2.5 py-4">
          <View className="absolute left-[48px] right-[48px] top-[38px] h-0.5 bg-[#bd8934]" />
          <View className="flex-row justify-between">
            {timelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              const complete = index < completedStepCount;

              return (
                <View key={step.id} className="w-[20%] items-center">
                  <View className="h-9 w-9 items-center justify-center rounded-full border border-[#eadfce] bg-white">
                    <StepIcon
                      size={17}
                      color={complete ? gold : '#9d9389'}
                      strokeWidth={1.8}
                    />
                    {complete ? (
                      <View className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2f8b55]">
                        <Check size={8} color="#ffffff" strokeWidth={3} />
                      </View>
                    ) : null}
                  </View>
                  <Text className="mt-2 text-center text-[9px] font-semibold leading-[12px] text-[#191714]">
                    {step.label}
                  </Text>
                  <Text className="mt-0.5 text-[9px] font-medium text-[#6f6860]">
                    {getTimelineDate(order, step.dateOffset)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="mt-3 rounded-[12px] border border-[#ece4d9] bg-white p-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MapPin size={21} color={ink} strokeWidth={1.9} />
              <Text className="ml-2 text-[15px] font-bold text-[#191714]">
                Delivery Address
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.82}>
              <Text className="text-[12px] font-bold text-[#a66d16]">View / Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3 flex-row items-center">
            <View className="flex-1">
              <Text className="text-[13px] font-bold text-[#191714]">
                {address?.name || 'Customer'}
              </Text>
              <Text className="mt-1 text-[12px] font-medium leading-[17px] text-[#4d4842]">
                {address?.line1 || 'Delivery address'}
              </Text>
              <Text className="mt-1 text-[12px] font-medium leading-[17px] text-[#4d4842]">
                {address?.line2 || ''}
              </Text>
              <Text className="mt-1 text-[12px] font-medium leading-[17px] text-[#4d4842]">
                India
              </Text>
              <Text className="mt-1 text-[12px] font-medium leading-[17px] text-[#4d4842]">
                {address?.phone || '+91 98765 43210'}
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-[11px] bg-[#fbf2e6]">
              <Map size={24} color={gold} strokeWidth={1.8} />
            </View>
          </View>
        </View>

        <View className="mt-[14px] rounded-[14px] border border-[#ece4d9] bg-white p-[14px]">
          <View className="flex-row items-center justify-between">
            <Text className="text-[16px] font-black text-[#191714]">
              Order Items ({itemCount})
            </Text>
            <TouchableOpacity activeOpacity={0.82} className="flex-row items-center">
              <Download size={18} color={darkGold} strokeWidth={2} />
              <Text className="ml-1 text-[12px] font-black text-[#a66d16]">
                Download Invoice
              </Text>
            </TouchableOpacity>
          </View>

          {order.items.map((item, index) => (
            <OrderItemRow
              key={item.id}
              item={item}
              isLast={index === order.items.length - 1}
            />
          ))}
        </View>

        <View className="mt-3 rounded-[12px] border border-[#ece4d9] bg-white p-3">
          <Text className="text-[15px] font-bold text-[#191714]">Order Summary</Text>
          <View className="mt-3 flex-row justify-between">
            <Text className="text-[12px] font-medium text-[#302c28]">
              Subtotal ({itemCount} items)
            </Text>
            <Text className="text-[12px] font-semibold text-[#191714]">
              {formatCurrency(summary.subtotal)}
            </Text>
          </View>
          <View className="mt-3 flex-row justify-between">
            <Text className="text-[12px] font-medium text-[#302c28]">Shipping</Text>
            <Text className="text-[12px] font-bold text-[#2f8b55]">
              {summary.deliveryFee === 0 ? 'FREE' : formatCurrency(summary.deliveryFee)}
            </Text>
          </View>
          <View className="mt-3 flex-row justify-between">
            <Text className="text-[12px] font-medium text-[#302c28]">Taxes (IGST 4%)</Text>
            <Text className="text-[12px] font-semibold text-[#191714]">
              {formatCurrency(summary.taxes)}
            </Text>
          </View>
          {summary.giftWrapFee > 0 ? (
            <View className="mt-3 flex-row justify-between">
              <Text className="text-[12px] font-medium text-[#302c28]">
                Gift Packaging
              </Text>
              <Text className="text-[12px] font-semibold text-[#191714]">
                {formatCurrency(summary.giftWrapFee)}
              </Text>
            </View>
          ) : null}
          <View className="mt-4 border-t border-dashed border-[#ece4d9]" />
          <View className="mt-3 flex-row justify-between">
            <Text className="text-[17px] font-bold text-[#191714]">Total</Text>
            <Text className="text-[19px] font-bold text-[#191714]">
              {formatCurrency(summary.total)}
            </Text>
          </View>

          {summary.offerDiscount > 0 ? (
            <View className="mt-4 flex-row items-center rounded-[11px] bg-[#eff9f2] px-3 py-2.5">
              <Tags size={18} color={green} strokeWidth={2} />
              <Text className="ml-2.5 text-[12px] font-bold text-[#2f8b55]">
                You saved {formatCurrency(summary.offerDiscount)} on this order
              </Text>
            </View>
          ) : null}
        </View>

        <View className="mt-3 flex-row items-center justify-between rounded-[12px] border border-[#ece4d9] bg-white p-3">
          <View className="flex-1 pr-3">
            <Text className="text-[14px] font-bold text-[#191714]">Need Help?</Text>
            <Text className="mt-1 text-[11px] font-medium text-[#6f6860]">
              We're here to help you with your order
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.86}
            className="flex-row items-center rounded-[11px] border border-[#eadfce] px-2.5 py-2"
          >
            <MessageCircle size={19} color={darkGold} strokeWidth={1.9} />
            <Text className="ml-1.5 text-[11px] font-bold text-[#a66d16]">
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomBar items={detailsBottomNavItems} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 14,
  },
  screenTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
  },
});

export default OrderDetailsScreen;
