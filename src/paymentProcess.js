const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY || "sk_test_4SMeRRoDRGX7gX7mlE5i6STs"
);
const service = require("./service");

const stripeProcessOnboarding = async (req, res, next) => {
  console.log(req.body);
  try {
    const account = await stripe.accounts.create({ type: "express" });
    // req.session.accountID = account.id;

    const origin = `${req.headers.origin}`;
    const accountLinkURL = await generateAccountLink(account.id, origin);
    res.send({ url: accountLinkURL });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
  // return res.status(200).json({ status: true, data: "Stripe is integrating!" });
};

const generateAccountLink = (accountID, origin) => {
  return stripe.accountLinks
    .create({
      type: "account_onboarding",
      account: accountID,
      refresh_url: `${origin}`,
      return_url: `${origin}`,
    })
    .then((link) => link.url);
};

async function stripeProcess(req, res, next) {
  try { 
    const { paymentData, amount, user, authToken } = req.body
    const token = paymentData.token;
    const payAmount = Math.round(amount * 100);
    const charge = await stripe.charges.create({
      amount: payAmount,
      currency: "usd",
      description: "Example charge",
      source: token,
    });
    const data = {
      // company_uuid: user.company_uuid,
      company_uuid: "be791a26-fa31-4c1f-a3b4-21693b2dd410",
      method: "manual",
      amount
    }
    const result = await service.postPayment(authToken, data);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
  // return res.status(200).json({ status: true, data: "Stripe is integrating!" });
}

module.exports = {
  stripeProcessOnboarding,
  stripeProcess,
};
