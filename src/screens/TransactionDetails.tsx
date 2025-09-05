import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
} from 'react-native';
import { IEventTransaction, IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../contexts/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../redux/slices/events';
import store from '../redux/store';
import { deleteTransactionFromCurEvent } from '../redux/slices/event';
import { clearCurTransaction } from '../redux/slices/transaction';

type ITransactionDetailsScreenProps = {
  navigation: NativeStackNavigationProp<
    IRootStackParamList,
    'TransactionDetails'
  >;
  route: RouteProp<IRootStackParamList, 'TransactionDetails'>;
};

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
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

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'incoming':
      return 'Income';
    case 'outgoing':
      return 'Expense';
    case 'item':
      return 'Item Transaction';
    default:
      return 'Transaction';
  }
};

const TransactionDetailsScreen: React.FC<ITransactionDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { transactionId, eventId } = route.params;
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const curTransaction = useSelector(
    (state: any) => state.curTransaction,
  ) as IEventTransaction;
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAnimation] = useState(new Animated.Value(0));

  if (!curTransaction || curTransaction.id !== transactionId) {
    return (
      <ScreenView>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={64} color={DarkTheme.error} />
          <Text style={styles.errorText}>Transaction not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenView>
    );
  }

  const handleDeletePress = () => {
    setShowDeleteModal(true);
    Animated.spring(deleteAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 8,
    }).start();
  };

  const handleDeleteConfirm = () => {
    // Remove transaction from current event
    dispatch(deleteTransactionFromCurEvent(transactionId));
    // reset curTransaction state
    dispatch(clearCurTransaction());

    // Update the events list
    const updatedTransactions = store.getState().curEvent.transactions;
    dispatch(
      updateEvent({
        id: eventId,
        updates: { transactions: updatedTransactions },
      }),
    );

    showToast('Transaction deleted successfully!', 'success');
    navigation.goBack();
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    // Reset animation state for next time
    deleteAnimation.setValue(0);
  };

  return (
    <ScreenView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={28} color={DarkTheme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transaction Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Transaction Type Badge */}
        <View style={styles.typeBadgeContainer}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: getTypeColor(curTransaction.type) + '20' },
            ]}
          >
            <Icon
              name={getTypeIcon(curTransaction.type)}
              size={28}
              color={getTypeColor(curTransaction.type)}
            />
            <Text
              style={[
                styles.typeLabel,
                { color: getTypeColor(curTransaction.type) },
              ]}
            >
              {getTypeLabel(curTransaction.type)}
            </Text>
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text
            style={[
              styles.amountValue,
              { color: getTypeColor(curTransaction.type) },
            ]}
          >
            ₹{formatAmount(curTransaction.amount)}
          </Text>
        </View>

        {/* Details Cards */}
        <View style={styles.detailsContainer}>
          {/* Date & Time Card */}
          <View style={styles.detailCard}>
            <View style={styles.cardHeader}>
              <Icon name="calendar-clock" size={20} color={DarkTheme.info} />
              <Text style={styles.cardTitle}>Date & Time</Text>
            </View>
            <Text style={styles.cardValue}>
              {formatDate(curTransaction.date)}
            </Text>
            <Text style={styles.cardSubValue}>
              {formatTime(curTransaction.date)}
            </Text>
          </View>

          {/* Balance Card */}
          <View style={styles.detailCard}>
            <View style={styles.cardHeader}>
              <Icon name="wallet" size={20} color={DarkTheme.secondary} />
              <Text style={styles.cardTitle}>Balance After</Text>
            </View>
            <Text style={[styles.cardValue, { color: DarkTheme.info }]}>
              ₹{formatAmount(curTransaction.balanceAmountNow)}
            </Text>
          </View>

          {/* Item Details (if applicable) */}
          {curTransaction.type === 'item' && (
            <View style={styles.detailCard}>
              <View style={styles.cardHeader}>
                <Icon
                  name="package-variant"
                  size={20}
                  color={DarkTheme.orange}
                />
                <Text style={styles.cardTitle}>Item Details</Text>
              </View>
              {curTransaction.itemName && (
                <View style={styles.itemDetailRow}>
                  <Text style={styles.itemLabel}>Name:</Text>
                  <Text style={styles.cardValue}>
                    {curTransaction.itemName}
                  </Text>
                </View>
              )}
              {curTransaction.worth && (
                <View style={styles.itemDetailRow}>
                  <Text style={styles.itemLabel}>Worth:</Text>
                  <Text style={[styles.cardValue, { color: DarkTheme.orange }]}>
                    ₹{formatAmount(curTransaction.worth)}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Description Card */}
          {curTransaction.description && (
            <View style={styles.detailCard}>
              <View style={styles.cardHeader}>
                <Icon name="text" size={20} color={DarkTheme.lightGrey} />
                <Text style={styles.cardTitle}>Description</Text>
              </View>
              <Text style={styles.descriptionText}>
                {curTransaction.description}
              </Text>
            </View>
          )}

          {/* Transaction ID Card */}
          <View style={styles.detailCard}>
            <View style={styles.cardHeader}>
              <Icon name="identifier" size={20} color={DarkTheme.lightGrey} />
              <Text style={styles.cardTitle}>Transaction ID</Text>
            </View>
            <Text style={styles.idText}>{curTransaction.id}</Text>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Delete FAB */}
      <TouchableOpacity
        style={[
          styles.deleteFab,
          {
            bottom: insets.bottom + 20,
            backgroundColor: DarkTheme.error,
          },
        ]}
        onPress={handleDeletePress}
      >
        <Icon name="delete" size={32} color={DarkTheme.text} />
      </TouchableOpacity>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleDeleteCancel}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [
                  {
                    scale: deleteAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1],
                    }),
                  },
                ],
                opacity: deleteAnimation,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Icon name="alert-circle" size={48} color={DarkTheme.error} />
              <Text style={styles.modalTitle}>Delete Transaction</Text>
            </View>

            <Text style={styles.modalMessage}>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleDeleteCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </ScreenView>
  );
};

export default TransactionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backIcon: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DarkTheme.text,
  },
  placeholder: {
    width: 44,
  },
  typeBadgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: DarkTheme.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: DarkTheme.lightGrey,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountValue: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  detailCard: {
    backgroundColor: DarkTheme.darkGrey,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: DarkTheme.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: DarkTheme.text,
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DarkTheme.text,
    marginBottom: 4,
  },
  cardSubValue: {
    fontSize: 14,
    color: DarkTheme.lightGrey,
  },
  itemDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 14,
    color: DarkTheme.lightGrey,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    color: DarkTheme.text,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  idText: {
    fontSize: 14,
    color: DarkTheme.lightGrey,
    fontFamily: 'monospace',
    backgroundColor: DarkTheme.primary + '40',
    padding: 8,
    borderRadius: 8,
  },
  bottomSpacer: {
    height: 120,
  },
  deleteFab: {
    position: 'absolute',
    right: 20,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: DarkTheme.error,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: DarkTheme.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: DarkTheme.text,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: DarkTheme.darkGrey,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    elevation: 10,
    shadowColor: DarkTheme.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DarkTheme.text,
    marginTop: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: DarkTheme.lightGrey,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: DarkTheme.lightGrey + '30',
    borderWidth: 1,
    borderColor: DarkTheme.lightGrey + '50',
  },
  deleteButton: {
    backgroundColor: DarkTheme.error,
  },
  cancelButtonText: {
    color: DarkTheme.text,
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButtonText: {
    color: DarkTheme.text,
    fontWeight: '600',
    fontSize: 16,
  },
});
