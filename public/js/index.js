$(function(){
  $( ".component" ).draggable({ revert: "invalid"});
      $( "#grid-wrapper" ).droppable({

      drop: function( event, ui ) {
        // $( this )
        //   .addClass( "ui-state-highlight" )
        //   .find( "p" )
        //     .html( "Dropped!" );
      }
    });
})
