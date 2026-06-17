import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
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
  ChevronDown,
  Heart,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Star,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import { categoryBottomNavItems, categoryCards } from '../../../data/mock/categoryMock';
import { productList } from '../../../data/mock/productMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addWishlistItem, removeWishlistProduct } from '../../wishlist/store/wishlistSlice';

const gold = '#bd8934';
const ink = '#191714';
const muted = '#7d7368';
const ivory = '#fbf7f1';
const line = '#eadfce';

const productBottomNavItems = categoryBottomNavItems.map(item => ({
  ...item,
  active: item.id === 'categories',
}));

const categoryNameMap = categoryCards.reduce((accumulator, item) => {
  accumulator[item.id] = item.title.replace(/\n/g, ' ');
  return accumulator;
}, {});

const metalLabelMap = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
};

const typeLabelMap = {
  rings: 'Ring',
  earrings: 'Earring',
  necklaces: 'Pendant',
  bracelets: 'Bracelet',
  bangles: 'Bangle',
  'mens-jewelry': 'Band',
};

const filterOptions = {
  sort: ['Latest', 'Price: Low to High', 'Price: High to Low'],
  popularity: ['Popular', 'Top Rated', 'Best Reviewed'],
  category: ['All', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'BANGLES'],
  type: ['All', 'Ring', 'Pendant', 'Earring', 'Bracelet', 'Bangle'],
  metal: ['All', 'Yellow Gold', 'White Gold', 'Rose Gold'],
  price: ['All', 'Under Rs 500', 'Rs 500 - Rs 600', 'Above Rs 600'],
};

const pickerTitles = {
  sort: 'Sort',
  popularity: 'Popularity',
  category: 'Category',
  type: 'Type',
  metal: 'Metal',
  price: 'Price',
};

const formatCurrency = value => `Rs ${Math.round(value).toLocaleString('en-IN')}`;

function FilterChip({ active, icon, label, onPress, wide }) {
  const Icon = icon;

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      style={[
        styles.filterChip,
        active ? styles.activeFilterChip : null,
        wide ? styles.wideFilterChip : null,
      ]}
    >
      {Icon ? (
        <Icon
          size={17}
          color={active ? gold : '#45403a'}
          strokeWidth={2}
          style={styles.filterIcon}
        />
      ) : null}
      <Text style={[styles.filterText, active ? styles.activeFilterText : null]}>
        {label}
      </Text>
      <ChevronDown size={16} color={active ? gold : '#4d4742'} strokeWidth={2} />
    </TouchableOpacity>
  );
}

