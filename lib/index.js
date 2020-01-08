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
              form.data(f, p.value);
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
            var validator = _step2.value;

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
                        return validator(value);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiY3R4IiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlRm9ybSIsImZpZWxkcyIsImZvcm0iLCJ2YWx1ZXMiLCJjaGlsZHJlbiIsIlNldCIsImZpZWxkIiwicmVuZGVyIiwiRXJyb3IiLCJ2YWx1ZSIsInNldFZhbHVlIiwic3RhdHVzIiwiZXJyb3IiLCJ2YWxpZGF0ZSIsImRhdGEiLCJmb3JtRmllbGQiLCJ1bmRlZmluZWQiLCJmIiwidiIsInZhbGlkYXRlJCIsInZhbGlkYXRlZCIsIm5leHQiLCJ2YWxpZGF0aW9ucyIsInF1ZXVlIiwic2hpZnQiLCJwdXNoIiwiUHJvbWlzZSIsImFsbCIsInRoZW4iLCJyZXN1bHRzIiwiciIsIm11dGV4IiwibGluayIsInByb3BzIiwicCIsIm9uQ2hhbmdlIiwidmFsaWRhdG9ycyIsImxlbmd0aCIsIlN1YmplY3QiLCJwaXBlbGluZSQiLCJwaXBlIiwic2V0U3RhdHVzIiwic2V0RXJyb3IiLCJ2YWxpZGF0b3IiLCJkZWJvdW5jZSIsInZhbGlkYXRlUmVzb2x2ZSIsInZhbGlkYXRlUmVqZWN0IiwicmVzb2x2ZSIsInJlamVjdCIsInN1YnNjcmliZSIsImUiLCJpbml0VmFsdWUiLCJhZGQiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7Ozs7OztBQTBGQSxJQUFNQSxHQUFHLEdBQUdDLGVBQU1DLGFBQU4sQ0FBMkMsSUFBM0MsQ0FBWjs7QUFFZSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF1QztBQUFBLGtCQUNyQyxxQkFBUyxZQUFXO0FBQ2pDLFFBQU1DLElBQWUsR0FBRztBQUN0QkQsTUFBQUEsTUFBTSxFQUFFLEVBRGM7QUFFdEJFLE1BQUFBLE1BQU0sRUFBRSxFQUZjO0FBR3RCQyxNQUFBQSxRQUFRLEVBQUUsSUFBSUMsR0FBSixFQUhZO0FBS3RCQyxNQUFBQSxLQUxzQjtBQUFBO0FBQUE7QUFB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QkEsU0FBdEI7O0FBSHlCLHVCQUtDLHFCQUFTLEVBQVQsQ0FMRDtBQUFBO0FBQUEsVUFLbEI3QixLQUxrQjtBQUFBLFVBS1g4QixRQUxXOztBQU16QjNCLE1BQUFBLFNBQVMsQ0FBQ0gsS0FBVixHQUFrQkEsS0FBbEI7QUFDQUcsTUFBQUEsU0FBUyxDQUFDMkIsUUFBVixHQUFxQkEsUUFBckI7QUFDRDtBQTNRaUQ7O0FBc1BwRCxPQUFLLElBQUlwQyxPQUFULElBQWtCTCxNQUFsQixFQUEwQjtBQUFBLFdBQWpCSyxPQUFpQjtBQXNCekIsR0E1UW1ELENBOFFwRDs7O0FBQ0EsTUFBTUYsUUFBUSxHQUFHLHVCQUFXUCxHQUFYLENBQWpCOztBQUNBLE1BQUlPLFFBQUosRUFBYztBQUNaLDBCQUFVLFlBQVc7QUFDbkJBLE1BQUFBLFFBQVEsQ0FBQ2dELEdBQVQsQ0FBYWxELElBQWI7QUFDQSxhQUFPLFlBQVc7QUFDaEJFLFFBQUFBLFFBQVEsQ0FBQ2lELE1BQVQsQ0FBZ0JuRCxJQUFoQjtBQUNELE9BRkQ7QUFHRCxLQUxELEVBS0csRUFMSDtBQU1EOztBQUVELFNBQU9BLElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgUmVhY3ROb2RlLFxuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbiAgdXNlQ29udGV4dCxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgbWFwLCBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZHMge1xuICBbZmllbGQ6IHN0cmluZ106IHtcbiAgICBpbml0VmFsdWU/OiBhbnk7XG4gICAgdmFsaWRhdG9ycz86IHtcbiAgICAgICh2OiBhbnkpOiBQcm9taXNlPHN0cmluZz4gfCBzdHJpbmc7XG4gICAgICBkZWJvdW5jZT86IG51bWJlcjtcbiAgICB9W107XG4gIH07XG59XG5cbmludGVyZmFjZSBJbm5lckZvcm0ge1xuICBmaWVsZHM6IHtcbiAgICBbZmllbGQ6IHN0cmluZ106IEZvcm1GaWVsZDtcbiAgfTtcbiAgdmFsdWVzOiB7XG4gICAgW2ZpZWxkOiBzdHJpbmddOiBhbnk7XG4gIH07XG4gIGNoaWxkcmVuOiBTZXQ8SW5uZXJGb3JtPjtcbiAgbXV0ZXg6IGJvb2xlYW47XG5cbiAgZmllbGQ6IEZpZWxkRGVjb3JhdG9yO1xuICBkYXRhOiBEYXRhO1xuICB2YWxpZGF0ZTogVmFsaWRhdGU7XG4gIGxpbms6IExpbms7XG59XG5cbi8vIHN0YXR1cyBtYWNoaW5lOlxuLy8gbm9uZSAtPiBwZW5kaW5nXG4vLyBwZW5kaW5nIC0+IHN1Y2Nlc3MgLyBmYWlsXG4vLyBzdWNjZXNzIC8gZmFpbCAtPiBwZW5kaW5nXG5leHBvcnQgdHlwZSBTdGF0dXMgPSAnbm9uZScgfCAncGVuZGluZycgfCAnc3VjY2VzcycgfCAnZmFpbCc7XG5cbmludGVyZmFjZSBGb3JtRmllbGQge1xuICB2YWx1ZTogYW55O1xuICBzZXRWYWx1ZTogUmVhY3QuRGlzcGF0Y2g8YW55PjtcbiAgc3RhdHVzPzogU3RhdHVzO1xuICBzZXRTdGF0dXM/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxTdGF0dXM+PjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIHNldEVycm9yPzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHZhbGlkYXRlJD86IFN1YmplY3Q8YW55PjtcbiAgdmFsaWRhdGVkPzogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0ZSB7XG4gIChmaWVsZD86IHN0cmluZywgdmFsdWU/OiBhbnkpOiBQcm9taXNlPGFueT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSB7XG4gIChcbiAgICBmaWVsZD86XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCB7XG4gICAgICAgICAgW2ZpZWxkOiBzdHJpbmddOiBhbnk7XG4gICAgICAgIH0sXG4gICAgdmFsdWU/OiBhbnksXG4gICk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZERlY29yYXRvciB7XG4gIChmaWVsZDogc3RyaW5nLCByZW5kZXI6IEZpZWxkUmVuZGVyKTogUmVhY3ROb2RlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmsge1xuICAoZmllbGQ6IHN0cmluZyB8IExpbmtQcm9wcywgcHJvcHM/OiBMaW5rUHJvcHMpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmtQcm9wcyB7XG4gIHZhbHVlPzogYW55O1xuICBvbkNoYW5nZT86ICh2OiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRSZW5kZXIge1xuICAocGFyYW1zOiB7XG4gICAgdmFsdWU6IGFueTtcbiAgICBzZXRWYWx1ZTogUmVhY3QuRGlzcGF0Y2g8YW55PjtcbiAgICBzdGF0dXM6IFN0YXR1cztcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIHZhbGlkYXRlOiAodmFsdWU6IGFueSkgPT4gUHJvbWlzZTxhbnk+O1xuICB9KTogUmVhY3ROb2RlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm0ge1xuICBmaWVsZDogRmllbGREZWNvcmF0b3I7XG4gIGRhdGE6IERhdGE7XG4gIHZhbGlkYXRlOiBWYWxpZGF0ZTtcbiAgbGluazogTGluaztcbn1cblxuY29uc3QgY3R4ID0gUmVhY3QuY3JlYXRlQ29udGV4dDxTZXQ8SW5uZXJGb3JtPiB8IG51bGw+KG51bGwpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VGb3JtKGZpZWxkczogRmllbGRzKTogRm9ybSB7XG4gIGNvbnN0IFtmb3JtXSA9IHVzZVN0YXRlKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZvcm06IElubmVyRm9ybSA9IHtcbiAgICAgIGZpZWxkczoge30sXG4gICAgICB2YWx1ZXM6IHt9LFxuICAgICAgY2hpbGRyZW46IG5ldyBTZXQ8SW5uZXJGb3JtPigpLFxuXG4gICAgICBmaWVsZChmaWVsZCwgcmVuZGVyKSB7XG4gICAgICAgIGlmICghZm9ybS5maWVsZHNbZmllbGRdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cyA9ICdub25lJywgZXJyb3IgPSAnJyB9ID0gZm9ybS5maWVsZHNbXG4gICAgICAgICAgZmllbGRcbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxjdHguUHJvdmlkZXIgdmFsdWU9e2Zvcm0uY2hpbGRyZW59PlxuICAgICAgICAgICAge3JlbmRlcih7XG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBzZXRWYWx1ZSxcbiAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0udmFsaWRhdGUoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICAgICApO1xuICAgICAgfSxcblxuICAgICAgZGF0YShmaWVsZCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtLmZpZWxkc1tmaWVsZF07XG4gICAgICAgICAgaWYgKCFmb3JtRmllbGQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBmb3JtIGZpZWxkIFske2ZpZWxkfV1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZm9ybS52YWx1ZXNbZmllbGRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBmIGluIGZpZWxkKSB7XG4gICAgICAgICAgICBmb3JtLmRhdGEoZiwgZmllbGRbZl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybS52YWx1ZXM7XG4gICAgICB9LFxuXG4gICAgICBhc3luYyB2YWxpZGF0ZShmaWVsZCwgdikge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICBpZiAoIWZvcm0uZmllbGRzW2ZpZWxkXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHsgdmFsaWRhdGUkLCB2YWxpZGF0ZWQsIHZhbHVlIH0gPSBmb3JtLmZpZWxkc1tmaWVsZF07XG5cbiAgICAgICAgICBpZiAoIXZhbGlkYXRlJCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgZm9ybSBmaWVsZCBbJHtmaWVsZH1dIGhhcyBub3QgYW55IHZhbGlkYXRvciwgY2FuIG5vdCBiZSB2YWxpZGF0ZWRgLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YWxpZGF0ZSQubmV4dCh2ICE9PSB1bmRlZmluZWQgPyB2IDogdmFsdWUpO1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0ZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9ucyA9IFtdO1xuICAgICAgICAvLyBicmVhZHRoLWZpcnN0IHZhbGlkYXRpbmdcbiAgICAgICAgY29uc3QgcXVldWUgPSBbZm9ybV07XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgY29uc3QgZm9ybSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgaWYgKCFmb3JtKSBicmVhaztcblxuICAgICAgICAgIGZvciAobGV0IGZpZWxkIGluIGZvcm0uZmllbGRzKSB7XG4gICAgICAgICAgICBjb25zdCB7IHZhbGlkYXRlJCwgdmFsaWRhdGVkLCB2YWx1ZSB9ID0gZm9ybS5maWVsZHNbZmllbGRdO1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRlJCAmJiB2YWxpZGF0ZWQpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGUkLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcXVldWUucHVzaCguLi5mb3JtLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh2YWxpZGF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgICAgICAgZm9yIChsZXQgciBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAociA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFdlIG11c3QgdXNlIGEgbXV0ZXggdG8gbWFrZSBzdXJlIFwic2V0IHZhbHVlXCIgYW5kIFwib25DaGFuZ2VcIlxuICAgICAgLy8gYXJlIG5vdCB0cmlnZ2VyZWQgYXQgdGhlIHNhbWUgZGF0YSBmbG93IGNpcmNsZS5cbiAgICAgIC8vIE9yIGluZmluaXRlIGxvb3Agb2NjdXJzIGlmIHRoZSBpbml0aWFsIHZhbHVlIGFyZSBub3RcbiAgICAgIC8vIGVxdWFsIHRvIHRoZSB2YWx1ZSBmcm9tIHByb3BzLCB3aGljaCBvZnRlbiBoYXBwZW5zIVxuICAgICAgbXV0ZXg6IGZhbHNlLFxuICAgICAgbGluayhmaWVsZCwgcHJvcHMpIHtcbiAgICAgICAgbGV0IGY6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBmID0gZmllbGQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcDogTGlua1Byb3BzO1xuICAgICAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgICAgcCA9IGZpZWxkIGFzIExpbmtQcm9wcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwID0gcHJvcHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBwKSB7XG4gICAgICAgICAgdXNlRWZmZWN0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgnb25DaGFuZ2UnIGluIHApIHtcbiAgICAgICAgICAgICAgICBmb3JtLm11dGV4ID0gIWZvcm0ubXV0ZXg7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3JtLm11dGV4KSByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5kYXRhKGYsIHAudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGZvcm0uZGF0YShwLnZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbcC52YWx1ZV0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ29uQ2hhbmdlJyBpbiBwKSB7XG4gICAgICAgICAgdXNlRWZmZWN0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICgndmFsdWUnIGluIHApIHtcbiAgICAgICAgICAgICAgICBmb3JtLm11dGV4ID0gIWZvcm0ubXV0ZXg7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3JtLm11dGV4KSByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwLm9uQ2hhbmdlIShmb3JtLmRhdGEoZikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtmb3JtLmRhdGEoZildLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIGluaXQgZmllbGQgdmFsaWRhdGlvbiBwaXBlbGluZXNcbiAgICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICAgIGNvbnN0IHsgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgICBmb3JtLmZpZWxkc1tmaWVsZF0gPSB7fSBhcyBGb3JtRmllbGQ7XG4gICAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtLmZpZWxkc1tmaWVsZF07XG5cbiAgICAgIGlmICh2YWxpZGF0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGUkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGUkID0gdmFsaWRhdGUkO1xuXG4gICAgICAgIGxldCBwaXBlbGluZSQgPSB2YWxpZGF0ZSQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24odikge1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ3BlbmRpbmcnKTtcbiAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciEoJycpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IHZhbGlkYXRvciBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgaWYgKHZhbGlkYXRvci5kZWJvdW5jZSkge1xuICAgICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICAgIGRlYm91bmNlKGZ1bmN0aW9uKHsgZXJyb3IgfSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgIC8vICAgYGRlYm91bmNlLSR7ZmllbGR9LSR7dmFsaWRhdG9ycy5pbmRleE9mKHZhbGlkYXRvcil9YCxcbiAgICAgICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lcihlcnJvciA/IDAgOiB2YWxpZGF0b3IuZGVib3VuY2UpO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGlwZWxpbmUkID0gcGlwZWxpbmUkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24oeyB2YWx1ZSwgZXJyb3IgfSkge1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgdmFsaWRhdGUtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gKTtcbiAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gYXdhaXQgdmFsaWRhdG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRlUmVzb2x2ZTogKHY/OiBib29sZWFuKSA9PiB2b2lkO1xuICAgICAgICBsZXQgdmFsaWRhdGVSZWplY3Q6IChlPzogYW55KSA9PiB2b2lkO1xuICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHBpcGVsaW5lJFxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKGZ1bmN0aW9uKHsgZXJyb3IgfSkge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgnZmFpbCcpO1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciEoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRFcnJvciEoJycpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUocik7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0KGUpO1xuICAgICAgICAgICAgICBmb3JtRmllbGQudmFsaWRhdGVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm07XG4gIH0pO1xuXG4gIC8vIGF0dGFjaCB2YWx1ZSwgc2V0VmFsdWUsIHN0YXR1cywgc2V0U3RhdHVzLCBlcnJvciwgc2V0RXJyb3IgdG8gZm9ybSBmaWVsZFxuICBmb3IgKGxldCBmaWVsZCBpbiBmaWVsZHMpIHtcbiAgICBjb25zdCB7IGluaXRWYWx1ZSwgdmFsaWRhdG9ycyA9IFtdIH0gPSBmaWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgZm9ybUZpZWxkID0gZm9ybS5maWVsZHNbZmllbGRdO1xuXG4gICAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShpbml0VmFsdWUpO1xuICAgIGZvcm0udmFsdWVzW2ZpZWxkXSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC52YWx1ZSA9IHZhbHVlO1xuICAgIGZvcm1GaWVsZC5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHY6IGFueSkge1xuICAgICAgZm9ybS52YWx1ZXMgPSB7IC4uLmZvcm0udmFsdWVzIH07XG4gICAgICBzZXRWYWx1ZSh2KTtcbiAgICB9O1xuXG4gICAgaWYgKHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlPFN0YXR1cz4oJ25vbmUnKTtcbiAgICAgIGZvcm1GaWVsZC5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICBmb3JtRmllbGQuc2V0U3RhdHVzID0gc2V0U3RhdHVzO1xuXG4gICAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcbiAgICAgIGZvcm1GaWVsZC5lcnJvciA9IGVycm9yO1xuICAgICAgZm9ybUZpZWxkLnNldEVycm9yID0gc2V0RXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgcGFyZW50IGZvcm0gZXhpc3RzLCBhdHRhY2ggZm9ybSBpbnN0YW5jZSB0byBpdCBhcyBhIGNoaWxkXG4gIGNvbnN0IGNoaWxkcmVuID0gdXNlQ29udGV4dChjdHgpO1xuICBpZiAoY2hpbGRyZW4pIHtcbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24oKSB7XG4gICAgICBjaGlsZHJlbi5hZGQoZm9ybSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNoaWxkcmVuLmRlbGV0ZShmb3JtKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuICB9XG5cbiAgcmV0dXJuIGZvcm07XG59XG4iXX0=