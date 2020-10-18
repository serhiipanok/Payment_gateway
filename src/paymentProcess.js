const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function stripeProcess(req, res, next) {
  return res.status(200).json({ status: true, data: "Stripe is integrating!" });
}

module.exports = {
  stripeProcess
};
