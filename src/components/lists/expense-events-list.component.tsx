import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DarkTheme } from '../../utils/theme';
import { IExpenseEvent, IRootStackParamList } from '../../utils/interfaces';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { saveCurEvent } from '../../redux/slices/event';
import ConfirmationModal from '../model/confirmationModel.component';
import useConfirmationModal from '../../hooks/useConfirmationModel';
import { useToast } from '../../contexts/ToastContext';
import { ExpenseItem } from '..';
import { deleteEvent } from '../../redux/slices/events';
import { useLoader } from '../../contexts/LoaderContext';

type IExpenseEventsListProps = {
  expenses: IExpenseEvent[];
};

const ExpenseEventsList: React.FC<IExpenseEventsListProps> = ({ expenses }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();

  const {
    isVisible,
    config,
    animation,
    showModal,
    handleConfirm,
    handleCancel,
  } = useConfirmationModal();

  const handleDeleteEvent = (eventId: string) => {
    showModal({
      title: 'Delete Event',
      message:
        'Are you sure you want to delete this Event? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      iconName: 'alert-circle',
      iconColor: DarkTheme.error,
      confirmButtonColor: DarkTheme.error,
      onConfirm: () => {
        showLoader('Deleting event...');
        dispatch(deleteEvent(eventId));
        hideLoader();
        showToast('Event deleted successfully!', 'success');
      },
    });
  };

  const handleEditEvent = (eventId: string) => {
    navigation.navigate('CreateEvent', { isEditMode: true, eventId });
  };

  const onEventPress = (item: IExpenseEvent) => {
    const foundEvent = expenses.find(e => e.id === item.id);
    if (!foundEvent) return;
    dispatch(saveCurEvent(foundEvent));
    navigation.navigate('EventDetails', { id: item.id });
  };

  const renderExpenseItem = ({ item }: { item: IExpenseEvent }) => (
    <ExpenseItem
      item={item}
      onEventPress={onEventPress}
      handleDeleteEvent={handleDeleteEvent}
      handleEditEvent={handleEditEvent}
    />
  );

  const onPressCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.createEventBtn}
        onPress={onPressCreateEvent}
      >
        <Icon name="add" size={20} color={DarkTheme.text} />
        <Text style={styles.createEventText}>Create New Event</Text>
      </TouchableOpacity>
      <Text style={styles.listTitle}>Your Events</Text>
      {expenses.length === 0 ? (
        <Text style={styles.emptyMessage}>
          You don't have any events yet! 😒😢
        </Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={renderExpenseItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <ConfirmationModal
        isVisible={isVisible}
        config={config}
        animation={animation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default ExpenseEventsList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DarkTheme.text,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  createEventBtn: {
    backgroundColor: DarkTheme.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createEventText: {
    color: DarkTheme.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    color: DarkTheme.text,
    fontSize: 16,
    marginTop: 24,
  },
});
