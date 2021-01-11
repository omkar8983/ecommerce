import asyncHandler from 'express-async-handler'
import otpGenerator from 'otp-generator'
// import moment from 'moment'
import BulkOrder from '../models/bulkOrderModel.js'
import Product from '../models/productModel.js'
import pkg from 'node-libcurl';
const { curly } = pkg;

const sendOtp = (otp, mobile_number,username) => {
  const { statusCode, data, headers } =
  curly.get(`http://jskbulkmarketing.in/app/smsapi/index.php?key=45FEAD8F4ED2EB&routeid=569&type=text&contacts=${mobile_number}&senderid=OALERT&msg=Hello+${username},+your+otp+for+verification+is+${otp}`)
}


const storeBulkOrder = asyncHandler(async (req, res) => {
    const OTP = otpGenerator.generate(6,
        { digits: true, alphabets: false, specialChars: false, upperCase: false }
    );
    const product_details = await Product.findById(req.body.product_id);
    const bulkOrder = await BulkOrder.create({
        name: req.body.name,
        company_shop_name: req.body.cmpName,
        city: req.body.city,
        mobile_number: req.body.mobileNumber,
        qty: req.body.qty,
        otp: OTP,
        product: product_details
    });
    if (bulkOrder) {
        sendOtp(OTP,req.body.mobileNumber,req.body.name);
        return res.status(200).json({
            result: bulkOrder._id,
        });
    } else {
        return res.status(400).json({
            result: false,
        });
    }

});


const verifyotp = asyncHandler(async (req, res) => {

    const order = await BulkOrder.findOne({ otp: req.body.otp })
    if (order) {
        order.verified = true;

        await order.save();
        return res.status(200).json({
            result: true,
        });
    } else {
        return res.status(400).json({
            result: false,
        });
    }
});

const bulkorderlist = asyncHandler(async (req, res) => {
    const orders = await BulkOrder.find();
    if(orders){
      const order_list=[];
      for(let order of orders) {
        var created_at = new Date(orders.createdAt);
        order_list.push(
          {
            id : order._id,
            name : order.name,
            company_name : order.company_shop_name,
            city: order.city,
            mobile: order.mobile_number,
            verified: order.verified,
            product_price: order.product.price,
            product_name: order.product.name,
            qty: order.qty,
            // created_at : moment(orders.createdAt).format('MM/DD/YYYY');
          }
        )
      }

      return res.status(200).json({result:true,data: order_list})
    }else{
      return res.status(400).json({result:false, message:'No record found'})
    }
    // if (order) {
    //     order.verified = true;
    //
    //     await order.save();
    //     return res.status(200).json({
    //         result: true,
    //     });
    // } else {
    //     return res.status(400).json({
    //         result: false,
    //     });
    // }
});

export {
    storeBulkOrder,
    verifyotp,
    bulkorderlist
};
