import React from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  CreditCard,
  FileText,
  Gem,
  LockKeyhole,
  LogIn,
  LogOut,
  MapPin,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react-native';
import HomeHeader from '../../../components/home/HomeHeader';
import { logout } from '../../auth/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const green = '#087A34';
const gold = '#F4C23D';
const ink = '#202020';

const configs = {
  Profile: {
    eyebrow: 'MY ACCOUNT',
    title: 'Profile',
    subtitle: 'Your jewellery journey, saved preferences, and member details.',
    icon: User,
  },
  Settings: {
    eyebrow: 'PREFERENCES',
    title: 'Settings',
    subtitle: 'Control updates, checkout preferences, and app experience.',
    icon: Settings,
    rows: [
      { id: 'orders', title: 'Order updates', subtitle: 'Delivery and checkout alerts', icon: Bell, value: 'ON' },
      { id: 'payments', title: 'Payment reminders', subtitle: 'Secure checkout nudges', icon: CreditCard, value: 'ON' },
      { id: 'address', title: 'Default address', subtitle: 'Use selected address at checkout', icon: MapPin, value: 'AUTO' },
    ],
  },
  TermsConditions: {
    eyebrow: 'LEGAL',
    title: 'Terms & Conditions',
    subtitle: 'Simple shopping rules for mock orders and app usage.',
    icon: FileText,
    rows: [
      { id: 'orders', title: 'Orders', subtitle: 'Mock orders are for demo checkout flow only.', icon: Gem },
      { id: 'pricing', title: 'Pricing', subtitle: 'Product prices use mock data and may change in production.', icon: CreditCard },
      { id: 'returns', title: 'Returns', subtitle: 'Return windows and eligibility are shown on checkout screens.', icon: ShieldCheck },
    ],
  },
  PrivacyPolicy: {
    eyebrow: 'TRUST',
    title: 'Privacy Policy',
    subtitle: 'How customer details are treated inside this demo experience.',
    icon: LockKeyhole,
    rows: [
      { id: 'phone', title: 'Mobile number', subtitle: 'Used only for the mock OTP sign-in journey.', icon: User },
      { id: 'wishlist', title: 'Wishlist and cart', subtitle: 'Saved locally in app state during this session.', icon: Gem },
      { id: 'security', title: 'Security', subtitle: 'Checkout screens are designed around safe, minimal data entry.', icon: ShieldCheck },
    ],
  },
};

function MenuInfoScreen({ navigation, route }) {
  const dispatch = useAppDispatch();
  const config = configs[route.name] || configs.Profile;
  const Icon = config.icon;
  const isProfile = route.name === 'Profile';
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const selectedAddress = useAppSelector(state => {
    const { addresses, selectedAddressId } = state.addressBook;
    return addresses.find(address => address.id === selectedAddressId) || addresses[0];
  });

  const profileRows = [
    {
      id: 'member',
      title: isAuthenticated ? user?.tier || 'Member' : 'Guest Customer',
      subtitle: isAuthenticated
        ? 'Signed in and ready for checkout'
        : 'Sign in to save wishlist and addresses',
      icon: ShieldCheck,
    },
    {
      id: 'phone',
      title: isAuthenticated ? `+91 ${user?.phoneNumber || ''}` : 'Mobile not connected',
      subtitle: 'Used for OTP and order updates',
      icon: Bell,
    },
    {
      id: 'address',
      title: selectedAddress?.name || 'No address selected',
      subtitle: selectedAddress
        ? `${selectedAddress.city}, ${selectedAddress.state}`
        : 'Add an address before checkout',
      icon: MapPin,
    },
  ];

  const rows = isProfile ? profileRows : config.rows;

  const handleAuthPress = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigation.navigate('Home');
      return;
    }

    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#087A34]">
      <StatusBar barStyle="light-content" backgroundColor={green} />

      <View className="bg-[#087A34] pb-3">
        <HomeHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View className="h-14 w-14 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
            <Icon size={25} color={green} strokeWidth={1.9} />
          </View>
          <Text style={styles.eyebrow}>{config.eyebrow}</Text>
          <Text style={styles.title}>{config.title}</Text>
          <Text style={styles.subtitle}>{config.subtitle}</Text>
        </View>

        <View className="mt-5">
          {rows.map(item => {
            const RowIcon = item.icon;

            return (
              <View key={item.id} style={styles.infoRow}>
                <View className="h-11 w-11 items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
                  <RowIcon size={19} color={green} strokeWidth={2} />
                </View>
                <View className="ml-3 flex-1">
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                </View>
                {item.value ? (
                  <View style={styles.valuePill}>
                    <Text style={styles.valueText}>{item.value}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {isProfile ? (
          <TouchableOpacity
            activeOpacity={0.88}
            className="mt-5 flex-row items-center justify-center rounded-[18px] border border-[#F4C23D] bg-[#087A34] px-5 py-4"
            onPress={handleAuthPress}
          >
            {isAuthenticated ? (
              <LogOut size={20} color="#ffffff" strokeWidth={2.2} />
            ) : (
              <LogIn size={20} color="#ffffff" strokeWidth={2.2} />
            )}
            <Text className="ml-2 text-[13px] font-extrabold uppercase tracking-[2px] text-white">
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.88}
            className="mt-5 flex-row items-center justify-center rounded-[18px] border border-[#F4C23D] bg-[#087A34] px-5 py-4"
            onPress={() => navigation.navigate('Categories')}
          >
            <Gem size={20} color="#ffffff" strokeWidth={2.2} />
            <Text className="ml-2 text-[13px] font-extrabold uppercase tracking-[2px] text-white">
              Back To Shopping
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const serifFont = Platform.select({
  ios: 'Baskerville',
  android: 'serif',
  default: 'serif',
});

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#FFFDF4',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroCard: {
    marginTop: 18,
    overflow: 'hidden',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: '#FFFFFF',
    padding: 22,
  },
  heroGlow: {
    position: 'absolute',
    right: -46,
    top: -54,
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(244, 194, 61, 0.2)',
  },
  eyebrow: {
    marginTop: 18,
    fontSize: 10,
    fontWeight: '900',
    color: green,
    letterSpacing: 2.6,
  },
  title: {
    marginTop: 7,
    fontFamily: serifFont,
    fontSize: 31,
    lineHeight: 36,
    color: green,
  },
  subtitle: {
    marginTop: 8,
    maxWidth: 270,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    color: ink,
  },
  infoRow: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: green,
  },
  rowSubtitle: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16,
    color: ink,
  },
  valuePill: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: green,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  valueText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
  },
});

export default MenuInfoScreen;
