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
import { ArrowLeft, ChevronRight, ShieldCheck, Star } from 'lucide-react-native';
import { productDetails } from '../../../data/mock/productMock';
import { useAppSelector } from '../../../store/hooks';

const ink = '#191714';
const gold = '#bd8934';
const ivory = '#fbf7f1';
const line = '#eadfce';

function ProductReviewsScreen({ navigation, route }) {
  const productId = route.params?.productId ?? 'infinity-sparkle-ring';
  const product = productDetails[productId] ?? productDetails['infinity-sparkle-ring'];
  const reviewState = useAppSelector(
    state => state.reviews.byProduct[product.id],
  );

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
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.productName}>{product.title}</Text>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.averageText}>{reviewState.summary.average.toFixed(1)}</Text>
            <View style={styles.starRow}>
              {[0, 1, 2, 3, 4].map(index => (
                <Star
                  key={`summary-${index}`}
                  size={14}
                  color={gold}
                  fill={gold}
                  strokeWidth={1.7}
                />
              ))}
            </View>
            <Text style={styles.summaryMeta}>
              Based on {reviewState.summary.totalCount} ratings
            </Text>
          </View>

          <View style={styles.recommendWrap}>
            <Text style={styles.recommendValue}>
              {reviewState.summary.recommendPercent}%
            </Text>
            <Text style={styles.recommendText}>recommend this piece</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddReview', { productId: product.id })}
        >
          <Text style={styles.actionText}>Rate & Add Review</Text>
          <ChevronRight size={18} color="#ffffff" strokeWidth={2.1} />
        </TouchableOpacity>

        {reviewState.items.map(review => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewTop}>
              <View style={styles.reviewerBadge}>
                <Text style={styles.reviewerInitials}>
                  {review.name
                    .split(' ')
                    .map(part => part[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </Text>
              </View>
              <View style={styles.reviewerCopy}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <Text style={styles.reviewerMeta}>
                  {review.location} . {review.date}
                </Text>
              </View>
              {review.verified ? (
                <View style={styles.verifiedPill}>
                  <ShieldCheck size={13} color="#35694f" strokeWidth={2} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.ratingLine}>
              {[0, 1, 2, 3, 4].map(index => (
                <Star
                  key={`${review.id}-${index}`}
                  size={13}
                  color={gold}
                  fill={index < review.rating ? gold : 'transparent'}
                  strokeWidth={1.8}
                />
              ))}
            </View>

            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: line,
    paddingHorizontal: 16,
    paddingBottom: 4,
    paddingTop: 12,
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
  productName: {
    marginTop: 16,
    color: ink,
    fontSize: 14,
    fontWeight: '700',
  },
  summaryCard: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  averageText: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 26,
    lineHeight: 30,
  },
  starRow: {
    marginTop: 6,
    flexDirection: 'row',
  },
  summaryMeta: {
    marginTop: 6,
    color: '#72685f',
    fontSize: 11,
    fontWeight: '700',
  },
  recommendWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  recommendValue: {
    color: gold,
    fontSize: 20,
    fontWeight: '800',
  },
  recommendText: {
    marginTop: 4,
    maxWidth: 120,
    textAlign: 'right',
    color: '#756b61',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 14,
  },
  actionButton: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#201b17',
    paddingVertical: 13,
  },
  actionText: {
    marginRight: 8,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  reviewCard: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerBadge: {
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#f6eee1',
  },
  reviewerInitials: {
    color: ink,
    fontSize: 13,
    fontWeight: '900',
  },
  reviewerCopy: {
    marginLeft: 10,
    flex: 1,
  },
  reviewerName: {
    color: ink,
    fontSize: 13,
    fontWeight: '700',
  },
  reviewerMeta: {
    marginTop: 2,
    color: '#7a7066',
    fontSize: 10,
    fontWeight: '700',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ebf7ef',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  verifiedText: {
    marginLeft: 4,
    color: '#35694f',
    fontSize: 10,
    fontWeight: '800',
  },
  ratingLine: {
    marginTop: 12,
    flexDirection: 'row',
  },
  reviewTitle: {
    marginTop: 10,
    color: ink,
    fontSize: 12,
    fontWeight: '700',
  },
  reviewComment: {
    marginTop: 5,
    color: '#5f5750',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
});

export default ProductReviewsScreen;
