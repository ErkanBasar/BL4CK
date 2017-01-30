
var ytdata,
    playlist=[],
    finallist,
    player,
    time_update_interval = 0;

// http://stackoverflow.com/questions/22613903/youtube-api-v3-get-list-of-users-videos
$.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",{
    part : 'snippet',
    maxResults : 20,
    playlistId : 'PL4Xo_npkQSb3Lfa1vW-miGBqBSv6T0Ds3',
    key: 'AIzaSyC8hlhRBGWzLQAqpKK1OvHtsU_eg56bais'},
    function(data) {
        ytdata = data;
        console.log(ytdata);

        for (var i = 0; i < ytdata.items.length; i++) {

            // fill the playlist
            playlist.push(ytdata.items[i].snippet.resourceId.videoId);

            var videoid = ytdata.items[i].snippet.resourceId.videoId;
            var title = ytdata.items[i].snippet.title;

            // get the thumbnail
            if (ytdata.items[i].snippet.thumbnails.standard) {
               var thumbnail = ytdata.items[i].snippet.thumbnails.standard.url;
            }else if (ytdata.items[i].snippet.thumbnails.high) {
               var thumbnail = ytdata.items[i].snippet.thumbnails.high.url;
            }else if (ytdata.items[i].snippet.thumbnails.medium) {
               var thumbnail = ytdata.items[i].snippet.thumbnails.medium.url;
            }else {
               var thumbnail = ytdata.items[i].snippet.thumbnails.default.url;
            }

            // place the videos into the playlist on the left side
            $("#playlist").append('<div class="hovereffect" id="' + videoid + '"><img class="img-responsive" src="' + thumbnail + '" alt=""><div class="overlay"><h2>' + title + '</h2><p><a href="#"><i class="fa fa-play"></i></a></p></div></div>');

            // set onclick to the videos in playlist
            $('#'+videoid).click(playSong(videoid));

        }

        loadYTPlayer();
    }
);

function loadYTPlayer(){
   var tag = document.createElement('script');
   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    var temp_list = playlist.slice();
    finallist = temp_list.splice(1);
    player = new YT.Player('video-placeholder', {
        videoId: playlist[0],
        playerVars: {
            autoplay:1,
            controls:0,
            color: 'white',
            loop:1,
            playlist: finallist.join()
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    player.playVideo();
}

function onPlayerStateChange(event) {
   if(event.data == -1){
       var songid = player.getVideoData()['video_id'];
       console.log(songid);
       for (var i = 0; i < ytdata.items.length; i++) {
           if (ytdata.items[i].snippet.resourceId.videoId == songid) {
                 // change the channel info to the bottom left
                 $("#channel-label").html('<script src="https://apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" data-channelid="'+ ytdata.items[i].snippet.channelId +'" data-layout="full" data-theme="dark" data-count="default"></div>');
           }
       }
   }
}

function reorderPlaylist(songid){
   var temp_list = playlist.slice();
   var frstlst = temp_list.splice(0,playlist.indexOf(songid));
   finallist = temp_list.concat(frstlst);
}

function playSong(songid){
  return function(){
     reorderPlaylist(songid);
     player.loadVideoById(songid);
     player.loadPlaylist(finallist.join());
     player.setLoop(true);
  }
}

function nextSong() {
   player.nextVideo();
}

function prevSong() {
   player.previousVideo();
}

function randomSong(){
  var songid = playlist[Math.floor(Math.random() * playlist.length)];
  reorderPlaylist(songid);
  player.loadVideoById(songid);
  player.loadPlaylist(finallist.join());
  player.setLoop(true);
}

function playPauseSong(){
  var ppbtn = document.getElementById("play-pause-btn");
  if(ppbtn.innerHTML === '<i class="fa fa-pause"></i>'){
     player.pauseVideo();
     ppbtn.innerHTML = '<i class="fa fa-play"></i>';
  }else if (ppbtn.innerHTML === '<i class="fa fa-play"></i>') {
     player.playVideo();
     ppbtn.innerHTML = '<i class="fa fa-pause"></i>';
  }
}

function loopSong(songid) {
 //TODO: if active; loop the current song, if deactivated; play next song and load the playlist
}
