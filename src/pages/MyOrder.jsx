import React, { useEffect, useState } from "react"
import orderServices from "../services/orderServices"
import Table from "../components/Table"
import { FiArrowLeft } from "react-icons/fi"
import toast from "react-hot-toast"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const fetchOrders = async () => {
    setLoading(true);
    try {
        const result = await orderServices.getOrder()
        console.log("Orders to display:", result.data)
        setOrders(result.data)
    } catch (err) {
        console.error("Error fetching my orders:", err)
        toast.error("Failed to load orders")
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [])

  const handleSearch = async (keyword) => {
      try {
        setSearch(keyword)
        if (keyword.trim() === "") {
          fetchOrders()
          return
        } 
          console.log("[handleSearch] calling orderProduct with:", keyword)
          const result = await orderServices.searchOrder(keyword)
          console.log("[handleSearch] response:", result)
          setOrders(result.data)
        } catch (error) {
          console.error("[handleSearch] error:", error)
          toast.error("Search failed")
      }
    }

  const columns = [
        { header: "Order ID", accessor: "id" },
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
          const result = await orderServices.getOrder()
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

          await fetchOrders()
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
        <h1 className="text-2xl font-bold mb-7 mt-8">My Orders</h1>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      )}

        <Table 
        columns={columns}
        data={orders}
        onSearch={handleSearch}
        />

    </div>
  )
}

export default MyOrders;
