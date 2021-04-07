import { useState } from 'react';

export const useForm = intitialValues => {
    const [values, setValues] = useState(intitialValues);

    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
}