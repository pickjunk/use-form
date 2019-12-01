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

        if (f !== undefined) {
          data(f, p.value);
          return;
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VGb3JtIiwiZmllbGRzIiwiZm9ybSIsImZpZWxkIiwidmFsaWRhdG9ycyIsImZvcm1GaWVsZCIsImxlbmd0aCIsInZhbGlkYXRlJCIsIlN1YmplY3QiLCJwaXBlbGluZSQiLCJwaXBlIiwidiIsInNldFN0YXR1cyIsInNldEVycm9yIiwidmFsdWUiLCJlcnJvciIsInZhbGlkYXRvciIsImRlYm91bmNlIiwidmFsaWRhdGVSZXNvbHZlIiwidmFsaWRhdGVSZWplY3QiLCJ2YWxpZGF0ZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInN1YnNjcmliZSIsInIiLCJlIiwiaW5uZXJEYXRhIiwiaW5pdFZhbHVlIiwic2V0VmFsdWUiLCJjdXJyZW50Iiwic3RhdHVzIiwidmFsaWRhdGUiLCJFcnJvciIsIm5leHQiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9ucyIsInB1c2giLCJhbGwiLCJ0aGVuIiwicmVzdWx0cyIsImRhdGEiLCJmIiwibGluayIsInByb3BzIiwicCIsIm11dGV4Iiwib25DaGFuZ2UiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBcUVlLFNBQVNBLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXVDO0FBQUEsa0JBQ3JDLHFCQUFTLFlBQVc7QUFDakMsUUFBTUMsSUFBZSxHQUFHLEVBQXhCOztBQURpQywrQkFHeEJDLE1BSHdCO0FBQUEsa0NBSUhGLE1BQU0sQ0FBQ0UsTUFBRCxDQUpILENBSXZCQyxVQUp1QjtBQUFBLFVBSXZCQSxVQUp1QixzQ0FJVixFQUpVO0FBTS9CRixNQUFBQSxJQUFJLENBQUNDLE1BQUQsQ0FBSixHQUFjLEVBQWQ7QUFDQSxVQUFNRSxTQUFTLEdBQUdILElBQUksQ0FBQ0MsTUFBRCxDQUF0Qjs7QUFFQSxVQUFJQyxVQUFVLENBQUNFLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsWUFBTUMs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TSxDQUFDO0FBQ1psQyxRQUFBQSxLQUFLLEVBQUxBLEtBRFk7QUFFWmUsUUFBQUEsUUFBUSxFQUFSQSxRQUZZO0FBR1pFLFFBQUFBLE1BQU0sRUFBTkEsTUFIWTtBQUlaaEIsUUFBQUEsS0FBSyxFQUFMQSxLQUpZO0FBS1ppQixRQUFBQSxRQUFRLEVBQUUsa0JBQVNsQixLQUFULEVBQWdCO0FBQ3hCLGlCQUFPa0IsVUFBUSxDQUFDN0IsS0FBRCxFQUFRVyxLQUFSLENBQWY7QUFDRDtBQVBXLE9BQUQsQ0FBYjtBQVNELEtBakJJO0FBa0JMa0IsSUFBQUEsUUFBUSxFQUFSQSxVQWxCSztBQW1CTFMsSUFBQUEsSUFBSSxFQUFKQSxJQW5CSztBQW9CTEUsSUFBQUEsSUFBSSxFQUFKQTtBQXBCSyxHQUFQO0FBc0JEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCBSZWFjdE5vZGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgbWFwLCBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZHMge1xuICBbZmllbGQ6IHN0cmluZ106IHtcbiAgICBpbml0VmFsdWU/OiBhbnk7XG4gICAgdmFsaWRhdG9ycz86IFZhbGlkYXRlW107XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGUge1xuICAodjogYW55KTogUHJvbWlzZTxzdHJpbmc+IHwgc3RyaW5nO1xuICBkZWJvdW5jZT86IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIElubmVyRm9ybSB7XG4gIFtmaWVsZDogc3RyaW5nXTogRm9ybUZpZWxkO1xufVxuXG4vLyBzdGF0dXMgbWFjaGluZTpcbi8vIG5vbmUgLT4gcGVuZGluZ1xuLy8gcGVuZGluZyAtPiBzdWNjZXNzIC8gZmFpbFxuLy8gc3VjY2VzcyAvIGZhaWwgLT4gcGVuZGluZ1xuXG50eXBlIFN0YXR1cyA9ICdub25lJyB8ICdwZW5kaW5nJyB8ICdzdWNjZXNzJyB8ICdmYWlsJztcblxuaW50ZXJmYWNlIEZvcm1GaWVsZCB7XG4gIHZhbHVlOiBhbnk7XG4gIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICBzdGF0dXM/OiBTdGF0dXM7XG4gIHNldFN0YXR1cz86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFN0YXR1cz4+O1xuICBlcnJvcj86IHN0cmluZztcbiAgc2V0RXJyb3I/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgdmFsaWRhdGUkPzogU3ViamVjdDxhbnk+O1xuICB2YWxpZGF0ZWQ/OiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkUmVuZGVyIHtcbiAgKHBhcmFtczoge1xuICAgIHZhbHVlOiBhbnk7XG4gICAgc2V0VmFsdWU6IFJlYWN0LkRpc3BhdGNoPGFueT47XG4gICAgc3RhdHVzOiBTdGF0dXM7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICB2YWxpZGF0ZTogKHZhbHVlOiBhbnkpID0+IFByb21pc2U8YW55PjtcbiAgfSk6IFJlYWN0Tm9kZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtRGF0YSB7XG4gIFtmaWVsZDogc3RyaW5nXTogYW55O1xufVxuXG5pbnRlcmZhY2UgTGlua1Byb3BzIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9uQ2hhbmdlPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgZmllbGQoZmllbGQ6IHN0cmluZywgcmVuZGVyOiBGaWVsZFJlbmRlcik6IFJlYWN0Tm9kZTtcbiAgdmFsaWRhdGU6IChmaWVsZD86IHN0cmluZywgdmFsdWU/OiBhbnkpID0+IFByb21pc2U8YW55PjtcbiAgZGF0YTogKFxuICAgIGZpZWxkPzpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IHtcbiAgICAgICAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgICAgICAgfSxcbiAgICB2YWx1ZT86IGFueSxcbiAgKSA9PiBhbnk7XG4gIGxpbms6IChmaWVsZDogc3RyaW5nIHwgTGlua1Byb3BzLCBwcm9wcz86IExpbmtQcm9wcykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRm9ybShmaWVsZHM6IEZpZWxkcyk6IEZvcm0ge1xuICBjb25zdCBbZm9ybV0gPSB1c2VTdGF0ZShmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmb3JtOiBJbm5lckZvcm0gPSB7fTtcblxuICAgIGZvciAobGV0IGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgY29uc3QgeyB2YWxpZGF0b3JzID0gW10gfSA9IGZpZWxkc1tmaWVsZF07XG5cbiAgICAgIGZvcm1bZmllbGRdID0ge30gYXMgRm9ybUZpZWxkO1xuICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybVtmaWVsZF07XG5cbiAgICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGUkID0gdmFsaWRhdGUkO1xuXG4gICAgICAgIGxldCBwaXBlbGluZSQgPSB2YWxpZGF0ZSQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24odikge1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ3BlbmRpbmcnKTtcbiAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciEoJycpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IHZhbGlkYXRvciBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5kZWJvdW5jZSkge1xuICAgICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICAgIGRlYm91bmNlKGZ1bmN0aW9uKHsgZXJyb3IgfSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIC8vICAgYGRlYm91bmNlLSR7ZmllbGR9LSR7dmFsaWRhdG9ycy5pbmRleE9mKHZhbGlkYXRvcil9YCxcbiAgICAgICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lcihlcnJvciA/IDAgOiB2YWxpZGF0b3IuZGVib3VuY2UpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24oeyB2YWx1ZSwgZXJyb3IgfSkge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgdmFsaWRhdGUtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gKTtcbiAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gYXdhaXQgdmFsaWRhdG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRlUmVzb2x2ZTogKHY/OiBib29sZWFuKSA9PiB2b2lkO1xuICAgICAgICBsZXQgdmFsaWRhdGVSZWplY3Q6IChlPzogYW55KSA9PiB2b2lkO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHBpcGVsaW5lJFxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKGZ1bmN0aW9uKHsgZXJyb3IgfSkge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgnZmFpbCcpO1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciEoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciEoJycpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUocik7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0KGUpO1xuICAgICAgICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm07XG4gIH0pO1xuXG4gIGNvbnN0IGlubmVyRGF0YSA9IHVzZVJlZih7fSBhcyB7XG4gICAgW2ZpZWxkOiBzdHJpbmddOiBhbnk7XG4gIH0pO1xuXG4gIGZvciAobGV0IGZpZWxkIGluIGZpZWxkcykge1xuICAgIGNvbnN0IHsgaW5pdFZhbHVlLCB2YWxpZGF0b3JzID0gW10gfSA9IGZpZWxkc1tmaWVsZF07XG5cbiAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtW2ZpZWxkXTtcblxuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoaW5pdFZhbHVlKTtcbiAgICBpbm5lckRhdGEuY3VycmVudFtmaWVsZF0gPSB2YWx1ZTtcbiAgICBmb3JtRmllbGQudmFsdWUgPSB2YWx1ZTtcbiAgICBmb3JtRmllbGQuc2V0VmFsdWUgPSBmdW5jdGlvbiAodjogYW55KSB7XG4gICAgICBpbm5lckRhdGEuY3VycmVudCA9IHsgLi4uaW5uZXJEYXRhLmN1cnJlbnQgfTtcbiAgICAgIHNldFZhbHVlKHYpO1xuICAgIH07XG5cbiAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGU8U3RhdHVzPignbm9uZScpO1xuICAgICAgZm9ybUZpZWxkLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMgPSBzZXRTdGF0dXM7XG5cbiAgICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgICAgZm9ybUZpZWxkLmVycm9yID0gZXJyb3I7XG4gICAgICBmb3JtRmllbGQuc2V0RXJyb3IgPSBzZXRFcnJvcjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZShmaWVsZD86IHN0cmluZywgdmFsdWU/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChmaWVsZCkge1xuICAgICAgaWYgKCFmb3JtW2ZpZWxkXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgdmFsaWRhdGUkLCB2YWxpZGF0ZWQgfSA9IGZvcm1bZmllbGRdO1xuXG4gICAgICBpZiAoIXZhbGlkYXRlJCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYGZvcm0gZmllbGQgWyR7ZmllbGR9XSBoYXMgbm90IGFueSB2YWxpZGF0b3IsIGNhbiBub3QgYmUgdmFsaWRhdGVkYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdmFsaWRhdGUkLm5leHQodmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogZm9ybVtmaWVsZF0udmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbGlkYXRlZDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWxpZGF0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGZpZWxkIGluIGZvcm0pIHtcbiAgICAgIGlmIChmb3JtW2ZpZWxkXS52YWxpZGF0ZSQpIHtcbiAgICAgICAgdmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0ZShmaWVsZCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh2YWxpZGF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgICBmb3IgKGxldCByIG9mIHJlc3VsdHMpIHtcbiAgICAgICAgaWYgKHIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YShmaWVsZD86IHN0cmluZyB8IHsgW2ZpZWxkOiBzdHJpbmddOiBhbnkgfSwgdmFsdWU/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybVtmaWVsZF07XG4gICAgICBpZiAoIWZvcm1GaWVsZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlubmVyRGF0YS5jdXJyZW50W2ZpZWxkXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgZiBpbiBmaWVsZCkge1xuICAgICAgICBkYXRhKGYsIGZpZWxkW2ZdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5uZXJEYXRhLmN1cnJlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBsaW5rKGZpZWxkOiBzdHJpbmcgfCBMaW5rUHJvcHMsIHByb3BzPzogTGlua1Byb3BzKSB7XG4gICAgbGV0IGY6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgZiA9IGZpZWxkO1xuICAgIH1cblxuICAgIGxldCBwOiBMaW5rUHJvcHM7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgcCA9IGZpZWxkIGFzIExpbmtQcm9wcztcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHByb3BzO1xuICAgIH1cblxuICAgIC8vIFdlIG11c3QgdXNlIGEgbXV0ZXggdG8gbWFrZSBzdXJlIFwic2V0IHZhbHVlXCIgYW5kIFwib25DaGFuZ2VcIlxuICAgIC8vIGFyZSBub3QgdHJpZ2dlcmVkIGF0IHRoZSBzYW1lIGRhdGEgZmxvdyBjaXJjbGUuXG4gICAgLy8gT3IgaXQgd2lsbCBjYXVzZSBpbmZpbml0ZSBsb29wIGlmIHRoZSBpbml0aWFsIHZhbHVlIGFyZSBub3RcbiAgICAvLyBlcXVhbCB0byB0aGUgdmFsdWUgZnJvbSBwcm9wcywgd2hpY2ggaXMgb2Z0ZW4gaGFwcGVuZWQhXG4gICAgY29uc3QgbXV0ZXggPSB1c2VSZWYoZmFsc2UpO1xuXG4gICAgaWYgKCd2YWx1ZScgaW4gcCkge1xuICAgICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXV0ZXguY3VycmVudCA9ICFtdXRleC5jdXJyZW50O1xuICAgICAgICBpZiAoIW11dGV4LmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBpZiAoZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGF0YShmLCBwLnZhbHVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhKHAudmFsdWUpO1xuICAgICAgfSwgW3AudmFsdWVdKTtcbiAgICB9XG4gICAgaWYgKCdvbkNoYW5nZScgaW4gcCkge1xuICAgICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXV0ZXguY3VycmVudCA9ICFtdXRleC5jdXJyZW50O1xuICAgICAgICBpZiAoIW11dGV4LmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICBwLm9uQ2hhbmdlIShkYXRhKGYpKTtcbiAgICAgIH0sIFtkYXRhKGYpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWVsZChmaWVsZDogc3RyaW5nLCByZW5kZXI6IEZpZWxkUmVuZGVyKTogUmVhY3ROb2RlIHtcbiAgICAgIGlmICghZm9ybVtmaWVsZF0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHZhbHVlLCBzZXRWYWx1ZSwgc3RhdHVzID0gJ25vbmUnLCBlcnJvciA9ICcnIH0gPSBmb3JtW2ZpZWxkXTtcblxuICAgICAgcmV0dXJuIHJlbmRlcih7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBzZXRWYWx1ZSxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRlKGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHZhbGlkYXRlLFxuICAgIGRhdGEsXG4gICAgbGluayxcbiAgfTtcbn1cbiJdfQ==