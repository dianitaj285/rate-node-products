const express = require("express");
const app = express();
const port = 3000;

const data = require("./data.json");

app.get("/", (req, res) => {
  //Get list of product order by title

  const productsByTitle = data
    .map((product) => product.title)
    .sort((a, b) => a.title - b.title);

  res.status(200).send(productsByTitle);
});

app.get("/categories", (req, res) => {
  //Get list of products categories

  const productsByCategory = data.map((product) => product.category);

  res.status(200).send(productsByCategory);
});

app.get("/top-ten", (req, res) => {
  //Get top 10 products base on the price

  const topTen = data.sort((a, b) => a.price - b.price).slice(0, 10);

  res.status(200).send(topTen);
});

app.get("/top-rate", (req, res) => {
  //Get top product category withe the rate and count highest

  const topRate = data
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 1);

  res.status(200).send(topRate);
});

app.get("/top-high-low", (req, res) => {
  //Get the cheapest and expensive product

  const productsExpensive = Math.max(...data.map((o) => o.price));
  const productsCheapest = Math.min(...data.map((o) => o.price));

  res.status(200).send({ productsExpensive, productsCheapest });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
