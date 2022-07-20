const { Product } = require("../db/models");

// index = (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     result: {
//       message: "Welcome, server is running",
//     },
//     error: {},
//   });
// };
showData = (req, res) => {
  Product.findAll()
    .then((data) => {
      return res.status(200).json({
        status: "OK",
        result: data,
        error: {},
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "OK",
        result: {},
        error: {
          message: error.message,
        },
      });
    });
};

showDataById = (req, res) => {
  const prodID = req.params.id;
  try {
    Product.findOne({ where: { id: prodID } }).then((data) => {
      if (!data) {
        return res.status(404).json({
          status: "FAILED",
          result: {
            message: `Product with ID ${prodID} Not Found !`,
          },
          error: {},
        });
      }
      return res.status(200).json({
        status: "OK",
        result: data,
        error: {},
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      result: {},
      error: {
        message: error.message,
      },
    });
  }
};
createData = (req, res) => {
  try {
    Product.create(req.body).then((data) => {
      return res.status(201).json({
        status: "OK",
        result: data,
        error: {},
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      result: {},
      error: {
        message: error.message,
      },
    });
  }
};
updateData = (req, res) => {
  const prodID = req.params.id;
  Product.findOne({ where: { id: prodID } })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: "FAILED",
          result: {
            message: `Data with ${prodID} not found`,
          },
          error: {},
        });
      }
      Product.update(req.body, {
        where: { id: prodID },
        returning: true,
        plain: true,
      }).then((data) => {
        console.log(data);
        return res.status(201).json({
          status: "OK",
          result: data[1].dataValues,
          error: {},
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "ERROR",
        result: {},
        error: {
          message: error.message,
        },
      });
    });
};
deleteDataById = (req, res) => {
  const prodID = req.params.id;
  Product.findOne({ where: { id: prodID } })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: "FAILED",
          result: {
            message: `Data with ${prodID} not found`,
          },
          error: {},
        });
      }
      Product.destroy({ where: { id: prodID } }).then(() => {
        return res.status(200).json({
          status: "OK",
          result: {
            message: `${prodID} deleted`,
          },
          error: {},
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "ERROR",
        result: {},
        error: {
          message: error.message,
        },
      });
    });
};

const product = {
  // index,
  showData,
  showDataById,
  createData,
  updateData,
  deleteDataById,
};
module.exports = product;
