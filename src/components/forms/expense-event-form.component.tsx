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
import { IExpenseEvent, IRootStackParamList } from '../../utils/interfaces';
import { useToast } from '../../contexts/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../redux/slices/events';
import { saveCurEvent } from '../../redux/slices/event';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { generateId } from '../../utils/common.util';

type IExpenseEventFormProps = {};

const ExpenseEventForm: React.FC<IExpenseEventFormProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IExpenseEvent, string>>
  >({});
  const events = useSelector((state: any) => state.events) as IExpenseEvent[];

  const [formValues, setFormValues] = useState<IExpenseEvent>({
    id: '',
    title: '',
    startDate: '',
    isMultiDay: false,
    balanceAmount: '0',
    incomingAmount: '0',
    outgoingAmount: '0',
    endDate: '',
    transactions: [],
    open: true,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleChange = (key: keyof IExpenseEvent, value: any) => {
    setFormValues(prev => ({ ...prev, [key]: value }));

    if (formErrors[key]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const onSubmit = async (newEvent: IExpenseEvent) => {
    dispatch(addEvent(newEvent));
    dispatch(saveCurEvent(newEvent));
    navigation.replace('EventDetails', { id: newEvent.id });
  };

  const handleSubmit = () => {
    const errors: Partial<Record<keyof IExpenseEvent, string>> = {};
    formValues.title = formValues.title.trim();
    if (!formValues.title) errors.title = 'Event title is required.';
    if (formValues.title.length > 25)
      errors.title = 'Event title can be at most 25 characters long.';
    if (formValues.title) {
      const existingEvent = events.find(
        event => event.title === formValues.title,
      );
      if (existingEvent) errors.title = 'Event title already exists.';
    }

    if (!formValues.startDate?.trim()) errors.startDate = 'Date is required.';
    // Validate date & time
    if (formValues.startDate) {
      const date = new Date(formValues.startDate);
      if (isNaN(date.getTime())) errors.startDate = 'Invalid date.';
    }

    if (Object.keys(errors).length > 0) {
      showToast('Please clear the following errors', 'error');
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const newId = generateId(formValues.title, 8);
    handleChange('id', newId);
    onSubmit({ ...formValues, id: newId });
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
          maxLength={25}
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
