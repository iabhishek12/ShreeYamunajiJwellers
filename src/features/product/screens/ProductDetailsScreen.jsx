import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
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
import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  Heart,
  Minus,
  RotateCcw,
  Share2,
  Shield,
  Star,
  Truck,
  Gem,
  Plus,
  ShoppingBag,
} from 'lucide-react-native';
import { productDetails, productList } from '../../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart } from '../../cart/store/cartSlice';
import {
  addWishlistItem,
  removeWishlistProduct,
} from '../../wishlist/store/wishlistSlice';

const assuranceIconMap = {
  BadgeCheck,
  Gem,
  Shield,
  Truck,
};

const highlightIconMap = {
  RotateCcw,
  Truck,
};

const categoryLabelMap = {
  rings: 'Rings',
  earrings: 'Earrings',
  necklaces: 'Necklaces',
  bracelets: 'Bracelets',
  bangles: 'Bangles',
  'mens-jewelry': "Men's Jewelry",
};

function ProductDetailsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(state => state.cart.totalQuantity);
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const productId = route.params?.productId ?? 'infinity-sparkle-ring';
  const product = productDetails[productId] ?? productDetails['infinity-sparkle-ring'];
  const isWishlisted = wishlistItems.some(item => item.productId === product.id);
  const reviewState = useAppSelector(
    state => state.reviews.byProduct[product.id],
  );

  const [selectedGalleryId, setSelectedGalleryId] = useState(product.gallery[0]?.id);
  const [selectedMetalId, setSelectedMetalId] = useState(product.defaultMetal);
  const [selectedSizeId, setSelectedSizeId] = useState(product.defaultSize);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedGalleryId(product.gallery[0]?.id);
    setSelectedMetalId(product.defaultMetal);
    setSelectedSizeId(product.defaultSize);
    setQuantity(1);
  }, [product]);

  const selectedImage = useMemo(
    () =>
      product.gallery.find(item => item.id === selectedGalleryId) ?? product.gallery[0],
    [product.gallery, selectedGalleryId],
  );

  const selectedMetal = useMemo(
    () =>
      product.metals.find(item => item.id === selectedMetalId) ?? product.metals[0],
    [product.metals, selectedMetalId],
  );

  const selectedSize = useMemo(
    () => product.sizes.find(item => item.id === selectedSizeId) ?? product.sizes[0],
    [product.sizes, selectedSizeId],
  );

  const similarProducts = useMemo(
    () =>
      productList
        .filter(item => item.categoryId === product.categoryId && item.id !== product.id)
        .slice(0, 4),
    [product.categoryId, product.id],
  );

  const productDetailCards = useMemo(
    () => [
      {
        id: 'category',
        label: 'Category',
        value: categoryLabelMap[product.categoryId] || 'Jewelry',
      },
      {
        id: 'metal',
        label: 'Metal',
        value: selectedMetal?.value || '18K Gold',
      },
      {
        id: 'size',
        label: 'Size',
        value: `Selected size ${selectedSize?.label || product.defaultSize}`,
      },
      {
        id: 'availability',
        label: 'Availability',
        value: product.stockLabel,
      },
    ],
    [product.categoryId, product.defaultSize, product.stockLabel, selectedMetal, selectedSize],
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        selectedMetalId: selectedMetal.id,
        selectedSizeId: selectedSize?.id ?? null,
        quantity,
        unitPrice: product.price,
      }),
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigation.navigate('Cart');
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeWishlistProduct(product.id));
      return;
    }

    dispatch(
      addWishlistItem({
        id: `wishlist-${product.id}`,
        productId: product.id,
        note: 'Saved from product details',
      }),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fcf8f2]">
      <StatusBar barStyle="dark-content" backgroundColor="#fcf8f2" />

      <View className="flex-1" style={{ paddingTop: Math.max(insets.top, 6) }}>
        <View className="flex-row items-center justify-between border-b border-[#eee4d5] px-4 pb-4">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft size={22} color="#201b17" strokeWidth={2.2} />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.85}
              className="mr-2 h-10 w-10 items-center justify-center rounded-full"
            >
              <Share2 size={20} color="#201b17" strokeWidth={2.1} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleToggleWishlist}
              className="mr-2 h-10 w-10 items-center justify-center rounded-full"
            >
              <Heart
                size={20}
                color={isWishlisted ? '#bd8934' : '#201b17'}
                fill={isWishlisted ? '#bd8934' : 'transparent'}
                strokeWidth={2.1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Cart')}
              className="relative h-10 w-10 items-center justify-center rounded-full"
            >
              <ShoppingBag size={20} color="#201b17" strokeWidth={2.1} />
              {cartCount > 0 ? (
                <View className="absolute right-0 top-0 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ba8531] px-1">
                  <Text className="text-[10px] font-bold text-white">
                    {cartCount}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="mt-4 flex-row px-4">
            <View className="mr-3 w-[60px]">
              {product.gallery.map(item => {
                const selected = item.id === selectedGalleryId;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedGalleryId(item.id)}
                    className={`mb-2.5 h-[60px] overflow-hidden rounded-[14px] border ${
                      selected
                        ? 'border-[#c08d39] bg-[#fff6e7]'
                        : 'border-[#e7ddcf] bg-white'
                    }`}
                  >
                    <Image source={item.image} resizeMode="cover" className="h-full w-full" />
                    {item.type === 'video' ? (
                      <View
                        className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
                        style={styles.videoOverlay}
                      >
                        {/* <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
                          <Play size={14} color="#6f5a43" fill="#6f5a43" strokeWidth={1.6} />
                        </View> */}
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="flex-1 h-[280px] overflow-hidden rounded-[28px] bg-[#f8efe1] ">
              <Image
                source={selectedImage.image}
                resizeMode="cover"
                className="h-[300px] w-full"
              />
            </View>
          </View>

          <View className="px-4 pb-10">
            <Text className="mt-5 text-[11px] font-bold tracking-[4px] text-[#c08d39]">
              {product.badge}
            </Text>

            <Text className="mt-2 text-[#15120f]" style={styles.productTitle}>
              {product.title}
            </Text>

            <Text className="mt-0 text-[15px] text-[#564d44]">{product.subtitle}</Text>

            <View className="mt-2 flex-row items-center">
              <View className="flex-row">
                {[0, 1, 2, 3, 4].map(index => (
                  <Star
                    key={`rating-star-${index}`}
                    size={18}
                    color="#b98433"
                    fill="#b98433"
                    strokeWidth={1.6}
                  />
                ))}
              </View>
              <Text className="ml-2 text-[15px] font-medium text-[#2d251d]">
                {reviewState?.summary?.average?.toFixed(1) || product.rating}
              </Text>
              <Text className="ml-2 text-[15px] text-[#675e55]">
                ({reviewState?.summary?.totalCount || product.reviews} reviews)
              </Text>
            </View>

            <View className="mt-4 flex-row items-center">
              <Text className="text-[22px] font-bold text-[#111111]">Rs {product.price}</Text>
              <Text className="ml-3 text-[18px] text-[#8a8178]" style={styles.strikeText}>
                Rs {product.originalPrice}
              </Text>
              <View className="ml-3 rounded-full bg-[#f8ebd9] px-4 py-2">
                <Text className="text-[12px] font-bold text-[#c08d39]">
                  {product.discountLabel}
                </Text>
              </View>
            </View>

            <View className="mt-5 rounded-[16px] border border-[#e8dece] bg-[#fffdf9] px-1 py-1.5">
              <View className="flex-row">
                {product.assuranceItems.map((item, index) => {
                  const Icon = assuranceIconMap[item.icon];

                  return (
                    <View
                      key={item.id}
                      className={`flex-1 items-center px-2 ${
                        index < product.assuranceItems.length - 1
                          ? 'border-r border-[#efe5d7]'
                          : ''
                      }`}
                    >
                      <Icon size={18} color="#c08d39" strokeWidth={1.8} />
                      <Text className="mt-2 text-center text-[9px] font-semibold leading-[12px] text-[#3d352d]">
                        {item.title}
                      </Text>
                      <Text className="text-center text-[9px] font-semibold leading-[12px] text-[#3d352d]">
                        {item.subtitle}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-[16px] font-semibold text-[#17120f]" style={styles.sectionTitle}>
                Metal
              </Text>
              <Text className="text-[13px] text-[#7d705f]">{selectedMetal.value}</Text>
            </View>

            <View className="mt-1.5 flex-row justify-between">
              {product.metals.map(item => {
                const selected = item.id === selectedMetalId;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedMetalId(item.id)}
                    className={`w-[31%] rounded-[14px] border px-2 py-2.5 ${
                      selected
                        ? 'border-[#c08d39] bg-[#fff8eb]'
                        : 'border-[#e7ddcf] bg-white'
                    }`}
                  >
                    <View
                      className="mx-auto h-3.5 w-3.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <Text className="mt-2 text-center text-[11px] font-medium text-[#31261c]">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mt-5 flex-row items-center justify-between">
              <Text className="text-[16px] font-semibold text-[#17120f]" style={styles.sectionTitle}>
                Size
              </Text>
              <Text className="text-[13px] text-[#7d705f]">Choose ring size</Text>
            </View>

            <View className="mt-1.5 flex-row justify-between">
              {product.sizes.map(item => {
                const selected = item.id === selectedSizeId;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedSizeId(item.id)}
                    className={`w-[22%] items-center rounded-[14px] border px-2 py-2.5 ${
                      selected
                        ? 'border-[#c08d39] bg-[#fff8eb]'
                        : 'border-[#e7ddcf] bg-white'
                    }`}
                  >
                    <Text
                      className={`text-[14px] font-semibold ${
                        selected ? 'text-[#9f6f28]' : 'text-[#31261c]'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mt-4 flex-row items-end justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[16px] font-bold text-[#17120f]" style={styles.sectionTitle}>
                  Quantity
                </Text>
                <View className="mt-2.5 flex-row items-center">
                  <View className="mr-2 h-2 w-2 rounded-full bg-[#1ab37a]" />
                  <Text className="text-[13px] text-[#5b5148]">{product.stockLabel}</Text>
                </View>
              </View>

              <View className="flex-row items-center rounded-[15px] border border-[#e7ddcf] bg-white px-1 py-0.5">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setQuantity(current => Math.max(1, current - 1))}
                  className="h-10 w-10 items-center justify-center"
                >
                  <Minus size={16} color="#7b736b" strokeWidth={2.1} />
                </TouchableOpacity>
                <Text className="mx-2.5 min-w-[18px] text-center text-[17px] font-semibold text-[#17120f]">
                  {quantity}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setQuantity(current => current + 1)}
                  className="h-9 w-10 items-center justify-center"
                >
                  <Plus size={16} color="#17120f" strokeWidth={2.1} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-7 flex-row justify-between">
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={handleAddToCart}
                className="w-[45%] items-center rounded-[16px] bg-[#1a1a1a] py-4"
              >
                <Text className="text-[18px] font-semibold text-white">Add to Bag</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.92}
                onPress={handleBuyNow}
                className="w-[47%] items-center rounded-[16px] bg-[#bc8735] py-4"
              >
                <Text className="text-[18px] font-semibold text-white">Buy Now</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-9 flex-row overflow-hidden rounded-[18px] border border-[#e8dece] bg-[#fbf8f1]">
              {product.highlights.map((item, index) => {
                const Icon = highlightIconMap[item.icon];

                return (
                  <View
                    key={item.id}
                    className={`flex-1 flex-row items-center px-2 py-1.5 ${
                      index === 0 ? 'border-r border-[#ebe1d3]' : ''
                    }`}
                  >
                    <Icon size={20} color="#c08d39" strokeWidth={1.8} />
                    <View className="ml-3 flex-1">
                      <Text className="text-[11px] font-semibold text-[#2f2924]">
                        {item.title}
                      </Text>
                      <Text className="mt-1 text-[9px] text-[#7a7168]">
                        {item.description}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <Text className="mt-8 text-[#17120f]" style={styles.detailsTitle}>
              Details
            </Text>
            <Text className="mt-1.5 text-[14px] leading-[20px] text-[#4f4740]">
              {product.details}
            </Text>

            <View style={styles.detailCardsWrap} className="rounded-[16px]">
              {productDetailCards.map(item => (
                <View key={item.id} style={styles.detailCard}>
                  <Text style={styles.detailCardLabel}>{item.label}</Text>
                  <Text style={styles.detailCardValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.reviewActionsWrap}>
              <TouchableOpacity
                activeOpacity={0.88}
                style={styles.reviewActionCard}
                onPress={() => navigation.navigate('ProductReviews', { productId: product.id })}
              >
                <View>
                  <Text style={styles.reviewActionTitle}>View Reviews</Text>
                  <Text style={styles.reviewActionMeta}>
                    Read customer feedback and ratings
                  </Text>
                </View>
                <ChevronRight size={16} color="#6b5a43" strokeWidth={2.1} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.88}
                style={styles.reviewActionCard}
                onPress={() => navigation.navigate('AddReview', { productId: product.id })}
              >
                <View>
                  <Text style={styles.reviewActionTitle}>Rate & Add Review</Text>
                  <Text style={styles.reviewActionMeta}>
                    Share your experience with this piece
                  </Text>
                </View>
                <ChevronRight size={16} color="#6b5a43" strokeWidth={2.1} />
              </TouchableOpacity>
            </View>

            {similarProducts.length > 0 ? (
              <View style={styles.similarSection}>
                <View style={styles.similarSectionTop}>
                  <Text style={styles.detailsTitle}>Suggested Similar Products</Text>
                  <TouchableOpacity
                    activeOpacity={0.86}
                    onPress={() =>
                      navigation.navigate('AllProducts', {
                        categoryId: product.categoryId,
                      })
                    }
                  >
                    <Text style={styles.similarViewAllText}>View All</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.similarScrollContent}
                >
                  {similarProducts.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.9}
                      onPress={() => navigation.push('ProductDetails', { productId: item.id })}
                      style={styles.similarCard}
                    >
                      <Image
                        source={item.gallery[0].image}
                        resizeMode="cover"
                        style={styles.similarImage}
                      />
                      <Text numberOfLines={1} style={styles.similarTitle}>
                        {item.title}
                      </Text>
                      <Text numberOfLines={1} style={styles.similarSubtitle}>
                        {item.subtitle}
                      </Text>
                      <View style={styles.similarRatingRow}>
                        <Star
                          size={11}
                          color="#b98433"
                          fill="#b98433"
                          strokeWidth={1.6}
                        />
                        <Text style={styles.similarRatingText}>
                          {item.rating} ({item.reviews})
                        </Text>
                      </View>
                      <Text style={styles.similarPrice}>Rs {item.price}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  productTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 34,
  },
  sectionTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontWeight: '700',
  },
  detailsTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  reviewActionsWrap: {
    marginTop: 14,
  },
  detailCardsWrap: {
    marginTop: 10,
    borderWidth: 1,
  
    borderColor: '#e8dece',
    padding: 4,
  },
  detailCard: {
    marginTop: 6,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#e8dece',
    backgroundColor: '#fffdf9',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  detailCardLabel: {
    color: '#8a7d6f',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  detailCardValue: {
    marginTop: 4,
    color: '#17120f',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
  },
  reviewActionCard: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e7ddcf',
    backgroundColor: '#fffdf9',
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  reviewActionTitle: {
    color: '#17120f',
    fontSize: 13,
    fontWeight: '800',
  },
  reviewActionMeta: {
    marginTop: 3,
    color: '#746c63',
    fontSize: 10,
    fontWeight: '600',
  },
  similarSection: {
    marginTop: 16,
  },
  similarSectionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  similarViewAllText: {
    color: '#bc8735',
    fontSize: 12,
    fontWeight: '800',
  },
  similarScrollContent: {
    paddingTop: 10,
    paddingRight: 4,
  },
  similarCard: {
    width: 132,
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e8dece',
    backgroundColor: '#fffdf9',
    paddingBottom: 8,
  },
  similarImage: {
    height: 106,
    width: '100%',
    backgroundColor: '#f6efe3',
  },
  similarTitle: {
    marginTop: 8,
    paddingHorizontal: 9,
    color: '#17120f',
    fontSize: 12,
    fontWeight: '700',
  },
  similarSubtitle: {
    marginTop: 3,
    paddingHorizontal: 9,
    color: '#6f665d',
    fontSize: 9,
    fontWeight: '600',
  },
  similarRatingRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
  },
  similarRatingText: {
    marginLeft: 4,
    color: '#5d554d',
    fontSize: 9,
    fontWeight: '700',
  },
  similarPrice: {
    marginTop: 7,
    paddingHorizontal: 9,
    color: '#17120f',
    fontSize: 13,
    fontWeight: '800',
  },
  strikeText: {
    textDecorationLine: 'line-through',
  },
  videoOverlay: {
    backgroundColor: 'rgba(255,255,255,0.48)',
  },
});

export default ProductDetailsScreen;
