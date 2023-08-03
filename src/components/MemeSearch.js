import React from "react";
import { useState, useEffect } from "react";
import fetchMemes from "./API";
import Meme from "./Meme";
import Pagination from "./Pagination";
import { Spinner } from 'react-bootstrap';


const MemeSearch = () => {
	const [searchTerm, setSearchTerm] = useState('') //state for search term
	const [meme, setMeme] = useState([]) //state for memes
	const [apiError, setApiError] = useState(false) //state to track API call error
    const [currentPage, setCurrentPage] = useState(1);
    const memesPerPage = 24;
    const [loading, setLoading] = useState(true); //state for loading spinner


	useEffect(() => {
		//fetch memes
		fetchMemes()
			.then((meme) => {
				setMeme(meme)
				setApiError(false) //if api succeeds, reset error state
                setLoading(false) //when data loads, spinner is set to false
			})
			.catch((error) => {
				// console.log(error)
				setApiError(true) //if api call fails, set error state to true
                setLoading(false) //if data loads, set loading to false
			})
	}, [])

	//filter memes based on search term
	const filteredMeme = meme.filter((meme) =>
		meme.name.toLowerCase().includes(searchTerm.toLowerCase())
	)
	// console.log(filteredMeme)

    //calculate the starting and ending index of memes for current page
    const indexOfLastMeme = currentPage * memesPerPage;
    const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
    const currentMemes = filteredMeme.slice(indexOfFirstMeme, indexOfLastMeme);

    //function to handle the prev page click
    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    //function to handle the next page click
    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };


	//function to render the appropriate error message or meme list
	const renderMemesOrMessage = () => {
        //check if there is an API error
		if (apiError) {
			return (
				<div>
					<p>
						Oops! There was a problem fetching memes. Please try again later.
					</p>
				</div>
			)
		} else {
            //check if filtered memes are empty
			if (filteredMeme.length === 0) {
				return <p>No memes found. Try searching with different keywords.</p>
			} else {
                //Render memes in a row
				return (
					<div className='row'>
						{currentMemes.map((meme) => (
							<div key={meme.id} className='col-sm-6 col-md-4 col-lg-3 mb-3'>
								<Meme name={meme.name} url={meme.url} />
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
							class='form-control me-3'
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