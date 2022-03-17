<!DOCTYPE html>
<html>
<head>
	<title>Upload pdf and image </title>
</head>
<body>
	<div>
		<b>Upload Form</b>
		<br/><br/>
		<form name="form" method="post" action="{{route('upload')}}" enctype="multipart/form-data">
			@csrf
			Image name:
			<input type="file" name="book_image" id="book_image" value="">
			<br/><br/>
			PDF name:
			<input type="file" name="book_pdf" id="book_pdf" onchange="Showpath()" value="">
			<!-- <embed type="application/pdf" width="100%" height="100%" > -->

			<br/><br/>
			<input type="submit" name="submit" id="submit" value="submit">
			<br/><br/>
		</form>
	</div>
	<!-- <iframe  
    style="width:200px; height:200px;" 
    frameborder="0" id="pdf_viewer">
    </iframe> -->
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

	<script type="text/javascript">
		$( document ).ready(function() {
		    // console.log( "ready!" );
		    // alert( "ready!" );
		    $("#book_pdf").change(function () {
		    	 // var filename = $('#book_pdf').val();
			    // console.log(filename);
		    // $('input[type=file]').change(function () {
			    console.log(this.files[0].mozFullPath);
			    alert(this.files[0]);
			});
		});

	// function getFilePath(){
	//     $('input[name=book_pdf]').change(function () {
	//         var filePath=$('#book_pdf').val(); 
	//     });
	// }


	function Showpath(){

    var pdf_url=document.getElementById("book_pdf").value;
    // alert(pdf_url);
    var pdf_url1 =pdf_url+"&embedded=true";
    // alert(pdf_url1);
    // pdf_viewer
    // $("#pdf_viewer").removeAttr("src");
    $("#pdf_viewer").attr("src",pdf_url1);
    // $('input[type="checkbox"]').attr("checked", "checked");

    // $("#img_url").empty();
    // $("#img_url").append(img_url);
  	}
	</script>

<!-- ======================================================================= -->
	<script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>

	<!-- <h1>PDF.js Previous/Next example</h1>

	<div>
	  <button id="prev">Previous</button>
	  <button id="next">Next</button>
	  &nbsp; &nbsp;
	  <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
	</div>

	<canvas id="the-canvas" style="border: 1px solid black;
  direction: ltr;"></canvas>
 -->
	<script type="text/javascript">
		// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum);
});

	</script>

<!-- ================================================================== -->
	<input type="file" id="i_file" value=""> 
<input type="button" id="i_submit" value="Submit">
    <br>
<img src="" width="200" style="display:none;" />
        <br>
<div id="disp_tmp_path"></div>

<!-- <embed type="application/pdf" width="100%" height="100%" id="pdf_viewer10"> -->
<center>
<div>
	<div>
	<input type="checkbox" class="radio" id="vehicle11" name="vehicle11" value="Content" />Content
	<input type="checkbox" class="radio" id="vehicle11" name="vehicle11" value="Page" />Page
	<input type="hidden" name="page_no" id="page_no" value="1">
 	</div>
 	<div>
	<input type="checkbox" class="radio" id="vehicle1[2]" name="vehicle1[2]" value="Content" />Content
	<input type="checkbox" class="radio" id="vehicle1[2]" name="vehicle1[2]" value="Page" />Page
	<input type="hidden" name="page_no" id="page_no" value="2">
 	</div>
	<iframe style="width:500px; height:250px;" frameborder="0" id="pdf_viewer11"></iframe>
</div>
</center>


<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> -->
<script type="text/javascript">
	
	$( document ).ready(function() {
		$('#i_file').change( function(event) {
		var tmppath = URL.createObjectURL(event.target.files[0]);
		    $("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
		    
		    $("#disp_tmp_path").html("Temporary Path(Copy it and try pasting it in browser address bar) --> <strong>["+tmppath+"]</strong>");
    		$("#pdf_viewer10").attr("src",tmppath);
    		$("#pdf_viewer11").attr("src",tmppath);

		});

		$("input:checkbox").on('click', function() {
		  // in the handler, 'this' refers to the box clicked on
		  var $box = $(this);
		  if ($box.is(":checked")) {
		    // the name of the box is retrieved using the .attr() method
		    // as it is assumed and expected to be immutable
		    var group = "input:checkbox[name='" + $box.attr("name") + "']";
		    // the checked state of the group/box on the other hand will change
		    // and the current value is retrieved using .prop() method
		    $(group).prop("checked", false);
		    $box.prop("checked", true);
		  } else {
		    $box.prop("checked", false);
		  }
		});
	});
</script>
</body>
</html>