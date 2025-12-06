import { useDevicesQuery, useMeQuery } from "@/services/auth";
import { useCreateProductMutation } from "@/services/product";
import React from "react";

function Home() {
    // Xử lý loading
    // const { isLoading, data: productData } = useGetProductsQuery();
    const [createProduct] = useCreateProductMutation();
    const { isSuccess, data: currentUser } = useMeQuery();
    const { data: devices } = useDevicesQuery();

    const handleCreateProduct = () => {
        createProduct({ title: "New Product" });
    };

    return (
        <div>
            {isSuccess && <h2>Xin chào {currentUser.firstName}</h2>}
            <button onClick={handleCreateProduct}>Create New Product</button>
            <h1>Product List</h1>
            {/* <ul>
                {isLoading ? (
                    <div>Loading</div>
                ) : (
                    productData.items.map((product) => (
                        <li key={product.id}>
                            {product.id}.{product.title}
                        </li>
                    ))
                )}
            </ul> */}
        </div>
    );
}

export default Home;
