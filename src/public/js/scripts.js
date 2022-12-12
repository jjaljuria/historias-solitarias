const deleteStoryButtons = document.querySelectorAll('.deleteStoryButton');

deleteStoryButtons.forEach(button => {
	button.addEventListener('click', async (e) => {
		e.preventDefault();
		const response = await fetch('/story', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: button.dataset.idstory })
		});

		const deletedStory = await response.json()

		if (!deletedStory._id) {
			alert(deletedStory);
			return;
		}

		alert('Borrada historia ' + deletedStory.title);
		location.reload();
	})
});