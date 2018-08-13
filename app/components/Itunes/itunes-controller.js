import ItunesService from "./itunes-service.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(results) {
  console.log(results)
  //YOUR CODING STARTS HERE
  let template = `<div class="accordion row" id="accordionExample">`
  for (let i = 0; i < results.length; i++) {
    const song = results[i];
    if (i == 0) {
      template += `
      <div class="card col-sm-6 offset-sm-3 bg-dark">
        <div class="card-header" id="heading${i}">
          <h5 class="mb-0">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#h${i}" aria-expanded="true" aria-controls="h${i}">
          ${song.artist} - ${song.title} 
          </button>
            <span class="badge badge-light float-right">$${song.price}</span>
          </h5>
        </div>
      
        <div id="h${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
          <div class="card-body text-center">
            <div class="mb-1">
            ${song.collection} 
            </div>
            <div class="mb-2">
              <img src="${song.albumArt}" /> 
            </div>
            <audio controls>
              <source src="${song.preview}" type="audio/ogg">
              <source src="${song.preview}" type="audio/mpeg"> Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
      `
    } else {
      template += `
      <div class="card col-sm-6 offset-sm-3 bg-dark">
        <div class="card-header" id="heading${i}">
          <h5 class="mb-0">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#h${i}" aria-expanded="false" aria-controls="h${i}">
          ${song.artist} - ${song.title} 
          </button>
            <span class="badge badge-light float-right">$${song.price}</span>
          </h5>
        </div>

      <div id="h${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
        <div class="card-body text-center">
          <div class="mb-1">
            ${song.collection} 
          </div>
          <div class="mb-2">
            <img src="${song.albumArt}" /> 
          </div>
            <audio controls>
              <source src="${song.preview}" type="audio/ogg">
              <source src="${song.preview}" type="audio/mpeg"> Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
      `
    }

  }
  template += `</div>`
  document.getElementById('songs').innerHTML = template

}

document.addEventListener('play', function (e) {
  var audios = document.getElementsByTagName('audio');
  for (var i = 0, len = audios.length; i < len; i++) {
    if (audios[i] != e.target) {
      audios[i].pause();
    }
  }
}, true);

//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    //@ts-ignore
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      //@ts-ignore
      $('#get-music-button').text('GET MUSIC');
    })
  }


}

//     <ul id="song-list" class="p-2 flex-fill bg-light align-content-space-between list-group w-25">
//       <li class="list-group-item">${song.artist}</li>
//       <li class="list-group-item">${song.title}</li>
//       <li class="list-group-item">${song.collection}</li>
//       <li class="list-group-item">
//         <img src="${song.albumArt}" />
//       </li>
//      <li class="list-group-item">
//         <audio controls>
//             <source src="${song.preview}" type="audio/ogg">
//             <source src="${song.preview}" type="audio/mpeg"> Your browser does not support the audio element.
//         </audio>
//       </li>
//     <li class="list-group-item">${song.price}</li>
// </ul>

export default ItunesController