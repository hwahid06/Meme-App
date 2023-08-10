import React, { useState, useEffect } from 'react'
import fetchMemes from './API'
import Meme from './Meme'
import Pagination from './Pagination'
import { Spinner } from 'react-bootstrap'

const MemeSearch = () => {
	const [searchTerm, setSearchTerm] = useState('') //search term state
	const [meme, setMeme] = useState([]) //array of memes fetched from api
	const [apiError, setApiError] = useState(false) //tracks api error during fetch
	const [currentPage, setCurrentPage] = useState(1) //state for current page
	const memesPerPage = 24 //# of memes per page to display
	const [loading, setLoading] = useState(true) //state for spinner
	const [filteredMeme, setFilteredMeme] = useState([]) // New state for filtered memes

	useEffect(() => {
		fetchMemes()
			.then((meme) => {
				setMeme(meme)
				setApiError(false)
				setLoading(false)
			})
			.catch((error) => {
				setApiError(true)
				setLoading(false)
			})
	}, [])

	useEffect(() => {
		// Filter memes based on search term
		const filtered = meme.filter((meme) =>
			meme.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredMeme(filtered)
		setCurrentPage(1) // Reset current page when search term changes
	}, [searchTerm, meme])

	// Calculate the starting and ending index of memes for current page
	const indexOfLastMeme = currentPage * memesPerPage
	const indexOfFirstMeme = indexOfLastMeme - memesPerPage
	const currentMemes = filteredMeme.slice(indexOfFirstMeme, indexOfLastMeme)

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => prevPage - 1)
	}

	const goToNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1)
	}

	const renderMemesOrMessage = () => {
		if (apiError) {
			return (
				<p>Oops! There was a problem fetching memes. Please try again later.</p>
			)
		} else {
			if (filteredMeme.length === 0) {
				return <p>No memes found. Try searching with different keywords.</p>
			} else {
				return (
					<div className='row'>
						{currentMemes.map((meme) => (
							<div key={meme.id} className='col-sm-6 col-md-4 col-lg-3 mb-3'>
								<Meme id={meme.id} name={meme.name} url={meme.url} />
							</div>
						))}
					</div>
				)
			}
		}
	}

	return (
		<div className='meme-container'>
			<nav className='navbar navbar-dark bg-dark'>
				<a
					className='navbar-brand ms-3'
					href='/Users/hamwah/Downloads/web-dev/projects/meme-search-app/src/App.js'>
					{' '}
					Meme App{' '}
				</a>
				<form className='form-inline' onSubmit={(e) => e.preventDefault()}>
					<div className='input-group'>
						<input
							type='search'
							className='form-control me-3'
							placeholder='Search Memes'
							aria-label='Search'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<div className='input-group-append'></div>
					</div>
				</form>
			</nav>
			<div className='container mt-4'>
				<h2 className='text-center'>Welcome to Meme App</h2>
				<p className='text-center'>Find and explore memes that you'll love!</p>
				{loading && (
					<div className='text-center'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				)}
				{/* Calling the renderMemesOrMessage function to render the appropriate content */}
				{!loading && renderMemesOrMessage()}
			</div>
			<div className='text-center'>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(filteredMeme.length / memesPerPage)}
					goToPreviousPage={goToPreviousPage}
					goToNextPage={goToNextPage}
				/>
			</div>
		</div>
	)
}

export default MemeSearch
