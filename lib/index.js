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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiY3R4IiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlRm9ybSIsImZpZWxkcyIsImZvcm0iLCJ2YWx1ZXMiLCJjaGlsZHJlbiIsIlNldCIsImZpZWxkIiwicmVuZGVyIiwiRXJyb3IiLCJ2YWx1ZSIsInNldFZhbHVlIiwic3RhdHVzIiwiZXJyb3IiLCJ2YWxpZGF0ZSIsImRhdGEiLCJmb3JtRmllbGQiLCJ1bmRlZmluZWQiLCJmIiwidiIsInZhbGlkYXRlJCIsInZhbGlkYXRlZCIsIm5leHQiLCJ2YWxpZGF0aW9ucyIsInF1ZXVlIiwic2hpZnQiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiciIsImxpbmsiLCJwcm9wcyIsInAiLCJmaXJzdFJlbmRlciIsImN1cnJlbnQiLCJvbkNoYW5nZSIsInZhbGlkYXRvcnMiLCJsZW5ndGgiLCJTdWJqZWN0IiwicGlwZWxpbmUkIiwicGlwZSIsInNldFN0YXR1cyIsInNldEVycm9yIiwiZGVib3VuY2UiLCJ2YWxpZGF0b3IiLCJ2YWxpZGF0ZVJlc29sdmUiLCJ2YWxpZGF0ZVJlamVjdCIsInJlc29sdmUiLCJyZWplY3QiLCJzdWJzY3JpYmUiLCJlIiwiaW5pdFZhbHVlIiwiYWRkIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQUNBOzs7Ozs7QUEyRkEsSUFBTUEsR0FBRyxHQUFHQyxlQUFNQyxhQUFOLENBQTJDLElBQTNDLENBQVo7O0FBRWUsU0FBU0MsT0FBVCxDQUFpQkMsTUFBakIsRUFBdUM7QUFBQSxrQkFDckMscUJBQVMsWUFBWTtBQUNsQyxRQUFNQyxJQUFlLEdBQUc7QUFDdEJELE1BQUFBLE1BQU0sRUFBRSxFQURjO0FBRXRCRSxNQUFBQSxNQUFNLEVBQUUsRUFGYztBQUd0QkMsTUFBQUEsUUFBUSxFQUFFLElBQUlDLEdBQUosRUFIWTtBQUt0QkMsTUFBQUEsS0FM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QjtBQUNEO0FBdFFpRDs7QUFpUHBELE9BQUssSUFBSXJDLE9BQVQsSUFBa0JMLE1BQWxCLEVBQTBCO0FBQUEsV0FBakJLLE9BQWlCO0FBc0J6QixHQXZRbUQsQ0F5UXBEOzs7QUFDQSxNQUFNRixRQUFRLEdBQUcsdUJBQVdQLEdBQVgsQ0FBakI7O0FBQ0EsTUFBSU8sUUFBSixFQUFjO0FBQ1osMEJBQVUsWUFBWTtBQUNwQkEsTUFBQUEsUUFBUSxDQUFDaUQsR0FBVCxDQUFhbkQsSUFBYjtBQUNBLGFBQU8sWUFBWTtBQUNqQkUsUUFBQUEsUUFBUSxDQUFDa0QsTUFBVCxDQUFnQnBELElBQWhCO0FBQ0QsT0FGRDtBQUdELEtBTEQsRUFLRyxFQUxIO0FBTUQ7O0FBRUQsU0FBT0EsSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICBSZWFjdE5vZGUsXG4gIHVzZUVmZmVjdCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXAsIGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkcyB7XG4gIFtmaWVsZDogc3RyaW5nXToge1xuICAgIGluaXRWYWx1ZT86IGFueTtcbiAgICB2YWxpZGF0b3JzPzoge1xuICAgICAgdmFsaWRhdG9yOiAodjogYW55KSA9PiBQcm9taXNlPHN0cmluZz4gfCBzdHJpbmc7XG4gICAgICBkZWJvdW5jZT86IG51bWJlcjtcbiAgICB9W107XG4gIH07XG59XG5cbmludGVyZmFjZSBJbm5lckZvcm0ge1xuICBmaWVsZHM6IHtcbiAgICBbZmllbGQ6IHN0cmluZ106IEZvcm1GaWVsZDtcbiAgfTtcbiAgdmFsdWVzOiB7XG4gICAgW2ZpZWxkOiBzdHJpbmddOiBhbnk7XG4gIH07XG4gIGNoaWxkcmVuOiBTZXQ8SW5uZXJGb3JtPjtcblxuICBmaWVsZDogRmllbGREZWNvcmF0b3I7XG4gIGRhdGE6IERhdGE7XG4gIHZhbGlkYXRlOiBWYWxpZGF0ZTtcbiAgbGluazogTGluaztcbn1cblxuLy8gc3RhdHVzIG1hY2hpbmU6XG4vLyBub25lIC0+IHBlbmRpbmdcbi8vIHBlbmRpbmcgLT4gc3VjY2VzcyAvIGZhaWxcbi8vIHN1Y2Nlc3MgLyBmYWlsIC0+IHBlbmRpbmdcbmV4cG9ydCB0eXBlIFN0YXR1cyA9ICdub25lJyB8ICdwZW5kaW5nJyB8ICdzdWNjZXNzJyB8ICdmYWlsJztcblxuaW50ZXJmYWNlIEZvcm1GaWVsZCB7XG4gIHZhbHVlOiBhbnk7XG4gIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICBzdGF0dXM/OiBTdGF0dXM7XG4gIHNldFN0YXR1cz86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFN0YXR1cz4+O1xuICBlcnJvcj86IHN0cmluZztcbiAgc2V0RXJyb3I/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgdmFsaWRhdGUkPzogU3ViamVjdDxhbnk+O1xuICB2YWxpZGF0ZWQ/OiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRlIHtcbiAgKGZpZWxkPzogc3RyaW5nLCB2YWx1ZT86IGFueSk6IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgKFxuICAgIGZpZWxkPzpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IHtcbiAgICAgICAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgICAgICAgfSxcbiAgICB2YWx1ZT86IGFueSxcbiAgKTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkRGVjb3JhdG9yIHtcbiAgKGZpZWxkOiBzdHJpbmcsIHJlbmRlcjogRmllbGRSZW5kZXIpOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluayB7XG4gIChmaWVsZDogc3RyaW5nIHwgTGlua1Byb3BzLCBwcm9wcz86IExpbmtQcm9wcyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua1Byb3BzIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9uQ2hhbmdlPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlclByb3BzIHtcbiAgdmFsdWU6IGFueTtcbiAgc2V0VmFsdWU6IFJlYWN0LkRpc3BhdGNoPGFueT47XG4gIHN0YXR1czogU3RhdHVzO1xuICBlcnJvcjogc3RyaW5nO1xuICB2YWxpZGF0ZTogKHZhbHVlOiBhbnkpID0+IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlciB7XG4gIChwcm9wczogRmllbGRSZW5kZXJQcm9wcyk6IFJlYWN0Tm9kZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtIHtcbiAgZmllbGQ6IEZpZWxkRGVjb3JhdG9yO1xuICBkYXRhOiBEYXRhO1xuICB2YWxpZGF0ZTogVmFsaWRhdGU7XG4gIGxpbms6IExpbms7XG59XG5cbmNvbnN0IGN0eCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQ8U2V0PElubmVyRm9ybT4gfCBudWxsPihudWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlRm9ybShmaWVsZHM6IEZpZWxkcyk6IEZvcm0ge1xuICBjb25zdCBbZm9ybV0gPSB1c2VTdGF0ZShmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZm9ybTogSW5uZXJGb3JtID0ge1xuICAgICAgZmllbGRzOiB7fSxcbiAgICAgIHZhbHVlczoge30sXG4gICAgICBjaGlsZHJlbjogbmV3IFNldDxJbm5lckZvcm0+KCksXG5cbiAgICAgIGZpZWxkKGZpZWxkLCByZW5kZXIpIHtcbiAgICAgICAgaWYgKCFmb3JtLmZpZWxkc1tmaWVsZF0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgc2V0VmFsdWUsXG4gICAgICAgICAgc3RhdHVzID0gJ25vbmUnLFxuICAgICAgICAgIGVycm9yID0gJycsXG4gICAgICAgIH0gPSBmb3JtLmZpZWxkc1tmaWVsZF07XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Y3R4LlByb3ZpZGVyIHZhbHVlPXtmb3JtLmNoaWxkcmVufT5cbiAgICAgICAgICAgIHtyZW5kZXIoe1xuICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgc2V0VmFsdWUsXG4gICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS52YWxpZGF0ZShmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBkYXRhKGZpZWxkLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IGZvcm1GaWVsZCA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICBpZiAoIWZvcm1GaWVsZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmb3JtLnZhbHVlc1tmaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGZvciAobGV0IGYgaW4gZmllbGQpIHtcbiAgICAgICAgICAgIGZvcm0uZGF0YShmLCBmaWVsZFtmXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtLnZhbHVlcztcbiAgICAgIH0sXG5cbiAgICAgIGFzeW5jIHZhbGlkYXRlKGZpZWxkLCB2KSB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgIGlmICghZm9ybS5maWVsZHNbZmllbGRdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyB2YWxpZGF0ZSQsIHZhbGlkYXRlZCwgdmFsdWUgfSA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcblxuICAgICAgICAgIGlmICghdmFsaWRhdGUkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBmb3JtIGZpZWxkIFske2ZpZWxkfV0gaGFzIG5vdCBhbnkgdmFsaWRhdG9yLCBjYW4gbm90IGJlIHZhbGlkYXRlZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhbGlkYXRlJC5uZXh0KHYgIT09IHVuZGVmaW5lZCA/IHYgOiB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25zID0gW107XG4gICAgICAgIC8vIGJyZWFkdGgtZmlyc3QgdmFsaWRhdGluZ1xuICAgICAgICBjb25zdCBxdWV1ZSA9IFtmb3JtXTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBjb25zdCBmb3JtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICBpZiAoIWZvcm0pIGJyZWFrO1xuXG4gICAgICAgICAgZm9yIChsZXQgZmllbGQgaW4gZm9ybS5maWVsZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdmFsaWRhdGUkLCB2YWxpZGF0ZWQsIHZhbHVlIH0gPSBmb3JtLmZpZWxkc1tmaWVsZF07XG4gICAgICAgICAgICBpZiAodmFsaWRhdGUkICYmIHZhbGlkYXRlZCkge1xuICAgICAgICAgICAgICB2YWxpZGF0ZSQubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25zLnB1c2godmFsaWRhdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBxdWV1ZS5wdXNoKC4uLmZvcm0uY2hpbGRyZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHZhbGlkYXRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgZm9yIChsZXQgciBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAociA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGxpbmsoZmllbGQsIHByb3BzKSB7XG4gICAgICAgIGxldCBmOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZiA9IGZpZWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHA6IExpbmtQcm9wcztcbiAgICAgICAgaWYgKCFwcm9wcykge1xuICAgICAgICAgIHAgPSBmaWVsZCBhcyBMaW5rUHJvcHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcCA9IHByb3BzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCd2YWx1ZScgaW4gcCkge1xuICAgICAgICAgIHVzZUVmZmVjdChcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKGYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvcm0uZGF0YShmLCBwLnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBmb3JtLmRhdGEocC52YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW3AudmFsdWVdLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdvbkNoYW5nZScgaW4gcCkge1xuICAgICAgICAgIGNvbnN0IGZpcnN0UmVuZGVyID0gdXNlUmVmKHRydWUpO1xuICAgICAgICAgIHVzZUVmZmVjdChcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgLy8gc2tpcCBmaXJzdCByZW5kZXJcbiAgICAgICAgICAgICAgaWYgKGZpcnN0UmVuZGVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBmaXJzdFJlbmRlci5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcC5vbkNoYW5nZSEoZm9ybS5kYXRhKGYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbZm9ybS5kYXRhKGYpXSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBpbml0IGZpZWxkIHZhbGlkYXRpb24gcGlwZWxpbmVzXG4gICAgZm9yIChsZXQgZmllbGQgaW4gZmllbGRzKSB7XG4gICAgICBjb25zdCB7IHZhbGlkYXRvcnMgPSBbXSB9ID0gZmllbGRzW2ZpZWxkXTtcblxuICAgICAgZm9ybS5maWVsZHNbZmllbGRdID0ge30gYXMgRm9ybUZpZWxkO1xuICAgICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlJCA9IHZhbGlkYXRlJDtcblxuICAgICAgICBsZXQgcGlwZWxpbmUkID0gdmFsaWRhdGUkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgncGVuZGluZycpO1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgdiBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgaWYgKHYuZGVib3VuY2UpIHtcbiAgICAgICAgICAgIHBpcGVsaW5lJCA9IHBpcGVsaW5lJC5waXBlKFxuICAgICAgICAgICAgICBkZWJvdW5jZShmdW5jdGlvbiAoeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgLy8gICBgZGVib3VuY2UtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVyKGVycm9yID8gMCA6IHYuZGVib3VuY2UpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKHsgdmFsdWUsIGVycm9yIH0pIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHZhbGlkYXRlLSR7ZmllbGR9LSR7dmFsaWRhdG9ycy5pbmRleE9mKHZhbGlkYXRvcil9YCk7XG4gICAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGF3YWl0IHYudmFsaWRhdG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRlUmVzb2x2ZTogKHZhbHVlOiBib29sZWFuIHwgUHJvbWlzZUxpa2U8Ym9vbGVhbj4pID0+IHZvaWQ7XG4gICAgICAgIGxldCB2YWxpZGF0ZVJlamVjdDogKHJlYXNvbjogYW55KSA9PiB2b2lkO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgdmFsaWRhdGVSZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBwaXBlbGluZSRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChmdW5jdGlvbiAoeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdmYWlsJyk7XG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yIShlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUocik7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QoZSk7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm07XG4gIH0pO1xuXG4gIC8vIGF0dGFjaCB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cywgc2V0U3RhdHVzLCBlcnJvciwgc2V0RXJyb3IgdG8gZm9ybSBmaWVsZFxuICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICBjb25zdCB7IGluaXRWYWx1ZSwgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShpbml0VmFsdWUpO1xuICAgIGZvcm0udmFsdWVzW2ZpZWxkXSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC52YWx1ZSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2OiBhbnkpIHtcbiAgICAgIGZvcm0udmFsdWVzID0geyAuLi5mb3JtLnZhbHVlcyB9O1xuICAgICAgc2V0VmFsdWUodik7XG4gICAgfTtcblxuICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZTxTdGF0dXM+KCdub25lJyk7XG4gICAgICBmb3JtRmllbGQuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyA9IHNldFN0YXR1cztcblxuICAgICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgICBmb3JtRmllbGQuZXJyb3IgPSBlcnJvcjtcbiAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciA9IHNldEVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHBhcmVudCBmb3JtIGV4aXN0cywgYXR0YWNoIGZvcm0gaW5zdGFuY2UgdG8gaXQgYXMgYSBjaGlsZFxuICBjb25zdCBjaGlsZHJlbiA9IHVzZUNvbnRleHQoY3R4KTtcbiAgaWYgKGNoaWxkcmVuKSB7XG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoaWxkcmVuLmFkZChmb3JtKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNoaWxkcmVuLmRlbGV0ZShmb3JtKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuICB9XG5cbiAgcmV0dXJuIGZvcm07XG59XG4iXX0=