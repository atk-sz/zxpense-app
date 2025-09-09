import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { IEventTransaction, IRootStackParamList } from '../utils/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DarkTheme } from '../utils/theme';
import { ScreenView } from '../components';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '../contexts/toast.context';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../redux/slices/events';
import store from '../redux/store';
import { deleteTransactionFromCurEvent } from '../redux/slices/event';
import { clearCurTransaction } from '../redux/slices/transaction';
import {
  formatAmount,
  formatDateLong,
  formatTime,
  getTypeColor,
  getTypeIcon,
  getTypeLabel,
} from '../utils/common.util';
import useConfirmationModal from '../hooks/useConfirmationModel';
import ConfirmationModal from '../components/model/confirmationModel.component';

type ITransactionDetailsScreenProps = {
  navigation: NativeStackNavigationProp<
    IRootStackParamList,
    'TransactionDetails'
  >;
  route: RouteProp<IRootStackParamList, 'TransactionDetails'>;
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

  const {
    isVisible,
    config,
    animation,
    showModal,
    handleConfirm,
    handleCancel,
  } = useConfirmationModal();

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
    showModal({
      title: 'Delete Transaction',
      message:
        'Are you sure you want to delete this transaction? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      iconName: 'alert-circle',
      iconColor: DarkTheme.error,
      confirmButtonColor: DarkTheme.error,
      onConfirm: () => {
        // Remove transaction from current event
        dispatch(deleteTransactionFromCurEvent(transactionId));
        // reset curTransaction state
        dispatch(clearCurTransaction());

        // update the list of events with newly updated event with new transactions & balances
        const updatedCurEvent = store.getState().curEvent;
        dispatch(
          updateEvent({
            id: eventId,
            updates: {
              transactions: updatedCurEvent.transactions,
              balanceAmount: updatedCurEvent.balanceAmount,
              incomingAmount: updatedCurEvent.incomingAmount,
              outgoingAmount: updatedCurEvent.outgoingAmount,
            },
          }),
        );

        showToast('Transaction deleted successfully!', 'success');
        navigation.goBack();
      },
    });
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
              {formatDateLong(curTransaction.date)}
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isVisible}
        config={config}
        animation={animation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
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
});
