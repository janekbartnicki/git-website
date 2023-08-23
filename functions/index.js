/* eslint-disable */

const functions = require("firebase-functions");

exports.createStripeCheckout = functions.region('europe-central2').https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);

  const SHIPPING_COST = 1500;

  const cartItems = data.cart.map(item => {
    return {
      quantity: item.quantity,
      price_data: {
        currency: "pln",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name + ` (rozmiar ${item.size})`
        }
      }
    }
  })

  // cartItems.push({
  //   quantity: 1,
  //   price_data: {
  //     currency: "pln",
  //     unit_amount: SHIPPING_COST,
  //     product_data: {
  //       name: "Koszt przesyłki"
  //     }
  //   }
  // })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["p24", "card"],
    mode: "payment",
    success_url: "http://localhost:5173/platnosc/sukces",
    cancel_url: "http://localhost:5173/platnosc/niepowodzenie",
    line_items: cartItems,
    shipping_address_collection: {
      allowed_countries: ['PL'],
    },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: SHIPPING_COST,
            currency: 'pln',
          },
          display_name: 'Przesyłka kurierska',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 2,
            },
            maximum: {
              unit: 'business_day',
              value: 5,
            },
          },
        },
      },
    ],
  });

  return {
    id: session.id,
  };
})
