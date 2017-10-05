import React, { Component, PropTypes } from "react";

class Notification extends Component {
  static propTypes = {
    content: PropTypes.string,
    id: PropTypes.string
  };

  render() {
    const { content, id } = this.props;
    return (
      <div className="message system" key={id}>
        <p>{content}</p>
      </div>
    );
  }
}

export default Notification;
