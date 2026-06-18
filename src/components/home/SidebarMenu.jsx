import React from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronRight,
  CreditCard,
  FileText,
  Gem,
  Heart,
  HelpCircle,
  House,
  LayoutGrid,
  LockKeyhole,
  LogIn,
  LogOut,
  MapPin,
  MessageCircleMore,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
} from 'lucide-react-native';
import { logout } from '../../features/auth/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const shopNowImage = require('../../assets/images/products/modern-rings.jpg1.jpeg');
const logoImage = require('../../assets/images/logo/logo.png');

const green = '#087A34';
const gold = '#F4C23D';
const orange = '#F28A00';
const red = '#E42B1B';
const cream = '#FFFDF4';
const warmCream = '#FFF6DF';
const ink = '#202020';

const primaryItems = [
  {
    id: 'home',
    label: 'Home',
    subtitle: 'Fresh arrivals and offers',
    route: 'Home',
    icon: House,
  },
  {
    id: 'categories',
    label: 'Categories',
    subtitle: 'Rings, necklaces, earrings',
    route: 'Categories',
    icon: LayoutGrid,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    subtitle: 'Your saved favourites',
    route: 'Wishlist',
    icon: Heart,
    countKey: 'wishlist',
  },
  {
    id: 'cart',
    label: 'Cart',
    subtitle: 'Review your jewellery box',
    route: 'Cart',
    icon: ShoppingBag,
    countKey: 'cart',
  },
  {
    id: 'checkout',
    label: 'Checkout',
    subtitle: 'Address, offers, payment',
    route: 'Checkout',
    icon: CreditCard,
  },
  {
    id: 'addresses',
    label: 'Address Book',
    subtitle: 'Add, edit, and select address',
    route: 'AddressBook',
    icon: MapPin,
  },
];

const accountItems = [
  {
    id: 'profile',
    label: 'Profile',
    subtitle: 'View your member details',
    route: 'Profile',
    icon: User,
  },
  {
    id: 'settings',
    label: 'Settings',
    subtitle: 'Notifications and preferences',
    route: 'Settings',
    icon: Settings,
  },
  {
    id: 'faq',
    label: 'FAQs',
    subtitle: 'Shopping, delivery, and returns',
    route: 'FAQ',
    icon: FileText,
  },
  {
    id: 'about',
    label: 'About Us',
    subtitle: 'Our story and service values',
    route: 'AboutUs',
    icon: FileText,
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    subtitle: 'How your information is protected',
    route: 'PrivacyPolicy',
    icon: LockKeyhole,
  },
];

const promiseItems = [
  { id: 'certified', label: 'Certified', icon: Gem },
  { id: 'secure', label: 'Secure', icon: ShieldCheck },
  { id: 'shipping', label: 'Free Ship', icon: Truck },
];

