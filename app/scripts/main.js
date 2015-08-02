(function () {
  'use strict';

  var operators = [
    ['char', 'a'],
    ['split', 0, 2],
    ['match']
  ];

  var createThread = myregexp.createThread;
  var createVm = myregexp.createVm;

  $(document).on('click', '#exec', function () {
    var strings = $('#regexp-string').val().split('');
    var vm = createVm(operators, strings);
    alert(vm.exec());
  });
})();
