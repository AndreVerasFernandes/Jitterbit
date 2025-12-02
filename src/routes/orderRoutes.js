import express from "express";
import { 
    createOrder,
    getOrder,
    listOrders,
    updateOrder,
    deleteOrder
} from "../controllers/orderController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Todas as rotas deste router requerem autenticação
router.use(auth);

router.post("/order", createOrder);
router.get("/order/list", listOrders);
router.get("/order/:orderId", getOrder);
router.put("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);

export default router;