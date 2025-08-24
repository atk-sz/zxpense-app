import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { IEventTransaction, IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IEventDetailsScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'EventDetails'>;
  route: RouteProp<IRootStackParamList, 'EventDetails'>;
};

const EventDetailsScreen: React.FC<IEventDetailsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IEventTransaction, string>>
  >({});
  const [form, setForm] = useState<IEventTransaction>({
    id: '',
    amount: '', // keep as string for controlled input
    type: 'incoming',
    description: '',
    date: new Date().toISOString().split('T')[0],
    eventId: id,
  });

  const handleChange = (key: keyof IEventTransaction, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const errors: Partial<Record<keyof IEventTransaction, string>> = {};

    if (!form.amount.trim()) errors.amount = 'Amount is required';
    else {
      const amountNum = Number(form.amount);
      if (isNaN(amountNum)) {
        errors.amount = 'Amount must be a number';
      } else if (amountNum <= 0) {
        errors.amount = 'Amount must be greater than 0';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log('Transaction submitted:', form);

    setFormErrors({});
    setShowForm(false);
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.text}>Event Details</Text>
        <Text style={styles.text}>Event ID: {id}</Text>
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: insets.bottom + 20,
            right: 20,
            backgroundColor: DarkTheme.success,
          },
        ]}
        onPress={() => {
          handleChange('type', 'incoming');
          setShowForm(true);
        }}
      >
        <Icon name="cash-plus" size={45} color={DarkTheme.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: insets.bottom + 20,
            left: 20,
            backgroundColor: DarkTheme.error,
          },
        ]}
        onPress={() => {
          handleChange('type', 'outgoing');
          setShowForm(true);
        }}
      >
        <Icon name="cash-minus" size={45} color={DarkTheme.text} />
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal
        visible={showForm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.overlay}>
          <View
            style={[
              styles.formContainer,
              {
                backgroundColor:
                  form.type === 'incoming'
                    ? DarkTheme.success
                    : DarkTheme.error,
              },
            ]}
          >
            <Text style={styles.formTitle}>
              ADD {form.type === 'incoming' ? 'INCOME' : 'EXPENSE'}
            </Text>

            {/* Amount */}
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
                numberOfLines={4}
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
          </View>
        </View>
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
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    borderRadius: 10,
    padding: 16,
    width: '90%',
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
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: DarkTheme.white,
    marginRight: 8,
  },
  submitBtn: {
    backgroundColor: DarkTheme.secondary,
    marginLeft: 8,
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
