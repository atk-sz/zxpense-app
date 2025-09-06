import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IExpenseEvent } from '../../utils/interfaces';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DarkTheme } from '../../utils/theme';

interface IExpenseItemProps {
  item: IExpenseEvent;
  onEventPress: (event: IExpenseEvent) => void;
  handleEditEvent: (eventId: string) => void;
  handleDeleteEvent: (eventId: string) => void;
}

const ExpenseItemComponent: React.FC<IExpenseItemProps> = ({
  item,
  onEventPress,
  handleDeleteEvent,
  handleEditEvent,
}) => {
  return (
    <TouchableOpacity
      style={styles.expenseItem}
      onPress={() => {
        onEventPress(item);
      }}
    >
      <View style={styles.expenseContent}>
        <View style={styles.expenseInfo}>
          <Text style={styles.expenseTitle}>{item.title}</Text>
          <Text style={styles.expenseDate}>{item.startDate}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleEditEvent(item.id)}
          >
            <Icon name="pencil" size={20} color={DarkTheme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => handleDeleteEvent(item.id)}
          >
            <Icon name="delete" size={20} color={DarkTheme.text} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItemComponent;

const styles = StyleSheet.create({
  expenseItem: {
    backgroundColor: DarkTheme.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  expenseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseInfo: {
    flex: 1,
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 6,
  },
  deleteBtn: {},
});
