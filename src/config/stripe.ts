export const PLANS = [
  {
    name: "Free",
    slug: "free",
    quota: 10,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    name: "50 Tokens",
    slug: "50-tokens",
    quota: 50,
    price: {
      amount: 5,
      priceIds: {
        test: "price_1PPPQVP3PzZi6quKQ6kQPDb0",
        production: "",
      },
    },
  },
  {
    name: "100 Tokens",
    slug: "100-tokens",
    quota: 100,
    price: {
      amount: 10,
      priceIds: {
        test: "price_1PPPRcP3PzZi6quKkn3eKGR6",
        production: "",
      },
      pagesPerPdf: 100, // Add this property
    },
  },
  {
    name: "200 Tokens",
    slug: "200-tokens",
    quota: 200,
    price: {
      amount: 20,
      priceIds: {
        test: "price_1PPPRuP3PzZi6quKhk2ypHIG",
        production: "",
        pagesPerPdf: 100, // Add this property
      },
    },
  },
];
