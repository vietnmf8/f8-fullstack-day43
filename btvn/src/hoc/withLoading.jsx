import PropTypes from "prop-types";
import React from "react";

function withLoading(WrappedComponent) {
    function Component({ isLoading, ...props }) {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center rounded-md bg-gray-100 p-4">
                    <span className="animate-pulse font-medium text-blue-600">
                        Đang tải dữ liệu...
                    </span>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    }

    
    /* PropTypes */
    Component.propTypes = {
        isLoading: PropTypes.bool.isRequired,
    };

    return Component;
}

export default withLoading;
