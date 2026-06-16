import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowRight,
  Award,
  ChevronDown,
  Gem,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react-native';
import { requestMockOtp, clearAuthError } from '../features/auth/store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const bannerImage = require('../assets/images/loginBanner/image.png');
const { width: screenWidth } = Dimensions.get('window');
const heroHeight = Math.min(Math.max(screenWidth * 0.92, 330), 390);

const gold = '#b58b3c';

const featureItems = [
  {
    icon: ShieldCheck,
    title: 'Secure\n& Trusted',
  },
  {
    icon: Award,
    title: 'Certified\nJewelry',
  },
  {
    icon: Truck,
    title: 'Insured\nDelivery',
  },
];

function Login({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const {
    requestStatus,
    error,
    isAuthenticated,
    user,
  } = useAppSelector(state => state.auth);

  const sanitizedPhone = phoneNumber.replace(/\D/g, '').slice(0, 10);

  const isPhoneValid = sanitizedPhone.length === 10;
  const isSendingOtp = requestStatus === 'loading';

  const handlePhoneChange = value => {
    setPhoneNumber(value);

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleSendOtp = async () => {
    if (!isPhoneValid) {
      return;
    }

    try {
      await dispatch(requestMockOtp(sanitizedPhone)).unwrap();
      navigation.navigate('Otp');
    } catch {
      // The slice already stores the mock auth error for UI display.
    }
  };

  return (
    <View className="flex-1 bg-[#f8f4ed] -mt-8">
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 10) }}
        className="bg-white"
      >
        <ImageBackground
          source={bannerImage}
          resizeMode="cover"
          style={{ height: heroHeight }}
          imageStyle={styles.heroImage}
          className="overflow-hidden"
        >
          <View
            style={{ paddingTop: insets.top + 40 }}
            className="flex-1 bg-[#f8f0e633] px-6"
          >
            <View className="items-start justify-center">
            <View className=" mt-1 items-center">
            
                <Gem size={26} color={gold} strokeWidth={1.7} />
              
              <Text style={styles.brandTitle}>
                Shree
              </Text>
              <Text style={styles.brandSubtitle}>
                Yamunaji Jewellers
              </Text>
            </View>
            </View>

            <View className="mt-6 items-start pl-4">
              <Text style={styles.welcomeTitle}>
                Welcome <Text className="text-[#b58b3c]">Back</Text>
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Sign in to continue your jewellery journey
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View className="-mt-8 rounded-t-[30px] bg-white px-6 pb-6 pt-7">
          <Text className="text-center font-italic  text-[18px] font-bold leading-18 text-[#171717] ">
            Login with Mobile Number
          </Text>
          <Text className="mt-1 text-center text-[12px] font-500 leading-[12px] text-[#747474]">
            We'll send you a verification code
          </Text>
          <Text className="mt-3 text-center text-[12px] leading-[18px] text-[#9b7d47]">
            Demo accounts: `9876543210` or `9123456789`
          </Text>
          {isAuthenticated && user ? (
            <Text className="mt-2 text-center text-[12px] font-semibold leading-[18px] text-[#2f6f4f]">
              Signed in as {user.name} ({user.tier})
            </Text>
          ) : null}

          <View className="mt-6 h-[60px] flex-row items-center rounded-[17px] border border-[#ded9d0] bg-white px-4">
            <Text className="ml-3 mr-1 text-[15px] font-semibold leading-[22px] text-[#171717]">
              +91
            </Text>
            <ChevronDown size={17} color="#171717" />
            <View className="mx-[13px] h-[34px] w-px bg-[#ddd6cb]" />
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor="#b5b5b5"
              keyboardType="phone-pad"
              value={sanitizedPhone}
              onChangeText={handlePhoneChange}
              maxLength={10}
              className="flex-1 p-0 text-[17px] text-[#171717]"
            />
          </View>
          {error ? (
            <Text className="mt-3 text-center text-[13px] font-medium leading-[18px] text-[#b23a3a]">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSendOtp}
            disabled={!isPhoneValid || isSendingOtp}
            className={`mt-5 h-[60px] items-center justify-center rounded-[17px] ${
              isPhoneValid && !isSendingOtp ? 'bg-[#181818]' : 'bg-[#b8b1a7]'
            }`}
            style={isPhoneValid && !isSendingOtp ? styles.otpButtonShadow : undefined}
          >
            <Text className="text-[18px] font-semibold leading-6 text-white">
              {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
            </Text>
            <ArrowRight
              size={24}
              color="#ffffff"
              strokeWidth={2.4}
              style={styles.otpIcon}
            />
          </TouchableOpacity>

          <View className="mt-5 flex-row items-center">
            <View className="h-px flex-1 bg-[#dfdbd3]" />
            <Text className="mx-[18px] text-[15px] font-semibold leading-5 text-[#6e6e6e]">
              OR
            </Text>
            <View className="h-px flex-1 bg-[#dfdbd3]" />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            className="mt-[22px] h-[56px] flex-row items-center justify-center rounded-full border border-[#b58b3c] bg-[#fffdfa] px-[22px]"
          >
            <View className="mr-[14px] h-[42px] w-[42px] items-center justify-center rounded-full bg-[#f8f1e4]">
              <Phone size={20} color={gold} strokeWidth={2} />
            </View>
            <Text className="shrink text-center text-[15px] font-semibold leading-[15px] text-[#171717]">
              Continue with WhatsApp
            </Text>
          </TouchableOpacity>

          <View className="mt-[34px] flex-row">
            {featureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <View
                  key={item.title}
                  className={`flex-1 items-center px-2 py-1 ${
                    index < featureItems.length - 1 ? 'border-r border-[#e5ddd0]' : ''
                  }`}
                >
                  <Icon size={30} color={gold} strokeWidth={1.8} />
                  <Text className="mt-2 text-center text-[12px] font-semibold leading-5 text-[#1f1f1f]">
                    {item.title}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text className="mt-5 px-2 text-center text-[13px] leading-5 text-[#8a7f70]">
            By continuing, you agree to our{' '}
            <Text className="font-semibold text-[#b58b3c]">
              Terms & Conditions
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  brandTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    marginTop: 10,
    color: '#171717',
    fontSize: 33,
    lineHeight: 40,
    letterSpacing: 8,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    marginTop: 8,
    color: gold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 4,
    textAlign: 'center',
    textTransform: 'none',
  },
  welcomeTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    color: '#171717',
    fontSize: 29,
    lineHeight: 40,
  },
  welcomeSubtitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    marginTop: 2,
    maxWidth: 210,
    color: '#66615b',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  otpButtonShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  otpIcon: {
    position: 'absolute',
    right: 28,
  },
});

export default Login;
