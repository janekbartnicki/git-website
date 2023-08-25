/* eslint-disable */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createStripeCheckout = functions.region('europe-central2').https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);

  let METADATA_CART_STRING = JSON.stringify(data.cart);

  // data.cart.forEach(item => {
  //   METADATA_CART_STRING += `${item.id},${item.size},${item.quantity};`;
  // })

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

exports.stripeWebhook = functions.region('europe-central2').https.onRequest(async (req, res) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  let event;

  // const parseMetadata = (metadataString) => {
  //   const items = metadataString.split(';');
  //   const arr = items.map(item => {
  //     const splitted = item.split(",");
  //     if(splitted[0] && splitted[1] && splitted[2]) {
  //       return {
  //         id: splitted[0],
  //         size: splitted[1],
  //         quantity: splitted[2]
  //       }
  //     } else return;
  //   })

  //   arr.pop();
  //   return arr;
  // }

  try {
    const webhookSecret = functions.config().stripe.webhook_secret_key;

    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"],
      webhookSecret,
    );
  } catch(error) {
    console.error("Webhook signature verification failed.", error.message);
    return res.sendStatus(400);
  }

  switch(event.type) {
    case 'payment_intent.succeeded': {
      // const paymentIntent = event.data.object;
      console.log('payment success');

      // const cartItems = parseMetadata(paymentIntent.metadata.cart_info);

      // console.log(cartItems)
      // const db = admin.firestore();
      // const batch = db.batch();

      // for (const cartItem of cartItems) {
      //   const productRef = db.collection('products').doc(cartItem.id);
      //   batch.update(productRef, {
      //     [`inStock.${cartItem.size}`]: admin.firestore.FieldValue.increment(-cartItem.quantity),
      //   });
      // }

      // await batch.commit();

      res.sendStatus(200);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
})