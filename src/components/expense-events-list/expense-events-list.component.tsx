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
import { IExpenseEvent } from '../../utils/interfaces';

type IExpenseEventsListProps = {
  expenses: IExpenseEvent[];
};

const ExpenseEventsList: React.FC<IExpenseEventsListProps> = ({ expenses }) => {
  const renderExpenseItem = ({ item }: { item: IExpenseEvent }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.eventTitle}</Text>
      <Text style={styles.expenseDate}>{item.eventDate}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.createEventBtn}>
        <Icon name="add" size={20} color={DarkTheme.text} />
        <Text style={styles.createEventText}>Create New Event</Text>
      </TouchableOpacity>
      <Text style={styles.listTitle}>Your Events</Text>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={renderExpenseItem}
        contentContainerStyle={styles.listContainer}
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
  expenseItem: {
    backgroundColor: DarkTheme.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  expenseTitle: {
    color: DarkTheme.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseDate: {
    color: DarkTheme.text,
    fontSize: 14,
    marginTop: 4,
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
});
