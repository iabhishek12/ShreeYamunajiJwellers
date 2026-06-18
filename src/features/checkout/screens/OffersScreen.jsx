import React from 'react';
import {
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
import { ArrowLeft, CheckCircle2, ChevronRight, Gift, Tag, TicketPercent } from 'lucide-react-native';
import { checkoutOffers } from '../../../data/mock/checkoutMock';

const green = '#087A34';
const gold = '#F4C23D';
const ink = '#202020';
const ivory = '#FFFDF4';

const kindIconMap = {
  Coupon: Tag,
  Voucher: TicketPercent,
  Offer: Gift,
};

function OffersScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const selectedOfferId = route.params?.selectedOfferId ?? 'welcome';

  const handleApplyOffer = offer => {
    navigation.replace('Checkout', {
      selectedOfferIdFromOffers: offer.id,
      couponCodeFromOffers: offer.code,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={green} />

      <View style={[styles.header, { paddingTop: Math.max(insets.top, 4) }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={21} color="#FFFFFF" strokeWidth={2.2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers & Vouchers</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.body}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.subtitle}>
          Browse all available coupons, vouchers, and checkout offers.
        </Text>

        {checkoutOffers.map(offer => {
          const selected = offer.id === selectedOfferId;
          const Icon = kindIconMap[offer.kind] || Tag;

          return (
            <View
              key={offer.id}
              style={[
                styles.offerCard,
                selected ? styles.selectedOfferCard : null,
              ]}
            >
              <View style={styles.offerTop}>
                <View style={styles.offerIconWrap}>
                  <Icon size={18} color={gold} strokeWidth={1.9} />
                </View>
                <View style={styles.offerCopy}>
                  <View style={styles.offerHeaderLine}>
                    <Text style={styles.offerKind}>{offer.kind}</Text>
                    <Text style={styles.offerSavings}>{offer.savingsLabel}</Text>
                  </View>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                  <View style={styles.codePill}>
                    <Text style={styles.codeText}>{offer.code}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => handleApplyOffer(offer)}
                style={styles.applyButton}
              >
                <Text style={styles.applyText}>
                  {selected ? 'Applied in Checkout' : 'Apply Offer'}
                </Text>
                {selected ? (
                  <CheckCircle2 size={18} color={green} strokeWidth={2} />
                ) : (
                  <ChevronRight size={18} color={gold} strokeWidth={2} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
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
    backgroundColor: green,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: gold,
    backgroundColor: green,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontFamily: serifFont,
    fontSize: 24,
    lineHeight: 28,
  },
  headerSpacer: {
    width: 38,
  },
  body: {
    flex: 1,
    backgroundColor: ivory,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  subtitle: {
    marginTop: 16,
    color: ink,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  offerCard: {
    marginTop: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  selectedOfferCard: {
    borderColor: green,
    backgroundColor: '#FFF6DF',
  },
  offerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  offerIconWrap: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: '#FFF6DF',
  },
  offerCopy: {
    marginLeft: 10,
    flex: 1,
  },
  offerHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerKind: {
    color: green,
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  offerSavings: {
    color: green,
    fontSize: 9,
    fontWeight: '700',
  },
  offerTitle: {
    marginTop: 4,
    color: green,
    fontSize: 13,
    fontWeight: '700',
  },
  offerSubtitle: {
    marginTop: 3,
    color: ink,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
  },
  codePill: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: green,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  codeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  applyButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: gold,
    paddingTop: 10,
  },
  applyText: {
    color: green,
    fontSize: 11,
    fontWeight: '700',
  },
});

export default OffersScreen;
