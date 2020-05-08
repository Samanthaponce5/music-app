document.addEventListener('DOMContentLoaded', function () {
	formInput();
    postUser();
    getAlbum();
});

//=============POST NEW USER====================================================================================================================
function postUser() {
	let form = document.querySelector('#myform');
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let username = e.target.username.value;
		//  console.log(username)
		fetch('http://localhost:3000/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ username }),
		})
			.then((resp) => resp.json())
			.then(after)
			.catch((err) => console.log(err));

		e.target.reset();
	}); //eventListener
}

//=================USERNAME INPUTFORM=====================================================
function formInput() {
	let form = document.querySelector('#myform');
	form.innerHTML = `
    <form autocomplete="off">
    <input id="input-1" type="text" placeholder="Username" name="username"required autofocus />
    <label for="input-1">
      <span class="label-text">Enter username:</span>
      
      <div class="signup-button-trigger">Sign Up</div>
    </label>
 
    <input type="submit" style="display: none" />
    <p class="tip">PRESS ENTER</p>
    <div class="signup-button">Sign Up</div>
    </form>
    `;
}

//==================AFTER USER INPUTS================================================================

function after() {
	let notes = document.querySelector('.notes')
	notes.innerHTML = `
	<div class="note-position-1 note-amination">
  &#9835;
</div>
<div class="note-position-2 note-amination animation-delay-2">
  &#9833;
</div>
<div class="note-position-3 note-amination animation-delay-1">
  &#9839;
</div>
<div class="note-position-4 note-amination">
  &#9834;
</div>
	`

	let title = document.querySelector('.title')
	title.style.fontSize = ' 1em'
	title.style.textAlign ='right'
	title.style.transform = 'translateX(-10%)'
	let form = document.querySelector('#myform');
//    form.innerHTML = ``;
//     window.location.href="#first"
	//---
	let img = document.querySelector('#canvas');
	img.remove();
	//---
	let section1 = document.querySelector('.container');
	let search = document.querySelector('.search');
	let navbar = document.getElementById('navbar');
	//----SEARCH BAR---
	search.innerHTML = `
    <div class="one">
    <div class="two">
      <div class="three">
        <input type="search" class="four" placeholder="        Search . . ." required />
      </div>
      <div class="stick"></div>
    </div>
  </div>
    `;

	navbar.innerHTML = `
    <nav>
    <a href="#first"><i class="fas fa-home"></i></i></a>
    <a href="#second"><i class="fas fa-music"></i></a>
    <a href="#third"><i class="far fa-star"></i></a>
   
   </nav>
	`;
	// <a href="#fourth"><i class="fas fa-question"></i></a>
	//----section---
	section1.innerHTML = `

 <section id= 'first'>
 <div class='work'></div>
 <p class="line-1 anim-typewriter">Search to browse albums</p>
</section>

<section id= 'second'>



</section>

<section id= 'third'>
<container class='song'></container>

</section>


`;

{/* <section id= 'fourth'>
<div>Fourth</div>
</section> */}

form.innerHTML = ``;
    window.location.href="#first"
	let firstSec = document.getElementById('first');
	firstSec.appendChild(search)

	getSongs();
	//secondSection();
}


//=======================================GET SONGS IN SEARCH BAR==============================================================================


