import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";


export const OrderData = async (req, res) => {
    const order = req.body;

    try {
        const orderInfo = await Order.create(order);
        console.log("Order Created", orderInfo);
        const userId = orderInfo?.userId;
        const courseId = orderInfo?.courseId;
        res.status(201).json({ message: "Order Details", orderInfo });
        if (orderInfo) {
            await Purchase.create({ userId, courseId });
        }

    } catch (error) {
        console.error("Error in OrderData:", error);
        res.status(500).json({ errors: "Error in order certaion" });
    }
}