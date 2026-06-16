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
import {
  CheckCircle2,
  Edit3,
  MapPin,
  Phone,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import { cartBottomNavItems } from '../../../data/mock/cartMock';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addAddress,
  deleteAddress,
  selectAddress,
  updateAddress,
} from '../store/addressSlice';

const emptyForm = {
  name: '',
  phone: '',
  label: 'Home',
  line1: '',
  line2: '',
};

function AddressBookScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { addresses, selectedAddressId } = useAppSelector(state => state.addressBook);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const openAddForm = () => {
    setEditingAddressId(null);
    setForm(emptyForm);
    setIsFormVisible(true);
  };

  const openEditForm = address => {
    setEditingAddressId(address.id);
    setForm({
      name: address.name,
      phone: address.phone,
      label: address.label,
      line1: address.line1,
      line2: address.line2,
    });
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setEditingAddressId(null);
    setForm(emptyForm);
    setIsFormVisible(false);
  };

  const saveAddress = () => {
    const nextAddress = {
      id: editingAddressId ?? `address-${Date.now()}`,
      name: form.name.trim() || 'Customer',
      phone: form.phone.trim() || '+91 00000 00000',
      label: form.label.trim() || 'Home',
      line1: form.line1.trim() || 'Address line 1',
      line2: form.line2.trim() || 'City, State, Pincode',
    };

    if (editingAddressId) {
      dispatch(updateAddress(nextAddress));
    } else {
      dispatch(addAddress(nextAddress));
    }

    closeForm();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fbf7f1]">
      <StatusBar barStyle="dark-content" backgroundColor="#fbf7f1" />

      <View className="flex-1 bg-[#fbf7f1]">
        <View
          className="bg-[#fbf7f1] pb-2"
          style={{ paddingTop: Math.max(insets.top, 8) }}
        >
          <HomeHeader />
        </View>

        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="mx-4 mt-2 flex-row items-center justify-between">
            <View>
              <Text style={styles.title}>Saved Addresses</Text>
              <Text className="mt-1 text-[13px] text-[#756b62]">
                Choose where your jewelry should arrive.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={openAddForm}
              className="h-10 w-10 items-center justify-center rounded-full bg-[#171717]"
            >
              <Plus size={18} color="#ffffff" strokeWidth={2.1} />
            </TouchableOpacity>
          </View>

          {isFormVisible ? (
            <View
              className="mx-4 mt-4 rounded-[16px] border border-[#eee4d8] bg-white p-3"
              style={styles.cardShadow}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-[15px] font-bold text-[#181410]">
                  {editingAddressId ? 'Edit Address' : 'Add New Address'}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={closeForm}
                  className="h-7 w-7 items-center justify-center rounded-full bg-[#f5eee4]"
                >
                  <X size={15} color="#2f2924" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <TextInput
                value={form.label}
                onChangeText={value => updateField('label', value)}
                placeholder="Label e.g. Home, Work"
                placeholderTextColor="#9a9188"
                className="mt-3 rounded-[12px] border border-[#eee4d8] bg-[#fffdf9] px-3 py-2.5 text-[13px] text-[#181410]"
              />
              <TextInput
                value={form.name}
                onChangeText={value => updateField('name', value)}
                placeholder="Full name"
                placeholderTextColor="#9a9188"
                className="mt-2 rounded-[12px] border border-[#eee4d8] bg-[#fffdf9] px-3 py-2.5 text-[13px] text-[#181410]"
              />
              <TextInput
                value={form.phone}
                onChangeText={value => updateField('phone', value)}
                placeholder="Phone number"
                placeholderTextColor="#9a9188"
                keyboardType="phone-pad"
                className="mt-2 rounded-[12px] border border-[#eee4d8] bg-[#fffdf9] px-3 py-2.5 text-[13px] text-[#181410]"
              />
              <TextInput
                value={form.line1}
                onChangeText={value => updateField('line1', value)}
                placeholder="Flat / building / street"
                placeholderTextColor="#9a9188"
                className="mt-2 rounded-[12px] border border-[#eee4d8] bg-[#fffdf9] px-3 py-2.5 text-[13px] text-[#181410]"
              />
              <TextInput
                value={form.line2}
                onChangeText={value => updateField('line2', value)}
                placeholder="City, state, pincode"
                placeholderTextColor="#9a9188"
                className="mt-2 rounded-[12px] border border-[#eee4d8] bg-[#fffdf9] px-3 py-2.5 text-[13px] text-[#181410]"
              />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={saveAddress}
                className="mt-3 flex-row items-center justify-center rounded-[12px] bg-[#171717] py-3"
              >
                <Save size={16} color="#ffffff" strokeWidth={2} />
                <Text className="ml-2 text-[13px] font-bold text-white">
                  SAVE ADDRESS
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {addresses.length === 0 ? (
            <View className="mx-4 mt-5 items-center rounded-[18px] border border-[#eee4d8] bg-white px-5 py-10">
              <Text className="text-[17px] font-bold text-[#181410]">
                No addresses yet
              </Text>
              <Text className="mt-2 text-center text-[13px] leading-[20px] text-[#756b62]">
                Add an address to continue checkout.
              </Text>
            </View>
          ) : (
            addresses.map(address => {
              const selected = address.id === selectedAddressId;

              return (
                <View
                  key={address.id}
                  className={`mx-4 mt-3 rounded-[16px] border bg-white p-3 ${
                    selected ? 'border-[#bd8934]' : 'border-[#eee4d8]'
                  }`}
                  style={styles.cardShadow}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row flex-1">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-[#fbf2e6]">
                        <MapPin size={16} color="#bd8934" strokeWidth={1.8} />
                      </View>
                      <View className="ml-2.5 flex-1">
                        <View className="flex-row items-center">
                          <Text className="text-[14px] font-bold text-[#181410]">
                            {address.label}
                          </Text>
                          {selected ? (
                            <CheckCircle2
                              size={15}
                              color="#2f8b55"
                              strokeWidth={2}
                              style={styles.selectedIcon}
                            />
                          ) : null}
                        </View>
                        <Text className="mt-1.5 text-[13px] font-semibold text-[#2d2722]">
                          {address.name}
                        </Text>
                        <Text className="mt-0.5 text-[12px] leading-[18px] text-[#615850]">
                          {address.line1}
                        </Text>
                        <Text className="text-[12px] leading-[18px] text-[#615850]">
                          {address.line2}
                        </Text>
                        <View className="mt-2 flex-row items-center">
                          <Phone size={12} color="#766b61" strokeWidth={1.8} />
                          <Text className="ml-1.5 text-[11px] font-medium text-[#615850]">
                            {address.phone}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="mt-3 flex-row items-center justify-between">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        dispatch(selectAddress(address.id));
                        navigation.goBack();
                      }}
                      className={`flex-1 items-center rounded-[11px] py-2.5 ${
                        selected ? 'bg-[#f2e5d3]' : 'bg-[#171717]'
                      }`}
                    >
                      <Text
                        className={`text-[11px] font-bold ${
                          selected ? 'text-[#8d6425]' : 'text-white'
                        }`}
                      >
                        {selected ? 'SELECTED' : 'USE THIS ADDRESS'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => openEditForm(address)}
                      className="ml-2.5 h-9 w-9 items-center justify-center rounded-[11px] border border-[#eee4d8] bg-white"
                    >
                      <Edit3 size={15} color="#2f2924" strokeWidth={1.9} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => dispatch(deleteAddress(address.id))}
                      className="ml-2 h-9 w-9 items-center justify-center rounded-[11px] border border-[#eee4d8] bg-white"
                    >
                      <Trash2 size={16} color="#2f2924" strokeWidth={1.9} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>

        <BottomBar items={cartBottomNavItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 25,
    lineHeight: 31,
    color: '#171411',
  },
  cardShadow: {
    shadowColor: '#d8c1a0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  selectedIcon: {
    marginLeft: 8,
  },
});

export default AddressBookScreen;
