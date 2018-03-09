"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _Errors = require("./Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _firebaseBrowser = require("firebase/firebase-browser");

var _firebaseBrowser2 = _interopRequireDefault(_firebaseBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SIGNUP_FORM_STYLE = {
    margin: "0, auto",
    padding: 30
};

var CANCEL_BUTTON_STYLE = {
    marginLeft: 10
};

var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {
            email: "",
            password: "",
            name: "",
            photoURL: "",
            errors: []
        };

        _this.handleOnChangeEmail = _this.handleOnChangeEmail.bind(_this);
        _this.handleOnChangePassword = _this.handleOnChangePassword.bind(_this);
        _this.handleOnChangeName = _this.handleOnChangeName.bind(_this);
        _this.handleOnChangePhotoURL = _this.handleOnChangePhotoURL.bind(_this);
        _this.handleOnSubmit = _this.handleOnSubmit.bind(_this);
        return _this;
    }

    _createClass(Login, [{
        key: "handleOnChangeEmail",
        value: function handleOnChangeEmail(e) {
            this.setState({ email: e.target.value });
        }
    }, {
        key: "handleOnChangePassword",
        value: function handleOnChangePassword(e) {
            this.setState({ password: e.target.value });
        }
    }, {
        key: "handleOnChangeName",
        value: function handleOnChangeName(e) {
            this.setState({ name: e.target.value });
        }
    }, {
        key: "handleOnChangePhotoURL",
        value: function handleOnChangePhotoURL(e) {
            this.setState({ photoURL: e.target.value });
        }
    }, {
        key: "handleOnSubmit",
        value: function handleOnSubmit(e) {
            var _this2 = this;

            var _state = this.state,
                email = _state.email,
                password = _state.password,
                name = _state.name,
                photoURL = _state.photoURL;

            var errors = [];
            var isValid = true;
            e.preventDefault();

            if (!email.length) {
                isValid = false;
                errors.push("Email address can't be blank.");
            }

            if (!password.length) {
                isValid = false;
                errors.push("Password can't be blank.");
            }

            if (!name.length) {
                isValid = false;
                errors.push("Name can't be blank.");
            }

            if (!isValid) {
                this.setState({ errors: errors });
                return;
            }

            _firebaseBrowser2.default.auth().createUserWithEmailAndPassword(email, password).then(function (newUser) {
                return newUser.updateProfile({
                    displayName: name,
                    photoURL: photoURL
                });
            }).then(function () {
                _reactRouter.hashHistory.push("/rooms");
            }).catch(function (err) {
                _this2.setState({ errors: [err.message] });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "form",
                { style: SIGNUP_FORM_STYLE, onSubmit: this.handleOnSubmit },
                _react2.default.createElement(_Errors2.default, { errorMessages: this.state.errors }),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Email address*"
                    ),
                    _react2.default.createElement("input", {
                        type: "email",
                        className: "form-control",
                        placeholder: "email",
                        value: this.state.email,
                        onChange: this.handleOnChangeEmail
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Password"
                    ),
                    _react2.default.createElement("input", {
                        type: "password",
                        className: "form-control",
                        placeholder: "password",
                        value: this.state.password,
                        onChange: this.handleOnChangePassword
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "User name*"
                    ),
                    _react2.default.createElement("input", {
                        type: "text",
                        className: "form-control",
                        placeholder: "user name",
                        value: this.state.name,
                        onChange: this.handleOnChangeName
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Photo URL"
                    ),
                    _react2.default.createElement("input", {
                        type: "text",
                        className: "form-control",
                        placeholder: "photo URL",
                        value: this.state.photoURL,
                        onChange: this.handleOnChangePhotoURL
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "button",
                        { className: "btn btn-large btn-primary" },
                        "Create new account"
                    ),
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { to: "/login" },
                        _react2.default.createElement(
                            "button",
                            { type: "button", style: CANCEL_BUTTON_STYLE, className: "btn btn-large btn-default" },
                            "Cancel"
                        )
                    )
                )
            );
        }
    }]);

    return Login;
}(_react2.default.Component);

exports.default = Login;