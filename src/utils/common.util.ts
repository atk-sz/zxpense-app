import { DarkTheme } from './theme';

export const generateId = (title?: string, length: number = 7) => {
  const unique = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  if (title) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${slug}-${unique}`;
  }
  return unique;
};

export const getTypeColor = (type: string) => {
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

export const getTypeIcon = (type: string) => {
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

export const getTypeLabel = (type: string) => {
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

export const formatAmount = (amount: string) => {
  return parseFloat(amount).toLocaleString();
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateLong = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
