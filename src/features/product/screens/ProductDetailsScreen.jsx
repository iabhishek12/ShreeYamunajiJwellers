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
import { productDetails } from '../../../data/mock/productMock';

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

function ProductDetailsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const productId = route.params?.productId ?? 'infinity-sparkle-ring';
  const product = productDetails[productId] ?? productDetails['infinity-sparkle-ring'];

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
              className="mr-2 h-10 w-10 items-center justify-center rounded-full"
            >
              <Heart size={20} color="#201b17" strokeWidth={2.1} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              className="relative h-10 w-10 items-center justify-center rounded-full"
            >
              <ShoppingBag size={20} color="#201b17" strokeWidth={2.1} />
              <View className="absolute right-0 top-0 h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ba8531] px-1">
                <Text className="text-[10px] font-bold text-white">
                  {product.activeCartCount}
                </Text>
              </View>
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
                {product.rating}
              </Text>
              <Text className="ml-2 text-[15px] text-[#675e55]">
                ({product.reviews} reviews)
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

            <View className="mt-10 rounded-[18px] border border-[#e8dece] bg-[#fffdf9] px-1.5 py-2">
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
                      <Icon size={20} color="#c08d39" strokeWidth={1.8} />
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

            <View className="mt-6 flex-row items-center justify-between">
              <Text className="text-[16px] font-semibold text-[#17120f]" style={styles.sectionTitle}>
                Metal
              </Text>
              <Text className="text-[14px] text-[#7d705f]">{selectedMetal.value}</Text>
            </View>

            <View className="mt-4 flex-row justify-between">
              {product.metals.map(item => {
                const selected = item.id === selectedMetalId;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedMetalId(item.id)}
                    className={`w-[31%] rounded-[16px] border px-2 py-3 ${
                      selected
                        ? 'border-[#c08d39] bg-[#fff8eb]'
                        : 'border-[#e7ddcf] bg-white'
                    }`}
                  >
                    <View
                      className="mx-auto h-4 w-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <Text className="mt-3 text-center text-[12px] font-medium text-[#31261c]">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mt-6 flex-row items-center justify-between">
              <Text className="text-[16px] font-semibold text-[#17120f]" style={styles.sectionTitle}>
                Size
              </Text>
              <Text className="text-[14px] text-[#7d705f]">Choose ring size</Text>
            </View>

            <View className="mt-4 flex-row justify-between">
              {product.sizes.map(item => {
                const selected = item.id === selectedSizeId;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => setSelectedSizeId(item.id)}
                    className={`w-[22%] items-center rounded-[16px] border px-2.5 py-3 ${
                      selected
                        ? 'border-[#c08d39] bg-[#fff8eb]'
                        : 'border-[#e7ddcf] bg-white'
                    }`}
                  >
                    <Text
                      className={`text-[15px] font-semibold ${
                        selected ? 'text-[#9f6f28]' : 'text-[#31261c]'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mt-8 flex-row items-end justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-[16px] font-bold text-[#17120f]" style={styles.sectionTitle}>
                  Quantity
                </Text>
                <View className="mt-3 flex-row items-center">
                  <View className="mr-2 h-2.5 w-2.5 rounded-full bg-[#1ab37a]" />
                  <Text className="text-[14px] text-[#5b5148]">{product.stockLabel}</Text>
                </View>
              </View>

              <View className="flex-row items-center rounded-[18px] border border-[#e7ddcf] bg-white px-1 py-1">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setQuantity(current => Math.max(1, current - 1))}
                  className="h-10 w-11 items-center justify-center"
                >
                  <Minus size={18} color="#7b736b" strokeWidth={2.1} />
                </TouchableOpacity>
                <Text className="mx-3 min-w-[20px] text-center text-[19px] font-semibold text-[#17120f]">
                  {quantity}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setQuantity(current => current + 1)}
                  className="h-11 w-11 items-center justify-center"
                >
                  <Plus size={18} color="#17120f" strokeWidth={2.1} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-7 flex-row justify-between">
              <TouchableOpacity
                activeOpacity={0.92}
                className="w-[47%] items-center rounded-[16px] bg-[#1a1a1a] py-4"
              >
                <Text className="text-[18px] font-semibold text-white">Add to Bag</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.92}
                className="w-[47%] items-center rounded-[16px] bg-[#bc8735] py-4"
              >
                <Text className="text-[18px] font-semibold text-white">Buy Now</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-10 flex-row overflow-hidden rounded-[22px] border border-[#e8dece] bg-[#fbf8f1]">
              {product.highlights.map((item, index) => {
                const Icon = highlightIconMap[item.icon];

                return (
                  <View
                    key={item.id}
                    className={`flex-1 flex-row items-center px-2 py-2 ${
                      index === 0 ? 'border-r border-[#ebe1d3]' : ''
                    }`}
                  >
                    <Icon size={22} color="#c08d39" strokeWidth={1.8} />
                    <View className="ml-3 flex-1">
                      <Text className="text-[12px] font-semibold text-[#2f2924]">
                        {item.title}
                      </Text>
                      <Text className="mt-1 text-[10px] text-[#7a7168]">
                        {item.description}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <Text className="mt-10 text-[#17120f]" style={styles.detailsTitle}>
              Details
            </Text>
            <Text className="mt-4 text-[16px] leading-[25px] text-[#4f4740]">
              {product.details}
            </Text>
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
  strikeText: {
    textDecorationLine: 'line-through',
  },
  videoOverlay: {
    backgroundColor: 'rgba(255,255,255,0.48)',
  },
});

export default ProductDetailsScreen;
