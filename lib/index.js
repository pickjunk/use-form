"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function useForm(fields) {
  var _useState = (0, _react.useState)(function () {
    var form = {};

    var _loop = function _loop(_field) {
      var _fields$_field$valida = fields[_field].validators,
          validators = _fields$_field$valida === void 0 ? [] : _fields$_field$valida;
      form[_field] = {};
      var formField = form[_field];

      if (validators.length > 0) {
        var validate$ = new _rxjs.Subject();
        formField.validate$ = validate$;
        var pipeline$ = validate$.pipe((0, _operators.switchMap)(
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(v) {
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    formField.setStatus('pending');
                    formField.setError('');
                    return _context.abrupt("return", {
                      value: v,
                      error: ''
                    });

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop2 = function _loop2() {
            var validator = _step.value;

            if (validator.debounce) {
              pipeline$ = pipeline$.pipe((0, _operators.debounce)(function (_ref3) {
                var error = _ref3.error;
                // console.log(
                //   `debounce-${field}-${validators.indexOf(validator)}`,
                // );
                return (0, _rxjs.timer)(error ? 0 : validator.debounce);
              }));
            }

            pipeline$ = pipeline$.pipe((0, _operators.switchMap)(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(_ref4) {
                var value, error;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        value = _ref4.value, error = _ref4.error;

                        if (error) {
                          _context2.next = 5;
                          break;
                        }

                        _context2.next = 4;
                        return validator(value);

                      case 4:
                        error = _context2.sent;

                      case 5:
                        return _context2.abrupt("return", {
                          value: value,
                          error: error
                        });

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref5.apply(this, arguments);
              };
            }()));
          };

          for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var validateResolve;
        var validateReject;
        formField.validated = new Promise(function (resolve, reject) {
          validateResolve = resolve;
          validateReject = reject;
        });
        pipeline$.pipe((0, _operators.map)(function (_ref2) {
          var error = _ref2.error;

          if (error) {
            formField.setStatus('fail');
            formField.setError(error);
            return false;
          }

          formField.setStatus('success');
          formField.setError('');
          return true;
        })).subscribe(function (r) {
          validateResolve(r);
          formField.validated = new Promise(function (resolve, reject) {
            validateResolve = resolve;
            validateReject = reject;
          });
        }, function (e) {
          validateReject(e);
          formField.validated = new Promise(function (resolve, reject) {
            validateResolve = resolve;
            validateReject = reject;
          });
        });
      }
    };

    for (var _field in fields) {
      _loop(_field);
    }

    return form;
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      form = _useState2[0];

  for (var _field2 in fields) {
    var _fields$_field = fields[_field2],
        initValue = _fields$_field.initValue,
        _fields$_field$valida2 = _fields$_field.validators,
        validators = _fields$_field$valida2 === void 0 ? [] : _fields$_field$valida2;
    var formField = form[_field2];

    var _useState3 = (0, _react.useState)(initValue),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        _value = _useState4[0],
        setValue = _useState4[1];

    formField.value = _value;
    formField.setValue = setValue;

    if (validators.length > 0) {
      var _useState5 = (0, _react.useState)('none'),
          _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
          status = _useState6[0],
          setStatus = _useState6[1];

      formField.status = status;
      formField.setStatus = setStatus;

      var _useState7 = (0, _react.useState)(''),
          _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
          error = _useState8[0],
          setError = _useState8[1];

      formField.error = error;
      formField.setError = setError;
    }
  }

  function _validate2(_x3, _x4) {
    return _validate.apply(this, arguments);
  }

  function _validate() {
    _validate = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(field, value) {
      var _form$field2, validate$, validated, validations, _field5;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!field) {
                _context3.next = 8;
                break;
              }

              if (form[field]) {
                _context3.next = 3;
                break;
              }

              throw new Error("unknown form field [".concat(field, "]"));

            case 3:
              _form$field2 = form[field], validate$ = _form$field2.validate$, validated = _form$field2.validated;

              if (validate$) {
                _context3.next = 6;
                break;
              }

              throw new Error("form field [".concat(field, "] has not any validator, can not be validated"));

            case 6:
              validate$.next(value !== undefined ? value : form[field].value);
              return _context3.abrupt("return", validated);

            case 8:
              validations = [];

              for (_field5 in form) {
                if (form[_field5].validate$) {
                  validations.push(_validate2(_field5));
                }
              }

              return _context3.abrupt("return", Promise.all(validations).then(function (results) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var r = _step2.value;

                    if (r === false) {
                      return false;
                    }
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                      _iterator2.return();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }

                return true;
              }));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _validate.apply(this, arguments);
  }

  function data(field, value) {
    if (typeof field === 'string') {
      var _formField = form[field];

      if (!_formField) {
        throw new Error("unknown form field [".concat(field, "]"));
      }

      if (value !== undefined) {
        _formField.setValue(value);

        return;
      } else {
        return _formField.value;
      }
    }

    if ((0, _typeof2.default)(field) === 'object') {
      for (var f in field) {
        data(f, field[f]);
      }

      return;
    }

    var result = {};

    for (var _field3 in form) {
      result[_field3] = data(_field3);
    }

    return result;
  }

  return {
    field: function (_field4) {
      function field(_x5, _x6) {
        return _field4.apply(this, arguments);
      }

      field.toString = function () {
        return _field4.toString();
      };

      return field;
    }(function (field, render) {
      if (!form[field]) {
        throw new Error("unknown form field [".concat(field, "]"));
      }

      var _form$field = form[field],
          value = _form$field.value,
          setValue = _form$field.setValue,
          _form$field$status = _form$field.status,
          status = _form$field$status === void 0 ? 'none' : _form$field$status,
          _form$field$error = _form$field.error,
          error = _form$field$error === void 0 ? '' : _form$field$error;
      return render({
        value: value,
        setValue: setValue,
        status: status,
        error: error,
        validate: function validate(value) {
          return _validate2(field, value);
        }
      });
    }),
    validate: _validate2,
    data: data
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VGb3JtIiwiZmllbGRzIiwiZm9ybSIsImZpZWxkIiwidmFsaWRhdG9ycyIsImZvcm1GaWVsZCIsImxlbmd0aCIsInZhbGlkYXRlJCIsIlN1YmplY3QiLCJwaXBlbGluZSQiLCJwaXBlIiwidiIsInNldFN0YXR1cyIsInNldEVycm9yIiwidmFsdWUiLCJlcnJvciIsInZhbGlkYXRvciIsImRlYm91bmNlIiwidmFsaWRhdGVSZXNvbHZlIiwidmFsaWRhdGVSZWplY3QiLCJ2YWxpZGF0ZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1YnNjcmliZSIsInIiLCJlIiwiaW5pdFZhbHVlIiwic2V0VmFsdWUiLCJzdGF0dXMiLCJ2YWxpZGF0ZSIsIkVycm9yIiwibmV4dCIsInVuZGVmaW5lZCIsInZhbGlkYXRpb25zIiwicHVzaCIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiZGF0YSIsImYiLCJyZXN1bHQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBK0RlLFNBQVNBLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXVDO0FBQUEsa0JBQ3JDLHFCQUFTLFlBQVc7QUFDakMsUUFBTUMsSUFBZSxHQUFHLEVBQXhCOztBQURpQywrQkFHeEJDLE1BSHdCO0FBQUEsa0NBSUhGLE1BQU0sQ0FBQ0UsTUFBRCxDQUpILENBSXZCQyxVQUp1QjtBQUFBLFVBSXZCQSxVQUp1QixzQ0FJVixFQUpVO0FBTS9CRixNQUFBQSxJQUFJLENBQUNDLE1BQUQsQ0FBSixHQUFjLEVBQWQ7QUFDQSxVQUFNRSxTQUFTLEdBQUdILElBQUksQ0FBQ0MsTUFBRCxDQUF0Qjs7QUFFQSxVQUFJQyxVQUFVLENBQUNFLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsWUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7QUFDQUgsUUFBQUEsU0FBUyxDQUFDRSxTQUFWLEdBQXNCQSxTQUF0QjtBQUVBLFlBQUlFLFNBQVMsR0FBR0YsU0FBUyxDQUFDRyxJQUFWLENBQ2Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9DQUFVLGlCQUFlQyxDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUk4sb0JBQUFBLFNBQVMsQ0FBQ08sU0FBVixDQUFxQixTQUFyQjtBQUNBUCxvQkFBQUEsU0FBUyxDQUFDUSxRQUFWLENBQW9CLEVBQXBCO0FBRlEscURBR0Q7QUFDTEMsc0JBQUFBLEtBQUssRUFBRUgsQ0FERjtBQUVMSSxzQkFBQUEsS0FBSyxFQUFFO0FBRkYscUJBSEM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURjLENBQWhCO0FBSnlCO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsZ0JBY2hCQyxTQWRnQjs7QUFldkIsZ0JBQUlBLFNBQVMsQ0FBQ0MsUUFBZCxFQUF3QjtBQUN0QlIsY0FBQUEsU0FBUyxHQUFHQSxTQUFTLENBQUNDLElBQVYsQ0FDVix5QkFBUyxpQkFBb0I7QUFBQSxvQkFBVEssS0FBUyxTQUFUQSxLQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLHVCQUFPLGlCQUFNQSxLQUFLLEdBQUcsQ0FBSCxHQUFPQyxTQUFTLENBQUNDLFFBQTVCLENBQVA7QUFDRCxlQUxELENBRFUsQ0FBWjtBQVFEOztBQUVEUixZQUFBQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQ0MsSUFBVixDQUNWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUJJLHdCQUFBQSxLQUFqQixTQUFpQkEsS0FBakIsRUFBd0JDLEtBQXhCLFNBQXdCQSxLQUF4Qjs7QUFBQSw0QkFFSEEsS0FGRztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtCQUdRQyxTQUFTLENBQUNGLEtBQUQsQ0FIakI7O0FBQUE7QUFHTkMsd0JBQUFBLEtBSE07O0FBQUE7QUFBQSwwREFNRDtBQUNMRCwwQkFBQUEsS0FBSyxFQUFMQSxLQURLO0FBRUxDLDBCQUFBQSxLQUFLLEVBQUxBO0FBRksseUJBTkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFEVSxDQUFaO0FBMUJ1Qjs7QUFjekIsK0JBQXNCWCxVQUF0Qiw4SEFBa0M7QUFBQTtBQXlCakM7QUF2Q3dCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBeUN6QixZQUFJYyxlQUFKO0FBQ0EsWUFBSUMsY0FBSjtBQUNBZCxRQUFBQSxTQUFTLENBQUNlLFNBQVYsR0FBc0IsSUFBSUMsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQzFETCxVQUFBQSxlQUFlLEdBQUdJLE9BQWxCO0FBQ0FILFVBQUFBLGNBQWMsR0FBR0ksTUFBakI7QUFDRCxTQUhxQixDQUF0QjtBQUlBZCxRQUFBQSxTQUFTLENBQ05DLElBREgsQ0FFSSxvQkFBSSxpQkFBb0I7QUFBQSxjQUFUSyxLQUFTLFNBQVRBLEtBQVM7O0FBQ3RCLGNBQUlBLEtBQUosRUFBVztBQUNUVixZQUFBQSxTQUFTLENBQUNPLFNBQVYsQ0FBcUIsTUFBckI7QUFDQVAsWUFBQUEsU0FBUyxDQUFDUSxRQUFWLENBQW9CRSxLQUFwQjtBQUNBLG1CQUFPLEtBQVA7QUFDRDs7QUFFRFYsVUFBQUEsU0FBUyxDQUFDTyxTQUFWLENBQXFCLFNBQXJCO0FBQ0FQLFVBQUFBLFNBQVMsQ0FBQ1EsUUFBVixDQUFvQixFQUFwQjtBQUNBLGlCQUFPLElBQVA7QUFDRCxTQVZELENBRkosRUFjR1csU0FkSCxDQWVJLFVBQVNDLENBQVQsRUFBWTtBQUNWUCxVQUFBQSxlQUFlLENBQUNPLENBQUQsQ0FBZjtBQUNBcEIsVUFBQUEsU0FBUyxDQUFDZSxTQUFWLEdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUMxREwsWUFBQUEsZUFBZSxHQUFHSSxPQUFsQjtBQUNBSCxZQUFBQSxjQUFjLEdBQUdJLE1BQWpCO0FBQ0QsV0FIcUIsQ0FBdEI7QUFJRCxTQXJCTCxFQXNCSSxVQUFTRyxDQUFULEVBQVk7QUFDVlAsVUFBQUEsY0FBYyxDQUFDTyxDQUFELENBQWQ7QUFDQXJCLFVBQUFBLFNBQVMsQ0FBQ2UsU0FBVixHQUFzQixJQUFJQyxPQUFKLENBQVksVUFBU0MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDMURMLFlBQUFBLGVBQWUsR0FBR0ksT0FBbEI7QUFDQUgsWUFBQUEsY0FBYyxHQUFHSSxNQUFqQjtBQUNELFdBSHFCLENBQXRCO0FBSUQsU0E1Qkw7QUE4QkQ7QUF0RjhCOztBQUdqQyxTQUFLLElBQUlwQixNQUFULElBQWtCRixNQUFsQixFQUEwQjtBQUFBLFlBQWpCRSxNQUFpQjtBQW9GekI7O0FBRUQsV0FBT0QsSUFBUDtBQUNELEdBMUZjLENBRHFDO0FBQUE7QUFBQSxNQUM3Q0EsSUFENkM7O0FBNkZwRCxPQUFLLElBQUlDLE9BQVQsSUFBa0JGLE1BQWxCLEVBQTBCO0FBQUEseUJBQ2VBLE1BQU0sQ0FBQ0UsT0FBRCxDQURyQjtBQUFBLFFBQ2hCd0IsU0FEZ0Isa0JBQ2hCQSxTQURnQjtBQUFBLGdEQUNMdkIsVUFESztBQUFBLFFBQ0xBLFVBREssdUNBQ1EsRUFEUjtBQUd4QixRQUFNQyxTQUFTLEdBQUdILElBQUksQ0FBQ0MsT0FBRCxDQUF0Qjs7QUFId0IscUJBS0UscUJBQVN3QixTQUFULENBTEY7QUFBQTtBQUFBLFFBS2pCYixNQUxpQjtBQUFBLFFBS1ZjLFFBTFU7O0FBTXhCdkIsSUFBQUEsU0FBUyxDQUFDUyxLQUFWLEdBQWtCQSxNQUFsQjtBQUNBVCxJQUFBQSxTQUFTLENBQUN1QixRQUFWLEdBQXFCQSxRQUFyQjs7QUFFQSxRQUFJeEIsVUFBVSxDQUFDRSxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQUEsdUJBQ0cscUJBQWlCLE1BQWpCLENBREg7QUFBQTtBQUFBLFVBQ2xCdUIsTUFEa0I7QUFBQSxVQUNWakIsU0FEVTs7QUFFekJQLE1BQUFBLFNBQVMsQ0FBQ3dCLE1BQVYsR0FBbUJBLE1BQW5CO0FBQ0F4QixNQUFBQSxTQUFTLENBQUNPLFNBQVYsR0FBc0JBLFNBQXRCOztBQUh5Qix1QkFLQyxxQkFBUyxFQUFULENBTEQ7QUFBQTtBQUFBLFVBS2xCRyxLQUxrQjtBQUFBLFVBS1hGLFFBTFc7O0FBTXpCUixNQUFBQSxTQUFTLENBQUNVLEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0FWLE1BQUFBLFNBQVMsQ0FBQ1EsUUFBVixHQUFxQkEsUUFBckI7QUFDRDtBQUNGOztBQS9HbUQsV0FpSHJDaUIsVUFqSHFDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFpSHBELGtCQUF3QjNCLEtBQXhCLEVBQXdDVyxLQUF4QztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ01YLEtBRE47QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBRVNELElBQUksQ0FBQ0MsS0FBRCxDQUZiO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUdZLElBQUk0QixLQUFKLCtCQUFpQzVCLEtBQWpDLE9BSFo7O0FBQUE7QUFBQSw2QkFNcUNELElBQUksQ0FBQ0MsS0FBRCxDQU56QyxFQU1ZSSxTQU5aLGdCQU1ZQSxTQU5aLEVBTXVCYSxTQU52QixnQkFNdUJBLFNBTnZCOztBQUFBLGtCQVFTYixTQVJUO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQVNZLElBQUl3QixLQUFKLHVCQUNXNUIsS0FEWCxtREFUWjs7QUFBQTtBQWNJSSxjQUFBQSxTQUFTLENBQUN5QixJQUFWLENBQWVsQixLQUFLLEtBQUttQixTQUFWLEdBQXNCbkIsS0FBdEIsR0FBOEJaLElBQUksQ0FBQ0MsS0FBRCxDQUFKLENBQVlXLEtBQXpEO0FBZEosZ0RBZVdNLFNBZlg7O0FBQUE7QUFrQlFjLGNBQUFBLFdBbEJSLEdBa0JzQixFQWxCdEI7O0FBbUJFLG1CQUFTL0IsT0FBVCxJQUFrQkQsSUFBbEIsRUFBd0I7QUFDdEIsb0JBQUlBLElBQUksQ0FBQ0MsT0FBRCxDQUFKLENBQVlJLFNBQWhCLEVBQTJCO0FBQ3pCMkIsa0JBQUFBLFdBQVcsQ0FBQ0MsSUFBWixDQUFpQkwsVUFBUSxDQUFDM0IsT0FBRCxDQUF6QjtBQUNEO0FBQ0Y7O0FBdkJILGdEQXlCU2tCLE9BQU8sQ0FBQ2UsR0FBUixDQUFZRixXQUFaLEVBQXlCRyxJQUF6QixDQUE4QixVQUFTQyxPQUFULEVBQWtCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3JELHdDQUFjQSxPQUFkLG1JQUF1QjtBQUFBLHdCQUFkYixDQUFjOztBQUNyQix3QkFBSUEsQ0FBQyxLQUFLLEtBQVYsRUFBaUI7QUFDZiw2QkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUxvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU9yRCx1QkFBTyxJQUFQO0FBQ0QsZUFSTSxDQXpCVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQWpIb0Q7QUFBQTtBQUFBOztBQXFKcEQsV0FBU2MsSUFBVCxDQUFjcEMsS0FBZCxFQUF5RFcsS0FBekQsRUFBc0U7QUFDcEUsUUFBSSxPQUFPWCxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLFVBQU1FLFVBQVMsR0FBR0gsSUFBSSxDQUFDQyxLQUFELENBQXRCOztBQUNBLFVBQUksQ0FBQ0UsVUFBTCxFQUFnQjtBQUNkLGNBQU0sSUFBSTBCLEtBQUosK0JBQWlDNUIsS0FBakMsT0FBTjtBQUNEOztBQUVELFVBQUlXLEtBQUssS0FBS21CLFNBQWQsRUFBeUI7QUFDdkI1QixRQUFBQSxVQUFTLENBQUN1QixRQUFWLENBQW1CZCxLQUFuQjs7QUFDQTtBQUNELE9BSEQsTUFHTztBQUNMLGVBQU9ULFVBQVMsQ0FBQ1MsS0FBakI7QUFDRDtBQUNGOztBQUVELFFBQUksc0JBQU9YLEtBQVAsTUFBaUIsUUFBckIsRUFBK0I7QUFDN0IsV0FBSyxJQUFJcUMsQ0FBVCxJQUFjckMsS0FBZCxFQUFxQjtBQUNuQm9DLFFBQUFBLElBQUksQ0FBQ0MsQ0FBRCxFQUFJckMsS0FBSyxDQUFDcUMsQ0FBRCxDQUFULENBQUo7QUFDRDs7QUFDRDtBQUNEOztBQUVELFFBQU1DLE1BQU0sR0FBRyxFQUFmOztBQUdBLFNBQUssSUFBSXRDLE9BQVQsSUFBa0JELElBQWxCLEVBQXdCO0FBQ3RCdUMsTUFBQUEsTUFBTSxDQUFDdEMsT0FBRCxDQUFOLEdBQWdCb0MsSUFBSSxDQUFDcEMsT0FBRCxDQUFwQjtBQUNEOztBQUNELFdBQU9zQyxNQUFQO0FBQ0Q7O0FBRUQsU0FBTztBQUNMdEMsSUFBQUEsS0FESztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxnQkFDQ0EsS0FERCxFQUNnQnVDLE1BRGhCLEVBQ2dEO0FBQ25ELFVBQUksQ0FBQ3hDLElBQUksQ0FBQ0MsS0FBRCxDQUFULEVBQWtCO0FBQ2hCLGNBQU0sSUFBSTRCLEtBQUosK0JBQWlDNUIsS0FBakMsT0FBTjtBQUNEOztBQUhrRCx3QkFLTUQsSUFBSSxDQUFDQyxLQUFELENBTFY7QUFBQSxVQUszQ1csS0FMMkMsZUFLM0NBLEtBTDJDO0FBQUEsVUFLcENjLFFBTG9DLGVBS3BDQSxRQUxvQztBQUFBLDJDQUsxQkMsTUFMMEI7QUFBQSxVQUsxQkEsTUFMMEIsbUNBS2pCLE1BTGlCO0FBQUEsMENBS1RkLEtBTFM7QUFBQSxVQUtUQSxLQUxTLGtDQUtELEVBTEM7QUFPbkQsYUFBTzJCLE1BQU0sQ0FBQztBQUNaNUIsUUFBQUEsS0FBSyxFQUFMQSxLQURZO0FBRVpjLFFBQUFBLFFBQVEsRUFBUkEsUUFGWTtBQUdaQyxRQUFBQSxNQUFNLEVBQU5BLE1BSFk7QUFJWmQsUUFBQUEsS0FBSyxFQUFMQSxLQUpZO0FBS1plLFFBQUFBLFFBQVEsRUFBRSxrQkFBU2hCLEtBQVQsRUFBZ0I7QUFDeEIsaUJBQU9nQixVQUFRLENBQUMzQixLQUFELEVBQVFXLEtBQVIsQ0FBZjtBQUNEO0FBUFcsT0FBRCxDQUFiO0FBU0QsS0FqQkk7QUFrQkxnQixJQUFBQSxRQUFRLEVBQVJBLFVBbEJLO0FBbUJMUyxJQUFBQSxJQUFJLEVBQUpBO0FBbkJLLEdBQVA7QUFxQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIG1hcCwgZGVib3VuY2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8vIHN0YXR1cyBtYWNoaW5lOlxuLy8gbm9uZSAtPiBwZW5kaW5nXG4vLyBwZW5kaW5nIC0+IHN1Y2Nlc3MgLyBmYWlsXG4vLyBzdWNjZXNzIC8gZmFpbCAtPiBwZW5kaW5nXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRzIHtcbiAgW2ZpZWxkOiBzdHJpbmddOiB7XG4gICAgaW5pdFZhbHVlPzogYW55O1xuICAgIHZhbGlkYXRvcnM/OiBWYWxpZGF0ZVtdO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRlIHtcbiAgKHY6IGFueSk6IFByb21pc2U8c3RyaW5nPiB8IHN0cmluZztcbiAgZGVib3VuY2U/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBJbm5lckZvcm0ge1xuICBbZmllbGQ6IHN0cmluZ106IEZvcm1GaWVsZDtcbn1cblxudHlwZSBTdGF0dXMgPSAnbm9uZScgfCAncGVuZGluZycgfCAnc3VjY2VzcycgfCAnZmFpbCc7XG5cbmludGVyZmFjZSBGb3JtRmllbGQge1xuICB2YWx1ZTogYW55O1xuICBzZXRWYWx1ZTogUmVhY3QuRGlzcGF0Y2g8YW55PjtcbiAgc3RhdHVzPzogU3RhdHVzO1xuICBzZXRTdGF0dXM/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxTdGF0dXM+PjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIHNldEVycm9yPzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHZhbGlkYXRlJD86IFN1YmplY3Q8YW55PjtcbiAgdmFsaWRhdGVkPzogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlciB7XG4gIChwYXJhbXM6IHtcbiAgICB2YWx1ZTogYW55O1xuICAgIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICAgIHN0YXR1czogU3RhdHVzO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgdmFsaWRhdGU6ICh2YWx1ZTogYW55KSA9PiBQcm9taXNlPGFueT47XG4gIH0pOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybURhdGEge1xuICBbZmllbGQ6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgZmllbGQoZmllbGQ6IHN0cmluZywgcmVuZGVyOiBGaWVsZFJlbmRlcik6IFJlYWN0Tm9kZTtcbiAgdmFsaWRhdGU6IChmaWVsZD86IHN0cmluZywgdmFsdWU/OiBhbnkpID0+IFByb21pc2U8YW55PjtcbiAgZGF0YTogKFxuICAgIGZpZWxkPzpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IHtcbiAgICAgICAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgICAgICAgfSxcbiAgICB2YWx1ZT86IGFueSxcbiAgKSA9PiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZvcm0oZmllbGRzOiBGaWVsZHMpOiBGb3JtIHtcbiAgY29uc3QgW2Zvcm1dID0gdXNlU3RhdGUoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZm9ybTogSW5uZXJGb3JtID0ge307XG5cbiAgICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICAgIGNvbnN0IHsgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgICBmb3JtW2ZpZWxkXSA9IHt9IGFzIEZvcm1GaWVsZDtcbiAgICAgIGNvbnN0IGZvcm1GaWVsZCA9IGZvcm1bZmllbGRdO1xuXG4gICAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlJCA9IHZhbGlkYXRlJDtcblxuICAgICAgICBsZXQgcGlwZWxpbmUkID0gdmFsaWRhdGUkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdwZW5kaW5nJyk7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0RXJyb3IhKCcnKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB2LFxuICAgICAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBmb3IgKGxldCB2YWxpZGF0b3Igb2YgdmFsaWRhdG9ycykge1xuICAgICAgICAgIGlmICh2YWxpZGF0b3IuZGVib3VuY2UpIHtcbiAgICAgICAgICAgIHBpcGVsaW5lJCA9IHBpcGVsaW5lJC5waXBlKFxuICAgICAgICAgICAgICBkZWJvdW5jZShmdW5jdGlvbih7IGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAvLyAgIGBkZWJvdW5jZS0ke2ZpZWxkfS0ke3ZhbGlkYXRvcnMuaW5kZXhPZih2YWxpZGF0b3IpfWAsXG4gICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXIoZXJyb3IgPyAwIDogdmFsaWRhdG9yLmRlYm91bmNlKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBpcGVsaW5lJCA9IHBpcGVsaW5lJC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uKHsgdmFsdWUsIGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHZhbGlkYXRlLSR7ZmllbGR9LSR7dmFsaWRhdG9ycy5pbmRleE9mKHZhbGlkYXRvcil9YCk7XG4gICAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGF3YWl0IHZhbGlkYXRvcih2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWxpZGF0ZVJlc29sdmU6ICh2PzogYm9vbGVhbikgPT4gdm9pZDtcbiAgICAgICAgbGV0IHZhbGlkYXRlUmVqZWN0OiAoZT86IGFueSkgPT4gdm9pZDtcbiAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgdmFsaWRhdGVSZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBwaXBlbGluZSRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChmdW5jdGlvbih7IGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ2ZhaWwnKTtcbiAgICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0RXJyb3IhKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgnc3VjY2VzcycpO1xuICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0RXJyb3IhKCcnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlKHIpO1xuICAgICAgICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdChlKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3JtO1xuICB9KTtcblxuICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICBjb25zdCB7IGluaXRWYWx1ZSwgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybVtmaWVsZF07XG5cbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKGluaXRWYWx1ZSk7XG4gICAgZm9ybUZpZWxkLnZhbHVlID0gdmFsdWU7XG4gICAgZm9ybUZpZWxkLnNldFZhbHVlID0gc2V0VmFsdWU7XG5cbiAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGU8U3RhdHVzPignbm9uZScpO1xuICAgICAgZm9ybUZpZWxkLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMgPSBzZXRTdGF0dXM7XG5cbiAgICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgICAgZm9ybUZpZWxkLmVycm9yID0gZXJyb3I7XG4gICAgICBmb3JtRmllbGQuc2V0RXJyb3IgPSBzZXRFcnJvcjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZShmaWVsZD86IHN0cmluZywgdmFsdWU/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChmaWVsZCkge1xuICAgICAgaWYgKCFmb3JtW2ZpZWxkXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgdmFsaWRhdGUkLCB2YWxpZGF0ZWQgfSA9IGZvcm1bZmllbGRdO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlJCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYGZvcm0gZmllbGQgWyR7ZmllbGR9XSBoYXMgbm90IGFueSB2YWxpZGF0b3IsIGNhbiBub3QgYmUgdmFsaWRhdGVkYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdmFsaWRhdGUkLm5leHQodmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogZm9ybVtmaWVsZF0udmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbGlkYXRlZDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWxpZGF0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGZpZWxkIGluIGZvcm0pIHtcbiAgICAgIGlmIChmb3JtW2ZpZWxkXS52YWxpZGF0ZSQpIHtcbiAgICAgICAgdmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0ZShmaWVsZCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh2YWxpZGF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgICBmb3IgKGxldCByIG9mIHJlc3VsdHMpIHtcbiAgICAgICAgaWYgKHIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YShmaWVsZD86IHN0cmluZyB8IHsgW2ZpZWxkOiBzdHJpbmddOiBhbnkgfSwgdmFsdWU/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybVtmaWVsZF07XG4gICAgICBpZiAoIWZvcm1GaWVsZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmb3JtRmllbGQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGZvciAobGV0IGYgaW4gZmllbGQpIHtcbiAgICAgICAgZGF0YShmLCBmaWVsZFtmXSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0ge30gYXMge1xuICAgICAgW2ZpZWxkOiBzdHJpbmddOiBhbnlcbiAgICB9O1xuICAgIGZvciAobGV0IGZpZWxkIGluIGZvcm0pIHtcbiAgICAgIHJlc3VsdFtmaWVsZF0gPSBkYXRhKGZpZWxkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmllbGQoZmllbGQ6IHN0cmluZywgcmVuZGVyOiBGaWVsZFJlbmRlcik6IFJlYWN0Tm9kZSB7XG4gICAgICBpZiAoIWZvcm1bZmllbGRdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cyA9ICdub25lJywgZXJyb3IgPSAnJyB9ID0gZm9ybVtmaWVsZF07XG5cbiAgICAgIHJldHVybiByZW5kZXIoe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgc2V0VmFsdWUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0ZShmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZSxcbiAgICBkYXRhLFxuICB9O1xufVxuIl19