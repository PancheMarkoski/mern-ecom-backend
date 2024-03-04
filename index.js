const dotenv = require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const PORT = process.env.PORT || 4000;
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const productCategoryRoute = require("./routes/productCategoryRoute");
const blogCategoryRoute = require("./routes/blogCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const colorRoute = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const bodyParser = require("body-parser");
const uploadRouter = require("./routes/uploadRoute");

const { errorHandler, notFound } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/prodcategory", productCategoryRoute);
app.use("/api/blogcategory", blogCategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/color", colorRoute);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);

// After all routes
app.use(notFound); // Catch-all for unmatched routes
app.use(errorHandler); // Error handling

app.listen(PORT, () => {
  console.log(`SERVER is running at PORT ${PORT}`);
});
