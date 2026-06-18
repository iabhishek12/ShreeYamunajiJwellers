import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';
import { productDetails } from '../../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addReview } from '../store/reviewsSlice';

const green = '#087A34';
const gold = '#F4C23D';
const ivory = '#FFFDF4';
const ink = '#202020';

function AddReviewScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const productId = route.params?.productId ?? 'infinity-sparkle-ring';
  const product = productDetails[productId] ?? productDetails['infinity-sparkle-ring'];
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    dispatch(
      addReview({
        productId: product.id,
        rating,
        title: title.trim() || 'Lovely product',
        comment: comment.trim() || 'Happy with the overall quality and finish.',
        name: user?.name || 'Guest Shopper',
      }),
    );
    navigation.replace('ProductReviews', { productId: product.id });
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
        <Text style={styles.headerTitle}>Rate & Review</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.body}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.subtitle}>Share your experience with this jewelry piece.</Text>

        <View style={styles.card}>
          <Text style={styles.fieldTitle}>Your Rating</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(value => (
              <TouchableOpacity
                key={value}
                activeOpacity={0.86}
                onPress={() => setRating(value)}
                style={styles.starButton}
              >
                <Star
                  size={28}
                  color={gold}
                  fill={value <= rating ? gold : 'transparent'}
                  strokeWidth={1.8}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldTitle}>Review Title</Text>
          <TextInput
            placeholder="Summarize your experience"
            placeholderTextColor={ink}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.fieldTitle}>Write Review</Text>
          <TextInput
            multiline
            placeholder="Tell others about quality, comfort, gifting, or overall look."
            placeholderTextColor={ink}
            style={[styles.input, styles.multilineInput]}
            textAlignVertical="top"
            value={comment}
            onChangeText={setComment}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Submit Review</Text>
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
  productName: {
    marginTop: 16,
    color: green,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 2,
    color: ink,
    fontSize: 11,
    fontWeight: '600',
  },
  card: {
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: '#ffffff',
    padding: 14,
  },
  fieldTitle: {
    marginTop: 14,
    color: green,
    fontSize: 13,
    fontWeight: '700',
  },
  starRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  starButton: {
    marginRight: 8,
  },
  input: {
    marginTop: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: ink,
    fontSize: 13,
    fontWeight: '600',
  },
  multilineInput: {
    minHeight: 120,
  },
  submitButton: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: gold,
    backgroundColor: green,
    paddingVertical: 14,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default AddReviewScreen;
