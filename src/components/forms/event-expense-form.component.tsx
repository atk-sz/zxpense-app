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

  const [formData, setFormData] = useState<IExpenseEvent>({
    id: '',
    title: '',
    startDate: '',
    open: false,
    amount: 0,
    endDate: '',
    type: '',
  });

  const handleChange = (key: keyof IExpenseEvent, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: IExpenseEvent) => {
    console.log('submitted data');
    console.log(data);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      showToast('Event title is required.', 'error');
      return;
    }
    if (!formData.startDate.trim()) {
      showToast('Start date is required.', 'error');
      return;
    }
    if (!formData.amount || isNaN(formData.amount)) {
      showToast('Amount is required and must be valid.', 'error');
      return;
    }

    onSubmit(formData);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event title"
        placeholderTextColor="#ccc"
        value={formData.title}
        onChangeText={text => handleChange('title', text)}
      />

      <Text style={styles.label}>Start Date *</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#ccc"
        value={formData.startDate}
        onChangeText={text => handleChange('startDate', text)}
      />

      <Text style={styles.label}>Amount *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={formData.amount.toString()}
        onChangeText={text => handleChange('amount', Number(text))}
      />

      <Text style={styles.label}>End Date (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#ccc"
        value={formData.endDate}
        onChangeText={text => handleChange('endDate', text)}
      />

      <Text style={styles.label}>Type (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter type"
        placeholderTextColor="#ccc"
        value={formData.type}
        onChangeText={text => handleChange('type', text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Is Open?</Text>
        <Switch
          value={formData.open}
          onValueChange={value => handleChange('open', value)}
          thumbColor={DarkTheme.text}
          trackColor={{ false: '#555', true: DarkTheme.secondary }}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: DarkTheme.primary,
    padding: 16,
    borderRadius: 10,
  },
  label: {
    color: DarkTheme.text,
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: DarkTheme.white,
    color: DarkTheme.text,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
