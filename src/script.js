document.addEventListener('DOMContentLoaded',function() {
    
    formInput()
    postUser()
   
})

//=============POST NEW USER====================================================================================================================
function postUser(){
    let form = document.querySelector('#myform')
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let username = e.target.username.value
       //  console.log(username)
    fetch('http://localhost:3000/api/v1/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({ username})
    })
    .then((resp)=>resp.json())
    .then(after)
    .catch((err)=>console.log(err))

    e.target.reset()
     })//eventListener

}

//=================USERNAME INPUTFORM=====================================================
function formInput(){
    let form = document.querySelector('#myform')
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
    `
}

//==================AFTER USER INPUTS================================================================

function after (){
    let form = document.querySelector('#myform')
    form.innerHTML = ``
//---
    let img = document.querySelector('#canvas')
    img.remove()
//---
    let section1 = document.getElementById('sec')
    let section2 = document.getElementById('sec2')
    let search = document.querySelector('.search')
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
    `
//----section1---
 section1.innerHTML = `
   <section id="slide">
 
    </section>
    <hr>
`
//----section 2----
  section2.innerHTML=
  `
  <section id="slide2">
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        aperiam dolorum aspernatur sit quae eaque laborum. Minima, voluptate
        libero nemo ab similique, assumenda necessitatibus voluptatibus animi
        dolorum obcaecati unde tempora!
    </p>
    </section>
`

getSongs()
}


//=======================================GET SONGS IN SEARCH BAR==============================================================================

let search = document.querySelector('.search')
let matchList = document.querySelector('.gradient-list')

let states;

// Get states
const getSongs = async () => {
 const res = await fetch('http://localhost:3000/api/v1/songs');
 songs = await res.json();
};

// FIlter states
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
    
    <li>${match.artist}: ${match.title} </li>
   </div>`
   )
   .join('');
  matchList.innerHTML = html;
 }
};


search.addEventListener('input', (e) => searchSongs(e.target.value));
//=========================================================================================================






 



    

































































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
    }
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    image = new Image(),
    particle_size = 4,
    height, width, arr = [];

image.crossOrigin = "Anonymous";
image.src = "https://cdn.iconscout.com/icon/premium/png-512-thumb/man-listening-music-1652772-1401150.png";
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
                var c = 'rgba(' + data[o] + ',' + data[o + 1] + ',' + data[o + 2] + ',' + data[o + 3] + ')',
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
            arr[i].vx = -(d) * Math.cos(r);
            arr[i].vy = -(d) * Math.sin(r);
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
