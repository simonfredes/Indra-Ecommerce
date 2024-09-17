import { Card } from "@/components/Card";
import { Producto } from "@/models/Producto";
import { fetchProducts, fetchTotalProducts } from "@/app/bd/data";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/SideBar";

const PRODUCTS_PER_PAGE = 9;

export default async function Home({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || '';  const page = parseInt(searchParams?.page || '1', 10);
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const searchTerms = query.toLowerCase().replace(/\+/g, ' ');
  const products = await fetchProducts(PRODUCTS_PER_PAGE, offset);

  const filteredProducts = products.filter((producto) => {
    return producto.name.toLowerCase().includes(searchTerms);
  });

  const totalProducts = await fetchTotalProducts();
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto px-1 py-2">
      {/* Search bar at the top */}
      <div className="mb-4 w-full flex justify-between items-center">
        <Search placeholder="Search products" />
      </div>
      {/* Flex container for Sidebar and Products */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/6 mb-4 lg:mb-0">
          <Sidebar />
        </div>
        {/* Products */}
        <div className="w-full lg:w-5/6">
          <div className="flex flex-wrap justify-center">
            {filteredProducts.map((elemento: Producto) => (
              <Card producto={elemento} key={elemento.id} />
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </div>
  );
}
