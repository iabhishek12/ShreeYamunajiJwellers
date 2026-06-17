import React from 'react';
import {
  Image,
  ImageBackground,
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
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Eye,
  Headphones,
  Heart,
  Info,
  Mail,
  MapPin,
  MoreHorizontal,
  Package,
  Phone,
  Settings,
  ShoppingBag,
  Truck,
  User,
  XCircle,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import { categoryBottomNavItems } from '../../../data/mock/categoryMock';
import { useAppSelector } from '../../../store/hooks';

const avatarImage = require('../../../assets/images/products/signature-pendant.jpg.jpeg');
const promoImage = require('../../../assets/images/products/signature-pendant.jpg.jpeg');
const logoImage = require('../../../assets/images/logo/logo.png');

const gold = '#bd8934';
const darkGold = '#a66d16';
const ink = '#191714';
const muted = '#6f6860';
const ivory = '#fbf7f1';
const line = '#ece4d9';

const profileBottomNavItems = categoryBottomNavItems.map(item => ({
  ...item,
  active: item.id === 'profile',
}));

const makeEmail = name =>
  `${name || 'guest shopper'}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/(^\.|\.$)/g, '') + '@email.com';

function SectionCard({ title, rows, navigation }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {rows.map((row, index) => {
        const Icon = row.icon;
        const isLast = index === rows.length - 1;

        return (
          <TouchableOpacity
            key={row.id}
            activeOpacity={0.82}
            style={[styles.menuRow, isLast ? styles.lastMenuRow : null]}
            onPress={() => {
              if (row.route) {
                navigation.navigate(row.route);
              }
            }}
          >
            <Icon size={19} color={ink} strokeWidth={1.8} />
            <Text style={styles.menuLabel}>{row.label}</Text>
            <ChevronRight size={18} color={ink} strokeWidth={1.9} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ProfileScreen({ navigation }) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const wishlistCount = useAppSelector(state => state.wishlist.items.length);
  const orders = useAppSelector(state => state.orders.items);

  const displayName = isAuthenticated ? user?.name || 'Guest Shopper' : 'Guest Shopper';
  const firstName = displayName.split(' ')[0] || 'Guest';
  const phoneLabel = isAuthenticated
    ? `+91 ${user?.phoneNumber || '98765 43210'}`
    : 'Sign in to add mobile number';
  const emailLabel = isAuthenticated
    ? makeEmail(displayName)
    : 'guest@shreeyamunaji.com';

  const accountRows = [
    { id: 'personal', label: 'Personal Information', icon: User, route: 'Profile' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, route: 'AddressBook' },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard, route: 'Checkout' },
    { id: 'wishlist', label: `My Wishlist (${wishlistCount})`, icon: Heart, route: 'Wishlist' },
    { id: 'recent', label: 'Recently Viewed', icon: Eye, route: 'Categories' },
  ];

  const supportRows = [
    { id: 'faqs', label: 'FAQs', icon: CircleHelp, route: 'TermsConditions' },
    { id: 'contact', label: 'Contact Us', icon: Headphones, route: 'Settings' },
    { id: 'about', label: 'About Shree Yamunaji', icon: Info, route: 'PrivacyPolicy' },
  ];
  const orderStats = [
    { id: 'total', value: orders.length, label: 'Total Orders', icon: Package },
    {
      id: 'processing',
      value: orders.filter(order => order.status === 'Processing').length,
      label: 'Processing',
      icon: MoreHorizontal,
    },
    {
      id: 'shipped',
      value: orders.filter(order => order.status === 'Shipped').length,
      label: 'Shipped',
      icon: Truck,
    },
    {
      id: 'delivered',
      value: orders.filter(order => order.status === 'Delivered').length,
      label: 'Delivered',
      icon: CheckCircle2,
    },
    {
      id: 'cancelled',
      value: orders.filter(order => order.status === 'Cancelled').length,
      label: 'Cancelled',
      icon: XCircle,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <View style={styles.fixedHeader}>
        <View style={styles.topBar}>
          <View style={styles.topSpacer} />
          <View style={styles.brandWrap}>
            <Image
              source={logoImage}
              resizeMode="contain"
              style={styles.logoImage}
            />
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity activeOpacity={0.82} style={styles.headerIcon}>
              <Bell size={21} color={ink} strokeWidth={1.9} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.headerIcon}
              onPress={() => navigation.navigate('Settings')}
            >
              <Settings size={22} color={ink} strokeWidth={1.9} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileIntro}>
          <View style={styles.avatarWrap}>
            <Image source={avatarImage} resizeMode="cover" style={styles.avatarImage} />
            <TouchableOpacity activeOpacity={0.88} style={styles.cameraButton}>
              <Camera size={20} color={ink} strokeWidth={1.9} />
            </TouchableOpacity>
          </View>

          <View style={styles.greetingWrap}>
            <Text style={styles.greetingTitle}>Hello, {firstName}</Text>
            <Text style={styles.greetingSubtitle}>
              Welcome back to Shree Yamunaji
            </Text>

            <TouchableOpacity activeOpacity={0.82} style={styles.contactRow}>
              <Phone size={21} color="#4b4742" strokeWidth={1.7} />
              <Text style={styles.contactText}>{phoneLabel}</Text>
              <ChevronRight size={20} color="#4b4742" strokeWidth={1.9} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.82} style={styles.contactRow}>
              <Mail size={21} color="#4b4742" strokeWidth={1.7} />
              <Text style={styles.contactText}>{emailLabel}</Text>
              <ChevronRight size={20} color="#4b4742" strokeWidth={1.9} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ordersCard}>
          <View style={styles.ordersHeader}>
            <View style={styles.orderBadge}>
              <ShoppingBag size={20} color={gold} strokeWidth={1.8} />
            </View>
            <Text style={styles.ordersTitle}>My Orders</Text>
            <TouchableOpacity
              activeOpacity={0.82}
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={18} color={darkGold} strokeWidth={2.1} />
            </TouchableOpacity>
          </View>

          <View style={styles.orderStatsRow}>
            {orderStats.map((item, index) => {
              const Icon = item.icon;

              return (
                <View key={item.id} style={styles.orderStatWrap}>
                  {index > 0 ? <View style={styles.orderDivider} /> : null}
                  <Icon size={19} color={gold} strokeWidth={1.65} />
                  <Text style={styles.orderValue}>{item.value}</Text>
                  <Text style={styles.orderLabel}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <SectionCard
          title="Account Settings"
          rows={accountRows}
          navigation={navigation}
        />

        <SectionCard
          title="Help & Support"
          rows={supportRows}
          navigation={navigation}
        />

        <ImageBackground
          source={promoImage}
          resizeMode="cover"
          imageStyle={styles.promoImage}
          style={styles.promoCard}
        >
          <View style={styles.promoShade} />
          <View style={styles.promoCopy}>
            <Text style={styles.promoTitle}>Timeless Beauty,{'\n'}Just for You</Text>
            <Text style={styles.promoText}>
              Explore our handpicked collection crafted to perfection.
            </Text>
            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.shopButton}
              onPress={() => navigation.navigate('Categories')}
            >
              <Text style={styles.shopButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>

      <BottomBar items={profileBottomNavItems} />
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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },
  fixedHeader: {
    marginTop: 15,
    paddingTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#efe7dc',
    backgroundColor: ivory,
    // shadowColor: '#6b5742',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
    // elevation: 2,
    zIndex: 10,
  },
  topBar: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  topSpacer: {
    width: 62,
  },
  brandWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoImage: {
    height: 52,
    width: 132,
  },
  headerActions: {
    width: 62,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerIcon: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  notificationDot: {
    position: 'absolute',
    right: 5,
    top: 5,
    height: 9,
    width: 9,
    borderRadius: 5,
    backgroundColor: gold,
  },
  profileIntro: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    height: 70,
    width: 70,
    borderRadius: 2, 

  },
  avatarImage: {
    height: 70,
    width: 70,
    borderRadius: 54,
    borderWidth: 1,
    borderColor: '#eadfce',
    backgroundColor: '#efe4d2',
  },
  cameraButton: {
    position: 'absolute',
    left: 32,
    bottom: -2,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#eadfce',
    backgroundColor: '#ffffff',
    shadowColor: '#6b5742',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  greetingWrap: {
    marginLeft: 22,
    flex: 1,
  },
  greetingTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '600',
  },
  greetingSubtitle: {
    marginTop: 4,
    color: muted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
  },
  contactRow: {
    marginTop: 8,
    minHeight: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    paddingHorizontal:6,
  },
  contactText: {
    marginLeft: 14,
    flex: 1,
    color: ink,
    fontSize: 12,
    fontWeight: '600',
  },
  ordersCard: {
    marginTop: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eadfce',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 11,
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: '#6b5742',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  ordersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderBadge: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#6b5742',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  ordersTitle: {
    marginLeft: 12,
    flex: 1,
    color: ink,
    fontFamily: serifFont,
    fontSize: 18,
    lineHeight: 22,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: darkGold,
    fontSize: 13,
    fontWeight: '800',
  },
  orderStatsRow: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  orderStatWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 62,
  },
  orderDivider: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 4,
    width: 1,
    backgroundColor: line,
  },
  orderValue: {
    marginTop: 5,
    color: ink,
    fontSize: 13,
    fontWeight: '900',
  },
  orderLabel: {
    marginTop: 3,
    textAlign: 'center',
    color: '#2e2a26',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 12,
  },
  sectionCard: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  sectionTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 17,
    lineHeight: 21,
  },
  menuRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: line,
  },
  lastMenuRow: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    marginLeft: 15,
    flex: 1,
    color: ink,
    fontSize: 13,
    fontWeight: '700',
  },
  promoCard: {
    marginTop: 15,
    minHeight: 118,
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: '#eadfce',
  },
  promoImage: {
    borderRadius: 14,
  },
  promoShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 239, 0.62)',
  },
  promoCopy: {
    maxWidth: '58%',
    padding: 12,
  },
  promoTitle: {
    color: darkGold,
    fontFamily: serifFont,
    fontSize: 18,
    lineHeight: 22,
  },
  promoText: {
    marginTop: 5,
    color: '#5f5850',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },
  shopButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: ink,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  addressHint: {
    marginTop: 12,
    color: '#8b8176',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
  },
});

export default ProfileScreen;
