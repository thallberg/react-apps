import React from 'react'

interface TextAreaProps {
    label?: string;
    placeholderText?: string;
    isResizable: boolean;
    isDisabled: boolean;
    className?: string;
}

export const TextArea = (props: TextAreaProps) => {
    const isResize = props.isResizable ? 'resize' : 'resize-none'

    return (
        <form action="" className=''>
            <label htmlFor="" className='flex flex-col mb-1'>{props.label}</label>
            <textarea
                placeholder={props.placeholderText}
                disabled={props.isDisabled}
                className={`text-gray-500 border-2 border-gray-300 focus:outline-none w-1/3 h-24 rounded-sm p-1 ${isResize} ${props.className}`}
            >
            </textarea>
        </form>
    )
}




// ` border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-300 focus:ring-offset-1 p-2