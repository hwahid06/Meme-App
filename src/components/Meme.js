import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"

const Meme = ({ name, url }) => {

    const [showModal, setShowModal] = useState(false);
    const [text0, setText0] = useState('');
    const [text1, setText1] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleCustomize = () => {
        
        //code for API call goes here
        
        console.log(text0);
        console.log(text1);
        handleClose();
    };

return (
	<div className='meme-card h-100'>
		<img src={url} className='card-img-top' alt={name} />
		<div className='card-body'>
			<h5 className='card-title'>{name}</h5>
		</div>
		<>
			<div className='mt-2'>
				<Button variant='dark' onClick={handleShow}>
					Customize Meme
				</Button>
			</div>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<img src={url} alt={name} style={{ width: '100%' }} />
					<div className='mt-2'>
						<input
							type='text'
							value={text0}
							onChange={(e) => setText0(e.target.value)}
							placeholder='Phrase 1'
						/>
					</div>
					<div className='mt-2'>
						<input
							type='text'
							value={text1}
							onChange={(e) => setText1(e.target.value)}
							placeholder='Phrase 2'
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='dark' onClick={handleClose}>
						Close
					</Button>
					<Button variant='dark' onClick={handleCustomize}>
						Edit now
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	</div>
)

}

export default Meme