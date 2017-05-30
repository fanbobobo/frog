a.zhihu = 4;
function count() {
	a.zhihu += 1;
	setTimeout("count()", 500);
}
count();
console.log(a.zhihu);