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
    date: '',
    incomingAmount: 0,
    outgoingAmount: 0,
    type: 'personal',
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
    if (formData.type === 'group') {
      if (!formData.startDate?.trim()) {
        errors.startDate = 'Start date is required for group events.';
      }
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
      <View style={styles.formComponentContainer}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event title"
          placeholderTextColor="#ccc"
          value={formData.title}
          onChangeText={text => handleChange('title', text)}
        />
        <Text style={styles.errorText}>{formErrors.title ?? ' '}</Text>
      </View>

      <View style={styles.formComponentContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Is it a group event?</Text>
          <Switch
            value={formData.type === 'group'}
            onValueChange={value =>
              handleChange('type', value ? 'group' : 'personal')
            }
            thumbColor={DarkTheme.text}
            trackColor={{ false: '#555', true: DarkTheme.secondary }}
          />
        </View>
        <Text style={styles.errorText}>{formErrors.type ?? ' '}</Text>
      </View>

      {formData.type === 'group' && (
        <>
          <View style={styles.formComponentContainer}>
            <Text style={styles.label}>Start Date *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#ccc"
              value={formData.startDate || ''}
              onChangeText={text => handleChange('startDate', text)}
            />
            <Text style={styles.errorText}>{formErrors.startDate ?? ' '}</Text>
          </View>

          <View style={styles.formComponentContainer}>
            <Text style={styles.label}>End Date (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#ccc"
              value={formData.endDate}
              onChangeText={text => handleChange('endDate', text)}
            />
            <Text style={styles.errorText}>{formErrors.endDate ?? ' '}</Text>
          </View>
        </>
      )}

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
    marginTop: 150,
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
