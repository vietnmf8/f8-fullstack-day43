import React from "react";
import withLoading from "@/hoc/withLoading";

const ProductList = withLoading(() => {
    const products = [
        "Laptop Gaming",
        "Điện thoại iPhone",
        "Máy tính bảng iPad",
        "Tai nghe Sony",
    ];

    return (
        <div className="rounded-md border p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-bold">Danh sách sản phẩm</h3>
            <ul className="list-inside list-disc space-y-1">
                {products.map((item, index) => (
                    <li key={index} className="text-gray-700">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ProductList;
