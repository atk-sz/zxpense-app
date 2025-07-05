import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DarkTheme } from '../../utils/theme';
import { IEventExpense } from '../../utils/interfaces';

type EventExpenseListProps = {
  expenses: IEventExpense[];
};

const EventExpenseList: React.FC<EventExpenseListProps> = ({ expenses }) => {
  const renderExpenseItem = ({ item }: { item: IEventExpense }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.eventTitle}</Text>
      <Text style={styles.expenseDate}>{item.eventDate}</Text>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id}
      renderItem={renderExpenseItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default EventExpenseList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
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
});
