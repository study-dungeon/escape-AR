import React, { Component } from 'react';

export default class Inventory extends Component {
  render() {
    const {
      hasKey,
      hasLetter,
      hasNote,
      hasLockPick,
      hasBrokenLockPick,
    } = this.props;
    return (
      <div className="inventory">
        <h4>Inventory</h4>
        {hasKey && (
          <div className="inv-item">
            <p>1x Rusted Key</p>
            <img src={'inventory/key.png'} alt="key" className="inv-png" />
          </div>
        )}
        {hasLetter && (
          <div className="inv-item">
            <p>1x Letter</p>
            <img
              src={'inventory/letter.png'}
              alt="letter"
              className="inv-png"
            />
          </div>
        )}
        {hasNote && (
          <div className="inv-item">
            <p>1x Torn Note</p>
            <img src={'inventory/note.png'} alt="note" className="inv-png" />
          </div>
        )}
        {hasLockPick && (
          <div className="inv-item">
            <p>1x Old Lock Pick</p>
            <img
              src={'inventory/lockpick.png'}
              alt="lockpick"
              className="inv-png"
            />
          </div>
        )}
        {hasBrokenLockPick && (
          <div className="inv-item">
            <p>1x Old and Broken Lock Pick</p>
            <img
              src={'inventory/lockpick_bw.png'}
              alt="lockpick"
              className="inv-png"
            />
          </div>
        )}
      </div>
    );
  }
}
