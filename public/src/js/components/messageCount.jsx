var MessagesStore = require('../stores/messages');

var getMsgCountFromStore = function () {
  return MessagesStore.getChatMessageCount(MessagesStore.getOpenChatUserID());
};

var MessageCount = React.createClass({
  getInitialState: function () {
    return {
      value: getMsgCountFromStore()
    }
  },
  componentWillMount: function () {
    MessagesStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount: function () {
    MessagesStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange: function () {
    this.setState({
      value: getMsgCountFromStore()
    });
  },
  render: function () {
    return (
      <div>
        <span> Message count: {this.state.value} </span>
      </div>
    );
  }
});

module.exports = MessageCount;