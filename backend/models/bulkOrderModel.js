import mongoose from "mongoose";

const bulkOrderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company_shop_name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        default: 0,
    },
    mobile_number: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    product:{
      type:Object,
      required:true
    }
})

const BulkOrder = mongoose.model("Bulk_Order", bulkOrderSchema);

export default BulkOrder;
