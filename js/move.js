function getStyleAttr(obj, attr) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[attr];
	} else {
		return obj.currentStyle[attr];
	}
}

function buffer(obj, attr, target, time, fn) {
	clearInterval(obj.timer);
	var start = 0;
	if(attr == "opacity") {
		target *= 100;
	}
	obj.timer = setInterval(function() {
		if(attr == "opacity") {
			start = parseInt(getStyleAttr(obj, attr) * 100);
		} else {
			start = parseInt(getStyleAttr(obj, attr));
		}
		var speed = (target - start) / 2;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(start == target) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
			return;
		} else {
			if(attr == "opacity") {
				obj.style[attr] = (start + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
			} else {
				obj.style[attr] = start + speed + "px";
			}
		}
	}, time)
}

function motion(obj, attr, target, time, fn) {
	clearInterval(obj.timer);
	if(attr == "opacity") {
		target *= 100;
		start = parseInt(getStyleAttr(obj, attr) * 100);
	} else {
		start = parseInt(getStyleAttr(obj, attr));
	}
	var speed = (target - start) / 10;
	obj.timer = setInterval(function() {
		if(attr == "opacity") {
			start = parseInt(getStyleAttr(obj, attr) * 100);
		} else {
			start = parseInt(getStyleAttr(obj, attr));
		}
		if(speed > 0) {
			if(start >= target) {
				clearInterval(obj.timer);
				if(fn) {
					fn();
				}
				return;
			} else {
				if(attr == "opacity") {
					obj.style[attr] = (start + speed) / 100;
					obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
				} else {
					obj.style[attr] = start + speed + "px";
				}
			}
		} else {
			if(start <= target) {
				clearInterval(obj.timer);
				if(fn) {
					fn();
				}
				return;
			} else {
				if(attr == "opacity") {
					obj.style[attr] = (start + speed) / 100;
					obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
				} else {
					obj.style[attr] = start + speed + "px";
				}
			}
		}
	}, time)
}
function buffer_move(obj, attr, target, attr2, target2, time, fn) {
	clearInterval(obj.timer);
	var num1=0;
	var num2=0;
	if(attr == "opacity") {
		target *= 100;
	}
	if(attr2 == "opacity") {
		target2 *= 100;
		start2 = parseInt(getStyleAttr(obj, attr2) * 100);
	} else {
		
		start2 = parseInt(getStyleAttr(obj, attr2));
	}
	var speed2 = (target2 - start2) / 50;
	obj.timer = setInterval(function() {
		if(attr == "opacity") {
			start = parseInt(getStyleAttr(obj, attr) * 100);
		} else {
			start = parseInt(getStyleAttr(obj, attr));
		}
		if(attr2 == "opacity") {
			start2 = parseInt(getStyleAttr(obj, attr2) * 100);
		} else {
			start2 = parseInt(getStyleAttr(obj, attr2));
		}
		var speed = (target - start) / 10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(start == target) {
			num1=1;
			speed = 0;
		} else{
			if(attr == "opacity") {
				obj.style[attr] = (start + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
			} else {
				obj.style[attr] = start + speed + "px";
			}
		}
		if(speed2 > 0) {
			if(start2 >= target2) {
				num2=1;
				speed2 = 0;
			} else {
				if(attr2 == "opacity") {
					obj.style[attr2] = (start2 + speed2) / 100;
					obj.style.filter = "alpha(opacity=" + (start2 + speed2) + ")";
				} else {
					obj.style[attr2] = start2 + speed2 + "px";
				}
			}
		} else{
			if(start2 <= target2) {
				num2=1;
				speed2 = 0;
			} else {
				if(attr2 == "opacity") {
					obj.style[attr2] = (start2 + speed2) / 100;
					obj.style.filter = "alpha(opacity=" + (start2 + speed2) + ")";
				} else {
					obj.style[attr2] = start2 + speed2 + "px";
				}
			}
		}
		if(num1==1&&num2==1){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
			return;
		}
	}, time)
}
function nbuffer(obj, json, time, fn) {
	clearInterval(obj.timer);
	var timerstop;
	obj.timer = setInterval(function() {
		for(var attr in json) {
			var target = json[attr];
			if(attr == "opacity") {
				target *= 100;
				start = parseInt(getStyleAttr(obj, attr) * 100);
			} else {
				start = parseInt(getStyleAttr(obj, attr));
			}
			var speed = (target - start) / 5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(start == target) {
				timerstop = true;
			} else {
				timerstop=false;
			}
			if(attr == "opacity") {
				obj.style[attr] = (start + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
			} else {
				obj.style[attr] = start + speed + "px";
			}
		}
		if(timerstop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}, time)
}
function backtop(obj) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var start = obj.scrollTop;
		var speed = start / 2;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		obj.scrollTop = start - speed;
		if(obj.scrollTop==0){
			clearInterval(obj.timer);
			return;
		}
	}, 100)
}