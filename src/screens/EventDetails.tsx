import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  IEventTransaction,
  IExpenseEvent,
  IRootStackParamList,
} from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView, TransactionItem } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../contexts/ToastContext';
import EventTransactionForm from '../components/forms/event-transaction-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionToCurEvent } from '../redux/slices/event';
import { updateEvent } from '../redux/slices/events';
import store from '../redux/store';
import { saveCurTransaction } from '../redux/slices/transaction';
import { formatAmount } from '../utils/common.util';

type IEventDetailsScreenProps = {
  navigation: NativeStackNavigationProp<IRootStackParamList, 'EventDetails'>;
  route: RouteProp<IRootStackParamList, 'EventDetails'>;
};

const EventDetailsScreen: React.FC<IEventDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const curEvent = useSelector((state: any) => state.curEvent) as IExpenseEvent;
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const handleTransactionSubmit = async (newTransaction: IEventTransaction) => {
    dispatch(addTransactionToCurEvent(newTransaction));
    // update the list of events with newly updated event with new transactions & balances
    const updatedCurEvent = store.getState().curEvent;
    dispatch(
      updateEvent({
        id: curEvent.id,
        updates: {
          transactions: updatedCurEvent.transactions,
          balanceAmount: updatedCurEvent.balanceAmount,
          incomingAmount: updatedCurEvent.incomingAmount,
          outgoingAmount: updatedCurEvent.outgoingAmount,
        },
      }),
    );
    setShowForm(false);
    showToast('Transaction added successfully!', 'success');
  };

  const handleTransactionPress = (transaction: IEventTransaction) => {
    dispatch(saveCurTransaction(transaction));
    navigation.navigate('TransactionDetails', {
      transactionId: transaction.id,
      eventId: id,
    });
  };

  const handleEventDetailsPress = () => {
    // Navigate to full event details screen
    // navigation.navigate('FullEventDetails', { eventId: id });
  };

  const renderTransactionItem = ({ item }: { item: IEventTransaction }) => (
    <TransactionItem item={item} onPress={handleTransactionPress} />
  );

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.title}>{curEvent?.title || 'Event Details'}</Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Income</Text>
            <Text style={[styles.cardValue, styles.incomeText]}>
              {formatAmount(curEvent.incomingAmount)}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Expense</Text>
            <Text style={[styles.cardValue, styles.expenseText]}>
              {formatAmount(curEvent.outgoingAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, styles.balanceCard]}>
            <Text style={styles.cardLabel}>Balance</Text>
            <Text style={[styles.cardValue, styles.balanceText]}>
              {formatAmount(curEvent.balanceAmount)}
            </Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <FlatList
            data={[...curEvent.transactions].reverse()}
            renderItem={renderTransactionItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.transactionsList}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>

      {/* Event Details FAB - Left side */}
      <TouchableOpacity
        style={[
          styles.fab,
          styles.eventDetailsFab,
          {
            bottom: insets.bottom + 20,
            left: 20,
            backgroundColor: DarkTheme.info,
          },
        ]}
        onPress={handleEventDetailsPress}
      >
        <Icon name="information" size={30} color={DarkTheme.text} />
      </TouchableOpacity>

      {/* Add Transaction FAB - Right side */}
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
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: DarkTheme.darkGrey,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 3,
    shadowColor: DarkTheme.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  balanceCard: {
    marginHorizontal: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: DarkTheme.lightGrey,
    marginBottom: 8,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  incomeText: {
    color: DarkTheme.success,
  },
  expenseText: {
    color: DarkTheme.error,
  },
  balanceText: {
    color: DarkTheme.info,
    fontSize: 24,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: DarkTheme.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventDetailsFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  // Transaction List Styles
  transactionsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DarkTheme.text,
    marginBottom: 16,
    paddingLeft: 4,
  },
  transactionsList: {
    paddingBottom: 100, // Extra space for FAB !IMPORTANT
  },
  balanceAmount: {
    fontSize: 14,
    color: DarkTheme.info,
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
});
