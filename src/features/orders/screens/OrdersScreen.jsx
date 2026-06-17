import React, { useMemo, useState } from 'react';
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
  ChevronRight,
  Clock3,
  Headphones,
  Package,
  RotateCcw,
  Truck,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import { categoryBottomNavItems } from '../../../data/mock/categoryMock';
import { orderStatusMeta, orderTabs } from '../../../data/mock/ordersMock';
import { productDetails } from '../../../data/mock/productMock';
import { useAppSelector } from '../../../store/hooks';

const gold = '#bd8934';
const darkGold = '#a66d16';
const ink = '#191714';
const muted = '#6f6860';
const ivory = '#fbf7f1';
const line = '#ece4d9';

const statusConfig = {
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
    icon: Clock3,
    backgroundColor: '#fff5dc',
    color: '#8a661e',
  },
  'Return Completed': {
    icon: RotateCcw,
    backgroundColor: '#ededed',
    color: '#4e4a46',
  },
};

const ordersBottomNavItems = categoryBottomNavItems.map(item => ({
  ...item,
  active: item.id === 'orders',
}));

const formatCurrency = value => `Rs ${Math.round(value).toLocaleString('en-IN')}`;

const getOrderItemLabel = order => {
  const quantity = order.items.reduce((total, item) => total + item.quantity, 0);
  return `${quantity} Item${quantity === 1 ? '' : 's'}`;
};

const getOrderImages = order =>
  order.items
    .map(item => productDetails[item.productId]?.gallery?.[0]?.image)
    .filter(Boolean);

function OrderCard({ navigation, order }) {
  const StatusIcon = statusConfig[order.status].icon;
  const images = getOrderImages(order);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
    >
      <View style={styles.thumbColumn}>
        {images.slice(0, 3).map((image, index) => (
          <Image
            key={`${order.id}-${index}`}
            source={image}
            resizeMode="cover"
            style={styles.orderThumb}
          />
        ))}
      </View>

      <View style={styles.orderCopy}>
        <View style={styles.orderTopLine}>
          <View style={styles.orderTitleWrap}>
            <Text style={styles.orderTitle}>Order #{order.id}</Text>
            <Text style={styles.placedText}>Placed on {order.placedOn}</Text>
          </View>
          <ChevronRight size={19} color={ink} strokeWidth={1.9} />
        </View>

        <View
          style={[
            styles.statusPill,
            { backgroundColor: statusConfig[order.status].backgroundColor },
          ]}
        >
          <StatusIcon
            size={15}
            color={statusConfig[order.status].color}
            strokeWidth={2}
          />
          <Text
            style={[
              styles.statusText,
              { color: statusConfig[order.status].color },
            ]}
          >
            {order.status}
          </Text>
        </View>

        <Text style={styles.statusLine}>{order.statusLine}</Text>

        <View style={styles.orderFooter}>
          <View>
            <Text style={styles.itemCount}>{getOrderItemLabel(order)}</Text>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.actionButton}
            onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
          >
            <Text style={styles.actionText}>{order.action}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function OrdersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('All Orders');
  const orders = useAppSelector(state => state.orders.items);

  const filteredOrders = useMemo(() => {
    if (selectedTab === 'All Orders') {
      return orders;
    }

    return orders.filter(order => orderStatusMeta[order.status]?.tab === selectedTab);
  }, [orders, selectedTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <View
        style={[
          styles.headerWrap,
          { paddingTop: Math.max(insets.top, 8) },
        ]}
      >
        <HomeHeader />
      </View>

      <View style={styles.titleArea}>
        <Text style={styles.screenTitle}>My Orders</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {orderTabs.map(tab => {
            const isActive = tab === selectedTab;

            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.82}
                style={styles.tabButton}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabText, isActive ? styles.activeTabText : null]}>
                  {tab}
                </Text>
                <View style={[styles.tabLine, isActive ? styles.activeTabLine : null]} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard key={order.id} navigation={navigation} order={order} />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Package size={28} color={gold} strokeWidth={1.8} />
            </View>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>
              Orders you place from checkout will appear here.
            </Text>
          </View>
        )}

        <View style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Headphones size={21} color={ink} strokeWidth={1.8} />
          </View>
          <View style={styles.helpCopy}>
            <Text style={styles.helpTitle}>Need Help with Your Order?</Text>
            <Text style={styles.helpText}>Our support team is here to help you.</Text>
          </View>
          <TouchableOpacity activeOpacity={0.84} style={styles.supportButton}>
            <Text style={styles.supportText}>Contact Support</Text>
            <ChevronRight size={18} color={darkGold} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomBar items={ordersBottomNavItems} />
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
  headerWrap: {
    backgroundColor: ivory,
    paddingBottom: 2,
  },
  titleArea: {
    borderBottomWidth: 1,
    borderBottomColor: line,
    backgroundColor: ivory,
    paddingHorizontal: 18,
  },
  screenTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  tabsContent: {
    paddingTop: 12,
  },
  tabButton: {
    marginRight: 26,
    alignItems: 'center',
  },
  tabText: {
    color: '#45403b',
    fontSize: 13,
    fontWeight: '800',
  },
  activeTabText: {
    color: darkGold,
  },
  tabLine: {
    marginTop: 10,
    height: 2,
    width: '100%',
    backgroundColor: 'transparent',
  },
  activeTabLine: {
    backgroundColor: gold,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  emptyCard: {
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eadfce',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  emptyIcon: {
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: '#fbf2e6',
  },
  emptyTitle: {
    marginTop: 14,
    color: ink,
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    marginTop: 7,
    maxWidth: 240,
    textAlign: 'center',
    color: muted,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  orderCard: {
    marginBottom: 12,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eadfce',
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#6b5742',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  thumbColumn: {
    width: 62,
    overflow: 'hidden',
    borderRadius: 9,
    backgroundColor: '#f6efe6',
  },
  orderThumb: {
    height: 45,
    width: 62,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  orderCopy: {
    marginLeft: 14,
    flex: 1,
  },
  orderTopLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  orderTitleWrap: {
    flex: 1,
    paddingRight: 8,
  },
  orderTitle: {
    color: ink,
    fontSize: 14,
    fontWeight: '700',
  },
  placedText: {
    marginTop: 5,
    color: '#4f4a44',
    fontSize: 12,
    fontWeight: '700',
  },
  statusPill: {
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
  },
  statusLine: {
    marginTop: 5,
    color: '#302c28',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  orderFooter: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemCount: {
    color: muted,
    fontSize: 11,
    fontWeight: '800',
  },
  totalRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  totalLabel: {
    color: ink,
    fontSize: 12,
    fontWeight: '700',
  },
  totalValue: {
    marginLeft: 6,
    color: ink,
    fontSize: 12,
    fontWeight: '700',
  },
  actionButton: {
    minWidth: 100,
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#f5ede5',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionText: {
    color: ink,
    fontSize: 12,
    fontWeight: '800',
  },
  helpCard: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  helpIcon: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#f6efe6',
  },
  helpCopy: {
    marginLeft: 12,
    flex: 1,
  },
  helpTitle: {
    color: ink,
    fontSize: 10,
    fontWeight: '900',
  },
  helpText: {
    marginTop: 3,
    color: muted,
    fontSize: 10,
    fontWeight: '700',
    
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    color: darkGold,
    fontSize: 10,
    fontWeight: '800',
  },
});

export default OrdersScreen;
