const express = require("express");
const paymentProcess = require("./paymentProcess");
const router = express.Router();

router.post("/stripe-charge", paymentProcess.stripeProcess);
// router.post("/stripe-onboarding", paymentProcess.stripeProcessOnboarding);
// router.post("/paypal", paymentProcess.paypal);
// router.post("/coinpayments", paymentProcess.coinPayments);

module.exports = router;
