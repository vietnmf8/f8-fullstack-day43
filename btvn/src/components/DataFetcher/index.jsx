import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const DataFetcher = ({ url, children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setData(null);

        const fetchData = async () => {
            try {
                const response = await axios(url);
                setData(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return children({ data, loading, error });
};

DataFetcher.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
};

export default DataFetcher;
