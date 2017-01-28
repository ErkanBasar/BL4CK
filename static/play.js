
var ytbdata;
var playlist=[];

// http://stackoverflow.com/questions/22613903/youtube-api-v3-get-list-of-users-videos
$.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",{
    part : 'snippet',
    maxResults : 20,
    playlistId : 'PL4Xo_npkQSb3Lfa1vW-miGBqBSv6T0Ds3',
    key: 'AIzaSyC8hlhRBGWzLQAqpKK1OvHtsU_eg56bais'},
    function(data) {
        ytbdata = data;
        console.log(ytbdata);
        for (var i = 0; i < ytbdata.items.length; i++) {
            playlist.push(ytbdata.items[i].snippet.resourceId.videoId);
        }
        randomPick();
        playlistInit();
    }
);

function randomPick(){
  var initsong = playlist[Math.floor(Math.random() * playlist.length)];
  document.getElementById('fullscreenplayer').src = "https://www.youtube.com/embed/"+initsong+"?controls=1&showinfo=1&rel=1&autoplay=1&loop=1&playlist=" + playlist.join();
}

function playSong(songid){
  return function(){
    document.getElementById('fullscreenplayer').src = "https://www.youtube.com/embed/"+songid+"?controls=1&showinfo=1&rel=1&autoplay=1&loop=1&playlist=" + playlist.join();
  }
}

function playlistInit() {

  for (var i = 0; i < ytbdata.items.length; i++) {

    var videoid = ytbdata.items[i].snippet.resourceId.videoId;
    var title = ytbdata.items[i].snippet.title;

    if (ytbdata.items[i].snippet.thumbnails.standard) {
       var thumbnail = ytbdata.items[i].snippet.thumbnails.standard.url;
    }else {
       var thumbnail = ytbdata.items[i].snippet.thumbnails.default.url;
    }

    $("#playlist").append('<div class="hovereffect" id="' + videoid + '"><img class="img-responsive" src="' + thumbnail + '" alt=""><div id="hzi8T2aFMls" class="overlay"><h2>' + title + '</h2><p><a href="#"><i class="fa fa-play"></i></a></p></div></div>');

    $('#'+playlist[i]).click(playSong(playlist[i]));
  }
}
