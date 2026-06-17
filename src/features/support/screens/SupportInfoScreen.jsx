import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BellRing,
  BookOpen,
  ChevronRight,
  Clock3,
  FileText,
  Headphones,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react-native';
import HomeHeader from '../../../components/home/HomeHeader';

const gold = '#bd8934';
const softGold = '#d7c39a';
const ink = '#201b17';
const muted = '#75695a';
const line = '#eadfce';

const supportConfigs = {
  FAQ: {
    eyebrow: 'HELP DESK',
    title: 'FAQs',
    subtitle: 'Quick answers for shopping, delivery, payments, and returns.',
    icon: BookOpen,
    sections: [
      {
        id: 'shopping',
        title: 'Shopping',
        items: [
          {
            id: 'browse',
            title: 'How do I explore products?',
            subtitle: 'Use Categories, Wishlist, and Product Details to compare designs before checkout.',
            icon: Sparkles,
          },
          {
            id: 'wishlist',
            title: 'Can I save jewellery for later?',
            subtitle: 'Yes, wishlist items stay available in your session so you can revisit them anytime.',
            icon: BellRing,
          },
        ],
      },
      {
        id: 'orders',
        title: 'Orders & Returns',
        items: [
          {
            id: 'track',
            title: 'Where can I track my orders?',
            subtitle: 'Open My Orders to see status, shipped items, and delivery updates.',
            icon: Clock3,
          },
          {
            id: 'returns',
            title: 'How do returns work?',
            subtitle: 'Return windows and eligibility are shown during checkout and on order-related screens.',
            icon: ShieldCheck,
          },
        ],
      },
    ],
    ctaLabel: 'Contact Support',
    ctaRoute: 'ContactUs',
  },
  ContactUs: {
    eyebrow: 'WE ARE HERE',
    title: 'Contact Us',
    subtitle: 'Reach our support and styling team for help with orders or product guidance.',
    icon: Headphones,
    sections: [
      {
        id: 'channels',
        title: 'Support Channels',
        items: [
          {
            id: 'phone',
            title: '+91 98765 43210',
            subtitle: 'Customer support line for order help and purchase assistance.',
            icon: Headphones,
            value: '9 AM - 8 PM',
          },
          {
            id: 'mail',
            title: 'care@shreeyamunaji.com',
            subtitle: 'Email us for invoices, returns, and product questions.',
            icon: Mail,
            value: '24 hr reply',
          },
          {
            id: 'chat',
            title: 'Live styling chat',
            subtitle: 'Talk to our team for gifting ideas and jewellery recommendations.',
            icon: MessageCircleMore,
            value: 'Online',
          },
        ],
      },
      {
        id: 'store',
        title: 'Visit Our Store',
        items: [
          {
            id: 'location',
            title: 'Shree Yamunaji Jewellers',
            subtitle: 'CG Road, Ahmedabad, Gujarat',
            icon: Store,
            value: 'Open today',
          },
        ],
      },
    ],
    ctaLabel: 'Explore Categories',
    ctaRoute: 'Categories',
  },
  AboutUs: {
    eyebrow: 'OUR STORY',
    title: 'About Us',
    subtitle: 'A jewellery house built around craft, trust, and thoughtful celebrations.',
    icon: Store,
    sections: [
      {
        id: 'story',
        title: 'What We Value',
        items: [
          {
            id: 'craft',
            title: 'Crafted with care',
            subtitle: 'Every collection is shaped around daily wear, gifting moments, and timeless design.',
            icon: Sparkles,
          },
          {
            id: 'trust',
            title: 'Guided by trust',
            subtitle: 'We focus on clear service, secure shopping, and dependable support after purchase.',
            icon: ShieldCheck,
          },
          {
            id: 'service',
            title: 'Personal experience',
            subtitle: 'From first browse to delivery, the experience is designed to feel warm and attentive.',
            icon: UserRound,
          },
        ],
      },
    ],
    ctaLabel: 'Browse Collections',
    ctaRoute: 'Categories',
  },
  PrivacyPolicy: {
    eyebrow: 'YOUR PRIVACY',
    title: 'Privacy Policy',
    subtitle: 'A clear overview of how customer details are handled in this app experience.',
    icon: LockKeyhole,
    sections: [
      {
        id: 'data',
        title: 'Information We Use',
        items: [
          {
            id: 'signin',
            title: 'Sign-in details',
            subtitle: 'Phone information is used for the mock OTP login and account recognition flow.',
            icon: UserRound,
          },
          {
            id: 'shopping',
            title: 'Shopping activity',
            subtitle: 'Cart, wishlist, and address selections are used to personalize your session.',
            icon: FileText,
          },
        ],
      },
      {
        id: 'protection',
        title: 'How It Is Protected',
        items: [
          {
            id: 'security',
            title: 'Minimal collection',
            subtitle: 'Only the information needed for the demo shopping flow is shown in the app.',
            icon: ShieldCheck,
          },
          {
            id: 'support',
            title: 'Support visibility',
            subtitle: 'Customer-facing details are limited to order updates, address usage, and checkout context.',
            icon: BellRing,
          },
        ],
      },
    ],
    ctaLabel: 'Read FAQs',
    ctaRoute: 'FAQ',
  },
  TermsConditions: {
    eyebrow: 'HELP DESK',
    title: 'FAQs',
    subtitle: 'Quick answers for shopping, delivery, payments, and returns.',
    icon: BookOpen,
    sections: [
      {
        id: 'legacy',
        title: 'Shopping Support',
        items: [
          {
            id: 'legacy-faq',
            title: 'Find answers quickly',
            subtitle: 'This route now points to FAQs so support information stays in one place.',
            icon: BookOpen,
          },
        ],
      },
    ],
    ctaLabel: 'Open Contact Us',
    ctaRoute: 'ContactUs',
  },
};

