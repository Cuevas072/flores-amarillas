import { saludar } from './js/componentes';
import './styles.css';

var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var art = document.getElementById('art');
var current_track = 0;
var song, audio, duration;
var bandera=true;

var playing = false;
var songs = [
    {
        title: 'Flores Amarillas',
        artist: 'Floricienta',
        url: 'assets/mp3/Floricienta - Flores Amarillas.mp3',
        art: 'assets/img/albumes/Floriscienta.jpg'
    },    
    {
        title: 'Mercedes',
        artist: 'José Madero',
        url: 'assets/mp3/José Madero - Mercedes.mp3',
        art: 'assets/img/albumes/Mercedes.jpg'
    },
    
    {
    title: 'Cerraron Chipinque',
        artist: 'José Madero',
        url: 'assets/mp3/José Madero - Cerraron Chipinque.mp3',
        art: 'assets/img/albumes/Giallo.jpg'
    },

    {
        title: 'Be Calm',
        artist: 'Fun',
        url: 'assets/mp3/Fun - Be Calm.mp3',
        art: 'assets/img/albumes/Aim and Ignite.jpg'
    },

    {
        title: 'La Estrategia Perdida',
        artist: 'PXNDX',
        url: 'assets/mp3/PXNDX - La estrategia perdida.mp3',
        art: 'assets/img/albumes/Amantes Sunt Amentes.jpg'
    },

    {
        title: 'Añejo W',
        artist: 'Los Caligaris',
        url: 'assets/mp3/Los Caligaris - Añejo W.mp3',
        art: 'assets/img/albumes/No Es Lo Que Parece.jpg'
    },

    {
        title: 'Rude',
        artist: 'Magic',
        url: 'assets/mp3/MAGIC! - Rude.mp3',
        art: 'assets/img/albumes/Dont Kill the Magic.jpg',
    },

    {
        title: 'Éramos para Siempre ',
        artist: 'Los Blenders',
        url: 'assets/mp3/Los Blenders - Eramos para Siempre..mp3',
        art: 'assets/img/albumes/Eramos para Siempre.jpg'
    },

    {
        title: 'Razón',
        artist: 'Los Caligaris',
        url: 'assets/mp3/Los Caligaris - Razon.mp3',
        art: 'assets/img/albumes/Bailarin Apocaliptico.jpg'
    },

    {
        title: 'OKUPA',
        artist: 'WOS',
        url: 'assets/mp3/WOS - OKUPA.mp3',
        art: 'assets/img/albumes/CARAVANA.jpg'
    }

];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    console.log("songs[current_track]: ", songs[current_track].title)
    if(songs[current_track].title){

    }
    audio = new Audio();
    audio.volume = 0.15;    
    audio.controls = true;    
    audio.src = song.url;
    console.log("Audio: ", audio)
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
}


audio.addEventListener('timeupdate', updateTrack(), false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.innerHTML = '<img class="pad" src="http://abarcarodriguez.com/lab/play.png" />';
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    if(songs[current_track].title === "Flores Amarillas" && bandera === true){
        updateTrackUniqueTime();
    }

    play.innerHTML = '<img src="http://abarcarodriguez.com/lab/pause.png" />';
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);

function updateTrackUniqueTime(){
    if(songs[current_track].title === "Flores Amarillas" && bandera === true){        
        let curtime = audio.currentTime = 45;
        let percent = Math.round((curtime * 100) / duration);
        progress.style.width = percent + '%';
        handler.style.left = percent + '%';
        bandera=false;        
    }
}

function resetSlider() {    
    let percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

function updateTrack() {
    let curtime = audio.currentTime;       
    let percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

function seekTrack(e) {
    event = e || window.event;
    var x = e.pageX - player.offsetLeft - track.offsetLeft;
    let percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100
}
function nextTrack() {
    current_track++;
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
    resetSlider();
    audio.onloadeddata = function() {
      updateInfo();
    }
    
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
    resetSlider();
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    art.onload = function() {
        audio.play();
    }
}