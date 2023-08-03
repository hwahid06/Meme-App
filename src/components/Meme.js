import React from "react"

const Meme = ({ name, url }) => {

    return (
			<div className='meme-card h-100'>
				<img src={url} className='card-img-top' alt={name} />
				<div className="card-body">
					<h5 className='card-title'>{name}</h5>
				</div>
			</div>
		)

}

export default Meme