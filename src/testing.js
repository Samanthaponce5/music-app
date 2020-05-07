function getSongs() {
	let search = document.querySelector('.search');
	let matchList = document.querySelector('.gradient-list');
	search.addEventListener('input', function (e) {
		const artistName = e.target.value;
		const searchText = e.target.value;

		fetch(`http://localhost:3000/api/v1/artist?q=${artistName}`)
			.then((resp) => resp.json())
			.then((songs) => {
				if (e.target.value.length != 0) {
					let matches = songs.artists.items.filter((song) => {
						const regex = new RegExp(`^${searchText}`, 'gi');

						return song.name.match(regex) || song.name.match(regex); //change later to search by title or album
					});

					if (matches.length > 0) {
						const html = matches
							.map(
								(match) =>
									`
                                    <li>${match.name}</li>
                                    </div>
                                    <div>
                                    `
							).join('');

						matchList.innerHTML = html;
					}
				} else {
					matches = [];
					matchList.innerHTML = '';
				}
			}); //end of last then
	}); //end of event listener
} //end of function


const searchSongs = searchText => {
    // Get matches to current text input
    let matches = songs.filter(song => {
     const regex = new RegExp(`^${searchText}`, 'gi');
     return song.title.match(regex) || song.artist.match(regex);//change later to search by title or album
     
    });
   
    // Clear when input or matches are empty
    if (searchText.length === 0) {
     matches = [];
     matchList.innerHTML = '';
    }
   
    outputHtml(matches);
   };
   
   // Show results in HTML
   const outputHtml = matches => {
    if (matches.length > 0) {
     const html = matches
      .map(
       match => `
       <div>
       <li>${match.artist}: ${match.title} </li>
      </div>`
      )
      .join('');
     matchList.innerHTML = html;
    }
    
   };
   
   
   search.addEventListener('input', (e) => searchSongs(e.target.value));