function ProductCard({ item, listMode, navigation, onToggleWishlist, wishlistItems }) {
  const isWishlisted = wishlistItems.some(wishlistItem => wishlistItem.productId === item.id);
  const cardImage = item.gallery[0]?.image;

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      style={[styles.productCard, listMode ? styles.listCard : styles.gridCard]}
    >
      <View style={[styles.imageWrap, listMode ? styles.listImageWrap : null]}>
        <Image source={cardImage} resizeMode="cover" style={styles.productImage} />
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={event => {
            event?.stopPropagation?.();
            onToggleWishlist(item);
          }}
          style={styles.heartButton}
        >
          <Heart
            size={18}
            color={isWishlisted ? gold : '#292521'}
            fill={isWishlisted ? gold : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.productCopy, listMode ? styles.listCopy : null]}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.productMeta}>
          {item.subtitle}
        </Text>
        <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.starsRow}>
            {[0, 1, 2, 3, 4].map(index => (
              <Star
                key={`${item.id}-${index}`}
                size={11}
                color="#c49039"
                fill="#c49039"
                strokeWidth={1.6}
              />
            ))}
          </View>
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function AllProductsScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const selectedCategoryId = route.params?.categoryId;
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortValue, setSortValue] = useState('Latest');
  const [popularityValue, setPopularityValue] = useState('Popular');
  const [categoryValue, setCategoryValue] = useState('All');
  const [typeValue, setTypeValue] = useState('All');
  const [metalValue, setMetalValue] = useState('All');
  const [priceValue, setPriceValue] = useState('All');
  const [activePicker, setActivePicker] = useState(null);

  const catalogProducts = useMemo(
    () =>
      productList.map(product => ({
        ...product,
        categoryLabel: categoryNameMap[product.categoryId] || product.categoryId,
        typeLabel: typeLabelMap[product.categoryId] || 'Jewelry',
        metalLabel: metalLabelMap[product.defaultMetal] || 'Yellow Gold',
      })),
    [],
  );

  useEffect(() => {
    if (!selectedCategoryId) {
      return;
    }

    setCategoryValue(categoryNameMap[selectedCategoryId] || 'All');
  }, [selectedCategoryId]);

  const filteredProducts = useMemo(() => {
    let nextProducts = [...catalogProducts];

    if (categoryValue !== 'All') {
      nextProducts = nextProducts.filter(product => product.categoryLabel === categoryValue);
    }

    if (typeValue !== 'All') {
      nextProducts = nextProducts.filter(product => product.typeLabel === typeValue);
    }

    if (metalValue !== 'All') {
      nextProducts = nextProducts.filter(product => product.metalLabel === metalValue);
    }

    if (priceValue === 'Under Rs 500') {
      nextProducts = nextProducts.filter(product => product.price < 500);
    } else if (priceValue === 'Rs 500 - Rs 600') {
      nextProducts = nextProducts.filter(product => product.price >= 500 && product.price <= 600);
    } else if (priceValue === 'Above Rs 600') {
      nextProducts = nextProducts.filter(product => product.price > 600);
    }

    if (popularityValue === 'Top Rated') {
      nextProducts.sort((left, right) => right.rating - left.rating);
    } else if (popularityValue === 'Best Reviewed') {
      nextProducts.sort((left, right) => right.reviews - left.reviews);
    }

    if (sortValue === 'Price: Low to High') {
      nextProducts.sort((left, right) => left.price - right.price);
    } else if (sortValue === 'Price: High to Low') {
      nextProducts.sort((left, right) => right.price - left.price);
    }

    return nextProducts;
  }, [catalogProducts, categoryValue, metalValue, popularityValue, priceValue, sortValue, typeValue]);

  const handleToggleWishlist = product => {
    const isWishlisted = wishlistItems.some(item => item.productId === product.id);

    if (isWishlisted) {
      dispatch(removeWishlistProduct(product.id));
      return;
    }

    dispatch(
      addWishlistItem({
        id: `wishlist-${product.id}`,
        productId: product.id,
        note: 'Saved from all jewelry',
      }),
    );
  };

  const clearAllFilters = () => {
    setSortValue('Latest');
    setPopularityValue('Popular');
    setCategoryValue('All');
    setTypeValue('All');
    setMetalValue('All');
    setPriceValue('All');
  };

  const activeFilterCount = [categoryValue, typeValue, metalValue, priceValue].filter(
    value => value !== 'All',
  ).length;

  const pickerValueMap = {
    sort: sortValue,
    popularity: popularityValue,
    category: categoryValue,
    type: typeValue,
    metal: metalValue,
    price: priceValue,
  };

  const handleSelectPickerOption = value => {
    if (activePicker === 'sort') {
      setSortValue(value);
    } else if (activePicker === 'popularity') {
      setPopularityValue(value);
    } else if (activePicker === 'category') {
      setCategoryValue(value);
    } else if (activePicker === 'type') {
      setTypeValue(value);
    } else if (activePicker === 'metal') {
      setMetalValue(value);
    } else if (activePicker === 'price') {
      setPriceValue(value);
    }

    setActivePicker(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <View style={[styles.headerWrap, { paddingTop: Math.max(insets.top, 8) }]}>
        <HomeHeader />
      </View>

      <FlatList
        data={filteredProducts}
        key={viewMode}
        keyExtractor={item => item.id}
        numColumns={viewMode === 'grid' ? 2 : 1}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.titleWrap}>
              <Text style={styles.screenTitle}>All Jewelry</Text>
              <Text style={styles.screenSubtitle}>
                {selectedCategoryId && categoryNameMap[selectedCategoryId]
                  ? `Explore ${categoryNameMap[selectedCategoryId].toLowerCase()} crafted with elegance.`
                  : 'Discover timeless pieces crafted with elegance.'}
              </Text>
            </View>

            <View style={styles.toolbarRow}>
              <TouchableOpacity
                activeOpacity={0.86}
                onPress={() => setFiltersVisible(current => !current)}
                style={[
                  styles.primaryFilterButton,
                  filtersVisible ? styles.primaryFilterButtonActive : null,
                ]}
              >
                <SlidersHorizontal
                  size={18}
                  color={filtersVisible ? gold : '#3f3934'}
                  strokeWidth={2}
                />
                <Text style={styles.primaryFilterText}>
                  Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
                </Text>
              </TouchableOpacity>

              <View style={styles.inlineChips}>
                <FilterChip
                  label={sortValue === 'Latest' ? 'Sort' : sortValue}
                  onPress={() => setActivePicker('sort')}
                />
                <FilterChip
                  label={popularityValue}
                  onPress={() => setActivePicker('popularity')}
                  wide
                />
              </View>
            </View>

            {filtersVisible ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.secondaryFiltersRow}
              >
                <FilterChip
                  active={categoryValue !== 'All'}
                  label={categoryValue}
                  onPress={() => setActivePicker('category')}
                  wide
                />
                <FilterChip
                  active={typeValue !== 'All'}
                  label={typeValue}
                  onPress={() => setActivePicker('type')}
                />
                <FilterChip
                  active={metalValue !== 'All'}
                  label={metalValue}
                  onPress={() => setActivePicker('metal')}
                />
                <FilterChip
                  active={priceValue !== 'All'}
                  label={priceValue}
                  onPress={() => setActivePicker('price')}
                  wide
                />
                <TouchableOpacity
                  activeOpacity={0.84}
                  onPress={clearAllFilters}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : null}

            <View style={styles.resultsBar}>
              <Text style={styles.resultsText}>{filteredProducts.length} Products</Text>
              <View style={styles.resultsRight}>
                <Text style={styles.viewLabel}>View</Text>
                <TouchableOpacity
                  activeOpacity={0.84}
                  onPress={() => setViewMode('grid')}
                  style={styles.resultsIconButton}
                >
                  <LayoutGrid
                    size={19}
                    color={viewMode === 'grid' ? gold : '#6f675e'}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.84}
                  onPress={() => setViewMode('list')}
                  style={styles.resultsIconButton}
                >
                  <List
                    size={19}
                    color={viewMode === 'list' ? gold : '#6f675e'}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : null}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            listMode={viewMode === 'list'}
            navigation={navigation}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
          />
        )}
      />

      <Modal
        animationType="slide"
        onRequestClose={() => setActivePicker(null)}
        transparent
        visible={Boolean(activePicker)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActivePicker(null)}>
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {pickerTitles[activePicker] || 'Select Option'}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalOptionsWrap}
            >
              {(filterOptions[activePicker] || []).map(option => {
                const isSelected = pickerValueMap[activePicker] === option;

                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.86}
                    onPress={() => handleSelectPickerOption(option)}
                    style={[
                      styles.optionRow,
                      isSelected ? styles.selectedOptionRow : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected ? styles.selectedOptionText : null,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      <BottomBar items={productBottomNavItems} />
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
  headerWrap: {
    backgroundColor: ivory,
    paddingBottom: 2,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 18,
  },
  titleWrap: {
    paddingTop: 8,
    paddingBottom: 10,
  },
  screenTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  screenSubtitle: {
    marginTop: 5,
    color: '#686058',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  primaryFilterButton: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#e6dcca',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  primaryFilterButtonActive: {
    backgroundColor: '#fffaf0',
  },
  primaryFilterText: {
    marginLeft: 6,
    color: ink,
    fontSize: 10,
    fontWeight: '800',
  },
  inlineChips: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 4,
  },
  secondaryFiltersRow: {
    paddingTop: 5,
    paddingBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(25, 23, 20, 0.34)',
  },
  modalCard: {
    maxHeight: '68%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fbf7f1',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  modalTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
  },
  modalOptionsWrap: {
    marginTop: 10,
  },
  optionRow: {
    marginBottom: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6dcca',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectedOptionRow: {
    borderColor: '#ecd6ab',
    backgroundColor: '#fff6e6',
  },
  optionText: {
    color: '#2d2824',
    fontSize: 12,
    fontWeight: '700',
  },
  selectedOptionText: {
    color: ink,
  },
  filterChip: {
    height: 30,
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#e6dcca',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
  },
  activeFilterChip: {
    backgroundColor: '#fff6e6',
    borderColor: '#ecd6ab',
  },
  wideFilterChip: {
    minWidth: 90,
  },
  filterIcon: {
    marginRight: 5,
  },
  filterText: {
    marginRight: 5,
    color: '#2d2824',
    fontSize: 10,
    fontWeight: '700',
  },
  activeFilterText: {
    color: ink,
  },
  clearButton: {
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  clearButtonText: {
    color: gold,
    fontSize: 10,
    fontWeight: '800',
  },
  resultsBar: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: line,
    paddingTop: 14,
  },
  resultsText: {
    color: '#69615a',
    fontSize: 13,
    fontWeight: '700',
  },
  resultsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLabel: {
    marginRight: 8,
    color: '#6a6259',
    fontSize: 13,
    fontWeight: '700',
  },
  resultsIconButton: {
    marginLeft: 8,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#efe5d8',
    backgroundColor: '#ffffff',
    shadowColor: '#6b5742',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  gridCard: {
    marginBottom: 10,
    width: '48.5%',
  },
  listCard: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  imageWrap: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f7f0e6',
  },
  listImageWrap: {
    width: 112,
    minHeight: 112,
  },
  productImage: {
    height: 142,
    width: '100%',
  },
  badge: {
    position: 'absolute',
    left: 8,
    top: 8,
    borderRadius: 6,
    backgroundColor: '#fbefdc',
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#3d352d',
    fontSize: 8,
    fontWeight: '900',
  },
  heartButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#ffffff',
  },
  productCopy: {
    paddingHorizontal: 9,
    paddingBottom: 10,
    paddingTop: 8,
  },
  listCopy: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    color: ink,
    fontSize: 13,
    fontWeight: '800',
  },
  productMeta: {
    marginTop: 3,
    color: muted,
    fontSize: 10,
    fontWeight: '600',
  },
  productPrice: {
    marginTop: 8,
    color: '#141210',
    fontSize: 15,
    fontWeight: '900',
  },
  ratingRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 5,
    color: '#5a534b',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default AllProductsScreen;