function getSongs() {
    let div = document.querySelector('.work')
let matchList = document.querySelector('.gradient-list');
let text = document.querySelector('.line-1.anim-typewriter')

	let search = document.querySelector('.search');
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
                                    <li class='name' data-id="${match.id}">${match.name}</li>
                                    `
							)
							.join('');

                        matchList.innerHTML = html;
                        let firstSec = document.getElementById('first');
                       // div.appendChild(matchList)
                        firstSec.appendChild(matchList)
                       
                        
					}
					text.innerHTML = ''
				} else {
					text.textContent = 'Search to browse albums '
					matches = [];
					matchList.innerHTML = '';
				}
			}); //end of last then
	}); //end of event listener
} //end of function
//======================================GET ALBUM=================================================================

function getAlbum() {
    let matchList = document.querySelector('.gradient-list');

	//-------------when over li mouse turns to pointer-----
	document.addEventListener('mouseover', function (e) {
		if (e.target.className === 'name') {
			e.target.style.cursor = 'pointer';
			//console.log('hover');
		}
	});
	//----------------click event over li--------------------------
	document.addEventListener('click', function (e) {
		if (e.target.className === 'name') {
            console.log(e.target.dataset.id)

            let artistId = e.target.dataset.id
			fetch(`http://localhost:3000/api/v1/albums?id=${artistId}`)
            .then((response) => response.json())
            .then((albums)=>{
                let search = document.querySelector('.search');
                const html = albums.items
                .map(
                    (album) =>
                        `
                        
                        <li class='album' data-id="${album.id}">${album.name}</li>
                        `
                )
                .join('');

            matchList.innerHTML = html;//-================-------------------------------------------------------------------------------------------------------------------

            })

		}//end of if statement
	});//end of event listener
}
//====================GET MUSIC========================================================
function getMusic(){
    document.addEventListener('mouseover', function (e) {
		if (e.target.className === 'album') {
			e.target.style.cursor = 'pointer';
			//console.log('hover');
		}
	});

document.addEventListener('click', function(e){
    if(e.target.className === 'album'){
        let albumId = e.target.dataset.id

        let second = document.getElementById('second');
        second.innerHTML = `<div class="list-item"> </div>
        <iframe src="https://open.spotify.com/embed/album/${albumId}" width="640" height="720" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
        window.location.href="#second"
        
        fetch(`http://localhost:3000/api/v1/tracks?id=${albumId}`)
        .then(response => response.json())
        .then(tracks => {
            tracks.items.forEach(function(track){

                const div = document.querySelector(".list-item")
                let div2 = document.createElement('div')
                div2.className = 'item'
                div.appendChild(div2)
				let label = document.createElement('label')
				label.setAttribute('for', 'checkbox')
                label.className = 'label'
                //li.dataset.trackId = track.id
                label.innerHTML =track.name
                div2.append(label)
                let input = document.createElement('input')
                input.className = 'box'
				input.type = 'checkbox'
				input.name = 'checkbox'
				input.dataset.id = track.id
				input.dataset.name = track.name
				input.dataset.artist = track.artists[0].name
				input.dataset.uri = track.uri
				
                div2.appendChild(input)
                label.before(input)
                
            })
           		favorite()

		})
    }

})


}
getMusic()
//===================Favorite====================================
//====================================================================
function favorite(){

document.addEventListener('click', function(e){
	if(e.target.name === 'checkbox'){
		let songName = e.target.dataset.name
		let artistName = e.target.dataset.artist
		let uri = e.target.dataset.uri
		let songObj = {title: songName, artist: artistName, uri: uri}
		createFavorite(songObj)
	}
})
}


function createFavorite(songObj){
	console.log(songObj)
	let title = songObj.title
	let artist = songObj.artist
	let uri = songObj.uri
	fetch(`http://localhost:3000/api/v1/favorites/?artist=${artist}&title=${title}&uri="${uri}`, {
	  method: 'POST',
	  headers: {
		'accept': 'application/json',
		'content-type': 'application/json',
		
	  },
	  body: JSON.stringify(songObj)
	  })
	  .then(response => response.json())
	  .then(json => addFavorite(json)) //make available to dynamic users
  }

  function addFavorite(favoriteObj){
	//  let favoritesList = document.createElement('ul')
	//  favoritesList.className= 'favorites-list'
	let third = document.querySelector('.song');
	// third.appendChild(favoritesList) 
	// let div = document.createElement("div")
	// let li = document.createElement("li")
	let ul = document.createElement('ul')
	ul.className = 'embed-container'
	let li = document.createElement('p')
	


	let uri = favoriteObj.uri.split(":")
	li.innerHTML = `<div class="image-area"><iframe src="https://open.spotify.com/embed/track/${uri[2]}"  frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> <a data-id=${favoriteObj.id} class="remove-image"  style="display: inline;">&#215;</a></div>`
	li.dataset.id = favoriteObj.id
	ul.appendChild(li)
	third.appendChild(ul)




	//------------------------list bar--------------------------------
	
  }




  function renderFavorites(favorites){ //?receiving an array of favorite objects
	favorites.forEach(favorite => {
		let third = document.getElementById('third');
		third.innerHTML = `<div class="list-item2"> </div>`
		const div = document.querySelector(".list-item2")
		let div2 = document.createElement('div')
		div2.className = 'item2'
		let label = document.createElement('label')
		div.appendChild(div2)
		label.className = 'label2'
		let uri = favorite.uri.split(":")
		label.innerHTML =  `${favorite.song_name}  `

		div2.append(label)
		let input = document.createElement('input')
                input.className = 'box'
				input.type = 'checkbox'
				input.name = 'checkbox'
				input.dataset.id = favorite.id
				input.dataset.name = favorite.name
				//input.dataset.artist = favorite.artists[0].name
				input.dataset.uri =favorite.uri
				
                div2.appendChild(input)
                label.before(input)
		// label.innerHTML =  `${favorite.song_name} <iframe src="https://open.spotify.com/embed/track/${uri[2]}" width="300" height="50" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>  `


	});

  }


