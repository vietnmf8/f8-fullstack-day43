import { useState } from "react";

function useFormValues(initialValues = {}) {
    /* Form State */
    const [formValues, setFormValues] = useState(initialValues);

    function setFieldValue(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    return [formValues, setFieldValue];
}

export default useFormValues;
