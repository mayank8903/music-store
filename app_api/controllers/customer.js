var mongoose = require('mongoose');
var Customer = mongoose.model('customers');


const getCustomer = function (req, res) {
    Customer.find().exec(function (err, data){
      if(err){
        res
            .status(404)
            .json(err)
          return;
      }
      res
        .status(200)
        .json(data)
    });
  };
  const createCustomer = function (req, res) {
    Customer.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      contact_no: req.body.contact_no,
      email: req.body.email,
      location: req.body.location
    }, (err, data) => {
      console.log("data : ", data);
      if(err) {
        res
          .status(400)
          .json(err)
      }else{
        res
          .status(201)
          .json(data)
      }
    })
  };
  const getSingleCustomer = function (req, res) {
    if(!req.params.custid){
      res
        .status(404)
        .json({
          "message": "Not found, custid is required"
        });
        return;
    }
    Customer.findById(req.params.custid)
      .exec((err, data) => {
        if(!data) {
          res
                  .json(404)
                  .status({
                      "message": "customer data not found"
                  });
        }
      else if(err) {
      res
        .status(400)
        .json(err);
        return;
      }
      else {
      res
        .status(200)
        .json(data)
    }
  });
  };
  const updateCustomer = function (req, res) {
    if (!req.params.custid){
      res
          .status(404)
          .json({
              "message": "Not found, custid is required"
          });
  return;
  }
  Customer.findById(req.params.custid)
      .exec((err, data) => {
          if (!data) {
              res
                  .json(404)
                  .status({
                      "message": "customer data not found"
                  });
          }else if (err){
              res
                  .status(400)
                  .json(err);
                  return;
          }
          data.first_name = req.body.first_name;
          data.last_name = req.body.last_name;
          data.contact_no = req.body.contact_no;
          data.email = req.body.email;
          data.location = req.body.location;
          data.save((err, data) => {
              if (err) {
                  res
                      .status(404)
                      .json(err);
              } else {
                  res
                      .status(200)
                      .json(data)
              }
          });
      });
  };
  const deleteCustomer = function (req, res) {
    const custid = req.params.custid;
  
    if (custid) {
        Customer
            .findByIdAndRemove(custid)
            .exec((err, data) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res 
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({"message" : "No custid"});
  
    }
  };
  module.exports = {
    getCustomer,
    createCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
  };