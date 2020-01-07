"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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
          var _form$fields$field2, validate$, validated, _value, validations, _field2, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child, _field3, _child$fields$_field, _validate$, _validated, _value2;

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
                  validations = [];

                  for (_field2 in form.fields) {
                    if (form.fields[_field2].validate$) {
                      validations.push(form.validate(_field2));
                    }
                  }

                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 13;

                  for (_iterator = form.children[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    child = _step.value;

                    for (_field3 in child.fields) {
                      _child$fields$_field = child.fields[_field3], _validate$ = _child$fields$_field.validate$, _validated = _child$fields$_field.validated, _value2 = _child$fields$_field.value;

                      if (_validate$) {
                        _validate$.next(_value2);

                        validations.push(_validated);
                      }
                    }
                  }

                  _context.next = 21;
                  break;

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](13);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

                case 21:
                  _context.prev = 21;
                  _context.prev = 22;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 24:
                  _context.prev = 24;

                  if (!_didIteratorError) {
                    _context.next = 27;
                    break;
                  }

                  throw _iteratorError;

                case 27:
                  return _context.finish(24);

                case 28:
                  return _context.finish(21);

                case 29:
                  return _context.abrupt("return", Promise.all(validations).then(function (results) {
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

                case 30:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[13, 17, 21, 29], [22,, 24, 28]]);
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

    var _loop = function _loop(_field4) {
      var _fields$_field4$valid = fields[_field4].validators,
          validators = _fields$_field4$valid === void 0 ? [] : _fields$_field4$valid;
      form.fields[_field4] = {};
      var formField = form.fields[_field4];

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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function _loop2() {
            var validator = _step3.value;

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

          for (var _iterator3 = validators[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
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

    for (var _field4 in fields) {
      _loop(_field4);
    }

    return form;
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      form = _useState2[0]; // attach value, setValue, status, setStatus, error, setError to form field


  var _loop3 = function _loop3(_field5) {
    var _fields$_field = fields[_field5],
        initValue = _fields$_field.initValue,
        _fields$_field$valida = _fields$_field.validators,
        validators = _fields$_field$valida === void 0 ? [] : _fields$_field$valida;
    var formField = form.fields[_field5];

    var _useState3 = (0, _react.useState)(initValue),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        value = _useState4[0],
        setValue = _useState4[1];

    form.values[_field5] = value;
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

  for (var _field5 in fields) {
    _loop3(_field5);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiY3R4IiwiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlRm9ybSIsImZpZWxkcyIsImZvcm0iLCJ2YWx1ZXMiLCJjaGlsZHJlbiIsIlNldCIsImZpZWxkIiwicmVuZGVyIiwiRXJyb3IiLCJ2YWx1ZSIsInNldFZhbHVlIiwic3RhdHVzIiwiZXJyb3IiLCJ2YWxpZGF0ZSIsImRhdGEiLCJmb3JtRmllbGQiLCJ1bmRlZmluZWQiLCJmIiwidiIsInZhbGlkYXRlJCIsInZhbGlkYXRlZCIsIm5leHQiLCJ2YWxpZGF0aW9ucyIsInB1c2giLCJjaGlsZCIsIlByb21pc2UiLCJhbGwiLCJ0aGVuIiwicmVzdWx0cyIsInIiLCJtdXRleCIsImxpbmsiLCJwcm9wcyIsInAiLCJvbkNoYW5nZSIsInZhbGlkYXRvcnMiLCJsZW5ndGgiLCJTdWJqZWN0IiwicGlwZWxpbmUkIiwicGlwZSIsInNldFN0YXR1cyIsInNldEVycm9yIiwidmFsaWRhdG9yIiwiZGVib3VuY2UiLCJ2YWxpZGF0ZVJlc29sdmUiLCJ2YWxpZGF0ZVJlamVjdCIsInJlc29sdmUiLCJyZWplY3QiLCJzdWJzY3JpYmUiLCJlIiwiaW5pdFZhbHVlIiwiYWRkIiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFPQTs7QUFDQTs7Ozs7O0FBMEZBLElBQU1BLEdBQUcsR0FBR0MsZUFBTUMsYUFBTixDQUEyQyxJQUEzQyxDQUFaOztBQUVlLFNBQVNDLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXVDO0FBQUEsa0JBQ3JDLHFCQUFTLFlBQVc7QUFDakMsUUFBTUMsSUFBZSxHQUFHO0FBQ3RCRCxNQUFBQSxNQUFNLEVBQUUsRUFEYztBQUV0QkUsTUFBQUEsTUFBTSxFQUFFLEVBRmM7QUFHdEJDLE1BQUFBLFFBQVEsRUFBRSxJQUFJQyxHQUFKLEVBSFk7QUFLdEJDLE1BQUFBLEtBTHNCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FB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O0FBQUE7QUFBQSxVQUNsQnpCLE1BRGtCO0FBQUEsVUFDVjZCLFNBRFU7O0FBRXpCekIsTUFBQUEsU0FBUyxDQUFDSixNQUFWLEdBQW1CQSxNQUFuQjtBQUNBSSxNQUFBQSxTQUFTLENBQUN5QixTQUFWLEdBQXNCQSxTQUF0Qjs7QUFIeUIsdUJBS0MscUJBQVMsRUFBVCxDQUxEO0FBQUE7QUFBQSxVQUtsQjVCLEtBTGtCO0FBQUEsVUFLWDZCLFFBTFc7O0FBTXpCMUIsTUFBQUEsU0FBUyxDQUFDSCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBRyxNQUFBQSxTQUFTLENBQUMwQixRQUFWLEdBQXFCQSxRQUFyQjtBQUNEO0FBelFpRDs7QUFvUHBELE9BQUssSUFBSW5DLE9BQVQsSUFBa0JMLE1BQWxCLEVBQTBCO0FBQUEsV0FBakJLLE9BQWlCO0FBc0J6QixHQTFRbUQsQ0E0UXBEOzs7QUFDQSxNQUFNRixRQUFRLEdBQUcsdUJBQVdQLEdBQVgsQ0FBakI7O0FBQ0EsTUFBSU8sUUFBSixFQUFjO0FBQ1osMEJBQVUsWUFBVztBQUNuQkEsTUFBQUEsUUFBUSxDQUFDK0MsR0FBVCxDQUFhakQsSUFBYjtBQUNBLGFBQU8sWUFBVztBQUNoQkUsUUFBQUEsUUFBUSxDQUFDZ0QsTUFBVCxDQUFnQmxELElBQWhCO0FBQ0QsT0FGRDtBQUdELEtBTEQsRUFLRyxFQUxIO0FBTUQ7O0FBRUQsU0FBT0EsSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICBSZWFjdE5vZGUsXG4gIHVzZUVmZmVjdCxcbiAgdXNlUmVmLFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0LCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXAsIGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkcyB7XG4gIFtmaWVsZDogc3RyaW5nXToge1xuICAgIGluaXRWYWx1ZT86IGFueTtcbiAgICB2YWxpZGF0b3JzPzoge1xuICAgICAgKHY6IGFueSk6IFByb21pc2U8c3RyaW5nPiB8IHN0cmluZztcbiAgICAgIGRlYm91bmNlPzogbnVtYmVyO1xuICAgIH1bXTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIElubmVyRm9ybSB7XG4gIGZpZWxkczoge1xuICAgIFtmaWVsZDogc3RyaW5nXTogRm9ybUZpZWxkO1xuICB9O1xuICB2YWx1ZXM6IHtcbiAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgfTtcbiAgY2hpbGRyZW46IFNldDxJbm5lckZvcm0+O1xuICBtdXRleDogYm9vbGVhbjtcblxuICBmaWVsZDogRmllbGREZWNvcmF0b3I7XG4gIGRhdGE6IERhdGE7XG4gIHZhbGlkYXRlOiBWYWxpZGF0ZTtcbiAgbGluazogTGluaztcbn1cblxuLy8gc3RhdHVzIG1hY2hpbmU6XG4vLyBub25lIC0+IHBlbmRpbmdcbi8vIHBlbmRpbmcgLT4gc3VjY2VzcyAvIGZhaWxcbi8vIHN1Y2Nlc3MgLyBmYWlsIC0+IHBlbmRpbmdcbmV4cG9ydCB0eXBlIFN0YXR1cyA9ICdub25lJyB8ICdwZW5kaW5nJyB8ICdzdWNjZXNzJyB8ICdmYWlsJztcblxuaW50ZXJmYWNlIEZvcm1GaWVsZCB7XG4gIHZhbHVlOiBhbnk7XG4gIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICBzdGF0dXM/OiBTdGF0dXM7XG4gIHNldFN0YXR1cz86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFN0YXR1cz4+O1xuICBlcnJvcj86IHN0cmluZztcbiAgc2V0RXJyb3I/OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgdmFsaWRhdGUkPzogU3ViamVjdDxhbnk+O1xuICB2YWxpZGF0ZWQ/OiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRlIHtcbiAgKGZpZWxkPzogc3RyaW5nLCB2YWx1ZT86IGFueSk6IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhIHtcbiAgKFxuICAgIGZpZWxkPzpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IHtcbiAgICAgICAgICBbZmllbGQ6IHN0cmluZ106IGFueTtcbiAgICAgICAgfSxcbiAgICB2YWx1ZT86IGFueSxcbiAgKTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkRGVjb3JhdG9yIHtcbiAgKGZpZWxkOiBzdHJpbmcsIHJlbmRlcjogRmllbGRSZW5kZXIpOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluayB7XG4gIChmaWVsZDogc3RyaW5nIHwgTGlua1Byb3BzLCBwcm9wcz86IExpbmtQcm9wcyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua1Byb3BzIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9uQ2hhbmdlPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZFJlbmRlciB7XG4gIChwYXJhbXM6IHtcbiAgICB2YWx1ZTogYW55O1xuICAgIHNldFZhbHVlOiBSZWFjdC5EaXNwYXRjaDxhbnk+O1xuICAgIHN0YXR1czogU3RhdHVzO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgdmFsaWRhdGU6ICh2YWx1ZTogYW55KSA9PiBQcm9taXNlPGFueT47XG4gIH0pOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIGZpZWxkOiBGaWVsZERlY29yYXRvcjtcbiAgZGF0YTogRGF0YTtcbiAgdmFsaWRhdGU6IFZhbGlkYXRlO1xuICBsaW5rOiBMaW5rO1xufVxuXG5jb25zdCBjdHggPSBSZWFjdC5jcmVhdGVDb250ZXh0PFNldDxJbm5lckZvcm0+IHwgbnVsbD4obnVsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZUZvcm0oZmllbGRzOiBGaWVsZHMpOiBGb3JtIHtcbiAgY29uc3QgW2Zvcm1dID0gdXNlU3RhdGUoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZm9ybTogSW5uZXJGb3JtID0ge1xuICAgICAgZmllbGRzOiB7fSxcbiAgICAgIHZhbHVlczoge30sXG4gICAgICBjaGlsZHJlbjogbmV3IFNldDxJbm5lckZvcm0+KCksXG5cbiAgICAgIGZpZWxkKGZpZWxkLCByZW5kZXIpIHtcbiAgICAgICAgaWYgKCFmb3JtLmZpZWxkc1tmaWVsZF0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHZhbHVlLCBzZXRWYWx1ZSwgc3RhdHVzID0gJ25vbmUnLCBlcnJvciA9ICcnIH0gPSBmb3JtLmZpZWxkc1tcbiAgICAgICAgICBmaWVsZFxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGN0eC5Qcm92aWRlciB2YWx1ZT17Zm9ybS5jaGlsZHJlbn0+XG4gICAgICAgICAgICB7cmVuZGVyKHtcbiAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgIHNldFZhbHVlLFxuICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS52YWxpZGF0ZShmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgICAgICk7XG4gICAgICB9LFxuXG4gICAgICBkYXRhKGZpZWxkLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IGZvcm1GaWVsZCA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICBpZiAoIWZvcm1GaWVsZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIGZvcm0gZmllbGQgWyR7ZmllbGR9XWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmb3JtLnZhbHVlc1tmaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGZvciAobGV0IGYgaW4gZmllbGQpIHtcbiAgICAgICAgICAgIGZvcm0uZGF0YShmLCBmaWVsZFtmXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtLnZhbHVlcztcbiAgICAgIH0sXG5cbiAgICAgIGFzeW5jIHZhbGlkYXRlKGZpZWxkLCB2KSB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgIGlmICghZm9ybS5maWVsZHNbZmllbGRdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gZm9ybSBmaWVsZCBbJHtmaWVsZH1dYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyB2YWxpZGF0ZSQsIHZhbGlkYXRlZCwgdmFsdWUgfSA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcblxuICAgICAgICAgIGlmICghdmFsaWRhdGUkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBmb3JtIGZpZWxkIFske2ZpZWxkfV0gaGFzIG5vdCBhbnkgdmFsaWRhdG9yLCBjYW4gbm90IGJlIHZhbGlkYXRlZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhbGlkYXRlJC5uZXh0KHYgIT09IHVuZGVmaW5lZCA/IHYgOiB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGZpZWxkIGluIGZvcm0uZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGZvcm0uZmllbGRzW2ZpZWxkXS52YWxpZGF0ZSQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25zLnB1c2goZm9ybS52YWxpZGF0ZShmaWVsZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBmb3JtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgZm9yIChsZXQgZmllbGQgaW4gY2hpbGQuZmllbGRzKSB7XG4gICAgICAgICAgICBjb25zdCB7IHZhbGlkYXRlJCwgdmFsaWRhdGVkLCB2YWx1ZSB9ID0gY2hpbGQuZmllbGRzW2ZpZWxkXTtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZSQpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGUkLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHZhbGlkYXRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICAgICAgICBmb3IgKGxldCByIG9mIHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmIChyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgLy8gV2UgbXVzdCB1c2UgYSBtdXRleCB0byBtYWtlIHN1cmUgXCJzZXQgdmFsdWVcIiBhbmQgXCJvbkNoYW5nZVwiXG4gICAgICAvLyBhcmUgbm90IHRyaWdnZXJlZCBhdCB0aGUgc2FtZSBkYXRhIGZsb3cgY2lyY2xlLlxuICAgICAgLy8gT3IgaW5maW5pdGUgbG9vcCBvY2N1cnMgaWYgdGhlIGluaXRpYWwgdmFsdWUgYXJlIG5vdFxuICAgICAgLy8gZXF1YWwgdG8gdGhlIHZhbHVlIGZyb20gcHJvcHMsIHdoaWNoIG9mdGVuIGhhcHBlbnMhXG4gICAgICBtdXRleDogZmFsc2UsXG4gICAgICBsaW5rKGZpZWxkLCBwcm9wcykge1xuICAgICAgICBsZXQgZjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGYgPSBmaWVsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwOiBMaW5rUHJvcHM7XG4gICAgICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgICBwID0gZmllbGQgYXMgTGlua1Byb3BzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAgPSBwcm9wcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgndmFsdWUnIGluIHApIHtcbiAgICAgICAgICB1c2VFZmZlY3QoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCdvbkNoYW5nZScgaW4gcCkge1xuICAgICAgICAgICAgICAgIGZvcm0ubXV0ZXggPSAhZm9ybS5tdXRleDtcbiAgICAgICAgICAgICAgICBpZiAoIWZvcm0ubXV0ZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3JtLmRhdGEoZiwgcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9ybS5kYXRhKHAudmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtwLnZhbHVlXSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnb25DaGFuZ2UnIGluIHApIHtcbiAgICAgICAgICB1c2VFZmZlY3QoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCd2YWx1ZScgaW4gcCkge1xuICAgICAgICAgICAgICAgIGZvcm0ubXV0ZXggPSAhZm9ybS5tdXRleDtcbiAgICAgICAgICAgICAgICBpZiAoIWZvcm0ubXV0ZXgpIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHAub25DaGFuZ2UhKGZvcm0uZGF0YShmKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW2Zvcm0uZGF0YShmKV0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgLy8gaW5pdCBmaWVsZCB2YWxpZGF0aW9uIHBpcGVsaW5lc1xuICAgIGZvciAobGV0IGZpZWxkIGluIGZpZWxkcykge1xuICAgICAgY29uc3QgeyB2YWxpZGF0b3JzID0gW10gfSA9IGZpZWxkc1tmaWVsZF07XG5cbiAgICAgIGZvcm0uZmllbGRzW2ZpZWxkXSA9IHt9IGFzIEZvcm1GaWVsZDtcbiAgICAgIGNvbnN0IGZvcm1GaWVsZCA9IGZvcm0uZmllbGRzW2ZpZWxkXTtcblxuICAgICAgaWYgKHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZSQgPSB2YWxpZGF0ZSQ7XG5cbiAgICAgICAgbGV0IHBpcGVsaW5lJCA9IHZhbGlkYXRlJC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICBmb3JtRmllbGQuc2V0U3RhdHVzISgncGVuZGluZycpO1xuICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICBpZiAodmFsaWRhdG9yLmRlYm91bmNlKSB7XG4gICAgICAgICAgICBwaXBlbGluZSQgPSBwaXBlbGluZSQucGlwZShcbiAgICAgICAgICAgICAgZGVib3VuY2UoZnVuY3Rpb24oeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgLy8gICBgZGVib3VuY2UtJHtmaWVsZH0tJHt2YWxpZGF0b3JzLmluZGV4T2YodmFsaWRhdG9yKX1gLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVyKGVycm9yID8gMCA6IHZhbGlkYXRvci5kZWJvdW5jZSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwaXBlbGluZSQgPSBwaXBlbGluZSQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbih7IHZhbHVlLCBlcnJvciB9KSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGB2YWxpZGF0ZS0ke2ZpZWxkfS0ke3ZhbGlkYXRvcnMuaW5kZXhPZih2YWxpZGF0b3IpfWApO1xuICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBhd2FpdCB2YWxpZGF0b3IodmFsdWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsaWRhdGVSZXNvbHZlOiAodj86IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgICAgIGxldCB2YWxpZGF0ZVJlamVjdDogKGU/OiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgcGlwZWxpbmUkXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoZnVuY3Rpb24oeyBlcnJvciB9KSB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMhKCdmYWlsJyk7XG4gICAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yIShlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldFN0YXR1cyEoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnNldEVycm9yISgnJyk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZShyKTtcbiAgICAgICAgICAgICAgZm9ybUZpZWxkLnZhbGlkYXRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgdmFsaWRhdGVSZWplY3QoZSk7XG4gICAgICAgICAgICAgIGZvcm1GaWVsZC52YWxpZGF0ZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybTtcbiAgfSk7XG5cbiAgLy8gYXR0YWNoIHZhbHVlLCBzZXRWYWx1ZSwgc3RhdHVzLCBzZXRTdGF0dXMsIGVycm9yLCBzZXRFcnJvciB0byBmb3JtIGZpZWxkXG4gIGZvciAobGV0IGZpZWxkIGluIGZpZWxkcykge1xuICAgIGNvbnN0IHsgaW5pdFZhbHVlLCB2YWxpZGF0b3JzID0gW10gfSA9IGZpZWxkc1tmaWVsZF07XG5cbiAgICBjb25zdCBmb3JtRmllbGQgPSBmb3JtLmZpZWxkc1tmaWVsZF07XG5cbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKGluaXRWYWx1ZSk7XG4gICAgZm9ybS52YWx1ZXNbZmllbGRdID0gdmFsdWU7XG4gICAgZm9ybUZpZWxkLnZhbHVlID0gdmFsdWU7XG4gICAgZm9ybUZpZWxkLnNldFZhbHVlID0gZnVuY3Rpb24odjogYW55KSB7XG4gICAgICBmb3JtLnZhbHVlcyA9IHsgLi4uZm9ybS52YWx1ZXMgfTtcbiAgICAgIHNldFZhbHVlKHYpO1xuICAgIH07XG5cbiAgICBpZiAodmFsaWRhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGU8U3RhdHVzPignbm9uZScpO1xuICAgICAgZm9ybUZpZWxkLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgIGZvcm1GaWVsZC5zZXRTdGF0dXMgPSBzZXRTdGF0dXM7XG5cbiAgICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgICAgZm9ybUZpZWxkLmVycm9yID0gZXJyb3I7XG4gICAgICBmb3JtRmllbGQuc2V0RXJyb3IgPSBzZXRFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvLyBpZiBwYXJlbnQgZm9ybSBleGlzdHMsIGF0dGFjaCBmb3JtIGluc3RhbmNlIHRvIGl0IGFzIGEgY2hpbGRcbiAgY29uc3QgY2hpbGRyZW4gPSB1c2VDb250ZXh0KGN0eCk7XG4gIGlmIChjaGlsZHJlbikge1xuICAgIHVzZUVmZmVjdChmdW5jdGlvbigpIHtcbiAgICAgIGNoaWxkcmVuLmFkZChmb3JtKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2hpbGRyZW4uZGVsZXRlKGZvcm0pO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG4gIH1cblxuICByZXR1cm4gZm9ybTtcbn1cbiJdfQ==