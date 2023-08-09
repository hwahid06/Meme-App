import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { saveAs } from "file-saver";

const Meme = ({ name, url, id }) => {

    const [showModal, setShowModal] = useState(false);//modal state
    const [text0, setText0] = useState('');//phrase 1 for customizing meme
    const [text1, setText1] = useState('');//phrase 2 for customizing mem
	const [editedUrl, setEditedUrl] = useState(url);//url for custom meme
	const [customMemeUrl, setCustomMemeUrl] = useState(null);//url for downloading meme

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

	//function to save custom meme URL from API Post req
	const generateCustomizedImageUrl = (templateUrl, text0, text1) => {
		return `${templateUrl}?text0=${text0}&text1=${text1}`
	}

	//function & form for Post API req
	const handleCustomize = () => {
		const formData = new FormData();

		formData.append('template_id', id)
		formData.append('username', 'hwahid06')
		formData.append('password', 'Moto1234')
		formData.append('text0', text0)
		formData.append('text1', text1)

		fetch('https://api.imgflip.com/caption_image', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				if (data.success) {
					const newUrl = generateCustomizedImageUrl(data.data.url, text0, text1);

					setCustomMemeUrl(newUrl);
					setEditedUrl(newUrl);
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	//function for downloading meme
	const handleDownload = () => {
		if (customMemeUrl) {
			saveAs(editedUrl)
		}
	};

    return (
		<div className='meme-card h-100'>
			<img
				src={editedUrl}
				className='card-img-top'
				alt={name}
			/>
			<div className='card-body mt-2'>
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
						
							<img src={editedUrl} alt={name} style={{ width: '100%' }} />
						
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
					<Modal.Footer className="d-flex justify-content-center align-items-center">
						<Button className="modalCloseButton" variant='dark' onClick={handleClose}>
							Close
						</Button>

						<Button className="editButton" variant='dark' onClick={handleCustomize}>
							Apply Customization
						</Button>
						
						<Button className="downloadButton" variant='dark' onClick={handleDownload}>
							Download Meme
						</Button>
						
					</Modal.Footer>
				</Modal>
			</>
		</div>
	)
};

export default Meme