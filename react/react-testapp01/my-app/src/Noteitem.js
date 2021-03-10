import React, { Component } from 'react';
import './noteitem.css';
import './reset.css';

class NoteItem extends Component {
  render() {
    const {
      title,
      description,
      ...props
    } = this.props;

    return (
      <div className="NoteItem" {...props}>
        <div className="NoteItem-title">{title}</div>
        <div className="NoteItem-description">{description}</div>
      </div>
    );
  }
}

export default NoteItem;
