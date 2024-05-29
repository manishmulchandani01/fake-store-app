import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenTitle } from "../components/ScreenTitle";
import CartRow from "../components/CartRow";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { fetchOrders, updateOrder } from "../../services/orderService";
import { fillOrders } from "../../datamodel/redux/orderSlice";

export const Order = () => {
    const token = useSelector((state) => state?.auth?.user?.token);
    const orders = useSelector((state) => state?.order?.orders);

    const dispatch = useDispatch();

    const [showUnpaid, setShowUnpaid] = useState(false);
    const [showPaid, setShowPaid] = useState(false);
    const [showDelivered, setShowDelivered] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const unpaidOrders = orders.filter((order) => order.is_paid != 1);
    const paidOrders = orders.filter(
        (order) => order.is_paid == 1 && order.is_delivered != 1
    );
    const deliveredOrders = orders.filter((order) => order.is_delivered == 1);

    const toggleExpandOrder = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const restoreOrders = async (token) => {
        const data = await fetchOrders(token);
        if (data.status === "OK") {
            dispatch(fillOrders({ orders: data.orders }));
        } else {
            Alert.alert(data.message);
        }
    };

    const hideAllDropdowns = () => {
        setShowUnpaid(false);
        setShowPaid(false);
        setShowDelivered(false);
        setExpandedOrderId(null);
    };

    const updateOrderHandler = async (orderId, isPaid, isDelivered) => {
        if (orderId) {
            const data = await updateOrder(token, {
                orderID: orderId,
                isPaid: isPaid,
                isDelivered: isDelivered,
            });
            if (data.status === "OK") {
                await restoreOrders(token);
                Alert.alert("Order is paid.");
                hideAllDropdowns();
            } else {
                Alert.alert(data.message);
            }
        }
    };
    const renderOrderItem = ({ item }) => {
        const orderItems = JSON.parse(item.order_items);
        return (
            <View>
                <TouchableOpacity
                    onPress={() => toggleExpandOrder(item.id)}
                    style={styles.orderItem}
                >
                    <Text>Order ID: {item.id}</Text>
                    <Text>Items: {item.item_numbers}</Text>
                    <View style={styles.rowAndJustified}>
                        <Text>
                            Total: ${(item.total_price / 100).toFixed(2)}
                        </Text>
                        {expandedOrderId === item.id ? (
                            <Ionicons
                                name="caret-up-outline"
                                color={"red"}
                                size={"24"}
                            />
                        ) : (
                            <Ionicons
                                name="caret-down-outline"
                                color={"green"}
                                size={"24"}
                            />
                        )}
                    </View>
                </TouchableOpacity>
                {expandedOrderId === item.id && (
                    <View>
                        <FlatList
                            data={orderItems}
                            keyExtractor={(orderedItem) =>
                                orderedItem.prodID.toString()
                            }
                            renderItem={({ item }) => (
                                <CartRow
                                    id={item.prodID}
                                    displayOnly={true}
                                    quantity={item.quantity}
                                />
                            )}
                        />
                        <View style={{ marginBottom: 10 }}>
                            {item.is_paid === 0 && (
                                <Button
                                    onPress={() =>
                                        updateOrderHandler(
                                            item.id,
                                            1,
                                            item.is_delivered
                                        )
                                    }
                                >
                                    Pay
                                </Button>
                            )}
                            {item.is_paid === 1 && item.is_delivered === 0 && (
                                <Button
                                    onPress={() =>
                                        updateOrderHandler(
                                            item.id,
                                            item.is_paid,
                                            1
                                        )
                                    }
                                >
                                    Receive
                                </Button>
                            )}
                        </View>
                    </View>
                )}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <ScreenTitle label={"My Orders"}></ScreenTitle>
            {orders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You have no orders</Text>
                </View>
            ) : (
                <View style={styles.detailContainer}>
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => setShowUnpaid(!showUnpaid)}
                    >
                        <Text style={styles.headerText}>
                            New Orders: {unpaidOrders.length}
                        </Text>
                        {showUnpaid ? (
                            <Ionicons
                                name="caret-up-outline"
                                color={"red"}
                                size={"24"}
                            />
                        ) : (
                            <Ionicons
                                name="caret-down-outline"
                                color={"green"}
                                size={"24"}
                            />
                        )}
                    </TouchableOpacity>
                    {showUnpaid && unpaidOrders.length > 0 && (
                        <FlatList
                            data={unpaidOrders}
                            keyExtractor={(order) => order.id.toString()}
                            renderItem={renderOrderItem}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => setShowPaid(!showPaid)}
                    >
                        <Text style={styles.headerText}>
                            Paid Orders: {paidOrders.length}
                        </Text>
                        {showPaid ? (
                            <Ionicons
                                name="caret-up-outline"
                                color={"red"}
                                size={"24"}
                            />
                        ) : (
                            <Ionicons
                                name="caret-down-outline"
                                color={"green"}
                                size={"24"}
                            />
                        )}
                    </TouchableOpacity>
                    {showPaid && paidOrders.length > 0 && (
                        <FlatList
                            data={paidOrders}
                            keyExtractor={(order) => order.id.toString()}
                            renderItem={renderOrderItem}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => setShowDelivered(!showDelivered)}
                    >
                        <Text style={styles.headerText}>
                            Delivered Orders: {deliveredOrders.length}
                        </Text>
                        {showDelivered ? (
                            <Ionicons
                                name="caret-up-outline"
                                color={"red"}
                                size={"24"}
                            />
                        ) : (
                            <Ionicons
                                name="caret-down-outline"
                                color={"green"}
                                size={"24"}
                            />
                        )}
                    </TouchableOpacity>
                    {showDelivered && deliveredOrders.length > 0 && (
                        <FlatList
                            data={deliveredOrders}
                            keyExtractor={(order) => order.id.toString()}
                            renderItem={renderOrderItem}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 100,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 18,
    },
    detailContainer: {
        width: "90%",
        paddingVertical: 20,
        gap: 20,
    },
    header: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        backgroundColor: "#00A2CF",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    orderItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowAndJustified: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
