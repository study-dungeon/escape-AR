import React, { Component } from 'react';

export default class Inventory extends Component {
  render() {
    const { hasKey, hasLetter, hasNote, hasLockPick } = this.props;
    return (
      <div className="inventory">
        <ul>
          {hasKey && <li>1x Rusted Key</li>}
          {hasLetter && <li>1x Letter</li>}
          {hasNote && <li>1x Torn Note</li>}
          {hasLockPick && <li>1x Old Lock Pick</li>}
        </ul>
      </div>
    );
  }
}
