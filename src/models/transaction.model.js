const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Transaction must be associated with a user"],
        index: true
    },
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Transaction must be associated with a from account"],
        index: true
  },
   toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true,"Transaction must be associated with a to account"],
        index: true
    },
    status:{
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED',"REVERSED"],
        required: [true, "Transaction must have a status"],
        default: 'PENDING'
    },
    amount:{
        type: Number,
        required: [true, "Transaction must have an amount"],
        min: [0, "Transaction amount must be positive"]
    },
    idempotencyKey:{
        type: String,
        required: [true, "Transaction must have an idempotency key"],
        index: true,
        unique: true
    }
},{    
    timestamps: true

});

const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
