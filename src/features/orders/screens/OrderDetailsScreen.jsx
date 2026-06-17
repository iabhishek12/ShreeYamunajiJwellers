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
const muted = '#6f6860';
const ivory = '#fbf7f1';
const line = '#ece4d9';

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
    <View style={[styles.itemRow, isLast ? styles.lastItemRow : null]}>
      <Image source={image} resizeMode="cover" style={styles.itemImage} />
      <View style={styles.itemCopy}>
        <Text numberOfLines={1} style={styles.itemTitle}>{title}</Text>
        <Text numberOfLines={1} style={styles.itemMeta}>
          {detailParts.join(' | ')}
        </Text>
      </View>
      <View style={styles.itemPriceWrap}>
        <Text style={styles.itemPrice}>{formatCurrency(item.lineTotal)}</Text>
        <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
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
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={ivory} />
        <View style={styles.missingWrap}>
          <Text style={styles.screenTitle}>Order Details</Text>
          <Text style={styles.missingText}>This order is no longer available.</Text>
          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.backButton}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.backButtonText}>Back to Orders</Text>
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
  const StatusIcon = statusStyles[order.status]?.icon || Package;
  const completedStepCount = getCompletedStepCount(order.status);
  const itemCount = getOrderQuantity(order);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <ScrollView
        style={styles.scroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.titleRow}>
          <TouchableOpacity
            activeOpacity={0.82}
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={ink} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.titleCopy}>
            <Text style={styles.screenTitle}>Order Details</Text>
            <Text style={styles.orderNumber}>Order #{order.id}</Text>
            <Text style={styles.placedText}>
              Placed on {order.placedOn} at {order.placedAtTime || '10:30 AM'}
            </Text>
          </View>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: statusStyles[order.status]?.backgroundColor },
            ]}
          >
            <StatusIcon
              size={17}
              color={statusStyles[order.status]?.color}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.statusText,
                { color: statusStyles[order.status]?.color },
              ]}
            >
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.timelineCard}>
          <View style={styles.timelineLine} />
          <View style={styles.timelineRow}>
            {timelineSteps.map((step, index) => {
              const StepIcon = step.icon;
              const complete = index < completedStepCount;

              return (
                <View key={step.id} style={styles.timelineStep}>
                  <View style={[styles.stepIcon, complete ? styles.stepIconActive : null]}>
                    <StepIcon
                      size={20}
                      color={complete ? gold : '#9d9389'}
                      strokeWidth={1.8}
                    />
                    {complete ? (
                      <View style={styles.stepCheck}>
                        <Check size={9} color="#ffffff" strokeWidth={3} />
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.stepLabel}>{step.label}</Text>
                  <Text style={styles.stepDate}>{getTimelineDate(order, step.dateOffset)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <MapPin size={21} color={ink} strokeWidth={1.9} />
              <Text style={[styles.cardTitle, styles.iconCardTitle]}>
                Delivery Address
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.82}>
              <Text style={styles.goldAction}>View / Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressBody}>
            <View style={styles.addressTextWrap}>
              <Text style={styles.addressName}>{address?.name || 'Customer'}</Text>
              <Text style={styles.addressText}>{address?.line1 || 'Delivery address'}</Text>
              <Text style={styles.addressText}>{address?.line2 || ''}</Text>
              <Text style={styles.addressText}>India</Text>
              <Text style={styles.addressText}>{address?.phone || '+91 98765 43210'}</Text>
            </View>
            <View style={styles.mapBadge}>
              <Map size={28} color={gold} strokeWidth={1.8} />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Order Items ({itemCount})</Text>
            <TouchableOpacity activeOpacity={0.82} style={styles.invoiceButton}>
              <Download size={18} color={darkGold} strokeWidth={2} />
              <Text style={styles.goldAction}>Download Invoice</Text>
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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({itemCount} items)</Text>
            <Text style={styles.summaryValue}>{formatCurrency(summary.subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.freeText}>
              {summary.deliveryFee === 0 ? 'FREE' : formatCurrency(summary.deliveryFee)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes (IGST 4%)</Text>
            <Text style={styles.summaryValue}>{formatCurrency(summary.taxes)}</Text>
          </View>
          {summary.giftWrapFee > 0 ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Gift Packaging</Text>
              <Text style={styles.summaryValue}>{formatCurrency(summary.giftWrapFee)}</Text>
            </View>
          ) : null}
          <View style={styles.summaryDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(summary.total)}</Text>
          </View>

          {summary.offerDiscount > 0 ? (
            <View style={styles.savingStrip}>
              <Tags size={20} color={green} strokeWidth={2} />
              <Text style={styles.savingText}>
                You saved {formatCurrency(summary.offerDiscount)} on this order
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.helpCard}>
          <View>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>We're here to help you with your order</Text>
          </View>
          <TouchableOpacity activeOpacity={0.86} style={styles.supportButton}>
            <MessageCircle size={19} color={darkGold} strokeWidth={1.9} />
            <Text style={styles.supportText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomBar items={detailsBottomNavItems} />
    </SafeAreaView>
  );
}

const serifFont = Platform.select({
  ios: 'Baskerville',
  android: 'serif',
  default: 'serif',
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ivory,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backIcon: {
    marginTop: 2,
    marginRight: 8,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  titleCopy: {
    flex: 1,
  },
  screenTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  orderNumber: {
    marginTop: 5,
    color: ink,
    fontSize: 15,
    fontWeight: '900',
  },
  placedText: {
    marginTop: 5,
    color: muted,
    fontSize: 13,
    fontWeight: '700',
  },
  statusPill: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  statusText: {
    marginLeft: 7,
    fontSize: 13,
    fontWeight: '900',
  },
  timelineCard: {
    marginTop: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    paddingHorizontal: 11,
    paddingVertical: 18,
  },
  timelineLine: {
    position: 'absolute',
    left: 52,
    right: 52,
    top: 43,
    height: 3,
    backgroundColor: gold,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineStep: {
    width: '20%',
    alignItems: 'center',
  },
  stepIcon: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#eadfce',
    backgroundColor: '#ffffff',
  },
  stepIconActive: {
    borderColor: '#eadfce',
  },
  stepCheck: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: green,
  },
  stepLabel: {
    marginTop: 9,
    textAlign: 'center',
    color: ink,
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 13,
  },
  stepDate: {
    marginTop: 4,
    color: muted,
    fontSize: 10,
    fontWeight: '700',
  },
  card: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: ink,
    fontSize: 17,
    fontWeight: '900',
  },
  iconCardTitle: {
    marginLeft: 8,
  },
  goldAction: {
    color: darkGold,
    fontSize: 13,
    fontWeight: '900',
  },
  addressBody: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTextWrap: {
    flex: 1,
  },
  addressName: {
    color: ink,
    fontSize: 14,
    fontWeight: '900',
  },
  addressText: {
    marginTop: 5,
    color: '#4d4842',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  mapBadge: {
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#fbf2e6',
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: line,
    paddingBottom: 12,
  },
  lastItemRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  itemImage: {
    height: 66,
    width: 76,
    borderRadius: 10,
    backgroundColor: '#f6efe6',
  },
  itemCopy: {
    marginLeft: 13,
    flex: 1,
  },
  itemTitle: {
    color: ink,
    fontSize: 14,
    fontWeight: '900',
  },
  itemMeta: {
    marginTop: 7,
    color: muted,
    fontSize: 12,
    fontWeight: '700',
  },
  itemPriceWrap: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  itemPrice: {
    color: ink,
    fontSize: 14,
    fontWeight: '900',
  },
  itemQty: {
    marginTop: 10,
    color: muted,
    fontSize: 12,
    fontWeight: '800',
  },
  summaryRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#302c28',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryValue: {
    color: ink,
    fontSize: 13,
    fontWeight: '800',
  },
  freeText: {
    color: green,
    fontSize: 13,
    fontWeight: '900',
  },
  summaryDivider: {
    marginTop: 18,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: line,
  },
  totalRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: ink,
    fontSize: 20,
    fontWeight: '900',
  },
  totalValue: {
    color: ink,
    fontSize: 22,
    fontWeight: '900',
  },
  savingStrip: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#eff9f2',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  savingText: {
    marginLeft: 10,
    color: green,
    fontSize: 13,
    fontWeight: '900',
  },
  helpCard: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  helpTitle: {
    color: ink,
    fontSize: 16,
    fontWeight: '900',
  },
  helpText: {
    marginTop: 6,
    color: muted,
    fontSize: 12,
    fontWeight: '700',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#eadfce',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  supportText: {
    marginLeft: 7,
    color: darkGold,
    fontSize: 12,
    fontWeight: '900',
  },
  missingWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  missingText: {
    marginTop: 8,
    color: muted,
    fontSize: 13,
    fontWeight: '700',
  },
  backButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: ink,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
});

export default OrderDetailsScreen;
