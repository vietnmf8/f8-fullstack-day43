import React, { useState } from "react";
import UserProfile from "./components/UserProfile";
import ProductList from "./components/ProductList";
import { Button } from "@/components/ui/button";

const HOCDemo = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true);

    return (
        <div className="space-y-8 p-8">
            <h1 className="text-center text-3xl font-bold">
                {" "}
                Higher Order Component
            </h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/*  User */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">User Profile</h2>
                        <Button
                            variant="outline"
                            onClick={() => setUserLoading(!userLoading)}
                        >
                            Toggle User Loading
                        </Button>
                    </div>
                    {/* Truyền prop isLoading vào, HOC sẽ xử lý nó */}
                    <UserProfile isLoading={userLoading} />
                </div>

                {/* Product */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            2. Product List
                        </h2>
                        <Button
                            variant="outline"
                            onClick={() => setProductLoading(!productLoading)}
                        >
                            Toggle Product Loading
                        </Button>
                    </div>
                    <ProductList isLoading={productLoading} />
                </div>
            </div>
        </div>
    );
};

export default HOCDemo;
