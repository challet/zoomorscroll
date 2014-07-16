/*
 * zoomorscroll
 * 
 *
 * Copyright (c) 2014 Clement Hallet
 * Licensed under the MIT license.
 */



(function ($) {
  
  // define a custom 'capture' event type (TODO make a specific plugin ?)
  $.event.special.capture = {
    noBubble: true, // used when a manual 'trigger' is fired
    setup: function() {
      return true; // no need to set up a native listener
    },
    teardown: function() {
      return true; // no need to set up a native listener
    },
    add: function(handleObj) {
      this.addEventListener( handleObj.namespace, handleObj.handler, true ); // use capture
    },
    remove: function(handleObj) {
      this.removeEventListener( handleObj.namespace, handleObj.handler , true ); // use capture
    },
    handle: function() {
      // ?
    }
  };

  var initialized = false;
  var no_scroll_timer = null;
  var unhold_it = function() {
    $(this).data('zoomorscroll-holding', false);
  };
  
  // Static method, handles the scroll events
  $.zoomorscroll = function () {
    
    if(initialized) {
      return;
    }
    
    $(document).on('capture.wheel', function(event) {
      
      var zoomable_target = $.zoomorscroll.elements.filter(event.target); // TODO try with children
      
      // new scroll step, reset unholding conditions
      if(no_scroll_timer) { 
        window.clearTimeout(no_scroll_timer);
      }
      zoomable_target.off('click', unhold_it);
      
      // start to check when to stop the holding
      if(zoomable_target.length) {
        var target_options = zoomable_target.data('zoomorscroll-options');
        
        if(target_options.reset.no_scroll_timer) {
          no_scroll_timer = window.setTimeout($.proxy( unhold_it, zoomable_target ), target_options.reset.no_scroll_timer);
        }
        if(target_options.reset.click) {
          zoomable_target.one('click', unhold_it);
        }
      }
      
      
      if(zoomable_target.length && zoomable_target.data('zoomorscroll-holding')) {
        event.stopPropagation();
      } 
      if(!zoomable_target.length) {
        // reset all holdings
        $.zoomorscroll.elements.data('zoomorscroll-holding', true);
      }
      
    });
    
    
  };

  // Collection method.
  $.fn.zoomorscroll = function (options) {
    options = $.extend({}, $.zoomorscroll.options, $(this).data('zoomorscroll-options'), options);
    $(this).data('zoomorscroll-options', options).data('zoomorscroll-holding', true);
    $.merge($.zoomorscroll.elements, $(this));
    $.zoomorscroll();
    return this;
  };

  $.zoomorscroll.options = {
    // conditions to stop the plugin, and let the user zoom the map
    reset : {
      no_scroll_timer: 2000, // ms
      click: true
    }
  };
  
  $.zoomorscroll.elements = $();
  

}(jQuery));
