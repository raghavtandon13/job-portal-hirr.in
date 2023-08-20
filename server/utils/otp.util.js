export const generateOTP = (otp_length) => {
  const digits = "0123456789";
  let OTP = "";

  while (OTP.length < otp_length) {
    OTP = "";
    for (let i = 0; i < otp_length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
  }
  return OTP;
};

export const fast2sms = async (otp, contactNumber) => {
  console.log("fast2sms started");

  const url = new URL("https://www.fast2sms.com/dev/bulkV2");
  const params = {
    authorization:
      "mSqeyUGhtg2i3dnFzk6x8JfXo4YAaw0ENLsPHRBWlQbKZOvCuIHgAPkimoq09z7sGnT5wjMId1t6XEL3",
    variables_values: otp,
    route: "otp",
    numbers: contactNumber,
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.log(errorBody);
    }
  } catch (error) {
    console.error(error);
  }
};
