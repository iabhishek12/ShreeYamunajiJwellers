import React, { useMemo, useState } from 'react';
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
import {
  Bell,
  CheckCheck,
  Heart,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import {
  notificationItems,
  notificationTabs,
  notificationsBottomNavItems,
} from '../../../data/mock/notificationMock';

const iconMap = {
  Heart,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
};

const gold = '#bd8934';
const darkGold = '#9a681f';
const ink = '#191714';
const muted = '#746b61';
const ivory = '#fbf7f1';
const line = '#eadfce';

function NotificationCard({ item }) {
  const Icon = iconMap[item.icon] || Bell;

  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.card}>
      <View style={[styles.iconWrap, item.unread ? styles.unreadIconWrap : null]}>
        <Icon
          size={17}
          color={item.unread ? darkGold : '#6d645b'}
          strokeWidth={2}
        />
      </View>

      <View style={styles.cardCopy}>
        <View style={styles.cardTop}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {item.title}
          </Text>
          {item.unread ? <View style={styles.unreadDot} /> : null}
        </View>
        <Text numberOfLines={2} style={styles.cardMessage}>
          {item.message}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.typeText}>{item.type}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('All');

  const filteredItems = useMemo(() => {
    if (selectedTab === 'All') {
      return notificationItems;
    }

    return notificationItems.filter(item => item.type === selectedTab);
  }, [selectedTab]);

  const unreadCount = notificationItems.filter(item => item.unread).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ivory} />

      <View style={[styles.headerWrap, { paddingTop: Math.max(insets.top, 8) }]}>
        <HomeHeader />
      </View>

      <View style={styles.titleArea}>
        <View>
          <Text style={styles.screenTitle}>Notifications</Text>
          <Text style={styles.screenSubtitle}>
            {unreadCount} unread update{unreadCount === 1 ? '' : 's'}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.84} style={styles.markButton}>
          <CheckCheck size={16} color={darkGold} strokeWidth={2.1} />
          <Text style={styles.markText}>Read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {notificationTabs.map(tab => {
            const isActive = tab === selectedTab;

            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.84}
                style={[styles.tabButton, isActive ? styles.activeTabButton : null]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabText, isActive ? styles.activeTabText : null]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {filteredItems.map(item => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <BottomBar items={notificationsBottomNavItems} />
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
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  screenTitle: {
    color: ink,
    fontFamily: serifFont,
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 32,
  },
  screenSubtitle: {
    marginTop: 2,
    color: muted,
    fontSize: 11,
    fontWeight: '700',
  },
  markButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dfcfb9',
    backgroundColor: '#fffaf2',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  markText: {
    marginLeft: 5,
    color: darkGold,
    fontSize: 11,
    fontWeight: '900',
  },
  tabsWrap: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: line,
    backgroundColor: ivory,
  },
  tabsContent: {
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  tabButton: {
    marginRight: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e4d7c4',
    backgroundColor: '#fffdf8',
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  activeTabButton: {
    borderColor: '#d1ae73',
    backgroundColor: '#f3e2c0',
  },
  tabText: {
    color: '#655d55',
    fontSize: 11,
    fontWeight: '800',
  },
  activeTabText: {
    color: ink,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 9,
    shadowColor: '#705c42',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrap: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#f4eee5',
  },
  unreadIconWrap: {
    backgroundColor: '#f5e4bd',
  },
  cardCopy: {
    marginLeft: 10,
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    flex: 1,
    color: ink,
    fontSize: 13,
    fontWeight: '900',
  },
  unreadDot: {
    marginLeft: 7,
    height: 7,
    width: 7,
    borderRadius: 4,
    backgroundColor: gold,
  },
  cardMessage: {
    marginTop: 3,
    color: muted,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15,
  },
  metaRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    color: darkGold,
    fontSize: 10,
    fontWeight: '900',
  },
  metaDot: {
    marginHorizontal: 6,
    height: 3,
    width: 3,
    borderRadius: 2,
    backgroundColor: '#b8ac9f',
  },
  timeText: {
    color: '#8d8378',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default NotificationsScreen;
