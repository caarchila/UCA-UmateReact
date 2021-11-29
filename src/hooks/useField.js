import { useState } from 'react'

export function useField({ placeholder, type = 'text'}){
    const [value, setValue] = useState('')

    const onChange = ({ target }) => {
        setValue(target.value)
    }

    const onReset = () => setValue('')

    return {
        type, 
        placeholder,
        reset: onReset,
        onChange,
        value
    }
}