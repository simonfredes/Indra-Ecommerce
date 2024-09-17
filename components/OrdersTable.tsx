// components/OrdersTable.tsx
import { fetchOrders } from "@/app/bd/data";
import Link from "next/link";

export async function OrdersTable() {
  const orders: any[] = await fetchOrders();

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 px-4 py-2">{order.id}</td>
              <td className="border border-gray-300 px-4 py-2">{order.email}</td>
              <td className="border border-gray-300 px-4 py-2">{order.status ? 'Completed' : 'Pending'}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.items.map((item:any) => (
                  <div key={item.id}>
                    Product ID: {item.idproduct}, Amount: {item.amount}, Price: {item.price}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
