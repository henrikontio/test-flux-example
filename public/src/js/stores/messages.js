var Dispatcher = require('../dispatchers/app');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UserStore = require('../stores/user');

var messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online'
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080
    },
    messages: [{
      contents: 'Hey!',
      from: 2,
      timestamp: 1424469793023
    }, {
      contents: 'Hey, what\'s up?',
      from: 1,
      timestamp: 1424469794000
    }]
  }, 
  3: {
    user: {
      profilePicture: '',
      id: 3,
      name: 'Foo Bar',
      status: 'offline'
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080
    },
    messages: [{
      contents: 'Motherfucker!',
      from: 3,
      timestamp: 1424469793023
    }, {
      contents: 'Huh?',
      from: 1,
      timestamp: 1424469794000
    }]
  }
};

var openChatID = parseInt(Object.keys(messages)[1], 10);

var messagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
    this.off('change', callback);
  },
  getOpenChatUserID: function () {
    return openChatID;
  },
  getChatByUserID: function (id) {
    return messages[id];
  },
  getAllChats: function () {
    return messages;
  }
});

messagesStore.dispatchToken = Dispatcher.register(function (payload) {
  var actions = {
    updateOpenChatID: function (payload) {
      openChatID = payload.action.userID;

      messagesStore.emit('change');
    },
    sendMessage: function (payload) {
      var userID = payload.action.userID;

      messages[userID].messages.push({
        contents: payload.action.message,
        from: UserStore.user.id,
        timestamp: payload.action.timestamp
      });

      messages[userID].lastAccess.currentUser = +new Date();

      messagesStore.emit('change');
    }
  };

  actions[payload.action.type] && actions[payload.action.type](payload);
});

module.exports = messagesStore;