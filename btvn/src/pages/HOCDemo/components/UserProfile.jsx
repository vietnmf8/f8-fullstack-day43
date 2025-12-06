import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import withLoading from "@/hoc/withLoading";
import { useMeQuery } from "@/services/auth";
import React from "react";

const UserProfile = withLoading(() => {
    const { data: user } = useMeQuery();
     return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin người dùng</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Mã định danh:</strong> {user.id}</p>
                <p><strong>Họ tên:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </CardContent>
        </Card>
    );
})

export default UserProfile;
