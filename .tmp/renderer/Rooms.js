"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _RoomItem = require("./RoomItem");

var _RoomItem2 = _interopRequireDefault(_RoomItem);

var _firebaseBrowser = require("firebase/firebase-browser");

var _firebaseBrowser2 = _interopRequireDefault(_firebaseBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_CHAT_STYLE = {
    fontSize: 120,
    color: "#DDD"
};

var FORM_STYLE = {
    display: "flex"
};

var BUTTON_STYLE = {
    marginLeft: 10
};

var Rooms = function (_React$Component) {
    _inherits(Rooms, _React$Component);

    function Rooms(props) {
        _classCallCheck(this, Rooms);

        var _this = _possibleConstructorReturn(this, (Rooms.__proto__ || Object.getPrototypeOf(Rooms)).call(this, props));

        _this.state = {
            roomName: "",
            rooms: []
        };
        _this.db = _firebaseBrowser2.default.database();
        _this.handleOnChangeRootName = _this.handleOnChangeRootName.bind(_this);
        _this.handleOnSubmit = _this.handleOnSubmit.bind(_this);
        return _this;
    }

    _createClass(Rooms, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetchRooms();
        }
    }, {
        key: "handleOnChangeRootName",
        value: function handleOnChangeRootName(e) {
            this.setState({ roomName: e.target.value });
        }
    }, {
        key: "handleOnSubmit",
        value: function handleOnSubmit(e) {
            var _this2 = this;

            var roomName = this.state.roomName;

            e.preventDefault();

            if (!roomName.length) {
                return;
            }

            // Make new Chatroom for a Firebase 
            var newRoomRef = this.db.ref("/chatrooms").push();
            var newRoom = {
                description: roomName
            };

            newRoomRef.update(newRoom).then(function () {
                _this2.setState({ roomName: "" });
                return _this2.fetchRooms().then(function () {
                    _reactRouter.hashHistory.push("/rooms/" + newRoomRef.key);
                });
            });
        }
    }, {
        key: "fetchRooms",
        value: function fetchRooms() {
            var _this3 = this;

            return this.db.ref("/chatrooms").limitToLast(20).once("value").then(function (snapshot) {
                var rooms = [];
                snapshot.forEach(function (item) {
                    rooms.push(Object.assign({ key: item.key }, item.val()));
                });

                _this3.setState({ rooms: rooms });
            });
        }

        // Drawing the left pane 

    }, {
        key: "renderRoomList",
        value: function renderRoomList() {
            var roomId = this.props.params.roomId;
            var _state = this.state,
                rooms = _state.rooms,
                roomName = _state.roomName;

            return _react2.default.createElement(
                "div",
                { className: "list-group" },
                rooms.map(function (r) {
                    return _react2.default.createElement(_RoomItem2.default, { room: r, key: r.key, selected: r.key == roomId });
                }),
                _react2.default.createElement(
                    "div",
                    { className: "list-group-header" },
                    _react2.default.createElement(
                        "form",
                        { style: FORM_STYLE, onSubmit: this.handleOnSubmit },
                        _react2.default.createElement("input", {
                            type: "test",
                            className: "form-control",
                            placeholder: "New room",
                            value: roomName,
                            onChange: this.handleOnChangeRootName
                        }),
                        _react2.default.createElement(
                            "button",
                            { className: "btn btn-default", style: BUTTON_STYLE },
                            _react2.default.createElement("span", { className: "icon icon-plus" })
                        )
                    )
                )
            );
        }

        // Drawing the right pane 

    }, {
        key: "renderRoom",
        value: function renderRoom() {
            if (this.props.children) {
                return this.props.children;
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "text-center" },
                    _react2.default.createElement(
                        "div",
                        { style: ICON_CHAT_STYLE },
                        _react2.default.createElement("span", { className: "icon icon-chat" })
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "Join a chat room from the sidebar or create your chat room."
                    )
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "pane-group" },
                _react2.default.createElement(
                    "div",
                    { className: "pane-sm slider" },
                    this.renderRoomList()
                ),
                _react2.default.createElement(
                    "div",
                    { className: "pane" },
                    this.renderRoom()
                )
            );
        }
    }]);

    return Rooms;
}(_react2.default.Component);

exports.default = Rooms;