import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  IEventTransaction,
  IExpenseEvent,
  IRootStackParamList,
} from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../contexts/ToastContext';
import EventTransactionForm from '../components/forms/event-transaction-form.component';
import { useSelector } from 'react-redux';

type IEventDetailsScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'EventDetails'>;
  route: RouteProp<IRootStackParamList, 'EventDetails'>;
};

const EventDetailsScreen: React.FC<IEventDetailsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const curEvent = useSelector((state: any) => state.curEvent) as IExpenseEvent;
  const [showForm, setShowForm] = useState(false);

  const handleTransactionSubmit = async (newTransaction: IEventTransaction) => {
    console.log('newTransaction', newTransaction);
    // dispatch(addEvent(newEvent));
    // dispatch(saveCurEvent(newEvent));
    // navigation.navigate('Home');

    showToast('Transaction added successfully!', 'success');
  };

  console.log('curEvent', curEvent);

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.title}>{curEvent.title}</Text>
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

      <EventTransactionForm
        visible={showForm}
        eventId={id}
        onClose={() => setShowForm(false)}
        onSubmit={handleTransactionSubmit}
      />
    </ScreenView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: DarkTheme.text,
    textTransform: 'uppercase',
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
});
