import { IRazorpayOrder } from './razorpay-order.model';

export interface IRazorpayPayment {
  id: number;
  rzp_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  payment_response: [];
  order: IRazorpayOrder;
}
