(function functionName(window, document, $, undefined) {

   $('.carousel').carousel({interval: 15000});

   $('.choosePlaylist').click(function (event) {
      window.localStorage.setItem("playlistId",$(this).data('id'));
      window.location.href = "player.html";
   });


})(window, window.document, window.jQuery);
