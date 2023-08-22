/* eslint-disable */

const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);

  const cartItems = data.map(item => {
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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["p24", "card"],
    mode: "payment",
    success_url: "http://localhost:5500/",
    cancel_url: "http://localhost:5500/",
    line_items: cartItems,
  });

  return {
    id: session.id,
  };
})
