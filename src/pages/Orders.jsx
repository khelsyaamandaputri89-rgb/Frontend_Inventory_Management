import React, { useEffect, useState } from "react"
import orderServices from "../services/orderServices"
import Table from "../components/Table"
import { FiArrowLeft } from "react-icons/fi"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchDataOrder = async () => {
        setLoading(true);
        try {
            const result = await orderServices.getAllOrder()
            setOrders(result.data)
        } catch (error) {
            toast.error("Failed to load orders")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataOrder();
    }, []);

    const handleDeleteOrder = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#CBCBCB',
            confirmButtonText: 'Yes, delete it!',
            background: '#fff',
        })

        if (result.isConfirmed) {
        try {
            const result = await orderServices.deleteOrder(id);
            toast.success(result.data.message)
            fetchDataOrder();
        } catch (error) {
            toast.error("Failed to delete order")
        }
      }
    }

    const handleSearch = async (keyword) => {
        try {
            setSearch(keyword)
                if (keyword.trim() === "") {
                    fetchDataOrder()
                    return
                } 
            const result = await orderServices.searchOrder(keyword)
            setOrders(result.data)
            console.log(result.data)
        } catch (error) {
            toast.error("Search failed")
        }
    }

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "User", accessor: "user" },
        { header: "Items", accessor: "items", render: (items) => Array.isArray(items) ? items.map(i => (typeof i === "string" ? i : i.name)).join(", ") : "-" },
        { header: "Category", accessor: "categories" },
        { header: "Quantity", accessor: "totalQty" },
        { header: "Total Price", accessor: "totalPrice", render: (price) => `Rp ${Number(price  ).toLocaleString("id-ID")}` },
        { 
        header: "Status", 
        accessor: "status",
            render: (status) => (
                <span
                className={`${
                    status === "completed"
                    ? "text-green-400"
                    : status === "cancelled"
                    ? "text-red-500"
                    : "text-yellow-500"
                } font-medium`}
                >
                {status}
                </span>
            )
        },
        { 
        header: "Date", 
        accessor: "createdAt",
        render: (createdAt) => 
            createdAt 
              ? new Date(createdAt).toLocaleString("id-ID", { 
                  dateStyle: "medium", 
                  timeStyle: "short", 
                  timeZone: "Asia/Jakarta" 
                }) 
              : "-"
        },
    ]

    useEffect(() => {
        const autoUpdateOrders = async () => {
            try {
                const result = await orderServices.getAllOrder()
                const ordersData = result.data
        
                for (const order of ordersData) {
                    if (!order.createdAt) continue
        
                    const created = new Date(order.createdAt)
                    const now = new Date()
                    const diffHours = (now - created) / (1000 * 60 * 60)
        
                    if (diffHours >= 24 && order.status === "pending") {
                    await orderServices.updateOrdersStatus(order.id, "completed")
                    console.log(`✅ Order #${order.id} otomatis jadi completed`)
                    }
                }
        
                await fetchDataOrder()
            } catch (err) {
              console.error("Gagal auto update orders:", err)
            }
          }
    
        autoUpdateOrders()
    }, [])

    return (
        <div className="p-6 pt-1">
        <div className="ml-64 px-2 py-1">
            <div 
                onClick={() => window.history.back()} 
                className="flex items-center text-red-800 cursor-pointer mb-2"
                >
                <FiArrowLeft className="mr-2" /> Back
            </div>
            <h1 className="text-2xl font-bold mb-4 mt-8">Orders</h1>
        </div>

        {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        )}

            <Table
            columns={columns}
            data={orders}
            onDelete={handleDeleteOrder}
            onSearch={handleSearch}
            />
        </div>
    )
}

export default Order