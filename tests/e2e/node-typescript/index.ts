import { RudderTyperAnalytics } from './analytics/index';
import RudderAnalytics from '@rudderstack/rudder-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const client = new RudderAnalytics(process.env.WRITE_KEY ?? 'DUMMY_WRITE_KEY', {
    dataPlaneUrl: process.env.DATA_PLANE_URL,
  });

  // Pass in your @rudderstack/rudder-sdk-node instance to RudderTyper.
  RudderTyperAnalytics.setRudderTyperOptions({
    analytics: client,
  });

  RudderTyperAnalytics.productsSearched({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      query: 'iPhone',
    },
  });

  RudderTyperAnalytics.productClicked({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      product_id: 'iphone_12',
      sku: 'iphone_12_sku',
      category: 'smartphones',
      name: 'iPhone 12',
      brand: 'Apple',
      price: 999.99,
      image_url: 'https://example.com/iphone_12.jpg',
      coupon: 'SUMMER_SALE',
      position: 1,
      variant: 'red',
    },
  });

  RudderTyperAnalytics.productViewed({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      product_id: 'iphone_12',
      sku: 'iphone_12_sku',
      category: 'smartphones',
      name: 'iPhone 12',
      brand: 'Apple',
      price: 999.99,
      image_url: 'https://example.com/iphone_12.jpg',
      coupon: 'SUMMER_SALE',
      url: 'https://example.com/iphone_12',
      currency: 'USD',
    },
  });

  RudderTyperAnalytics.productAdded({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      product_id: 'iphone_12',
      sku: 'iphone_12_sku',
      category: 'smartphones',
      name: 'iPhone 12',
      brand: 'Apple',
      price: 999.99,
      image_url: 'https://example.com/iphone_12.jpg',
      coupon: 'SUMMER_SALE',
      url: 'https://example.com/iphone_12',
      currency: 'USD',
      quantity: 1,
    },
  });

  RudderTyperAnalytics.cartViewed({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      cart_id: 'cart_123',
      products: [
        {
          product_id: 'iphone_12',
          sku: 'iphone_12_sku',
          category: 'smartphones',
          name: 'iPhone 12',
          brand: 'Apple',
          price: 999.99,
          image_url: 'https://example.com/iphone_12.jpg',
          coupon: 'SUMMER_SALE',
          url: 'https://example.com/iphone_12',
          currency: 'USD',
          quantity: 1,
        },
      ],
    },
  });

  RudderTyperAnalytics.couponApplied({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      coupon_id: 'SUMMER_SALE',
      cart_id: 'cart_123',
      coupon_name: 'Summer Sale',
      discount: 50,
      order_id: 'order_123',
    },
  });

  RudderTyperAnalytics.checkoutStarted({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      affiliation: 'Google Store',
      coupon: 'SUMMER_SALE',
      currency: 'USD',
      discount: 50,
      order_id: 'order_123',
      products: [
        {
          product_id: 'iphone_12',
          sku: 'iphone_12_sku',
          category: 'smartphones',
          name: 'iPhone 12',
          brand: 'Apple',
          price: 999.99,
          image_url: 'https://example.com/iphone_12.jpg',
          coupon: 'SUMMER_SALE',
          url: 'https://example.com/iphone_12',
          currency: 'USD',
          quantity: 1,
        },
      ],
      revenue: 949.99,
      shipping: 10,
      tax: 5,
      value: 964.99,
    },
  });

  RudderTyperAnalytics.paymentInfoEntered({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      checkout_id: 'checkout_123',
      order_id: 'order_123',
      payment_method: 'Credit Card',
      shipping_method: 'UPS Ground',
      step: 2,
    },
  });

  RudderTyperAnalytics.checkoutStepCompleted({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      checkout_id: 'checkout_123',
      payment_method: 'Credit Card',
      shipping_method: 'UPS Ground',
      step: 3,
    },
  });

  RudderTyperAnalytics.orderCompleted({
    userId: 'temp_user_id',
    anonymousId: 'temp_anonymous_id',
    properties: {
      affiliation: 'Google Store',
      coupon: 'SUMMER_SALE',
      currency: 'USD',
      discount: 50,
      order_id: 'order_123',
      checkout_id: 'checkout_123',
      products: [
        {
          product_id: 'iphone_12',
          sku: 'iphone_12_sku',
          category: 'smartphones',
          name: 'iPhone 12',
          brand: 'Apple',
          price: 999.99,
          image_url: 'https://example.com/iphone_12.jpg',
          coupon: 'SUMMER_SALE',
          url: 'https://example.com/iphone_12',
          currency: 'USD',
          quantity: 1,
        },
      ],
      revenue: 949.99,
      shipping: 10,
      tax: 5,
      value: 964.99,
    },
  });

  await client.flush();
}

run();
