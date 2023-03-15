function showprofile() {
   // alert("Click");
    //document.getElementById("myDropdown").classList.toggle("show");
   
      document.getElementById("myDropdown").classList.toggle("show");
    
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
function tools(){
   
    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();   
    });
  
}
function PreviewImage() {
  pdffile=document.getElementById("resume").files[0];
  
  pdffile_url=URL.createObjectURL(pdffile);
  
  $('#viewer').attr('src',pdffile_url);
  
}
var config = {
  '.chosen-select'           : {},
  '.chosen-select-deselect'  : { allow_single_deselect: true },
  '.chosen-select-no-single' : { disable_search_threshold: 10 },
  '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
  '.chosen-select-rtl'       : { rtl: true },
  '.chosen-select-width'     : { width: '95%' }
}
for (var selector in config) {
  $(selector).chosen(config[selector]);
}
  