require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// GET all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurants = await db.query(
      "SELECT * FROM restaurants left join (select restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "success",
      results: restaurants.rows.length,
      data: restaurants.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// GET a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants left join (select restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * from reviews where restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (name, review, rating, restaurant_id) values($1,$2,$3,$4) returning *",
      [req.body.name, req.body.review, req.body.rating, req.params.id]
    );

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// CREATE a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurant = await db.query(
      "INSERT INTO restaurants (name,location,price_range) values($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success",
      data: restaurant.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(restaurant);
    res.status(200).json({
      status: "success",
      data: restaurant.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// DELETE restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE from reviews where restaurant_id = $1", [
      req.params.id,
    ]);
    await db.query("DELETE from restaurants where id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app is litening on port ${port}`);
});
