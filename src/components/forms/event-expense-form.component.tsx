import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import { DarkTheme } from '../../utils/theme';
import { IExpenseEvent } from '../../utils/interfaces';
import { useToast } from '../../contexts/ToastContext';

type IEventExpenseFormProps = {};

const EventExpenseForm: React.FC<IEventExpenseFormProps> = () => {
  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IExpenseEvent, string>>
  >({});

  const [formData, setFormData] = useState<IExpenseEvent>({
    id: '',
    title: '',
    type: 'personal',
    startDate: '',
    isMultiDay: false, // renamed toggle meaning = multi-day
    incomingAmount: 0,
    outgoingAmount: 0,
    endDate: '',
  });

  const handleChange = (key: keyof IExpenseEvent, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: IExpenseEvent) => {
    console.log('submitted data');
    console.log(data);
  };

  const handleSubmit = () => {
    const errors: Partial<Record<keyof IExpenseEvent, string>> = {};

    if (!formData.title.trim()) {
      errors.title = 'Event title is required.';
    }

    // startDate (or single date) is always required
    if (!formData.startDate?.trim()) {
      errors.startDate = 'Date is required.';
    }

    if (Object.keys(errors).length > 0) {
      showToast('Please fill all required fields.', 'error');
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    onSubmit(formData);
  };

  return (
    <View style={styles.formContainer}>
      {/* Title */}
      <View style={styles.formComponentContainer}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event title"
          placeholderTextColor={DarkTheme.grey}
          value={formData.title}
          onChangeText={text => handleChange('title', text)}
        />
        <Text style={styles.errorText}>{formErrors.title ?? ' '}</Text>
      </View>

      {/* Start Date (always required) */}
      <View style={styles.formComponentContainer}>
        <Text style={styles.label}>
          {formData.isMultiDay ? 'Start Date *' : 'Date *'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={DarkTheme.grey}
          value={formData.startDate}
          onChangeText={text => handleChange('startDate', text)}
        />
        <Text style={styles.errorText}>{formErrors.startDate ?? ' '}</Text>
      </View>

      {/* Group Toggle */}
      <View style={styles.formComponentContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Is it a group event?</Text>
          <Switch
            value={formData.type === 'group'}
            onValueChange={value =>
              handleChange('type', value ? 'group' : 'personal')
            }
            thumbColor={DarkTheme.text}
            trackColor={{ false: DarkTheme.grey, true: DarkTheme.secondary }}
          />
        </View>
        <Text style={styles.errorText}>{formErrors.type ?? ' '}</Text>
      </View>

      {/* Multi-day Toggle */}
      <View style={styles.formComponentContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Is this a multi-day event?</Text>
          <Switch
            value={formData.isMultiDay}
            onValueChange={value => {
              // clear endDate if toggled off
              if (!value) {
                handleChange('endDate', '');
              }
              handleChange('isMultiDay', value);
            }}
            thumbColor={DarkTheme.text}
            trackColor={{ false: DarkTheme.grey, true: DarkTheme.secondary }}
          />
        </View>
      </View>

      {/* End Date (only if multi-day) */}
      {formData.isMultiDay && (
        <View style={styles.formComponentContainer}>
          <Text style={styles.label}>End Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={DarkTheme.grey}
            value={formData.endDate}
            onChangeText={text => handleChange('endDate', text)}
          />
          <Text style={styles.errorText}>{formErrors.endDate ?? ' '}</Text>
        </View>
      )}

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 100,
    backgroundColor: DarkTheme.primary,
    padding: 16,
    borderRadius: 10,
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
    marginBottom: 12,
  },
  errorText: {
    color: DarkTheme.error,
    marginBottom: 8,
    fontSize: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: DarkTheme.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: DarkTheme.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
