import React from 'react'

const Button = ({name, image, handleClick}) => {
    return (
        <button onClick={handleClick} className='flex items-center gap-1 mt-5 px-3 py-2 bg-gray-300 rounded'>
            <img src={image} alt={name} />
            <p>{name}</p>
        </button>
    )
}

export default Button;