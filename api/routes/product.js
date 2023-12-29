// const Product = require("../models/Product");
// const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("./verifyToken");

// const router = require("express").Router();

// // CREATE PRODUCT

// router.post("/", verifyTokenAndAdmin, async (req, res) => {
//   const newProduct = new Product(req.body);

//   try {
//     const savedProduct = await newProduct.save();
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // UPDATE PRODUCT
// // UPDATE PRODUCT
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body, // Ensure that req.body contains the necessary properties, including 'title'
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// // DELETE PRODUCT
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // GET PRODUCT

// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL PRODUCTS
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;

//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(2);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;


// Product Routes (routes/product.js)
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// In your backend route (routes/product.js)
router.get("/wishlist/:userId", async (req, res) => {
  try {
    const wishlist = await Product.find({ wishlist: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/wishlist/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.wishlist.includes(req.user.id)) {
      product.wishlist.push(req.user.id);
      await product.save();
      res.status(200).json({ message: "Product added to wishlist" });
    } else {
      res.status(400).json({ message: "Product already in wishlist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/wishlist/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user's ID is in the wishlist array
    if (product.wishlist.includes(req.user.id)) {
      // Remove the user's ID from the wishlist
      product.wishlist = product.wishlist.filter(userId => userId !== req.user.id);

      // Save the updated product
      await product.save();

      res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      res.status(400).json({ message: "Product not in wishlist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
        { desc: { $regex: query, $options: "i" } },  // Case-insensitive description search
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;