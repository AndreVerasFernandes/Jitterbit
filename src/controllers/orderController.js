import Order from "../models/order.js";

/**
 * Criação de pedido
 */
export const createOrder = async (req, res) => {
    try {
        const body = req.body;

        // Transformação dos dados
        const mappedOrder = {
            orderId: body.numeroPedido.replace("-01", ""), // remove sufixo
            value: body.valorTotal,
            creationDate: new Date(body.dataCriacao),
            items: body.items.map(i => ({
                productId: Number(i.idItem),
                quantity: i.quantidadeItem,
                price: i.valorItem
            }))
        };

        const order = await Order.create(mappedOrder);

        return res.status(201).json(order);

    } catch (err) {
        return res.status(500).json({ error: "Erro ao criar pedido", details: err.message });
    }
};

/**
 * Buscar pedido por número
 */
export const getOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }

        return res.json(order);

    } catch (err) {
        return res.status(500).json({ error: "Erro ao consultar pedido" });
    }
};

/**
 * Listar todos os pedidos
 */
export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.json(orders);
    } catch (err) {
        return res.status(500).json({ error: "Erro ao listar pedidos" });
    }
};

/**
 * Atualizar pedido por número
 */
export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const body = req.body;

        const mappedOrder = {
            value: body.valorTotal,
            creationDate: new Date(body.dataCriacao),
            items: body.items.map(i => ({
                productId: Number(i.idItem),
                quantity: i.quantidadeItem,
                price: i.valorItem
            }))
        };

        const order = await Order.findOneAndUpdate(
            { orderId },
            mappedOrder,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }

        return res.json(order);

    } catch (err) {
        return res.status(500).json({ error: "Erro ao atualizar pedido" });
    }
};

/**
 * Deletar pedido
 */
export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const result = await Order.findOneAndDelete({ orderId });

        if (!result) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }

        return res.json({ message: "Pedido deletado com sucesso" });

    } catch (err) {
        return res.status(500).json({ error: "Erro ao deletar pedido" });
    }
};