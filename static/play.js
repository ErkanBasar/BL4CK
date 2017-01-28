
//var ytbdata;
var playlist=[];

// http://stackoverflow.com/questions/22613903/youtube-api-v3-get-list-of-users-videos
$.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",{
    part : 'snippet',
    maxResults : 20,
    playlistId : 'PL4Xo_npkQSb3Lfa1vW-miGBqBSv6T0Ds3',
    key: 'AIzaSyC8hlhRBGWzLQAqpKK1OvHtsU_eg56bais'},
    function(ytbdata) {
        //ytbdata = data;
        //console.log(ytbdata);
        for (var i = 0; i < ytbdata.items.length; i++) {

            playlist.push(ytbdata.items[i].snippet.resourceId.videoId);

            var videoid = ytbdata.items[i].snippet.resourceId.videoId;
            var title = ytbdata.items[i].snippet.title;

            if (ytbdata.items[i].snippet.thumbnails.standard) {
               var thumbnail = ytbdata.items[i].snippet.thumbnails.standard.url;
            }else if (ytbdata.items[i].snippet.thumbnails.high) {
               var thumbnail = ytbdata.items[i].snippet.thumbnails.high.url;
            }else if (ytbdata.items[i].snippet.thumbnails.medium) {
               var thumbnail = ytbdata.items[i].snippet.thumbnails.medium.url;
            }else {
               var thumbnail = ytbdata.items[i].snippet.thumbnails.default.url;
            }

            $("#playlist").append('<div class="hovereffect" id="' + videoid + '"><img class="img-responsive" src="' + thumbnail + '" alt=""><div id="hzi8T2aFMls" class="overlay"><h2>' + title + '</h2><p><a href="#"><i class="fa fa-play"></i></a></p></div></div>');

            $('#'+videoid).click(playSong(videoid));
        }

        randomPick();
    }
);

function randomPick(){
  var initsong = playlist[Math.floor(Math.random() * playlist.length)];
  var temp_list = playlist.slice();
  var frstlst = temp_list.splice(0,playlist.indexOf(initsong)+1);
  var thelist = temp_list.concat(frstlst);
  document.getElementById('fullscreenplayer').src = "https://www.youtube.com/embed/"+initsong+"?controls=1&showinfo=1&rel=1&autoplay=1&loop=1&playlist=" + thelist.join();
}

function playSong(songid){
  return function(){
    var temp_list = playlist.slice();
    var frstlst = temp_list.splice(0,playlist.indexOf(songid)+1);
    var thelist = temp_list.concat(frstlst);
    document.getElementById('fullscreenplayer').src = "https://www.youtube.com/embed/"+songid+"?controls=1&showinfo=1&rel=1&autoplay=1&loop=1&playlist=" + thelist.join();
  }
}
