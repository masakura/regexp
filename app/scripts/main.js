(function () {
  'use strict';

  var operators = [
    ['char', 'a'],
    ['split', 0, 2],
    ['match']
  ];

  $(document).on('click', '#exec', function () {
    var strings = $('#regexp-string').val().split('');
    var vm = myregexp.createVm(operators, strings);
    alert(vm.exec());
  });
})();
