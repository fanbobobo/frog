var a = { zhihu:0 };

Object.defineProperty(a, 'zhihu', {
  get: function() {
    console.log('get：' + zhihu);
    return zhihu;
  },
  set: function(value) {
    zhihu = value;
    console.log('set:' + zhihu);
  }
});

