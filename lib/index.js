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
            if (f !== undefined) {
              form.data(f, p.value);
              return;
            }

            form.data(p.value);
          }, [p.value]);
        }

        if ('onChange' in p) {
          var firstRender = (0, _react.useRef)(true);
          (0, _react.useEffect)(function () {
            // skip first render
            if (firstRender.current) {
              firstRender.current = false;
              return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiY3R4IiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlRm9ybSIsImZpZWxkcyIsImZvcm0iLCJ2YWx1ZXMiLCJjaGlsZHJlbiIsIlNldCIsImZpZWxkIiwicmVuZGVyIiwiRXJyb3IiLCJ2YWx1ZSIsInNldFZhbHVlIiwic3RhdHVzIiwiZXJyb3IiLCJ2YWxpZGF0ZSIsImRhdGEiLCJmb3JtRmllbGQiLCJ1bmRlZmluZWQiLCJmIiwidiIsInZhbGlkYXRlJCIsInZhbGlkYXRlZCIsIm5leHQiLCJ2YWxpZGF0aW9ucyIsInF1ZXVlIiwic2hpZnQiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiciIsImxpbmsiLCJwcm9wcyIsInAiLCJmaXJzdFJlbmRlciIsImN1cnJlbnQiLCJvbkNoYW5nZSIsInZhbGlkYXRvcnMiLCJsZW5ndGgiLCJTdWJqZWN0IiwicGlwZWxpbmUkIiwicGlwZSIsInNldFN0YXR1cyIsInNldEVycm9yIiwiZGVib3VuY2UiLCJ2YWxpZGF0b3IiLCJ2YWxpZGF0ZVJlc29sdmUiLCJ2YWxpZGF0ZVJlamVjdCIsInJlc29sdmUiLCJyZWplY3QiLCJzdWJzY3JpYmUiLCJlIiwiaW5pdFZhbHVlIiwiYWRkIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQUNBOzs7Ozs7QUF5RkEsSUFBTUEsR0FBRyxHQUFHQyxlQUFNQyxhQUFOLENBQTJDLElBQTNDLENBQVo7O0FBRWUsU0FBU0MsT0FBVCxDQUFpQkMsTUFBakIsRUFBdUM7QUFBQSxrQkFDckMscUJBQVMsWUFBWTtBQUNsQyxRQUFNQyxJQUFlLEdBQUc7QUFDdEJELE1BQUFBLE1BQU0sRUFBRSxFQURjO0FBRXRCRSxNQUFBQSxNQUFNLEVBQUUsRUFGYztBQUd0QkMsTUFBQUEsUUFBUSxFQUFFLElBQUlDLEdBQUosRUFIWTtBQUt0QkMsTUFBQUEsS0FM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O0FBblFpRDs7QUE4T3BELE9BQUssSUFBSXJDLE9BQVQsSUFBa0JMLE1BQWxCLEVBQTBCO0FBQUEsV0FBakJLLE9BQWlCO0FBc0J6QixHQXBRbUQsQ0FzUXBEOzs7QUFDQSxNQUFNRixRQUFRLEdBQUcsdUJBQVdQLEdBQVgsQ0FBakI7O0FBQ0EsTUFBSU8sUUFBSixFQUFjO0FBQ1osMEJBQVUsWUFBWTtBQUNwQkEsTUFBQUEsUUFBUSxDQUFDaUQsR0FBVCxDQUFhbkQsSUFBYjtBQUNBLGFBQU8sWUFBWTtBQUNqQkUsUUFBQUEsUUFBUSxDQUFDa0QsTUFBVCxDQUFnQnBELElBQWhCO0FBQ0QsT0FGRDtBQUdELEtBTEQsRUFLRyxFQUxIO0FBTUQ7O0FBRUQsU0FBT0EsSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICBSZWFjdE5vZGUsXG4gIHVzZUVmZmVjdCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXAsIGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkcyB7XG4gIFtmaWVsZDogc3RyaW5nXToge1xuICAgIGluaXRWYWx1ZT86IGFueTtcbiAgICB2YWxpZGF0b3JzPzoge1xuICAgICAgdmFsaWRhdG9yOiAodjogYW55KSA9PiBQcm9taXNlPHN0cmluZz4gfCBzdHJpbmc7XG4gICAgICBkZWJvdW5jZT86IG51bWJlcjtcbiAgICB9W107XG4gIH07XG59XG5cbmludGVyZmFjZSBJbm5lckZvcm0ge1xuICBmaWVsZHM6IHtcbiAgICBbZmllbGQ6IHN0cmluZ106IEZvcm1GaWVsZDtcbiAgfTtcbiAgdmFsdWVzOiB7XG4gICAgW2ZpZWxkOiBzdHJpbmddOiBhbnk7XG4gIH07XG4gIGNoaWxkcmVuOiBTZXQ8SW5uZXJGb3JtPjtcblxuICBmaWVsZDogRmllbGREZWNvcmF0b3I7XG4gIGRhdGE6IERhdGE7XG4gIHZhbGlkYXRlOiBWYWxpZGF0ZTtcbiAgbGluazogTGluaztcbn1cblxuLy8gc3RhdHVzIG1hY2hpbmU6XG4vLyBub25lIC0+IHBlbmRpbmdcbi8vIHBlbmRpbmcgLT4gc3VjY2VzcyAvIGZhaWxcbi8vIHN1Y2Nlc3MgLyBmYWlsIC0+IHBlbmRpbmdcbmV4cG9ydCB0eXBlIFN0YXR1cyA9ICdub25lJyB8ICdwZW5kaW5nJyB8ICdzdWNjZXNzJyB8ICdmYWlsJztcblxuaW50ZXJmYWNlIEZvcm1GaWVsZCB7XG4gIHZhbHVlOiBhbnk7XG4gIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICBzdGF0dXM/OiBTdGF0dXM7XG4gIHNldFN0YXR1cz86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFN0YXR1cz4+O1xuICBlcnJvcj86IHN0cmluZztcbiAgc2V0RXJyb3I/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgdmFsaWRhdGUkPzogU3ViamVjdDxhbnk+O1xuICB2YWxpZGF0ZWQ/OiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRlIHtcbiAgKGZpZWxkPzogc3RyaW5nLCB2YWx1ZT86IGFueSk6IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgKFxuICAgIGZpZWxkPzpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IHtcbiAgICAgICAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgICAgICAgfSxcbiAgICB2YWx1ZT86IGFueSxcbiAgKTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkRGVjb3JhdG9yIHtcbiAgKGZpZWxkOiBzdHJpbmcsIHJlbmRlcjogRmllbGRSZW5kZXIpOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluayB7XG4gIChmaWVsZDogc3RyaW5nIHwgTGlua1Byb3BzLCBwcm9wcz86IExpbmtQcm9wcyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua1Byb3BzIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9uQ2hhbmdlPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlciB7XG4gIChwYXJhbXM6IHtcbiAgICB2YWx1ZTogYW55O1xuICAgIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICAgIHN0YXR1czogU3RhdHVzO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgdmFsaWRhdGU6ICh2YWx1ZTogYW55KSA9PiBQcm9taXNlPGFueT47XG4gIH0pOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIGZpZWxkOiBGaWVsZERlY29yYXRvcjtcbiAgZGF0YTogRGF0YTtcbiAgdmFsaWRhdGU6IFZhbGlkYXRlO1xuICBsaW5rOiBMaW5rO1xufVxuXG5jb25zdCBjdHggPSBSZWFjdC5jcmVhdGVDb250ZXh0PFNldDxJbm5lckZvcm0+IHwgbnVsbD4obnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZvcm0oZmllbGRzOiBGaWVsZHMpOiBGb3JtIHtcbiAgY29uc3QgW2Zvcm1dID0gdXNlU3RhdGUoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZvcm06IElubmVyRm9ybSA9IHtcbiAgICAgIGZpZWxkczoge30sXG4gICAgICB2YWx1ZXM6IHt9LFxuICAgICAgY2hpbGRyZW46IG5ldyBTZXQ8SW5uZXJGb3JtPigpLFxuXG4gICAgICBmaWVsZChmaWVsZCwgcmVuZGVyKSB7XG4gICAgICAgIGlmICghZm9ybS5maWVsZHNbZmllbGRdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cyA9ICdub25lJywgZXJyb3IgPSAnJyB9ID0gZm9ybS5maWVsZHNbXG4gICAgICAgICAgZmllbGRcbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxjdHguUHJvdmlkZXIgdmFsdWU9e2Zvcm0uY2hpbGRyZW59PlxuICAgICAgICAgICAge3JlbmRlcih7XG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBzZXRWYWx1ZSxcbiAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnZhbGlkYXRlKGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICAgICAgKTtcbiAgICAgIH0sXG5cbiAgICAgIGRhdGEoZmllbGQsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuICAgICAgICAgIGlmICghZm9ybUZpZWxkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZvcm0udmFsdWVzW2ZpZWxkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yIChsZXQgZiBpbiBmaWVsZCkge1xuICAgICAgICAgICAgZm9ybS5kYXRhKGYsIGZpZWxkW2ZdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm0udmFsdWVzO1xuICAgICAgfSxcblxuICAgICAgYXN5bmMgdmFsaWRhdGUoZmllbGQsIHYpIHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgaWYgKCFmb3JtLmZpZWxkc1tmaWVsZF0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB7IHZhbGlkYXRlJCwgdmFsaWRhdGVkLCB2YWx1ZSB9ID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgICAgICAgaWYgKCF2YWxpZGF0ZSQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYGZvcm0gZmllbGQgWyR7ZmllbGR9XSBoYXMgbm90IGFueSB2YWxpZGF0b3IsIGNhbiBub3QgYmUgdmFsaWRhdGVkYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsaWRhdGUkLm5leHQodiAhPT0gdW5kZWZpbmVkID8gdiA6IHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbnMgPSBbXTtcbiAgICAgICAgLy8gYnJlYWR0aC1maXJzdCB2YWxpZGF0aW5nXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW2Zvcm1dO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGZvcm0gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgIGlmICghZm9ybSkgYnJlYWs7XG5cbiAgICAgICAgICBmb3IgKGxldCBmaWVsZCBpbiBmb3JtLmZpZWxkcykge1xuICAgICAgICAgICAgY29uc3QgeyB2YWxpZGF0ZSQsIHZhbGlkYXRlZCwgdmFsdWUgfSA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZSQgJiYgdmFsaWRhdGVkKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlJC5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHF1ZXVlLnB1c2goLi4uZm9ybS5jaGlsZHJlbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodmFsaWRhdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICBmb3IgKGxldCByIG9mIHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmIChyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgbGluayhmaWVsZCwgcHJvcHMpIHtcbiAgICAgICAgbGV0IGY6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmID0gZmllbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcDogTGlua1Byb3BzO1xuICAgICAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgICAgcCA9IGZpZWxkIGFzIExpbmtQcm9wcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwID0gcHJvcHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBwKSB7XG4gICAgICAgICAgdXNlRWZmZWN0KFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5kYXRhKGYsIHAudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGZvcm0uZGF0YShwLnZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbcC52YWx1ZV0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ29uQ2hhbmdlJyBpbiBwKSB7XG4gICAgICAgICAgY29uc3QgZmlyc3RSZW5kZXIgPSB1c2VSZWYodHJ1ZSk7XG4gICAgICAgICAgdXNlRWZmZWN0KFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAvLyBza2lwIGZpcnN0IHJlbmRlclxuICAgICAgICAgICAgICBpZiAoZmlyc3RSZW5kZXIuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGZpcnN0UmVuZGVyLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwLm9uQ2hhbmdlIShmb3JtLmRhdGEoZikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtmb3JtLmRhdGEoZildLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIGluaXQgZmllbGQgdmFsaWRhdGlvbiBwaXBlbGluZXNcbiAgICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICAgIGNvbnN0IHsgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgICBmb3JtLmZpZWxkc1tmaWVsZF0gPSB7fSBhcyBGb3JtRmllbGQ7XG4gICAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtLmZpZWxkc1tmaWVsZF07XG5cbiAgICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGUkID0gdmFsaWRhdGUkO1xuXG4gICAgICAgIGxldCBwaXBlbGluZSQgPSB2YWxpZGF0ZSQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdwZW5kaW5nJyk7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0RXJyb3IhKCcnKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB2LFxuICAgICAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBmb3IgKGxldCB2IG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICBpZiAodi5kZWJvdW5jZSkge1xuICAgICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICAgIGRlYm91bmNlKGZ1bmN0aW9uICh7IGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAvLyAgIGBkZWJvdW5jZS0ke2ZpZWxkfS0ke3ZhbGlkYXRvcnMuaW5kZXhPZih2YWxpZGF0b3IpfWAsXG4gICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXIoZXJyb3IgPyAwIDogdi5kZWJvdW5jZSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwaXBlbGluZSQgPSBwaXBlbGluZSQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAoeyB2YWx1ZSwgZXJyb3IgfSkge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgdmFsaWRhdGUtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gKTtcbiAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gYXdhaXQgdi52YWxpZGF0b3IodmFsdWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsaWRhdGVSZXNvbHZlOiAodj86IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgICAgIGxldCB2YWxpZGF0ZVJlamVjdDogKGU/OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHBpcGVsaW5lJFxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKGZ1bmN0aW9uICh7IGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ2ZhaWwnKTtcbiAgICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0RXJyb3IhKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgnc3VjY2VzcycpO1xuICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0RXJyb3IhKCcnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZShyKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdChlKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHZhbHVlLCBzZXRWYWx1ZSwgc3RhdHVzLCBzZXRTdGF0dXMsIGVycm9yLCBzZXRFcnJvciB0byBmb3JtIGZpZWxkXG4gIGZvciAobGV0IGZpZWxkIGluIGZpZWxkcykge1xuICAgIGNvbnN0IHsgaW5pdFZhbHVlLCB2YWxpZGF0b3JzID0gW10gfSA9IGZpZWxkc1tmaWVsZF07XG5cbiAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtLmZpZWxkc1tmaWVsZF07XG5cbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKGluaXRWYWx1ZSk7XG4gICAgZm9ybS52YWx1ZXNbZmllbGRdID0gdmFsdWU7XG4gICAgZm9ybUZpZWxkLnZhbHVlID0gdmFsdWU7XG4gICAgZm9ybUZpZWxkLnNldFZhbHVlID0gZnVuY3Rpb24gKHY6IGFueSkge1xuICAgICAgZm9ybS52YWx1ZXMgPSB7IC4uLmZvcm0udmFsdWVzIH07XG4gICAgICBzZXRWYWx1ZSh2KTtcbiAgICB9O1xuXG4gICAgaWYgKHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlPFN0YXR1cz4oJ25vbmUnKTtcbiAgICAgIGZvcm1GaWVsZC5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICBmb3JtRmllbGQuc2V0U3RhdHVzID0gc2V0U3RhdHVzO1xuXG4gICAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgICAgIGZvcm1GaWVsZC5lcnJvciA9IGVycm9yO1xuICAgICAgZm9ybUZpZWxkLnNldEVycm9yID0gc2V0RXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgcGFyZW50IGZvcm0gZXhpc3RzLCBhdHRhY2ggZm9ybSBpbnN0YW5jZSB0byBpdCBhcyBhIGNoaWxkXG4gIGNvbnN0IGNoaWxkcmVuID0gdXNlQ29udGV4dChjdHgpO1xuICBpZiAoY2hpbGRyZW4pIHtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY2hpbGRyZW4uYWRkKGZvcm0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2hpbGRyZW4uZGVsZXRlKGZvcm0pO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG4gIH1cblxuICByZXR1cm4gZm9ybTtcbn1cbiJdfQ==