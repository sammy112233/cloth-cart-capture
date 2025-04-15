
export enum DataLayerEvent {
  VIEW_ITEM = 'view_item',
  ADD_TO_CART = 'add_to_cart',
  BEGIN_CHECKOUT = 'begin_checkout',
  PURCHASE = 'purchase',
  REFUND_REQUEST = 'refund_request',
  ADD_PROMOTION = 'add_promotion',
}

interface DataLayerItem {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity?: number;
}

interface BaseEventProps {
  currency?: string;
  value?: number;
}

interface ViewItemProps extends BaseEventProps {
  items: DataLayerItem[];
}

interface AddToCartProps extends BaseEventProps {
  items: DataLayerItem[];
}

interface BeginCheckoutProps extends BaseEventProps {
  items: DataLayerItem[];
  coupon?: string;
}

interface PurchaseProps extends BaseEventProps {
  transaction_id: string;
  items: DataLayerItem[];
  shipping?: number;
  tax?: number;
  coupon?: string;
}

interface RefundRequestProps {
  transaction_id: string;
  items: DataLayerItem[];
  reason: string;
}

interface AddPromotionProps {
  promotion_id: string;
  promotion_name: string;
  creative_name?: string;
  items?: DataLayerItem[];
}

// Initialize dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Helper to initialize the dataLayer
const initDataLayer = (): void => {
  window.dataLayer = window.dataLayer || [];
  console.log('Data layer initialized');
};

// Push events to the dataLayer
export const pushEvent = (event: string, ecommerce: object): void => {
  initDataLayer();
  
  // Clear previous ecommerce object to prevent data leakage
  window.dataLayer.push({ ecommerce: null });
  
  // Push the event
  window.dataLayer.push({
    event,
    ecommerce,
  });
  
  console.log(`Pushed event to dataLayer: ${event}`, ecommerce);
};

// Event-specific functions
export const viewItem = (props: ViewItemProps): void => {
  pushEvent(DataLayerEvent.VIEW_ITEM, {
    currency: props.currency || 'USD',
    value: props.value,
    items: props.items,
  });
};

export const addToCart = (props: AddToCartProps): void => {
  pushEvent(DataLayerEvent.ADD_TO_CART, {
    currency: props.currency || 'USD',
    value: props.value,
    items: props.items,
  });
};

export const beginCheckout = (props: BeginCheckoutProps): void => {
  pushEvent(DataLayerEvent.BEGIN_CHECKOUT, {
    currency: props.currency || 'USD',
    value: props.value,
    coupon: props.coupon,
    items: props.items,
  });
};

export const purchase = (props: PurchaseProps): void => {
  pushEvent(DataLayerEvent.PURCHASE, {
    transaction_id: props.transaction_id,
    currency: props.currency || 'USD',
    value: props.value,
    shipping: props.shipping,
    tax: props.tax,
    coupon: props.coupon,
    items: props.items,
  });
};

export const refundRequest = (props: RefundRequestProps): void => {
  pushEvent(DataLayerEvent.REFUND_REQUEST, {
    transaction_id: props.transaction_id,
    items: props.items,
    reason: props.reason,
  });
};

export const addPromotion = (props: AddPromotionProps): void => {
  pushEvent(DataLayerEvent.ADD_PROMOTION, {
    promotion_id: props.promotion_id,
    promotion_name: props.promotion_name,
    creative_name: props.creative_name,
    items: props.items,
  });
};
