(function functionName(window, document, $, undefined) {

   $('.carousel').carousel({interval: 10000});

   $('.choosePlaylist').click(function (event) {
      console.log($(this).data('id'));
      localStorage.setItem("playlistId",$(this).data('id'));
      window.location.href = "player.html";
   });


})(window, window.document, window.jQuery);
