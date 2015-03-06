var Rating = function (elRating, elDisplay, doc) {
	this.elRating = elRating;
	this.elDisplay = elDisplay;
	this.doc = doc;
	this.instantiateContainer(this.elRating);
	this.instantiateContainer(this.elDisplay);
	this.currScore = 0;
	this.sumScore = 0;
	this.avgScore = 0;
	this.votes = 0;
	
	this.elRating.addEventListener("click", this.updateRating.bind(this));
};

Rating.prototype.addScore = function () {
	this.votes++;
	this.sumScore += this.currScore;
	this.avgScore = this.sumScore / this.votes;
	this.updateDisplay();
};

Rating.prototype.clearStars = function (container) {
	var currStar = container.firstChild;
	while (currStar !== null) {
		currStar.classList.remove("full-star", "half-star");
		currStar = currStar.nextElementSibling;
	}
};

Rating.prototype.getScore = function () {
	if (this.avgScore > Math.floor(this.avgScore)) { return Math.floor(this.avgScore) + 0.5; }
	return this.avgScore;
};

Rating.prototype.instantiateContainer = function (container) {
	var i, star;
	for (i = 0; i < 5; i++) {
		star = this.doc.createElement("span");
		star.classList.add("empty-star", "star");
		container.appendChild(star);
	}
	container.classList.add("rating-container");
};

Rating.prototype.updateDisplay = function () {
	var i, currStar;
	
	this.clearStars(this.elDisplay);
	
	currStar = this.elDisplay.firstChild;
	for (i = 0; i < Math.floor(this.avgScore); i++) {
		currStar.classList.add("full-star");
		currStar = currStar.nextElementSibling;
	}
	if (this.avgScore > Math.floor(this.avgScore)) { currStar.classList.add("half-star"); }
};

Rating.prototype.updateRating = function (event) {
	var star = event.target, currentStar = this.elRating.firstChild, i;
	
	this.clearStars(this.elRating);
	
	currentStar = this.elRating.firstChild;
	this.currScore = 0;
	while (currentStar !== null && star !== currentStar.previousElementSibling) {
		currentStar.classList.add("full-star");
		currentStar = currentStar.nextElementSibling;
		this.currScore++;
	}
};