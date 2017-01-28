
var playlist=[];

// http://stackoverflow.com/questions/22613903/youtube-api-v3-get-list-of-users-videos
$.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",{
    part : 'contentDetails',
    maxResults : 20,
    playlistId : 'PL4Xo_npkQSb3Lfa1vW-miGBqBSv6T0Ds3',
    key: 'AIzaSyC8hlhRBGWzLQAqpKK1OvHtsU_eg56bais'},
    function(data) {
        for (var i = 0; i < data.items.length; i++) {
            playlist.push(data.items[i].contentDetails.videoId);
        }
        randomPick();
    }
);


function randomPick(){
  var initsong = playlist[Math.floor(Math.random() * playlist.length)];
  document.getElementById('player').src = "https://www.youtube.com/embed/"+initsong+"?controls=1&showinfo=1&rel=1&autoplay=1&loop=1&playlist=" + playlist.join();
}
