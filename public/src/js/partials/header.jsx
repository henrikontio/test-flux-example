var MessageCount = require('../components/messageCount');

var Header = React.createClass({
	render: function () {
		return (
			<header className="header">
        <MessageCount />
			</header>
		)
	}
});

module.exports = Header;