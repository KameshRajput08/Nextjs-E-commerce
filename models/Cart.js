import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        cartItems: [],
        shippingAddress: {},
        PaymentMethod: ''
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;
