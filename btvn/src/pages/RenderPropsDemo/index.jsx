import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DataFetcher from "@/components/DataFetcher";

const RenderPropsDemo = () => {
    return (
        <div className="space-y-8 p-8">
            <h1 className="text-center text-3xl font-bold">
                Demo Render Props
            </h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Lấy danh sách bài viết */}
                <Card>
                    <CardHeader>
                        <CardTitle>Posts List </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataFetcher url="https://jsonplaceholder.typicode.com/posts?_limit=5">
                            {({ data, loading, error }) => {
                                if (loading)
                                    return (
                                        <div className="text-blue-500">
                                            Loading posts...
                                        </div>
                                    );
                                if (error)
                                    return (
                                        <div className="text-red-500">
                                            Error: {error}
                                        </div>
                                    );

                                return (
                                    <ul className="list-inside list-disc space-y-2">
                                        {data &&
                                            data.map((post) => (
                                                <li
                                                    key={post.id}
                                                    className="text-sm text-gray-700"
                                                >
                                                    {post.title}
                                                </li>
                                            ))}
                                    </ul>
                                );
                            }}
                        </DataFetcher>
                    </CardContent>
                </Card>

                {/* Lấy danh sách người dùng */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataFetcher url="https://jsonplaceholder.typicode.com/users?_limit=3">
                            {({ data, loading, error }) => {
                                if (loading)
                                    return (
                                        <div className="text-green-500">
                                            Loading users...
                                        </div>
                                    );
                                if (error)
                                    return (
                                        <div className="text-red-500">
                                            Error: {error}
                                        </div>
                                    );
                                return (
                                    <div className="space-y-3">
                                        {data &&
                                            data.map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="rounded border bg-gray-50 p-3"
                                                >
                                                    <p className="font-bold">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                );
                            }}
                        </DataFetcher>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RenderPropsDemo;
