const axios = require("axios");

const postPayment = async (token, data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://smsc.intlcx.com/api_smsc/v1/payment",
      method: "POST",
      headers: {
        "accept": "application/json",
        "X-Auth-Token": `${token}`,
        "Content-Type": "application/json",
      },
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  postPayment,
};
