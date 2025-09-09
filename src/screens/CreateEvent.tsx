import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IExpenseEvent, IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ExpenseEventForm, ScreenView } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../contexts/toast.context';
import { addEvent, updateEvent } from '../redux/slices/events';
import { saveCurEvent } from '../redux/slices/event';
import { generateId } from '../utils/common.util';
import { RouteProp } from '@react-navigation/native';

type ICreateEventScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'CreateEvent'>;
  route?: RouteProp<IRootStackParamList, 'CreateEvent'> & {
    params?: { eventId: string; isEditMode: boolean };
  };
};

const CreateEventScreen: React.FC<ICreateEventScreenProps> = ({
  navigation,
  route,
}): React.JSX.Element => {
  // Check if we're in edit mode
  const isEditMode = route?.params?.isEditMode || false;
  const eventId = route?.params?.eventId;
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const events = useSelector((state: any) => state.events) as IExpenseEvent[];

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof IExpenseEvent, string>>
  >({});
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
  const [eventToEdit, setEventToEdit] = useState<IExpenseEvent | null>(null);

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

  const onSubmitCreate = async (newEvent: IExpenseEvent) => {
    dispatch(addEvent(newEvent));
    dispatch(saveCurEvent(newEvent));
    navigation.replace('EventDetails', { id: newEvent.id });
  };

  const onSubmitUpdate = async (updatedEvent: IExpenseEvent) => {
    console.log('updatedEvent', updatedEvent);
    dispatch(
      updateEvent({
        id: updatedEvent.id,
        updates: {
          ...eventToEdit,
          ...updatedEvent,
        },
      }),
    );
    showToast('Event updated successfully', 'success');
    navigation.goBack();
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof IExpenseEvent, string>> = {};
    const trimmedTitle = formValues.title.trim();

    // Title validation
    if (!trimmedTitle) {
      errors.title = 'Event title is required.';
    } else if (trimmedTitle.length > 25) {
      errors.title = 'Event title can be at most 25 characters long.';
    } else {
      // Check for duplicate titles (exclude current event in edit mode)
      const existingEvent = events.find(
        event => event.title === trimmedTitle && event.id !== formValues.id,
      );
      if (existingEvent) {
        errors.title = 'Event title already exists.';
      }
    }

    // Date validation
    if (!formValues.startDate?.trim()) {
      errors.startDate = 'Date is required.';
    } else {
      const date = new Date(formValues.startDate);
      if (isNaN(date.getTime())) {
        errors.startDate = 'Invalid date.';
      }
    }

    // End date validation for multi-day events
    if (formValues.isMultiDay && formValues.endDate) {
      const startDate = new Date(formValues.startDate);
      const endDate = new Date(formValues.endDate);
      if (isNaN(endDate.getTime())) errors.endDate = 'Invalid date.';
      else if (endDate < startDate) {
        errors.endDate = 'End date must be after start date.';
      }
    }

    if (Object.keys(errors).length > 0) {
      showToast('Please clear the following errors', 'error');
      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handleSubmit = () => {
    // Update title with trimmed value
    const updatedFormValues = { ...formValues, title: formValues.title.trim() };
    setFormValues(updatedFormValues);

    if (!validateForm()) {
      return;
    }

    if (isEditMode) {
      onSubmitUpdate(updatedFormValues);
    } else {
      const newId = generateId(updatedFormValues.title, 8);
      const newEvent = { ...updatedFormValues, id: newId };
      onSubmitCreate(newEvent);
    }
  };

  // Load event data for edit mode
  useEffect(() => {
    if (isEditMode && eventId) {
      const eToEdit = events.find(event => event.id === eventId);
      if (eToEdit) {
        setEventToEdit(eToEdit);
        setFormValues(eToEdit);
      } else {
        showToast('Event not found', 'error');
        navigation.goBack();
      }
    }
  }, [isEditMode, eventId, events, showToast, navigation]);

  return (
    <ScreenView>
      <View style={styles.container}>
        <ExpenseEventForm
          showEndDatePicker={showEndDatePicker}
          showStartDatePicker={showStartDatePicker}
          formValues={formValues}
          formErrors={formErrors}
          isEditMode={isEditMode}
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
