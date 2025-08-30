import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { IEventTransaction, IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../contexts/ToastContext';

type IEventDetailsScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'EventDetails'>;
  route: RouteProp<IRootStackParamList, 'EventDetails'>;
};

const EventDetailsScreen: React.FC<IEventDetailsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IEventTransaction, string>>
  >({});

  // Date/Time picker states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Helper functions for date and time formatting
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDateTime = (date: Date) => {
    return `${formatDate(date)}T${formatTime(date)}`;
  };

  const [form, setForm] = useState<IEventTransaction>({
    id: '',
    amount: '',
    type: 'incoming',
    description: '',
    date: formatDateTime(new Date()),
    eventId: id,
    worth: '',
    itemName: '',
  });

  const handleChange = (key: keyof IEventTransaction, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));

    // Clear the error for this field when user starts typing
    if (formErrors[key]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      // Keep the same time, only update the date part
      const currentDateTime = new Date(selectedDate);
      const newDateTime = new Date(date);
      newDateTime.setHours(currentDateTime.getHours());
      newDateTime.setMinutes(currentDateTime.getMinutes());

      setSelectedDate(newDateTime);
      setForm(prev => ({ ...prev, date: formatDateTime(newDateTime) }));

      // Clear date error when date is changed
      if (formErrors.date) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.date;
          return newErrors;
        });
      }
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {
      // Keep the same date, only update the time part
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(time.getHours());
      newDateTime.setMinutes(time.getMinutes());

      setSelectedDate(newDateTime);
      setForm(prev => ({ ...prev, date: formatDateTime(newDateTime) }));

      // Clear date error when time is changed
      if (formErrors.date) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.date;
          return newErrors;
        });
      }
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = () => {
    const errors: Partial<Record<keyof IEventTransaction, string>> = {};
    if (form.type === 'item') {
      if (!form.itemName?.trim()) {
        errors.itemName = 'Item name is required';
      }
      if (!form.worth?.trim()) {
        errors.worth = 'Item value(worth) in amount(approx) is required';
      }
      const worthNum = Number(form.worth);
      if (isNaN(worthNum)) {
        errors.worth = 'Item value(worth) must be a number';
      } else if (worthNum <= 0) {
        errors.worth = 'Item value(worth) must be greater than 0';
      }
      form.amount = '0';
    }

    if (!form.amount.trim()) {
      errors.amount = 'Amount is required';
    } else if (form.type !== 'item') {
      const amountNum = Number(form.amount);
      if (isNaN(amountNum)) {
        errors.amount = 'Amount must be a number';
      } else if (amountNum <= 0) {
        errors.amount = 'Amount must be greater than 0';
      }
    }

    // Validate date & time
    if (isNaN(selectedDate.getTime())) {
      errors.date = 'Please enter a valid date & time';
    }

    if (Object.keys(errors).length > 0) {
      showToast('Please fill all required fields.', 'error');
      setFormErrors(errors);
      return;
    }

    console.log('Transaction submitted:', form);

    // Reset form for next transaction
    setFormErrors({});
    setShowForm(false);
    showToast('Transaction added successfully!', 'success');
    // const newDate = new Date();
    // setSelectedDate(newDate);
    // setForm({
    //   id: '',
    //   amount: '',
    //   type: 'incoming',
    //   description: '',
    //   date: formatDateTime(newDate),
    //   eventId: id,
    //   worth: '',
    //   itemName: '',
    // });
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'incoming':
        return DarkTheme.success;
      case 'outgoing':
        return DarkTheme.error;
      case 'item':
        return DarkTheme.orange;
      default:
        return DarkTheme.secondary;
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return 'cash-plus';
      case 'outgoing':
        return 'cash-minus';
      case 'item':
        return 'package-variant';
      default:
        return 'cash';
    }
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.text}>Event Details</Text>
        <Text style={styles.text}>Event ID: {id}</Text>
      </View>

      {/* Single Floating Add Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: insets.bottom + 20,
            right: 20,
            backgroundColor: DarkTheme.secondary,
          },
        ]}
        onPress={() => setShowForm(true)}
      >
        <Icon name="plus" size={45} color={DarkTheme.text} />
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal
        visible={showForm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.overlay}>
          <ScrollView
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.formTitle}>ADD TRANSACTION</Text>
            <Text
              style={[styles.text, { marginBottom: 10, fontWeight: 'bold' }]}
            >
              Event: Test Event
            </Text>
            {/* Transaction Type Selection */}
            <View style={styles.formComponentContainer}>
              <Text style={styles.label}>Transaction Type *</Text>
              <View style={styles.typeButtonsContainer}>
                {(['incoming', 'outgoing', 'item'] as const).map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      {
                        backgroundColor:
                          form.type === type
                            ? getTransactionTypeColor(type)
                            : DarkTheme.grey + '40', // semi-transparent grey
                        borderColor:
                          form.type === type
                            ? getTransactionTypeColor(type)
                            : DarkTheme.grey,
                      },
                    ]}
                    onPress={() => handleChange('type', type)}
                  >
                    <Icon
                      name={getTransactionTypeIcon(type)}
                      size={20}
                      color={
                        form.type === type ? DarkTheme.text : DarkTheme.grey
                      }
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        {
                          color:
                            form.type === type
                              ? DarkTheme.text
                              : DarkTheme.grey,
                          fontWeight: form.type === type ? 'bold' : 'normal',
                        },
                      ]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Item Name (only for 'item' type) */}
            {form.type === 'item' && (
              <View style={styles.formComponentContainer}>
                <Text style={styles.label}>Item Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter item name"
                  placeholderTextColor={DarkTheme.grey}
                  value={form.itemName}
                  onChangeText={val => handleChange('itemName', val)}
                  maxLength={100}
                />
                <Text style={styles.errorText}>
                  {formErrors.itemName ?? ' '}
                </Text>
              </View>
            )}

            {/* Amount (only for non-item types) */}
            {form.type !== 'item' && (
              <View style={styles.formComponentContainer}>
                <Text style={styles.label}>Amount *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  keyboardType="decimal-pad" // allows . on iOS & Android
                  placeholderTextColor={DarkTheme.grey}
                  value={form.amount}
                  onChangeText={val => {
                    // allow only numbers + dot
                    const cleaned = val.replace(/[^0-9.]/g, '');
                    handleChange('amount', cleaned);
                  }}
                />
                <Text style={styles.errorText}>{formErrors.amount ?? ' '}</Text>
              </View>
            )}

            {/* Worth (only for 'item' type) */}
            {form.type === 'item' && (
              <View style={styles.formComponentContainer}>
                <Text style={styles.label}>Worth *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter worth"
                  keyboardType="decimal-pad" // allows . on iOS & Android
                  placeholderTextColor={DarkTheme.grey}
                  value={form.worth}
                  onChangeText={val => {
                    // allow only numbers + dot
                    const cleaned = val.replace(/[^0-9.]/g, '');
                    handleChange('worth', cleaned);
                  }}
                />
                <Text style={styles.errorText}>{formErrors.worth ?? ' '}</Text>
              </View>
            )}

            {/* Date & Time Pickers */}
            <View style={styles.formComponentContainer}>
              <Text style={styles.label}>Date & Time *</Text>
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity
                  style={[styles.dateTimeButton, { width: '70%' }]}
                  onPress={showDatePickerModal}
                >
                  <View style={styles.dateTimeButtonContent}>
                    <Icon
                      name="calendar"
                      size={20}
                      color={DarkTheme.secondary}
                    />
                    <Text style={styles.dateTimeButtonText}>
                      {formatDate(selectedDate)}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.dateTimeButton, { width: '28%' }]}
                  onPress={showTimePickerModal}
                >
                  <View style={styles.dateTimeButtonContent}>
                    <Icon name="clock" size={20} color={DarkTheme.secondary} />
                    <Text style={styles.dateTimeButtonText}>
                      {formatTime(selectedDate)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText}>{formErrors.date ?? ' '}</Text>
            </View>

            {/* Description */}
            <View style={styles.formComponentContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter description"
                placeholderTextColor={DarkTheme.grey}
                value={form.description}
                onChangeText={val =>
                  handleChange(
                    'description',
                    val.length <= 1000 ? val : form.description,
                  )
                }
                multiline
                numberOfLines={3}
                maxLength={1000}
              />
              <Text style={styles.errorText}>
                {formErrors.description ?? ' '}
              </Text>
            </View>

            {/* Event ID (Disabled) */}
            <View style={styles.formComponentContainer}>
              <Text style={styles.label}>Event ID</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={form.eventId}
                editable={false}
              />
            </View>

            {/* Actions */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.cancelBtn]}
                onPress={() => setShowForm(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.submitBtn]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Add some bottom padding for better scrolling */}
            <View style={{ height: 30 }} />
          </ScrollView>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
            is24Hour={true}
          />
        )}
      </Modal>
    </ScreenView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: DarkTheme.text,
  },
  fab: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: DarkTheme.primary,
    borderRadius: 10,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DarkTheme.text,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  formComponentContainer: {
    marginBottom: 16,
  },
  label: {
    color: DarkTheme.text,
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: DarkTheme.white,
    color: DarkTheme.dark,
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.6,
  },
  errorText: {
    color: DarkTheme.error,
    fontSize: 12,
    marginTop: 2,
    minHeight: 16,
  },
  helpText: {
    color: DarkTheme.grey,
    fontSize: 11,
    marginTop: 2,
    fontStyle: 'italic',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  dateTimeButton: {
    backgroundColor: DarkTheme.white,
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
    justifyContent: 'center',
  },
  dateTimeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dateTimeButtonText: {
    color: DarkTheme.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 55,
  },
  typeButtonText: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: DarkTheme.white,
  },
  submitBtn: {
    backgroundColor: DarkTheme.secondary,
  },
  cancelText: {
    color: DarkTheme.dark,
    fontWeight: '600',
  },
  submitText: {
    color: DarkTheme.text,
    fontWeight: '600',
  },
});
