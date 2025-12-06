import React, { useState } from "react";

/* 3. HOC */
function withCounter(CallbackComponent, initialState) {
    /* hàm được trả ra chính là Higher Order Component */
    const Counter = () => {
        // Lấy ra displayName
        console.log(Counter.displayName);
        CallbackComponent = Counter.displayName

        // Vì là function Component nên dùng được hook
        const [count, setCount] = useState(initialState);
        const handleIncrease = () => setCount(count + 1);
        // Khi trả ra element sẽ gọi hàm Callback
        // hàm Callback ở đây là một Component
        // Truyền props
        return <CallbackComponent count={count} handleIncrease={handleIncrease} />;


    };



    /* Trả ra một component được "ĐỘ" */
    return Counter;
}

/* Nhận vào một component thô */
const RenderProps = withCounter(({ count, handleIncrease }) => {
    return (
        <div>
            <h1 onClick={handleIncrease}>Count is {count}</h1>
        </div>
    );
}, 10);

/* Debugs */
RenderProps.displayName = "RenderProps"

/* 
Hãy tưởng tượng HOC giống như bộ giáp Iron Man. Tony Stark là Component, bộ giáp là HOC. Khi Tony chui vào bộ giáp, anh ta vẫn là Tony, nhưng có thêm khả năng bay và bắn tia laser.
*/

export default RenderProps;
