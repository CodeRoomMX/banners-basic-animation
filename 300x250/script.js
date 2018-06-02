// HogarthClass -----------------------------------------
var H = {
	// get element by ID
	e:function(id){
		return document.getElementById(id);
	},

	// get param by name
	gpn: function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	} 
}

// CLICKTAG ---------------------------------------------
var clickTag = clickTAG = clicktag = ClickTag = ClickTAG = CLICKTAG = H.gpn('clickTAG') || H.gpn('clickTag') || H.gpn('clicktag') || "https://engage.redhat.com/tuproximomovimiento_cl_dm";
var oobClickTrack = H.gpn('oobclicktrack');

function toClickTag(e) {
	e.stopPropagation();
	window.open(clickTag, "_blank");
	if(oobClickTrack  != null) { var img = new Image(); img.src = oobClickTrack; }
}

H.e('wrapper').addEventListener('click', toClickTag, false);

// Main Timeline ----------------------------------------
var preloader, stage;
var tick = function(){
	this.stage.update();
}
var insertBitmap = function(id, x, y, setOrigin){
	if(typeof setOrigin == 'undefined') setOrigin = true;
	var img = preloader.getResult(id);
	var bmp = new createjs.Bitmap(img);
	bmp.x = x || 0;
	bmp.y = y || 0;
	if(setOrigin){
		var bounds = bmp.getBounds();
		bmp.regX = bounds.width / 2;
		bmp.regY = bounds.height / 2;
	}
	stage.addChild(bmp);
	return bmp;
}
var setStage = function(){
	stage = new createjs.Stage('reading_this');
	createjs.Ticker.addEventListener('tick', stage);
	createjs.Ticker.setFPS(60);

	var back = insertBitmap('back', 0, 0, false);
	var piece = insertBitmap('piece', 0, 0, false);
	var text1 = insertBitmap('text1', 0, 0, false);
	var text2 = insertBitmap('text2', 0, 0, false);
	var text3 = insertBitmap('text3', 0, 0, false);
	var text4 = insertBitmap('text4', 0, 0, false);
	var button = insertBitmap('button', 0, 0, false);

	piece.set({alpha: 0, y: -100});
	text1.set({alpha: 0, x: -50});
	text2.set({alpha: 0, x: -50});
	text3.set({alpha: 0, x: -50});
	text4.set({alpha: 0, x: -50});
	button.set({alpha:0 , y: -10});
	
	createjs.Tween.get(piece)
		.to({alpha: 1, y: 0}, 700, createjs.Ease.bounceOut);
	createjs.Tween.get(text1)
		.wait(700)
		.to({alpha: 1, x: 0}, 300, createjs.Ease.backOut)
		.wait(1000)
		.to({alpha: 0}, 300, createjs.Ease.linear);
	createjs.Tween.get(text2)
		.wait(2000)
		.to({alpha: 1, x: 0}, 300, createjs.Ease.backOut)
		.wait(1500)
		.to({alpha: 0}, 300, createjs.Ease.linear);
	createjs.Tween.get(text3)
	 	.wait(3800)
	 	.to({alpha: 1, x: 0}, 300, createjs.Ease.backOut)
	 	.wait(1000)
	 	.to({alpha: 0}, 300, createjs.Ease.linear);
	 createjs.Tween.get(text4)
	 	.wait(5100)
	 	.to({alpha: 1, x: 0}, 300, createjs.Ease.backOut);
	createjs.Tween.get(button)
	 	.wait(5400)
	 	.to({alpha: 1, y: 0}, 500, createjs.Ease.backOut);
	preloader.removeEventListener('complete', setStage);
}
var init = function(){
	var manifest = [
		{id: 'back', src: './background.png'},
		{id: 'piece', src: './piece.png'},
		{id: 'button', src: './button.png'},
		{id: 'text1', src: './text1.png'},
		{id: 'text2', src: './text2.png'},
		{id: 'text3', src: './text3.png'},
		{id: 'text4', src: './text4.png'}
	]
	preloader = new createjs.LoadQueue(false);
	preloader.addEventListener('complete', setStage);
	preloader.loadManifest(manifest);
}