"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ctx = _react.default.createContext(null);

function useForm(fields) {
  var _useState = (0, _react.useState)(function () {
    var form = {
      fields: {},
      values: {},
      children: new Set(),
      field: function (_field) {
        function field(_x, _x2) {
          return _field.apply(this, arguments);
        }

        field.toString = function () {
          return _field.toString();
        };

        return field;
      }(function (field, render) {
        if (!form.fields[field]) {
          throw new Error("unknown form field [".concat(field, "]"));
        }

        var _form$fields$field = form.fields[field],
            value = _form$fields$field.value,
            setValue = _form$fields$field.setValue,
            _form$fields$field$st = _form$fields$field.status,
            status = _form$fields$field$st === void 0 ? 'none' : _form$fields$field$st,
            _form$fields$field$er = _form$fields$field.error,
            error = _form$fields$field$er === void 0 ? '' : _form$fields$field$er;
        return _react.default.createElement(ctx.Provider, {
          value: form.children
        }, render({
          value: value,
          setValue: setValue,
          status: status,
          error: error,
          validate: function validate(value) {
            return form.validate(field, value);
          }
        }));
      }),
      data: function data(field, value) {
        if (typeof field === 'string') {
          var formField = form.fields[field];

          if (!formField) {
            throw new Error("unknown form field [".concat(field, "]"));
          }

          if (value !== undefined) {
            formField.setValue(value);
            return;
          }

          return form.values[field];
        }

        if ((0, _typeof2.default)(field) === 'object') {
          for (var f in field) {
            form.data(f, field[f]);
          }

          return;
        }

        return form.values;
      },
      validate: function () {
        var _validate = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(field, v) {
          var _form$fields$field2, validate$, validated, _value, validations, queue, _form, _field2, _form$fields$_field, _validate$, _validated, _value2;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!field) {
                    _context.next = 8;
                    break;
                  }

                  if (form.fields[field]) {
                    _context.next = 3;
                    break;
                  }

                  throw new Error("unknown form field [".concat(field, "]"));

                case 3:
                  _form$fields$field2 = form.fields[field], validate$ = _form$fields$field2.validate$, validated = _form$fields$field2.validated, _value = _form$fields$field2.value;

                  if (validate$) {
                    _context.next = 6;
                    break;
                  }

                  throw new Error("form field [".concat(field, "] has not any validator, can not be validated"));

                case 6:
                  validate$.next(v !== undefined ? v : _value);
                  return _context.abrupt("return", validated);

                case 8:
                  validations = []; // breadth-first validating

                  queue = [form];

                case 10:
                  if (!true) {
                    _context.next = 18;
                    break;
                  }

                  _form = queue.shift();

                  if (_form) {
                    _context.next = 14;
                    break;
                  }

                  return _context.abrupt("break", 18);

                case 14:
                  for (_field2 in _form.fields) {
                    _form$fields$_field = _form.fields[_field2], _validate$ = _form$fields$_field.validate$, _validated = _form$fields$_field.validated, _value2 = _form$fields$_field.value;

                    if (_validate$ && _validated) {
                      _validate$.next(_value2);

                      validations.push(_validated);
                    }
                  }

                  queue.push.apply(queue, (0, _toConsumableArray2.default)(_form.children));
                  _context.next = 10;
                  break;

                case 18:
                  return _context.abrupt("return", Promise.all(validations).then(function (results) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var r = _step.value;

                        if (r === false) {
                          return false;
                        }
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

                    return true;
                  }));

                case 19:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function validate(_x3, _x4) {
          return _validate.apply(this, arguments);
        }

        return validate;
      }(),
      // We must use a mutex to make sure "set value" and "onChange"
      // are not triggered at the same data flow circle.
      // Or infinite loop occurs if the initial value are not
      // equal to the value from props, which often happens!
      mutex: false,
      link: function link(field, props) {
        var f;

        if (typeof field === 'string') {
          f = field;
        }

        var p;

        if (!props) {
          p = field;
        } else {
          p = props;
        }

        if ('value' in p) {
          (0, _react.useEffect)(function () {
            if ('onChange' in p) {
              form.mutex = !form.mutex;
              if (!form.mutex) return;
            }

            if (f !== undefined) {
              form.data(f, p.value[f]);
              return;
            }

            form.data(p.value);
          }, [p.value]);
        }

        if ('onChange' in p) {
          (0, _react.useEffect)(function () {
            if ('value' in p) {
              form.mutex = !form.mutex;
              if (!form.mutex) return;
            }

            p.onChange(form.data(f));
          }, [form.data(f)]);
        }
      }
    }; // init field validation pipelines

    var _loop = function _loop(_field3) {
      var _fields$_field3$valid = fields[_field3].validators,
          validators = _fields$_field3$valid === void 0 ? [] : _fields$_field3$valid;
      form.fields[_field3] = {};
      var formField = form.fields[_field3];

      if (validators.length > 0) {
        var validate$ = new _rxjs.Subject();
        formField.validate$ = validate$;
        var pipeline$ = validate$.pipe((0, _operators.switchMap)(
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee2(v) {
            return _regenerator.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    formField.setStatus('pending');
                    formField.setError('');
                    return _context2.abrupt("return", {
                      value: v,
                      error: ''
                    });

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x5) {
            return _ref.apply(this, arguments);
          };
        }()));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop2 = function _loop2() {
            var v = _step2.value;

            if (v.debounce) {
              pipeline$ = pipeline$.pipe((0, _operators.debounce)(function (_ref3) {
                var error = _ref3.error;
                // console.log(
                //   `debounce-${field}-${validators.indexOf(validator)}`,
                // );
                return (0, _rxjs.timer)(error ? 0 : v.debounce);
              }));
            }

            pipeline$ = pipeline$.pipe((0, _operators.switchMap)(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee3(_ref4) {
                var value, error;
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        value = _ref4.value, error = _ref4.error;

                        if (error) {
                          _context3.next = 5;
                          break;
                        }

                        _context3.next = 4;
                        return v.validator(value);

                      case 4:
                        error = _context3.sent;

                      case 5:
                        return _context3.abrupt("return", {
                          value: value,
                          error: error
                        });

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x6) {
                return _ref5.apply(this, arguments);
              };
            }()));
          };

          for (var _iterator2 = validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop2();
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

    for (var _field3 in fields) {
      _loop(_field3);
    }

    return form;
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      form = _useState2[0]; // attach value, setValue, status, setStatus, error, setError to form field


  var _loop3 = function _loop3(_field4) {
    var _fields$_field = fields[_field4],
        initValue = _fields$_field.initValue,
        _fields$_field$valida = _fields$_field.validators,
        validators = _fields$_field$valida === void 0 ? [] : _fields$_field$valida;
    var formField = form.fields[_field4];

    var _useState3 = (0, _react.useState)(initValue),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        value = _useState4[0],
        setValue = _useState4[1];

    form.values[_field4] = value;
    formField.value = value;

    formField.setValue = function (v) {
      form.values = _objectSpread({}, form.values);
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

  for (var _field4 in fields) {
    _loop3(_field4);
  } // if parent form exists, attach form instance to it as a child


  var children = (0, _react.useContext)(ctx);

  if (children) {
    (0, _react.useEffect)(function () {
      children.add(form);
      return function () {
        children.delete(form);
      };
    }, []);
  }

  return form;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiY3R4IiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlRm9ybSIsImZpZWxkcyIsImZvcm0iLCJ2YWx1ZXMiLCJjaGlsZHJlbiIsIlNldCIsImZpZWxkIiwicmVuZGVyIiwiRXJyb3IiLCJ2YWx1ZSIsInNldFZhbHVlIiwic3RhdHVzIiwiZXJyb3IiLCJ2YWxpZGF0ZSIsImRhdGEiLCJmb3JtRmllbGQiLCJ1bmRlZmluZWQiLCJmIiwidiIsInZhbGlkYXRlJCIsInZhbGlkYXRlZCIsIm5leHQiLCJ2YWxpZGF0aW9ucyIsInF1ZXVlIiwic2hpZnQiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiciIsIm11dGV4IiwibGluayIsInByb3BzIiwicCIsIm9uQ2hhbmdlIiwidmFsaWRhdG9ycyIsImxlbmd0aCIsIlN1YmplY3QiLCJwaXBlbGluZSQiLCJwaXBlIiwic2V0U3RhdHVzIiwic2V0RXJyb3IiLCJkZWJvdW5jZSIsInZhbGlkYXRvciIsInZhbGlkYXRlUmVzb2x2ZSIsInZhbGlkYXRlUmVqZWN0IiwicmVzb2x2ZSIsInJlamVjdCIsInN1YnNjcmliZSIsImUiLCJpbml0VmFsdWUiLCJhZGQiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7Ozs7OztBQTBGQSxJQUFNQSxHQUFHLEdBQUdDLGVBQU1DLGFBQU4sQ0FBMkMsSUFBM0MsQ0FBWjs7QUFFZSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF1QztBQUFBLGtCQUNyQyxxQkFBUyxZQUFZO0FBQ2xDLFFBQU1DLElBQWUsR0FBRztBQUN0QkQsTUFBQUEsTUFBTSxFQUFFLEVBRGM7QUFFdEJFLE1BQUFBLE1BQU0sRUFBRSxFQUZjO0FBR3RCQyxNQUFBQSxRQUFRLEVBQUUsSUFBSUMsR0FBSixFQUhZO0FBS3RCQyxNQUFBQSxLQUxzQjtBQUFBO0FBQUE7QUFB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QUFBLFNBQVMsQ0FBQzBCLFNBQVYsR0FBc0JBLFNBQXRCOztBQUh5Qix1QkFLQyxxQkFBUyxFQUFULENBTEQ7QUFBQTtBQUFBLFVBS2xCN0IsS0FMa0I7QUFBQSxVQUtYOEIsUUFMVzs7QUFNekIzQixNQUFBQSxTQUFTLENBQUNILEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0FHLE1BQUFBLFNBQVMsQ0FBQzJCLFFBQVYsR0FBcUJBLFFBQXJCO0FBQ0Q7QUEzUWlEOztBQXNQcEQsT0FBSyxJQUFJcEMsT0FBVCxJQUFrQkwsTUFBbEIsRUFBMEI7QUFBQSxXQUFqQkssT0FBaUI7QUFzQnpCLEdBNVFtRCxDQThRcEQ7OztBQUNBLE1BQU1GLFFBQVEsR0FBRyx1QkFBV1AsR0FBWCxDQUFqQjs7QUFDQSxNQUFJTyxRQUFKLEVBQWM7QUFDWiwwQkFBVSxZQUFZO0FBQ3BCQSxNQUFBQSxRQUFRLENBQUNnRCxHQUFULENBQWFsRCxJQUFiO0FBQ0EsYUFBTyxZQUFZO0FBQ2pCRSxRQUFBQSxRQUFRLENBQUNpRCxNQUFULENBQWdCbkQsSUFBaEI7QUFDRCxPQUZEO0FBR0QsS0FMRCxFQUtHLEVBTEg7QUFNRDs7QUFFRCxTQUFPQSxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIFJlYWN0Tm9kZSxcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZUNvbnRleHQsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIG1hcCwgZGVib3VuY2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRzIHtcbiAgW2ZpZWxkOiBzdHJpbmddOiB7XG4gICAgaW5pdFZhbHVlPzogYW55O1xuICAgIHZhbGlkYXRvcnM/OiB7XG4gICAgICB2YWxpZGF0b3I6ICh2OiBhbnkpID0+IFByb21pc2U8c3RyaW5nPiB8IHN0cmluZztcbiAgICAgIGRlYm91bmNlPzogbnVtYmVyO1xuICAgIH1bXTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIElubmVyRm9ybSB7XG4gIGZpZWxkczoge1xuICAgIFtmaWVsZDogc3RyaW5nXTogRm9ybUZpZWxkO1xuICB9O1xuICB2YWx1ZXM6IHtcbiAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgfTtcbiAgY2hpbGRyZW46IFNldDxJbm5lckZvcm0+O1xuICBtdXRleDogYm9vbGVhbjtcblxuICBmaWVsZDogRmllbGREZWNvcmF0b3I7XG4gIGRhdGE6IERhdGE7XG4gIHZhbGlkYXRlOiBWYWxpZGF0ZTtcbiAgbGluazogTGluaztcbn1cblxuLy8gc3RhdHVzIG1hY2hpbmU6XG4vLyBub25lIC0+IHBlbmRpbmdcbi8vIHBlbmRpbmcgLT4gc3VjY2VzcyAvIGZhaWxcbi8vIHN1Y2Nlc3MgLyBmYWlsIC0+IHBlbmRpbmdcbmV4cG9ydCB0eXBlIFN0YXR1cyA9ICdub25lJyB8ICdwZW5kaW5nJyB8ICdzdWNjZXNzJyB8ICdmYWlsJztcblxuaW50ZXJmYWNlIEZvcm1GaWVsZCB7XG4gIHZhbHVlOiBhbnk7XG4gIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICBzdGF0dXM/OiBTdGF0dXM7XG4gIHNldFN0YXR1cz86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFN0YXR1cz4+O1xuICBlcnJvcj86IHN0cmluZztcbiAgc2V0RXJyb3I/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgdmFsaWRhdGUkPzogU3ViamVjdDxhbnk+O1xuICB2YWxpZGF0ZWQ/OiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRlIHtcbiAgKGZpZWxkPzogc3RyaW5nLCB2YWx1ZT86IGFueSk6IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgKFxuICAgIGZpZWxkPzpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IHtcbiAgICAgICAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgICAgICAgfSxcbiAgICB2YWx1ZT86IGFueSxcbiAgKTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkRGVjb3JhdG9yIHtcbiAgKGZpZWxkOiBzdHJpbmcsIHJlbmRlcjogRmllbGRSZW5kZXIpOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluayB7XG4gIChmaWVsZDogc3RyaW5nIHwgTGlua1Byb3BzLCBwcm9wcz86IExpbmtQcm9wcyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua1Byb3BzIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9uQ2hhbmdlPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlciB7XG4gIChwYXJhbXM6IHtcbiAgICB2YWx1ZTogYW55O1xuICAgIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICAgIHN0YXR1czogU3RhdHVzO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgdmFsaWRhdGU6ICh2YWx1ZTogYW55KSA9PiBQcm9taXNlPGFueT47XG4gIH0pOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIGZpZWxkOiBGaWVsZERlY29yYXRvcjtcbiAgZGF0YTogRGF0YTtcbiAgdmFsaWRhdGU6IFZhbGlkYXRlO1xuICBsaW5rOiBMaW5rO1xufVxuXG5jb25zdCBjdHggPSBSZWFjdC5jcmVhdGVDb250ZXh0PFNldDxJbm5lckZvcm0+IHwgbnVsbD4obnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZvcm0oZmllbGRzOiBGaWVsZHMpOiBGb3JtIHtcbiAgY29uc3QgW2Zvcm1dID0gdXNlU3RhdGUoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZvcm06IElubmVyRm9ybSA9IHtcbiAgICAgIGZpZWxkczoge30sXG4gICAgICB2YWx1ZXM6IHt9LFxuICAgICAgY2hpbGRyZW46IG5ldyBTZXQ8SW5uZXJGb3JtPigpLFxuXG4gICAgICBmaWVsZChmaWVsZCwgcmVuZGVyKSB7XG4gICAgICAgIGlmICghZm9ybS5maWVsZHNbZmllbGRdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cyA9ICdub25lJywgZXJyb3IgPSAnJyB9ID0gZm9ybS5maWVsZHNbXG4gICAgICAgICAgZmllbGRcbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxjdHguUHJvdmlkZXIgdmFsdWU9e2Zvcm0uY2hpbGRyZW59PlxuICAgICAgICAgICAge3JlbmRlcih7XG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBzZXRWYWx1ZSxcbiAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnZhbGlkYXRlKGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGRhdGEoZmllbGQsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuICAgICAgICAgIGlmICghZm9ybUZpZWxkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZvcm0udmFsdWVzW2ZpZWxkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yIChsZXQgZiBpbiBmaWVsZCkge1xuICAgICAgICAgICAgZm9ybS5kYXRhKGYsIGZpZWxkW2ZdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm0udmFsdWVzO1xuICAgICAgfSxcblxuICAgICAgYXN5bmMgdmFsaWRhdGUoZmllbGQsIHYpIHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgaWYgKCFmb3JtLmZpZWxkc1tmaWVsZF0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB7IHZhbGlkYXRlJCwgdmFsaWRhdGVkLCB2YWx1ZSB9ID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgICAgICAgaWYgKCF2YWxpZGF0ZSQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYGZvcm0gZmllbGQgWyR7ZmllbGR9XSBoYXMgbm90IGFueSB2YWxpZGF0b3IsIGNhbiBub3QgYmUgdmFsaWRhdGVkYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsaWRhdGUkLm5leHQodiAhPT0gdW5kZWZpbmVkID8gdiA6IHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbnMgPSBbXTtcbiAgICAgICAgLy8gYnJlYWR0aC1maXJzdCB2YWxpZGF0aW5nXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW2Zvcm1dO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGZvcm0gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgIGlmICghZm9ybSkgYnJlYWs7XG5cbiAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBmb3JtLmZpZWxkcykge1xuICAgICAgICAgICAgY29uc3QgeyB2YWxpZGF0ZSQsIHZhbGlkYXRlZCwgdmFsdWUgfSA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZSQgJiYgdmFsaWRhdGVkKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlJC5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHF1ZXVlLnB1c2goLi4uZm9ybS5jaGlsZHJlbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodmFsaWRhdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICBmb3IgKGxldCByIG9mIHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmIChyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgLy8gV2UgbXVzdCB1c2UgYSBtdXRleCB0byBtYWtlIHN1cmUgXCJzZXQgdmFsdWVcIiBhbmQgXCJvbkNoYW5nZVwiXG4gICAgICAvLyBhcmUgbm90IHRyaWdnZXJlZCBhdCB0aGUgc2FtZSBkYXRhIGZsb3cgY2lyY2xlLlxuICAgICAgLy8gT3IgaW5maW5pdGUgbG9vcCBvY2N1cnMgaWYgdGhlIGluaXRpYWwgdmFsdWUgYXJlIG5vdFxuICAgICAgLy8gZXF1YWwgdG8gdGhlIHZhbHVlIGZyb20gcHJvcHMsIHdoaWNoIG9mdGVuIGhhcHBlbnMhXG4gICAgICBtdXRleDogZmFsc2UsXG4gICAgICBsaW5rKGZpZWxkLCBwcm9wcykge1xuICAgICAgICBsZXQgZjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGYgPSBmaWVsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwOiBMaW5rUHJvcHM7XG4gICAgICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgICBwID0gZmllbGQgYXMgTGlua1Byb3BzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAgPSBwcm9wcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgndmFsdWUnIGluIHApIHtcbiAgICAgICAgICB1c2VFZmZlY3QoXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmICgnb25DaGFuZ2UnIGluIHApIHtcbiAgICAgICAgICAgICAgICBmb3JtLm11dGV4ID0gIWZvcm0ubXV0ZXg7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3JtLm11dGV4KSByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5kYXRhKGYsIHAudmFsdWVbZl0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGZvcm0uZGF0YShwLnZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbcC52YWx1ZV0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ29uQ2hhbmdlJyBpbiBwKSB7XG4gICAgICAgICAgdXNlRWZmZWN0KFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBwKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5tdXRleCA9ICFmb3JtLm11dGV4O1xuICAgICAgICAgICAgICAgIGlmICghZm9ybS5tdXRleCkgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcC5vbkNoYW5nZSEoZm9ybS5kYXRhKGYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbZm9ybS5kYXRhKGYpXSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBpbml0IGZpZWxkIHZhbGlkYXRpb24gcGlwZWxpbmVzXG4gICAgZm9yIChsZXQgZmllbGQgaW4gZmllbGRzKSB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRvcnMgPSBbXSB9ID0gZmllbGRzW2ZpZWxkXTtcblxuICAgICAgZm9ybS5maWVsZHNbZmllbGRdID0ge30gYXMgRm9ybUZpZWxkO1xuICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlJCA9IHZhbGlkYXRlJDtcblxuICAgICAgICBsZXQgcGlwZWxpbmUkID0gdmFsaWRhdGUkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgncGVuZGluZycpO1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgdiBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgaWYgKHYuZGVib3VuY2UpIHtcbiAgICAgICAgICAgIHBpcGVsaW5lJCA9IHBpcGVsaW5lJC5waXBlKFxuICAgICAgICAgICAgICBkZWJvdW5jZShmdW5jdGlvbiAoeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgLy8gICBgZGVib3VuY2UtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVyKGVycm9yID8gMCA6IHYuZGVib3VuY2UpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKHsgdmFsdWUsIGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHZhbGlkYXRlLSR7ZmllbGR9LSR7dmFsaWRhdG9ycy5pbmRleE9mKHZhbGlkYXRvcil9YCk7XG4gICAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGF3YWl0IHYudmFsaWRhdG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRlUmVzb2x2ZTogKHY/OiBib29sZWFuKSA9PiB2b2lkO1xuICAgICAgICBsZXQgdmFsaWRhdGVSZWplY3Q6IChlPzogYW55KSA9PiB2b2lkO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgdmFsaWRhdGVSZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBwaXBlbGluZSRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChmdW5jdGlvbiAoeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdmYWlsJyk7XG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yIShlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUocik7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QoZSk7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm07XG4gIH0pO1xuXG4gIC8vIGF0dGFjaCB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cywgc2V0U3RhdHVzLCBlcnJvciwgc2V0RXJyb3IgdG8gZm9ybSBmaWVsZFxuICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICBjb25zdCB7IGluaXRWYWx1ZSwgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShpbml0VmFsdWUpO1xuICAgIGZvcm0udmFsdWVzW2ZpZWxkXSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC52YWx1ZSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2OiBhbnkpIHtcbiAgICAgIGZvcm0udmFsdWVzID0geyAuLi5mb3JtLnZhbHVlcyB9O1xuICAgICAgc2V0VmFsdWUodik7XG4gICAgfTtcblxuICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZTxTdGF0dXM+KCdub25lJyk7XG4gICAgICBmb3JtRmllbGQuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyA9IHNldFN0YXR1cztcblxuICAgICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgICBmb3JtRmllbGQuZXJyb3IgPSBlcnJvcjtcbiAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciA9IHNldEVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHBhcmVudCBmb3JtIGV4aXN0cywgYXR0YWNoIGZvcm0gaW5zdGFuY2UgdG8gaXQgYXMgYSBjaGlsZFxuICBjb25zdCBjaGlsZHJlbiA9IHVzZUNvbnRleHQoY3R4KTtcbiAgaWYgKGNoaWxkcmVuKSB7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoaWxkcmVuLmFkZChmb3JtKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoaWxkcmVuLmRlbGV0ZShmb3JtKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuICB9XG5cbiAgcmV0dXJuIGZvcm07XG59XG4iXX0=