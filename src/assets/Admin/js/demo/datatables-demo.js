// Call the dataTables jQuery plugin
$(document).ready(function() {
  var table = $('#example').DataTable( {
      lengthChange: false,
      buttons: [ 'excel', 'pdf', 'print' ]
  } );

  var table = $('#liste').DataTable( {
    lengthChange: false,
} );

  table.buttons().container()
      .appendTo( '#example_wrapper .col-md-6:eq(0) ' );

} );
