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
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../contexts/ToastContext';
import EventTransactionForm from '../components/forms/event-transaction-form.component';
import { useSelector } from 'react-redux';
import { sampleTransactions1 } from '../utils/data.util';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    );
  };

  const formatAmount = (amount: string) => {
    return parseFloat(amount).toLocaleString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'incoming':
        return DarkTheme.success;
      case 'outgoing':
        return DarkTheme.error;
      case 'item':
        return DarkTheme.orange;
      default:
        return DarkTheme.text;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return 'cash-plus';
      case 'outgoing':
        return 'cash-minus';
      case 'item':
        return 'package-variant';
      default:
        return 'circle';
    }
  };

  const renderTransactionItem = ({ item }: { item: IEventTransaction }) => (
    <View
      style={[
        styles.transactionItem,
        {
          backgroundColor: getTypeColor(item.type) + '20',
          borderLeftColor: getTypeColor(item.type),
          borderLeftWidth: 4,
        },
      ]}
    >
      {/* Row 1: Icon and Amount */}
      <View style={styles.row1}>
        <Icon
          name={getTypeIcon(item.type)}
          size={24}
          color={getTypeColor(item.type)}
        />
        <Text style={[styles.amountText, { color: getTypeColor(item.type) }]}>
          {formatAmount(item.amount)}
        </Text>
      </View>

      {/* Row 2: Item details OR Description */}
      <View style={styles.row2}>
        {item.type === 'item' ? (
          <View style={styles.itemDetails}>
            {item.itemName && (
              <Text style={styles.itemName}>Item: {item.itemName}</Text>
            )}
            {item.worth && (
              <Text style={styles.itemWorth}>
                Worth: {formatAmount(item.worth)}
              </Text>
            )}
          </View>
        ) : (
          <>
            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </>
        )}
      </View>

      {/* Row 3: DateTime and Balance Amount */}
      <View style={styles.row3}>
        <Text style={styles.dateTime}>{formatDate(item.date)}</Text>
        <Text style={styles.dateTime}>
          Bal: {formatAmount(item.balanceAmountNow)}
        </Text>
      </View>
    </View>
  );

  console.log('curEvent', curEvent);

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.title}>{curEvent?.title || 'Event Details'}</Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Income</Text>
            <Text style={[styles.cardValue, styles.incomeText]}>200004567</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Expense</Text>
            <Text style={[styles.cardValue, styles.expenseText]}>
              899296547
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, styles.balanceCard]}>
            <Text style={styles.cardLabel}>Balance</Text>
            <Text style={[styles.cardValue, styles.balanceText]}>
              7299287647658
            </Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <FlatList
            data={sampleTransactions1}
            renderItem={renderTransactionItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.transactionsList}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>

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
  transactionItem: {
    backgroundColor: DarkTheme.darkGrey,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row2: {
    marginBottom: 12,
  },
  itemDetails: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 14,
    color: DarkTheme.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemWorth: {
    fontSize: 14,
    color: DarkTheme.text,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: DarkTheme.text,
    fontStyle: 'italic',
  },
  // Row 3: DateTime and Balance Amount
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: DarkTheme.lightGrey + '30',
  },
  dateTime: {
    fontSize: 12,
    color: DarkTheme.lightGrey,
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
