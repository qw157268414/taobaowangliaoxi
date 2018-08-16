//设置cookie
function setCookie(name, value, expires, path, domain, secure) {
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(expires instanceof Date) {
		cookieText += ";expires=" + expires;
	}
	if(path) {
		cookieText += ";path=" + path;
	}
	if(domain) {
		cookieText += ";domain=" + domain;
	}
	if(secure) {
		cookieText += ";" + secure;
	}
	document.cookie = cookieText;
	return decodeURIComponent(cookieText);
}
//获取cookie
function getCookie(name) {
	var cookie = decodeURIComponent(document.cookie);
	//user4=abc;user=zhang3;user5=abc
	var cookieStr = cookie.replace(/ /g, "");
	var arr = cookieStr.split(";");
	for(var i = 0; i < arr.length; i++) {
		var str = arr[i];
		var arr2 = str.split("=");
		if(arr2.length >= 2) {
			if(arr2[0] == name) {
				return arr2[1];
			}
		}
	}
	return null;
}
//删除cookie
function removeCookie(name) {
	document.cookie = encodeURIComponent(name) + "= ; expires=" + new Date();
}
//获取属性
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
//匀速运动
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
//多个属性缓冲运动
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
				timerstop = false;
			}
			if(attr == "opacity") {
				obj.style[attr] = (start + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (start + speed) + ")";
			} else {
				obj.style[attr] = start + speed + "px";
			}
		}
		if(timerstop) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, time)
}
//抛物线
function paowuxian(obj, speed1, a) {
	var speed2 = 0;
	obj.timer = setInterval(function() {
		speed2 += a;
		obj.style.left = obj.offsetLeft + speed1 + "px";
		obj.style.top = obj.offsetTop + speed2 + "px";
	}, 100)
}
//回到顶部
function backnav(targgt) {
	var body=document.documentElement||document.body;
	var a=0;
	clearInterval(body.timer);
	body.timer = setInterval(function() {
		var start = document.documentElement.scrollTop||document.body.scrollTop;
		var speed = (targgt-start) / 2;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		document.documentElement.scrollTop=document.body.scrollTop = start + speed;
		if(Math.abs(start-targgt)<=5) {
			clearInterval(body.timer);
			return;
		}
	}, 50)
}
//兼容写法
function createXhr() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	return new ActiveXObject("Microsoft.XMLHTTP");
}