import React from 'react';
import {
  Dimensions,
  ImageBackground,
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

function Login() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) },
        ]}
      >
        <ImageBackground
          source={bannerImage}
          resizeMode="cover"
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={[styles.heroOverlay, { paddingTop: insets.top + 20 }]}>
            <View style={styles.brandBlock}>
              <Gem size={30} color={gold} strokeWidth={1.7} />
              <Text style={styles.brandName}>Shree</Text>
              <Text style={styles.brandSub}>Yamunaji</Text>
              <Text style={styles.brandSub}>Jewellers</Text>
            </View>

            <View style={styles.welcomeBlock}>
              <Text style={styles.welcomeText}>
                Welcome <Text style={styles.goldText}>Back</Text>
              </Text>
              <Text style={styles.welcomeSub}>
                Sign in to continue your{'\n'}jewelry journey
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login with Mobile Number</Text>
          <Text style={styles.cardSub}>
            We'll send you a verification code
          </Text>

          <View style={styles.inputWrap}>
            <View style={styles.flag}>
              <View style={styles.flagSaffron} />
              <View style={styles.flagWhite}>
                <View style={styles.flagWheel} />
              </View>
              <View style={styles.flagGreen} />
            </View>
            <Text style={styles.countryCode}>+91</Text>
            <ChevronDown size={17} color="#171717" />
            <View style={styles.inputDivider} />
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor="#b5b5b5"
              keyboardType="phone-pad"
              style={styles.phoneInput}
            />
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.otpButton}>
            <Text style={styles.otpText}>Send OTP</Text>
            <ArrowRight
              size={28}
              color="#ffffff"
              strokeWidth={2.4}
              style={styles.otpIcon}
            />
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.whatsappButton}>
            <View style={styles.whatsappIcon}>
              <Phone size={20} color={gold} strokeWidth={2} />
            </View>
            <Text style={styles.whatsappText}>Continue with WhatsApp</Text>
          </TouchableOpacity>

          <View style={styles.featuresRow}>
            {featureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <View
                  key={item.title}
                  style={[
                    styles.featureItem,
                    index < featureItems.length - 1 && styles.featureDivider,
                  ]}
                >
                  <Icon size={36} color={gold} strokeWidth={1.8} />
                  <Text style={styles.featureText}>{item.title}</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f4ed',
  },
  scrollContent: {
    backgroundColor: '#ffffff',
  },
  hero: {
    height: heroHeight,
    overflow: 'hidden',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(248, 240, 230, 0.2)',
  },
  brandBlock: {
    alignItems: 'center',
  },
  brandName: {
    marginTop: 8,
    fontSize: 34,
    lineHeight: 42,
    color: '#171717',
    fontFamily: 'serif',
    letterSpacing: 8,
  },
  brandSub: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 24,
    color: gold,
    fontWeight: '700',
    letterSpacing: 6,
  },
  welcomeBlock: {
    marginTop: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 35,
    lineHeight: 42,
    color: '#171717',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  goldText: {
    color: gold,
  },
  welcomeSub: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 25,
    color: '#66615b',
    textAlign: 'center',
  },
  card: {
    marginTop: -32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontSize: 25,
    lineHeight: 32,
    color: '#171717',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  cardSub: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#747474',
    textAlign: 'center',
  },
  inputWrap: {
    height: 60,
    marginTop: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ded9d0',
    borderRadius: 17,
    backgroundColor: '#ffffff',
  },
  flag: {
    width: 38,
    height: 26,
    overflow: 'hidden',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eadfca',
    backgroundColor: '#ffffff',
  },
  flagSaffron: {
    flex: 1,
    backgroundColor: '#f59f2f',
  },
  flagWhite: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  flagWheel: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2b55a2',
  },
  flagGreen: {
    flex: 1,
    backgroundColor: '#1c9a53',
  },
  countryCode: {
    marginLeft: 12,
    marginRight: 5,
    fontSize: 17,
    lineHeight: 22,
    color: '#171717',
    fontWeight: '700',
  },
  inputDivider: {
    width: 1,
    height: 34,
    marginHorizontal: 13,
    backgroundColor: '#ddd6cb',
  },
  phoneInput: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    fontSize: 17,
    color: '#171717',
  },
  otpButton: {
    height: 62,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#181818',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  otpText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#ffffff',
    fontWeight: '700',
  },
  otpIcon: {
    position: 'absolute',
    right: 28,
  },
  orRow: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dfdbd3',
  },
  orText: {
    marginHorizontal: 18,
    fontSize: 15,
    lineHeight: 20,
    color: '#6e6e6e',
    fontWeight: '700',
  },
  whatsappButton: {
    height: 56,
    marginTop: 22,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: gold,
    borderRadius: 28,
    backgroundColor: '#fffdfa',
  },
  whatsappIcon: {
    width: 42,
    height: 42,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#f8f1e4',
  },
  whatsappText: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 21,
    color: '#171717',
    fontWeight: '700',
    textAlign: 'center',
  },
  featuresRow: {
    marginTop: 34,
    flexDirection: 'row',
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  featureDivider: {
    borderRightWidth: 1,
    borderRightColor: '#e5ddd0',
  },
  featureText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#1f1f1f',
    fontWeight: '700',
    textAlign: 'center',
  },
  termsText: {
    marginTop: 28,
    paddingHorizontal: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#8a7f70',
    textAlign: 'center',
  },
  termsLink: {
    color: gold,
    fontWeight: '600',
  },
});

export default Login;
