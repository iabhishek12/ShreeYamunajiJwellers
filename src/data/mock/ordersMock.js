export const orderTabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Returns'];

export const initialOrders = [];

export const orderStatusMeta = {
  Delivered: {
    tab: 'Delivered',
    statusLinePrefix: 'Delivered on',
  },
  Shipped: {
    tab: 'Shipped',
    statusLinePrefix: 'Expected delivery:',
  },
  Processing: {
    tab: 'Processing',
    statusLinePrefix: '',
  },
  'Return Completed': {
    tab: 'Returns',
    statusLinePrefix: 'Return completed on',
  },
};
