console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Perfect",filePath:"Songs/1.mp3" , coverPath:"covers/2.jpg"},
    {songName : "Until I found you",filePath:"Songs/2.mp3" , coverPath:"covers/1.jpg"},
    {songName : "Yaad",filePath:"Songs/3.mp3" , coverPath:"covers/3.jpg"},
    {songName : "Iraaday",filePath:"Songs/4.mp3" , coverPath:"covers/4.jpg"},
    {songName : "Aao milon chalein",filePath:"Songs/5.mp3" , coverPath:"covers/7.jpg"},
    {songName : "At my worst",filePath:"Songs/6.mp3" , coverPath:"covers/5.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
        masterPlay.classList.add('fa-circle-play');
    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = 'Songs/'+(songIndex+1)+'.mp3';
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause'); 
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5)
    {
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = 'Songs/'+(songIndex+1)+'.mp3';
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = 'Songs/'+(songIndex+1)+'.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})