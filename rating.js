var Rating = function (el, doc) {
	this.el = el;
	this.doc = doc;
	this.instantiate();
	this.currScore = 0;
	this.sumScore = 0;
	this.avgScore = 0;
	this.votes = 0;
	
	this.el.addEventListener("click", this.changeState.bind(this));
};

Rating.prototype.addScore = function () {
	this.votes++;
	this.sumScore += this.currScore;
	this.avgScore = this.sumScore / this.votes;
};

Rating.prototype.changeState = function (event) {
	var star = event.target, currentStar = this.el.firstChild, i;
	
	while (currentStar !== null) {
		currentStar.classList.remove("full-star");
		currentStar = currentStar.nextElementSibling;
	}
	
	currentStar = this.el.firstChild;
	this.currScore = 0;
	while (currentStar !== null && star !== currentStar.previousElementSibling) {
		currentStar.classList.add("full-star");
		currentStar = currentStar.nextElementSibling;
		this.currScore++;
	}
};

Rating.prototype.instantiate = function () {
	var i, star;
	for (i = 0; i < 5; i++) {
		star = this.doc.createElement("span");
		star.classList.add("empty-star", "star");
		this.el.appendChild(star);
	}
	this.el.classList.add("rating-container");
};

Rating.prototype.score = function () {
	return
};