function SupportInfoScreen({ navigation, route }) {
  const config = supportConfigs[route.name] || supportConfigs.FAQ;
  const Icon = config.icon;

  return (
    <SafeAreaView style={styles.safeArea}>
      <HomeHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.heroIconWrap}>
            <Icon size={25} color={softGold} strokeWidth={1.9} />
          </View>
          <Text style={styles.eyebrow}>{config.eyebrow}</Text>
          <Text style={styles.title}>{config.title}</Text>
          <Text style={styles.subtitle}>{config.subtitle}</Text>
        </View>

        {config.sections.map(section => (
          <View key={section.id} style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(item => {
              const RowIcon = item.icon;

              return (
                <View key={item.id} style={styles.infoRow}>
                  <View style={styles.rowIconWrap}>
                    <RowIcon size={18} color={gold} strokeWidth={2} />
                  </View>
                  <View style={styles.rowCopy}>
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
        ))}

        <View style={styles.noteCard}>
          <MapPin size={18} color={gold} strokeWidth={1.9} />
          <Text style={styles.noteText}>
            Store timings, product availability, and support guidance may vary across collections and order status.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.ctaButton}
          onPress={() => navigation.navigate(config.ctaRoute)}
        >
          <Text style={styles.ctaText}>{config.ctaLabel}</Text>
          <ChevronRight size={18} color="#ffffff" strokeWidth={2.2} />
        </TouchableOpacity>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf7f1',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heroCard: {
    marginTop: 15,
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#e3d0ad',
    backgroundColor: softGold,
    padding: 12,
  },
  heroGlow: {
    position: 'absolute',
    right: -46,
    top: -54,
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
  },
  heroIconWrap: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#201b17',
  },
  eyebrow: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '900',
    color: '#8f6422',
    letterSpacing: 2.6,
  },
  title: {
    marginTop: 2,
    fontFamily: serifFont,
    fontSize: 28,
    lineHeight: 30,
    color: ink,
  },
  subtitle: {
    marginTop: 4,
    maxWidth: 290,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    color: '#6e614f',
  },
  sectionWrap: {
    marginTop: 15,
  },
  sectionTitle: {
    marginBottom: 10,
    color: ink,
    fontFamily: serifFont,
    fontSize: 18,
    lineHeight: 22,
  },
  infoRow: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  rowIconWrap: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#f8efe3',
  },
  rowCopy: {
    marginLeft: 12,
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: ink,
  },
  rowSubtitle: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16,
    color: '#8b8176',
  },
  valuePill: {
    borderRadius: 14,
    backgroundColor: '#201b17',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  valueText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#ffffff',
  },
  noteCard: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#fffaf3',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  noteText: {
    marginLeft: 10,
    flex: 1,
    color: muted,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
  },
  ctaButton: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#201b17',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  ctaText: {
    marginRight: 8,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
});

export default SupportInfoScreen;
