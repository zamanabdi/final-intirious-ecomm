const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  export const makePayment = async (paymentOrderId,amount,id) => {
    console.log("here...");
    const res = await initializeRazorpay();
  
    if (!res) {
      alert("Razorpay SDK Failed to load");
    }
    if (
      paymentOrderId
    ) {
        console.log(process.env.REACT_APP_RAZORPAY_KEY)
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        name: "Interious Design and Collection",
        currency: "INR",
        amount: amount * 100,
        order_id: paymentOrderId,
        image: "/logo.png",
        description: `Interious Design and Collection Order Payment`,
        handler: function (response) {
            alert("sucessfull")
        },
      };
      const paymentObject = new (window).Razorpay(options);
      paymentObject.open();
    } else {
      alert("Something went wrong");
      console.log("Payment Error");
    }
  };