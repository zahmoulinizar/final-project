const express = require("express");
const cloudinary = require("../midellwaires/cloudinary");
const Product = require("../models/Product");
const router = express.Router();

// create product
// http://localhost:5500/product/add-product
router.post("/newProd", async (req, res) => {
  const { name, brand, desc, price, image } = req.body;
  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "online-shop",
      });
      if (uploadRes) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          image: {
            url: uploadRes.secure_url,
            public_id: uploadRes.public_id,
          },
        });
        const productRes = await product.save();
        res.status(201).json(productRes);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// getting single product
// http://localhost:5500/product/getProd/
router.get("/getProd/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// getting all product
// http://localhost:5500/product/all-products

router.get("/allProd", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete product
// http://localhost:5500/product/delete/:id
   router.delete('/delete/:id', async(req,res)=>{
    try {
        await Product.deleteOne({
            _id:req.params.id
        })
        res.status(200).json({message:'product deleted with success'})
      } catch (error) {
        res.status(500).json({message:error.message})
      }
} )


module.exports = router;