function getFavorites(userId){
  fetch(`http://localhost:3000/api/v1/favorites/${userId}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    })
    .then(response => response.json())
    .then(json => renderFavorites(json))
}
//===============DELETE============================================

function unFavorite(){
	
	document.addEventListener('click', function(e){
		if (e.target.className  === 'remove-image'){
			let favoriteId = e.target.parentNode.dataset.id
			console.log(favoriteId)
			//removeFavorite(favoriteId)
			////deleteFavorite(favoriteId)
		}

	})

}

unFavorite()

//remove favorite from the DOM by id
function removeFavorite(favoriteId){
	let favoritesContainer = document.querySelector('.embed-container')
	let favorite = favoritesContainer.querySelector(`[data-id='${favoriteId}']`)
	console.log(favorite)
	favorite.remove()
  }
  
  //deletes a favorite from a database
  function deleteFavorite(favoriteId){
	fetch(`http://localhost:3000/api/v1/delete/?q=${favoriteId}`, {
	  // mode: 'no-cors',
	  method: 'POST',
	  headers: {
		'accept': 'application/json',
		'content-type': 'application/json'
	  },
	})
  }
 










  



//========THE ANIMATION==========================================================================================================
function Particle(x, y, c, s) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;

	this.s = s;
	this.c = c;

	this.sx = x;
	this.sy = y;

	this.time = Date.now();
}
Particle.prototype = {
	constructor: Particle,
	update: function () {
		this.x += this.vx;
		this.y += this.vy;

		this.vx = (this.sx - this.x) / 10;
		this.vy = (this.sy - this.y) / 10;
	},
	render: function (context) {
		context.beginPath();
		context.fillStyle = this.c;
		context.fillRect(this.x, this.y, this.s, this.s);
		context.closePath();
	},
};

var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	image = new Image(),
	particle_size = 4,
	height,
	width,
	arr = [];

image.crossOrigin = 'Anonymous';
image.src =
	'https://cdn.iconscout.com/icon/premium/png-512-thumb/man-listening-music-1652772-1401150.png';
image.onload = init;

function init() {
	height = canvas.height = image.height;
	width = canvas.width = image.width;

	context.drawImage(image, 0, 0);
	var idata = context.getImageData(0, 0, width, height),
		data = idata.data;
	context.clearRect(0, 0, width, height);

	for (var y = 0; y < height; y += particle_size) {
		for (var x = 0; x < width; x += particle_size) {
			var o = x * 4 + y * 4 * idata.width;
			if (data[o + 3] > 210) {
				var c =
						'rgba(' +
						data[o] +
						',' +
						data[o + 1] +
						',' +
						data[o + 2] +
						',' +
						data[o + 3] +
						')',
					p = new Particle(x, y, c, particle_size);
				p.x = Math.random() * width;
				p.y = Math.random() * height;
				arr.push(p);
			}
		}
	}

	canvas.onmousemove = force;

	update();
	render();
}

function force(e) {
	var x = e.clientX,
		y = e.clientY;
	for (var i = 0, l = arr.length; i < l; i++) {
		var dx = x - arr[i].x,
			dy = y - arr[i].y,
			d = Math.sqrt(dx * dx + dy * dy);
		if (d < 64) {
			var r = Math.atan2(dy, dx);
			arr[i].vx = -d * Math.cos(r);
			arr[i].vy = -d * Math.sin(r);
		}
	}
}

function update() {
	for (var i = 0, l = arr.length; i < l; i++) {
		arr[i].update();
	}
	setTimeout(update, 1000 / 30);
}

function render() {
	context.clearRect(0, 0, width, height);
	for (var i = 0, l = arr.length; i < l; i++) {
		arr[i].render(context);
	}
	requestAnimationFrame(render);
}
