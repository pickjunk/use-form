"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

  var innerData = (0, _react.useRef)({});

  var _loop3 = function _loop3(_field2) {
    var _fields$_field = fields[_field2],
        initValue = _fields$_field.initValue,
        _fields$_field$valida2 = _fields$_field.validators,
        validators = _fields$_field$valida2 === void 0 ? [] : _fields$_field$valida2;
    var formField = form[_field2];

    var _useState3 = (0, _react.useState)(initValue),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        value = _useState4[0],
        setValue = _useState4[1];

    innerData.current[_field2] = value;
    formField.value = value;

    formField.setValue = function (v) {
      innerData.current = _objectSpread({}, innerData.current);
      setValue(v);
    };

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
  };

  for (var _field2 in fields) {
    _loop3(_field2);
  }

  function _validate2(_x3, _x4) {
    return _validate.apply(this, arguments);
  }

  function _validate() {
    _validate = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(field, value) {
      var _form$field2, validate$, validated, validations, _field4;

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

              for (_field4 in form) {
                if (form[_field4].validate$) {
                  validations.push(_validate2(_field4));
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
      var formField = form[field];

      if (!formField) {
        throw new Error("unknown form field [".concat(field, "]"));
      }

      if (value !== undefined) {
        formField.setValue(value);
        return;
      }

      return innerData.current[field];
    }

    if ((0, _typeof2.default)(field) === 'object') {
      for (var f in field) {
        data(f, field[f]);
      }

      return;
    }

    return innerData.current;
  }

  function link(field, props) {
    var f;

    if (typeof field === 'string') {
      f = field;
    }

    var p;

    if (!props) {
      p = field;
    } else {
      p = props;
    } // We must use a mutex to make sure "set value" and "onChange"
    // are not triggered at the same data flow circle.
    // Or it will cause infinite loop if the initial value are not
    // equal to the value from props, which is often happened!


    var mutex = (0, _react.useRef)(false);

    if ('value' in p) {
      (0, _react.useEffect)(function () {
        mutex.current = !mutex.current;
        if (!mutex.current) return;
        data(p.value);
      }, [p.value]);
    }

    if ('onChange' in p) {
      (0, _react.useEffect)(function () {
        mutex.current = !mutex.current;
        if (!mutex.current) return;
        p.onChange(data(f));
      }, [data(f)]);
    }
  }

  return {
    field: function (_field3) {
      function field(_x5, _x6) {
        return _field3.apply(this, arguments);
      }

      field.toString = function () {
        return _field3.toString();
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
    data: data,
    link: link
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VGb3JtIiwiZmllbGRzIiwiZm9ybSIsImZpZWxkIiwidmFsaWRhdG9ycyIsImZvcm1GaWVsZCIsImxlbmd0aCIsInZhbGlkYXRlJCIsIlN1YmplY3QiLCJwaXBlbGluZSQiLCJwaXBlIiwidiIsInNldFN0YXR1cyIsInNldEVycm9yIiwidmFsdWUiLCJlcnJvciIsInZhbGlkYXRvciIsImRlYm91bmNlIiwidmFsaWRhdGVSZXNvbHZlIiwidmFsaWRhdGVSZWplY3QiLCJ2YWxpZGF0ZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1YnNjcmliZSIsInIiLCJlIiwiaW5uZXJEYXRhIiwiaW5pdFZhbHVlIiwic2V0VmFsdWUiLCJjdXJyZW50Iiwic3RhdHVzIiwidmFsaWRhdGUiLCJFcnJvciIsIm5leHQiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9ucyIsInB1c2giLCJhbGwiLCJ0aGVuIiwicmVzdWx0cyIsImRhdGEiLCJmIiwibGluayIsInByb3BzIiwicCIsIm11dGV4Iiwib25DaGFuZ2UiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBcUVlLFNBQVNBLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXVDO0FBQUEsa0JBQ3JDLHFCQUFTLFlBQVc7QUFDakMsUUFBTUMsSUFBZSxHQUFHLEVBQXhCOztBQURpQywrQkFHeEJDLE1BSHdCO0FBQUEsa0NBSUhGLE1BQU0sQ0FBQ0UsTUFBRCxDQUpILENBSXZCQyxVQUp1QjtBQUFBLFVBSXZCQSxVQUp1QixzQ0FJVixFQUpVO0FBTS9CRixNQUFBQSxJQUFJLENBQUNDLE1BQUQsQ0FBSixHQUFjLEVBQWQ7QUFDQSxVQUFNRSxTQUFTLEdBQUdILElBQUksQ0FBQ0MsTUFBRCxDQUF0Qjs7QUFFQSxVQUFJQyxVQUFVLENBQUNFLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsWUFBTUMs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LEtBQUssRUFBTEEsS0FKWTtBQUtaaUIsUUFBQUEsUUFBUSxFQUFFLGtCQUFTbEIsS0FBVCxFQUFnQjtBQUN4QixpQkFBT2tCLFVBQVEsQ0FBQzdCLEtBQUQsRUFBUVcsS0FBUixDQUFmO0FBQ0Q7QUFQVyxPQUFELENBQWI7QUFTRCxLQWpCSTtBQWtCTGtCLElBQUFBLFFBQVEsRUFBUkEsVUFsQks7QUFtQkxTLElBQUFBLElBQUksRUFBSkEsSUFuQks7QUFvQkxFLElBQUFBLElBQUksRUFBSkE7QUFwQkssR0FBUDtBQXNCRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIG1hcCwgZGVib3VuY2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRzIHtcbiAgW2ZpZWxkOiBzdHJpbmddOiB7XG4gICAgaW5pdFZhbHVlPzogYW55O1xuICAgIHZhbGlkYXRvcnM/OiBWYWxpZGF0ZVtdO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRlIHtcbiAgKHY6IGFueSk6IFByb21pc2U8c3RyaW5nPiB8IHN0cmluZztcbiAgZGVib3VuY2U/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBJbm5lckZvcm0ge1xuICBbZmllbGQ6IHN0cmluZ106IEZvcm1GaWVsZDtcbn1cblxuLy8gc3RhdHVzIG1hY2hpbmU6XG4vLyBub25lIC0+IHBlbmRpbmdcbi8vIHBlbmRpbmcgLT4gc3VjY2VzcyAvIGZhaWxcbi8vIHN1Y2Nlc3MgLyBmYWlsIC0+IHBlbmRpbmdcblxudHlwZSBTdGF0dXMgPSAnbm9uZScgfCAncGVuZGluZycgfCAnc3VjY2VzcycgfCAnZmFpbCc7XG5cbmludGVyZmFjZSBGb3JtRmllbGQge1xuICB2YWx1ZTogYW55O1xuICBzZXRWYWx1ZTogUmVhY3QuRGlzcGF0Y2g8YW55PjtcbiAgc3RhdHVzPzogU3RhdHVzO1xuICBzZXRTdGF0dXM/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxTdGF0dXM+PjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIHNldEVycm9yPzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHZhbGlkYXRlJD86IFN1YmplY3Q8YW55PjtcbiAgdmFsaWRhdGVkPzogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlciB7XG4gIChwYXJhbXM6IHtcbiAgICB2YWx1ZTogYW55O1xuICAgIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICAgIHN0YXR1czogU3RhdHVzO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgdmFsaWRhdGU6ICh2YWx1ZTogYW55KSA9PiBQcm9taXNlPGFueT47XG4gIH0pOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybURhdGEge1xuICBbZmllbGQ6IHN0cmluZ106IGFueTtcbn1cblxuaW50ZXJmYWNlIExpbmtQcm9wcyB7XG4gIHZhbHVlOiBhbnk7XG4gIG9uQ2hhbmdlOiAodjogYW55KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm0ge1xuICBmaWVsZChmaWVsZDogc3RyaW5nLCByZW5kZXI6IEZpZWxkUmVuZGVyKTogUmVhY3ROb2RlO1xuICB2YWxpZGF0ZTogKGZpZWxkPzogc3RyaW5nLCB2YWx1ZT86IGFueSkgPT4gUHJvbWlzZTxhbnk+O1xuICBkYXRhOiAoXG4gICAgZmllbGQ/OlxuICAgICAgfCBzdHJpbmdcbiAgICAgIHwge1xuICAgICAgICAgIFtmaWVsZDogc3RyaW5nXTogYW55O1xuICAgICAgICB9LFxuICAgIHZhbHVlPzogYW55LFxuICApID0+IGFueTtcbiAgbGluazogKGZpZWxkOiBzdHJpbmcgfCBMaW5rUHJvcHMsIHByb3BzPzogTGlua1Byb3BzKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VGb3JtKGZpZWxkczogRmllbGRzKTogRm9ybSB7XG4gIGNvbnN0IFtmb3JtXSA9IHVzZVN0YXRlKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZvcm06IElubmVyRm9ybSA9IHt9O1xuXG4gICAgZm9yIChsZXQgZmllbGQgaW4gZmllbGRzKSB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRvcnMgPSBbXSB9ID0gZmllbGRzW2ZpZWxkXTtcblxuICAgICAgZm9ybVtmaWVsZF0gPSB7fSBhcyBGb3JtRmllbGQ7XG4gICAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtW2ZpZWxkXTtcblxuICAgICAgaWYgKHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZSQgPSB2YWxpZGF0ZSQ7XG5cbiAgICAgICAgbGV0IHBpcGVsaW5lJCA9IHZhbGlkYXRlJC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgncGVuZGluZycpO1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLmRlYm91bmNlKSB7XG4gICAgICAgICAgICBwaXBlbGluZSQgPSBwaXBlbGluZSQucGlwZShcbiAgICAgICAgICAgICAgZGVib3VuY2UoZnVuY3Rpb24oeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgLy8gICBgZGVib3VuY2UtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVyKGVycm9yID8gMCA6IHZhbGlkYXRvci5kZWJvdW5jZSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwaXBlbGluZSQgPSBwaXBlbGluZSQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbih7IHZhbHVlLCBlcnJvciB9KSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGB2YWxpZGF0ZS0ke2ZpZWxkfS0ke3ZhbGlkYXRvcnMuaW5kZXhPZih2YWxpZGF0b3IpfWApO1xuICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBhd2FpdCB2YWxpZGF0b3IodmFsdWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsaWRhdGVSZXNvbHZlOiAodj86IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgICAgIGxldCB2YWxpZGF0ZVJlamVjdDogKGU/OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgcGlwZWxpbmUkXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoZnVuY3Rpb24oeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdmYWlsJyk7XG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yIShlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZShyKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QoZSk7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybTtcbiAgfSk7XG5cbiAgY29uc3QgaW5uZXJEYXRhID0gdXNlUmVmKHt9IGFzIHtcbiAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgZmllbGQgaW4gZmllbGRzKSB7XG4gICAgY29uc3QgeyBpbml0VmFsdWUsIHZhbGlkYXRvcnMgPSBbXSB9ID0gZmllbGRzW2ZpZWxkXTtcblxuICAgIGNvbnN0IGZvcm1GaWVsZCA9IGZvcm1bZmllbGRdO1xuXG4gICAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShpbml0VmFsdWUpO1xuICAgIGlubmVyRGF0YS5jdXJyZW50W2ZpZWxkXSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC52YWx1ZSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2OiBhbnkpIHtcbiAgICAgIGlubmVyRGF0YS5jdXJyZW50ID0geyAuLi5pbm5lckRhdGEuY3VycmVudCB9O1xuICAgICAgc2V0VmFsdWUodik7XG4gICAgfTtcblxuICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZTxTdGF0dXM+KCdub25lJyk7XG4gICAgICBmb3JtRmllbGQuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyA9IHNldFN0YXR1cztcblxuICAgICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgICBmb3JtRmllbGQuZXJyb3IgPSBlcnJvcjtcbiAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciA9IHNldEVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlKGZpZWxkPzogc3RyaW5nLCB2YWx1ZT86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKGZpZWxkKSB7XG4gICAgICBpZiAoIWZvcm1bZmllbGRdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyB2YWxpZGF0ZSQsIHZhbGlkYXRlZCB9ID0gZm9ybVtmaWVsZF07XG5cbiAgICAgIGlmICghdmFsaWRhdGUkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgZm9ybSBmaWVsZCBbJHtmaWVsZH1dIGhhcyBub3QgYW55IHZhbGlkYXRvciwgY2FuIG5vdCBiZSB2YWxpZGF0ZWRgLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0ZSQubmV4dCh2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBmb3JtW2ZpZWxkXS52YWx1ZSk7XG4gICAgICByZXR1cm4gdmFsaWRhdGVkO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbGlkYXRpb25zID0gW107XG4gICAgZm9yIChsZXQgZmllbGQgaW4gZm9ybSkge1xuICAgICAgaWYgKGZvcm1bZmllbGRdLnZhbGlkYXRlJCkge1xuICAgICAgICB2YWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRlKGZpZWxkKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHZhbGlkYXRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICAgIGZvciAobGV0IHIgb2YgcmVzdWx0cykge1xuICAgICAgICBpZiAociA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkYXRhKGZpZWxkPzogc3RyaW5nIHwgeyBbZmllbGQ6IHN0cmluZ106IGFueSB9LCB2YWx1ZT86IGFueSkge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtW2ZpZWxkXTtcbiAgICAgIGlmICghZm9ybUZpZWxkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9ybUZpZWxkLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5uZXJEYXRhLmN1cnJlbnRbZmllbGRdO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKGxldCBmIGluIGZpZWxkKSB7XG4gICAgICAgIGRhdGEoZiwgZmllbGRbZl0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBpbm5lckRhdGEuY3VycmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpbmsoZmllbGQ6IHN0cmluZyB8IExpbmtQcm9wcywgcHJvcHM/OiBMaW5rUHJvcHMpIHtcbiAgICBsZXQgZjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmID0gZmllbGQ7XG4gICAgfVxuXG4gICAgbGV0IHA6IExpbmtQcm9wcztcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICBwID0gZmllbGQgYXMgTGlua1Byb3BzO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0gcHJvcHM7XG4gICAgfVxuXG4gICAgLy8gV2UgbXVzdCB1c2UgYSBtdXRleCB0byBtYWtlIHN1cmUgXCJzZXQgdmFsdWVcIiBhbmQgXCJvbkNoYW5nZVwiXG4gICAgLy8gYXJlIG5vdCB0cmlnZ2VyZWQgYXQgdGhlIHNhbWUgZGF0YSBmbG93IGNpcmNsZS5cbiAgICAvLyBPciBpdCB3aWxsIGNhdXNlIGluZmluaXRlIGxvb3AgaWYgdGhlIGluaXRpYWwgdmFsdWUgYXJlIG5vdFxuICAgIC8vIGVxdWFsIHRvIHRoZSB2YWx1ZSBmcm9tIHByb3BzLCB3aGljaCBpcyBvZnRlbiBoYXBwZW5lZCFcbiAgICBjb25zdCBtdXRleCA9IHVzZVJlZihmYWxzZSk7XG5cbiAgICBpZiAoJ3ZhbHVlJyBpbiBwKSB7XG4gICAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBtdXRleC5jdXJyZW50ID0gIW11dGV4LmN1cnJlbnQ7XG4gICAgICAgIGlmICghbXV0ZXguY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGRhdGEocC52YWx1ZSk7XG4gICAgICB9LCBbcC52YWx1ZV0pO1xuICAgIH1cbiAgICBpZiAoJ29uQ2hhbmdlJyBpbiBwKSB7XG4gICAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBtdXRleC5jdXJyZW50ID0gIW11dGV4LmN1cnJlbnQ7XG4gICAgICAgIGlmICghbXV0ZXguY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgIHAub25DaGFuZ2UoZGF0YShmKSk7XG4gICAgICB9LCBbZGF0YShmKV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmllbGQoZmllbGQ6IHN0cmluZywgcmVuZGVyOiBGaWVsZFJlbmRlcik6IFJlYWN0Tm9kZSB7XG4gICAgICBpZiAoIWZvcm1bZmllbGRdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cyA9ICdub25lJywgZXJyb3IgPSAnJyB9ID0gZm9ybVtmaWVsZF07XG5cbiAgICAgIHJldHVybiByZW5kZXIoe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgc2V0VmFsdWUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0ZShmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZSxcbiAgICBkYXRhLFxuICAgIGxpbmssXG4gIH07XG59XG4iXX0=