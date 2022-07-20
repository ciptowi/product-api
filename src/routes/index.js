const router = require("express").Router();
const { auth } = require("../controllers");
const { product } = require("../controllers");
const restrict = require("../middlewares/restrict");

// router.get("/", product.index);

router.post("/auth/signup", auth.signUp);
router.post("/auth/login", auth.signIn);

router.get("/v1/products", restrict, product.showData);
router.get("/v1/products/:id", restrict, product.showDataById);
router.post("/v1/products", restrict, product.createData);
router.put("/v1/products/:id", restrict, product.updateData);
router.delete("/v1/products/:id", restrict, product.deleteDataById);

router.get("/v2/products", restrict, (req, res) => {
  res.status(200).json({
    message: "Hello there",
  });
});

module.exports = router;
