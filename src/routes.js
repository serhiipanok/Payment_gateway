const express = require("express");
const paymentProcess = require("./paymentProcess");
const router = express.Router();

router.post("/stripe", paymentProcess.stripeProcess);
// router.post("/paypal", paymentProcess.paypal);
// router.post("/coinpayments", paymentProcess.coinPayments);

module.exports = router;