function SidebarMenu({ visible, onClose }) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const cartCount = useAppSelector(state => state.cart.totalQuantity);
  const wishlistCount = useAppSelector(state => state.wishlist.items.length);
  const addressCount = useAppSelector(state => state.addressBook.addresses.length);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);

  const panelWidth = Math.min(336, width * 0.86);
  const customerName = user?.name || 'Guest Customer';
  const initials =
    customerName
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SY';

  const counts = {
    cart: cartCount,
    wishlist: wishlistCount,
  };

  const handleNavigate = routeName => {
    onClose();
    navigation.navigate(routeName);
  };

  const handleAuthAction = () => {
    onClose();

    if (isAuthenticated) {
      dispatch(logout());
      navigation.navigate('Home');
      return;
    }

    navigation.navigate('Login');
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={[styles.panel, { width: panelWidth }]}>
          <View style={styles.decorOne} />
          <View style={styles.decorTwo} />

          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
              <View className="flex-row items-center">
                <Image
                  source={logoImage}
                  resizeMode="contain"
                  style={styles.headerLogo}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                className="h-10 w-10 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFFFFF]"
                onPress={onClose}
              >
                <X size={19} color={ink} strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1"
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.profileCard}>
                <View className="flex-row items-center">
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text style={styles.customerName}>{customerName}</Text>
                    <Text style={styles.customerMeta}>Premium jewellery member</Text>
                  </View>
                </View>

                <View className="mt-4 flex-row rounded-3xl border border-[#F4C23D] bg-white/80 p-2">
                  <View className="flex-1 items-center">
                    <Text style={styles.statValue}>{wishlistCount}</Text>
                    <Text style={styles.statLabel}>Wishlist</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View className="flex-1 items-center">
                    <Text style={styles.statValue}>{cartCount}</Text>
                    <Text style={styles.statLabel}>Cart</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View className="flex-1 items-center">
                    <Text style={styles.statValue}>{addressCount}</Text>
                    <Text style={styles.statLabel}>Address</Text>
                  </View>
                </View>
              </View>

              <View className="mt-5">
                <Text style={styles.sectionLabel}>Explore</Text>
                <View style={styles.menuCard}>
                  {primaryItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = route.name === item.route;
                    const count = counts[item.countKey] || 0;

                    return (
                      <TouchableOpacity
                        activeOpacity={0.82}
                        className="flex-row items-center px-4 py-3"
                        key={item.id}
                        onPress={() => handleNavigate(item.route)}
                      >
                        <View
                          style={[
                            styles.menuIcon,
                            isActive ? styles.activeMenuIcon : null,
                          ]}
                        >
                          <Icon
                            size={19}
                            color={isActive ? '#ffffff' : green}
                            strokeWidth={2}
                          />
                        </View>
                        <View
                          className="ml-3 flex-1"
                          style={index < primaryItems.length - 1 ? styles.menuDivider : null}
                        >
                          <View className="flex-row items-center">
                            <Text
                              style={[
                                styles.menuTitle,
                                isActive ? styles.activeMenuTitle : null,
                              ]}
                            >
                              {item.label}
                            </Text>
                            {count > 0 ? (
                              <View style={styles.countPill}>
                                <Text style={styles.countText}>{count}</Text>
                              </View>
                            ) : null}
                          </View>
                          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                        </View>
                        <ChevronRight size={17} color={green} strokeWidth={2} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="mt-5">
                <Text style={styles.sectionLabel}>Account</Text>
                <View style={styles.menuCard}>
                  {accountItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = route.name === item.route;

                    return (
                      <TouchableOpacity
                        activeOpacity={0.82}
                        className="flex-row items-center px-4 py-3"
                        key={item.id}
                        onPress={() => handleNavigate(item.route)}
                      >
                        <View
                          style={[
                            styles.menuIcon,
                            isActive ? styles.activeMenuIcon : null,
                          ]}
                        >
                          <Icon
                            size={19}
                            color={isActive ? '#ffffff' : green}
                            strokeWidth={2}
                          />
                        </View>
                        <View
                          className="ml-3 flex-1"
                          style={index < accountItems.length - 1 ? styles.menuDivider : null}
                        >
                          <Text
                            style={[
                              styles.menuTitle,
                              isActive ? styles.activeMenuTitle : null,
                            ]}
                          >
                            {item.label}
                          </Text>
                          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                        </View>
                        <ChevronRight size={17} color={green} strokeWidth={2} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <ImageBackground
                imageStyle={styles.collectionImage}
                resizeMode="cover"
                source={shopNowImage}
                style={styles.collectionCard}
              >
                <View style={styles.collectionOverlay} />
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-3">
                    <Text style={styles.collectionKicker}>NEW DROP</Text>
                    <Text style={styles.collectionTitle}>Timeless pieces for every day</Text>
                    <Text style={styles.collectionCopy}>
                      Explore handcrafted designs in gold, diamonds, and soft sparkle.
                    </Text>
                  </View>
                  <View className="h-14 w-14 items-center justify-center rounded-full border border-[#F4C23D] bg-[#087A34]/90">
                    <Sparkles size={24} color={gold} strokeWidth={1.9} />
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.86}
                  className="mt-4 self-start rounded-full bg-[#087A34] px-5 py-3"
                  onPress={() => handleNavigate('Categories')}
                >
                  <Text className="text-[11px] font-extrabold uppercase tracking-[2px] text-white">
                    Shop Now
                  </Text>
                </TouchableOpacity>
              </ImageBackground>

              <View className="mt-5">
                <Text style={styles.sectionLabel}>Our Promise</Text>
                <View className="flex-row rounded-[26px] border border-[#F4C23D] bg-white/90 p-3">
                  {promiseItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <View className="flex-1 items-center" key={item.id}>
                        <View className="h-10 w-10 items-center justify-center rounded-full bg-[#FFF6DF]">
                          <Icon size={18} color={gold} strokeWidth={1.9} />
                        </View>
                        <Text style={styles.promiseText}>{item.label}</Text>
                        {index < promiseItems.length - 1 ? (
                          <View style={styles.promiseDivider} />
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.84}
                className="mt-5 flex-row items-center rounded-[24px] border border-[#F4C23D] bg-white/90 px-4 py-4"
                onPress={() => handleNavigate('ContactUs')}
              >
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#FFF6DF]">
                  <HelpCircle size={18} color={green} strokeWidth={2} />
                </View>
                <View className="ml-3 flex-1">
                  <Text style={styles.helpTitle}>Need styling help?</Text>
                  <Text style={styles.helpCopy}>Talk to our jewellery expert</Text>
                </View>
                <View className="h-9 w-9 items-center justify-center rounded-full bg-[#087A34]">
                  <MessageCircleMore size={17} color="#ffffff" strokeWidth={2} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.86}
                className="mt-5 flex-row items-center rounded-[26px] bg-[#087A34] px-4 py-4"
                onPress={handleAuthAction}
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  {isAuthenticated ? (
                    <LogOut size={20} color={gold} strokeWidth={2} />
                  ) : (
                    <LogIn size={20} color={gold} strokeWidth={2} />
                  )}
                </View>
                <View className="ml-3 flex-1">
                  <Text style={styles.authTitle}>
                    {isAuthenticated ? 'Sign Out' : 'Sign In'}
                  </Text>
                  <Text style={styles.authCopy}>
                    {isAuthenticated
                      ? 'End this session safely'
                      : 'Save wishlist and checkout faster'}
                  </Text>
                </View>
                <ChevronRight size={18} color="#ffffff" strokeWidth={2.2} />
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>

        <Pressable className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
}

const serifFont = Platform.select({
  ios: 'Baskerville',
  android: 'serif',
  default: 'serif',
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(8, 122, 52, 0.28)',
  },
  panel: {
    height: '100%',
    overflow: 'hidden',
    borderTopRightRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: cream,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 16,
  },
  decorOne: {
    position: 'absolute',
    top: -58,
    right: -44,
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(8, 122, 52, 0.12)',
  },
  decorTwo: {
    position: 'absolute',
    bottom: 82,
    left: -70,
    height: 170,
    width: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(8, 122, 52, 0.12)',
  },
  headerLogo: {
    height: 54,
    width: 158,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  profileCard: {
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: green,
    padding: 10,
  },
  avatar: {
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    backgroundColor: red,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
  },
  customerName: {
    fontFamily: serifFont,
    fontSize: 18,
    lineHeight: 20,
    color: '#ffffff',
  },
  customerMeta: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
    color: warmCream,
  },
  statDivider: {
    width: 1,
    marginVertical: 4,
    backgroundColor: 'rgba(244, 194, 61, 0.42)',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '900',
    color: green,
  },
  statLabel: {
    marginTop: 1,
    fontSize: 9,
    fontWeight: '700',
    color: ink,
    textTransform: 'uppercase',
  },
  sectionLabel: {
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '900',
    color: orange,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  menuCard: {
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
  menuIcon: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: warmCream,
  },
  activeMenuIcon: {
    backgroundColor: green,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4D77D',
    paddingBottom: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: ink,
  },
  activeMenuTitle: {
    color: green,
  },
  menuSubtitle: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#5B5B5B',
  },
  countPill: {
    marginLeft: 8,
    minWidth: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: red,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  collectionCard: {
    marginTop: 22,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: green,
    minHeight: 178,
    padding: 18,
  },
  collectionImage: {
    borderRadius: 30,
  },
  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 122, 52, 0.68)',
  },
  collectionKicker: {
    fontSize: 9,
    fontWeight: '900',
    color: gold,
    letterSpacing: 2.4,
  },
  collectionTitle: {
    marginTop: 7,
    fontFamily: serifFont,
    fontSize: 22,
    lineHeight: 26,
    color: '#ffffff',
  },
  collectionCopy: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 17,
    color: warmCream,
  },
  promiseText: {
    marginTop: 7,
    fontSize: 9,
    fontWeight: '900',
    color: green,
    textTransform: 'uppercase',
  },
  promiseDivider: {
    position: 'absolute',
    right: 0,
    top: 8,
    bottom: 8,
    width: 1,
    backgroundColor: '#F4D77D',
  },
  helpTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: green,
  },
  helpCopy: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#5B5B5B',
  },
  authTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffffff',
  },
  authCopy: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: warmCream,
  },
});

export default SidebarMenu;
