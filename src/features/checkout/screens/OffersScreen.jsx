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
import { ArrowLeft, CheckCircle2, ChevronRight, Gift, Tag, TicketPercent } from 'lucide-react-native';
import { checkoutOffers } from '../../../data/mock/checkoutMock';

const gold = '#bd8934';
const ink = '#191714';
const ivory = '#fbf7f1';
const line = '#eadfce';

const kindIconMap = {
  Coupon: Tag,
  Voucher: TicketPercent,
  Offer: Gift,
};

function OffersScreen({ navigation, route }) {
  const selectedOfferId = route.params?.selectedOfferId ?? 'welcome';

  const handleApplyOffer = offer => {
    navigation.replace('Checkout', {
      selectedOfferIdFromOffers: offer.id,
      couponCodeFromOffers: offer.code,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={21} color={ink} strokeWidth={2.2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers & Vouchers</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
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
                  <CheckCircle2 size={18} color="#2f8b55" strokeWidth={2} />
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
    backgroundColor: ivory,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: line,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  backButton: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  headerTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 24,
    lineHeight: 28,
  },
  headerSpacer: {
    width: 38,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  subtitle: {
    marginTop: 16,
    color: '#71675e',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  offerCard: {
    marginTop: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  selectedOfferCard: {
    borderColor: '#bd8934',
    backgroundColor: '#fff8ef',
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
    backgroundColor: '#fbf2e6',
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
    color: '#8f6422',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  offerSavings: {
    color: '#2f8b55',
    fontSize: 9,
    fontWeight: '700',
  },
  offerTitle: {
    marginTop: 4,
    color: ink,
    fontSize: 13,
    fontWeight: '700',
  },
  offerSubtitle: {
    marginTop: 3,
    color: '#71675e',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
  },
  codePill: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#201b17',
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
    borderTopColor: '#efe4d5',
    paddingTop: 10,
  },
  applyText: {
    color: gold,
    fontSize: 11,
    fontWeight: '700',
  },
});

export default OffersScreen;
