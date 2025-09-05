import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IExpenseEvent, IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ExpenseEventForm, ScreenView } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../contexts/ToastContext';
import { addEvent } from '../redux/slices/events';
import { saveCurEvent } from '../redux/slices/event';
import { generateId } from '../utils/common.util';

type ICreateEventScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'CreateEvent'>;
};

const CreateEventScreen: React.FC<ICreateEventScreenProps> = ({
  navigation,
}): React.JSX.Element => {
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
    console.log('newEvent', newEvent);
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
    <ScreenView>
      <View style={styles.container}>
        <ExpenseEventForm
          showEndDatePicker={showEndDatePicker}
          showStartDatePicker={showStartDatePicker}
          formValues={formValues}
          formErrors={formErrors}
          setShowStartDatePicker={setShowStartDatePicker}
          setShowEndDatePicker={setShowEndDatePicker}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </View>
    </ScreenView>
  );
};

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
});

export default CreateEventScreen;
