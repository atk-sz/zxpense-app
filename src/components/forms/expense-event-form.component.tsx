import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DarkTheme } from '../../utils/theme';
import { IExpenseEvent } from '../../utils/interfaces';
import { useToast } from '../../contexts/ToastContext';

type IExpenseEventFormProps = {};

const ExpenseEventForm: React.FC<IExpenseEventFormProps> = () => {
  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IExpenseEvent, string>>
  >({});

  const [formValues, setFormValues] = useState<IExpenseEvent>({
    id: '',
    title: '',
    type: 'personal',
    startDate: '',
    isMultiDay: false,
    incomingAmount: 0,
    outgoingAmount: 0,
    balanceAmount: 0,
    endDate: '',
    transactions: [],
    open: true,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleChange = (key: keyof IExpenseEvent, value: any) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: IExpenseEvent) => {
    console.log('submitted data');
    console.log(data);
  };

  const handleSubmit = () => {
    const errors: Partial<Record<keyof IExpenseEvent, string>> = {};

    if (!formValues.title.trim()) {
      errors.title = 'Event title is required.';
    }

    if (!formValues.startDate?.trim()) {
      errors.startDate = 'Date is required.';
    }

    if (Object.keys(errors).length > 0) {
      showToast('Please fill all required fields.', 'error');
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    onSubmit(formValues);
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
          value={formValues.title}
          onChangeText={text => handleChange('title', text)}
        />
        <Text style={styles.errorText}>{formErrors.title ?? ' '}</Text>
      </View>

      {/* Start Date (always required) */}
      <View style={styles.formComponentContainer}>
        <Text style={styles.label}>
          {formValues.isMultiDay ? 'Start Date *' : 'Date *'}
        </Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={{ color: DarkTheme.dark }}>
            {formValues.startDate || 'Select date'}
          </Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={
              formValues.startDate ? new Date(formValues.startDate) : new Date()
            }
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              console.log('event', event);
              setShowStartDatePicker(false);
              if (event.type === 'set' && selectedDate) {
                handleChange(
                  'startDate',
                  selectedDate.toISOString().split('T')[0],
                );
              }
            }}
          />
        )}
        <Text style={styles.errorText}>{formErrors.startDate ?? ' '}</Text>
      </View>

      {/* Group Toggle */}
      <View style={styles.formComponentContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Group event?</Text>
          <Switch
            value={formValues.type === 'group'}
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
          <Text style={styles.label}>Multi-day event?</Text>
          <Switch
            value={formValues.isMultiDay}
            onValueChange={value => {
              if (!value) handleChange('endDate', '');
              handleChange('isMultiDay', value);
            }}
            thumbColor={DarkTheme.text}
            trackColor={{ false: DarkTheme.grey, true: DarkTheme.secondary }}
          />
        </View>
      </View>

      {/* End Date (only if multi-day) */}
      {formValues.isMultiDay && (
        <View style={styles.formComponentContainer}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={{ color: DarkTheme.dark }}>
              {formValues.endDate || 'Select date'}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={
                formValues.endDate ? new Date(formValues.endDate) : new Date()
              }
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (event.type === 'set' && selectedDate) {
                  handleChange(
                    'endDate',
                    selectedDate.toISOString().split('T')[0],
                  );
                }
              }}
            />
          )}
        </View>
      )}

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseEventForm;

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
