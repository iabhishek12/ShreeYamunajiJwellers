const formatOrderDate = date =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

const formatOrderTime = date =>
  new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

const formatOrderId = timestamp => `LX${`${timestamp}`.slice(-6)}`;

export function createMockOrderFromCheckout({
  cartItems,
  deliveryFee,
  giftWrapFee,
  offerDiscount,
  paymentId,
  selectedAddress,
  subtotal,
  taxes,
  total,
}) {
  const now = Date.now();
  const placedAt = new Date(now);

  return {
    id: formatOrderId(now),
    placedOn: formatOrderDate(placedAt),
    placedAtTime: formatOrderTime(placedAt),
    status: 'Processing',
    statusLine: 'We are preparing your order',
    action: 'View Details',
    paymentId,
    addressId: selectedAddress?.id ?? null,
    address: selectedAddress
      ? {
          id: selectedAddress.id,
          label: selectedAddress.label,
          name: selectedAddress.name,
          phone: selectedAddress.phone,
          line1: selectedAddress.line1,
          line2: selectedAddress.line2,
        }
      : null,
    summary: {
      subtotal,
      offerDiscount,
      deliveryFee,
      giftWrapFee,
      taxes,
      total,
    },
    total,
    items: cartItems.map(item => ({
      id: item.id,
      productId: item.product.id,
      title: item.product.title,
      quantity: item.quantity,
      selectedMetalId: item.selectedMetalId,
      selectedMetalLabel: item.selectedMetal?.label ?? '',
      selectedSizeId: item.selectedSizeId,
      selectedSizeLabel: item.selectedSize?.label ?? '',
      unitPrice: item.unitPrice,
      lineTotal: item.lineTotal,
    })),
    createdAt: now,
  };
}
