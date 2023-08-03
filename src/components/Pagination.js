import React from 'react'

const Pagination = ({ currentPage, totalPages, goToPreviousPage, goToNextPage,}) => {
	return (
		<div>
			<button onClick={goToPreviousPage} disabled={currentPage === 1}>
				Previous
			</button>
			<span>{currentPage}</span>
			<button onClick={goToNextPage} disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	)
}

export default Pagination
