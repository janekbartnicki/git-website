/* eslint-disable */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createStripeCheckout = functions.region('europe-central2').https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);

  let METADATA_CART_STRING = JSON.stringify(data.cart);

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["p24", "card"],
    mode: "payment",
    success_url: "http://localhost:5173/platnosc/sukces",
    cancel_url: "http://localhost:5173/platnosc/niepowodzenie",
    line_items: cartItems,
    metadata: {
      cart_info: METADATA_CART_STRING,
    },
    payment_intent_data: {
      metadata: {
        cart_info: METADATA_CART_STRING,
      },
    },
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

exports.stripeWebhook = functions.region('europe-central2').https.onRequest(async (request, response) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  let event = request.body;

  try {
    const webhookSecret = functions.config().stripe.webhook_secret_key;

    event = stripe.webhooks.constructEvent(
      request.rawBody,
      request.headers["stripe-signature"],
      webhookSecret,
    );
  } catch(error) {
    console.error("Webhook signature verification failed.", error.message);
    return response.sendStatus(400);
  }

  switch(event.type) {
    case 'payment_intent.succeeded': {
      try {
        const cartItems = JSON.parse(event.data.object.metadata.cart_info);

        for(const item of cartItems){
          const docRef = admin.firestore().collection("products").doc(String(item.id));
          const docSnapshot = await docRef.get();
          const data = docSnapshot.data();

          if (data.inStock && data.inStock[String(item.size)]) {
            const newInStockValue = data.inStock[String(item.size)] - item.quantity; 
            await docRef.update({
              [`inStock.${item.size}`]: newInStockValue
            });
          }
        }

        response.sendStatus(200);
      } catch(error) {
        console.error("payment_intent.succeeded error", error.massage);
        response.sendStatus(400);
      }

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
  response.sendStatus(200);
})