(function () {
  'use strict';

  var operators = [
    ['split', 1, 3],
    ['char', 'a'],
    ['jmp', 0],
    ['match']
  ];

  var createThread = function (operators, strings, vm, pc, sp) {
    pc = pc || 0;
    sp = sp || 0;
    var id = vm.newThreadId();

    console.log('[' + id + '] create (PC=' + pc + ', SP= ' + sp + ')');

    return {
      getOperator: function () {
        return operators[pc++];
      },
      getChar: function () {
        return strings[sp];
      },
      incrementSp: function () {
        sp++;
      },
      execOne: function () {
        var operator = this.getOperator();

        var log = '[' + id + '] ' + operator.join(' ');
        console.log(log);

        switch (operator[0]) {
        case 'char':
          if (operator[1] === this.getChar()) {
            console.log('EQUAL!!!!');
            this.incrementSp();
            return 'next';
          }
          break;

        case 'split':
          var newThread = this.clone(operator[2]);
          vm.push(newThread);

          pc = operator[1];
          return 'next';

        case 'jmp':
          pc = operator[1];
          return 'next';

        case 'match':
          return 'match';
        }

        return false;
      },
      exec: function () {
        while (true) {
          var result = this.execOne();
          if (!result) {
            return false;
          } else if (result === 'match') {
            return true;
          }
        }

        return true;
      },
      clone: function (pc) {
        return createThread(operators, strings, vm, pc, sp);
      }
    };
  };

  var createVm = function (operators, strings) {
    var threadId = 0;
    var threads = [];

    var vm = {
      newThreadId: function () {
        return threadId++;
      },
      push: function (thread) {
        threads.push(thread);
      },
      exec: function () {
        while (true) {
          var thread = threads.pop();
          if (!thread) {
            return false;
          }

          if (thread.exec()) {
            return true;
          }
        }
      }
    };

    vm.push(createThread(operators, strings, vm, 0, 0));

    return vm;
  };

  $(document).on('click', '#exec', function () {
    var strings = $('#regexp-string').val().split('');
    var vm = createVm(operators, strings);
    alert(vm.exec());
  });
})();
