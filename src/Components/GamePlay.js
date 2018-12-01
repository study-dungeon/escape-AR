import React, { Fragment } from 'react';



const GamePlay = () => {
  return (
    <Fragment>
      <div className="how-to-play-container">

        <div className="how-to-play-grid-item">

          <h2 className="how-to-play-title">How to Play</h2>

          {/* <ul className="play-pst"> */}

            <p className="play-instructions">You find yourself in a locked room.</p>

            <p className="play-instructions">
              Print out four 
                <span>
                  <a className="hiro-link" href="/hiro.png"> <u>hiro markers</u> </a>
                </span>
              and place anywhere in your room.
            </p>

            <p className="play-instructions">
              Point your mobile phone camera at any marker to begin.
            </p>

            <p className="play-instructions">Explore clues to escape!</p>
          
          {/* </ul> */}

          <br />

          <button className="play-btn">Play</button>

          <br />
          <br />

        </div>
        
      </div>

      <br />
      <br />

    </Fragment>
  )
}


export default GamePlay;
