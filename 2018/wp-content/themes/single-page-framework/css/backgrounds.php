.content-section {
	position:relative;
	padding: 80px 0;
	box-shadow: inset 0 25px 30px rgba(0,0,0,1);
} 

.content-section:after {
	content  : '';
	display	: block;
    position:absolute;
    top:0;
    left:0;
    opacity:0.5;
	background-image : linear-gradient(to bottom, 
					rgba(0,0,0, 0), 
					rgba(0,0,0, 1) 90%);
	width    : 100%;
	height   : 8em;
}	

.content-section.about:after {
	background: url('http://www.diegoescobar.ca/wp-content/uploads/2010/06/ngc6823_waid_1092.jpg') no-repeat center center scroll;
	background-color: #000;
	height: 100%; 
	width:100%;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	-o-background-size: cover;
	padding: 80px 0;
	opacity: 0.4;
	box-shadow: inset 0 25px 30px rgba(0,0,0,1);
}



.section-content {
    position:relative;
	z-index:1;
	opacity: 1;
}