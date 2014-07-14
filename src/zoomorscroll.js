/*
 * zoomorscroll
 * 
 *
 * Copyright (c) 2014 Clement Hallet
 * Licensed under the MIT license.
 */

(function ($) {

  $.zoomorscroll.maps = $();

  $.zoomorscroll.options = {
    // conditions to stop the plugin, and let the user zoom the map
    reset : {
      no_scroll_timer: 200, // ms
      click: true,
      around_radius: 50 // px
    }
  };
  
  var initalized = false;
  
  // Collection method.
  $.fn.zoomorscroll = function (options) {
    return this.each(function () { 
      $.zoomorscroll.maps.push(
        $(this).data('zoomorscroll-options', $.extend({}, default_options, options))
      );
    }
    $.zoomorscroll.maps = $.unique($.zoomorscroll.maps)
    if (!initalized) $.zoomorscroll();
  };

  // Static method, handles the scroll events
  $.zoomorscroll = function (options) {
    $(document).on('mousewheel', function(event) {
      event.stopPropagation();
    }
  };


}(jQuery));
