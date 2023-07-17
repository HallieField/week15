import React from 'react'

const PokemonImage = ({id, name, image, type, onRemove }) => {
    return (
        <div className='image-container'>
            <div className='number'>
            </div>
            <img src={image} alt={name} width={350} height={200} className='pokemon-image'/>
            <div className='detail-wrapper'>
                <h3>{name}</h3>
                <small>Type: {type}</small> <br></br>
                <small>{id}</small> <br></br>
                <button className='remove-button' onClick={() => onRemove(id)}>Remove</button>
            </div>
        </div>
    )
}

export default PokemonImage;
