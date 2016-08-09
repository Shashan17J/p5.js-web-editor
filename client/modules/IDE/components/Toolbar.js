import React, { PropTypes } from 'react';
const InlineSVG = require('react-inlinesvg');
const playUrl = require('../../../images/play.svg');
const logoUrl = require('../../../images/p5js-logo.svg');
const stopUrl = require('../../../images/stop.svg');
const preferencesUrl = require('../../../images/preferences.svg');
import classNames from 'classnames';

function Toolbar(props) {
  let playButtonClass = classNames({
    'toolbar__play-button': true,
    'toolbar__play-button--selected': props.isPlaying
  });
  let stopButtonClass = classNames({
    'toolbar__stop-button': true,
    'toolbar__stop-button--selected': !props.isPlaying
  });
  let preferencesButtonClass = classNames({
    'toolbar__preferences-button': true,
    'toolbar__preferences-button--selected': props.preferencesIsVisible
  });

  return (
    <div className="toolbar">
      <img className="toolbar__logo" src={logoUrl} alt="p5js Logo" />
      <button className={playButtonClass} onClick={props.startSketch} aria-label="play sketch">
        <InlineSVG src={playUrl} alt="Play Sketch" />
      </button>

      <button className={stopButtonClass} onClick={props.stopSketch} aria-label="stop sketch">
        <InlineSVG src={stopUrl} alt="Stop Sketch" />
      </button>
      <div className="toolbar__project-name-container">
        <span
          className="toolbar__project-name"
          // TODO change this span into an input
          onBlur={props.setProjectName.bind(this)} // eslint-disable-line
          contentEditable
          suppressContentEditableWarning
        >
          {props.projectName}
        </span>
        {(() => { // eslint-disable-line
          if (props.owner) {
            return (
              <p className="toolbar__project-owner">by <span>{props.owner.username}</span></p>
            );
          }
        })()}
      </div>
      <button
        className={preferencesButtonClass}
        onClick={props.openPreferences}
        aria-label="open preferences"
      >
        <InlineSVG src={preferencesUrl} alt="Show Preferences" />
      </button>
    </div>
  );
}

Toolbar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  preferencesIsVisible: PropTypes.bool.isRequired,
  startSketch: PropTypes.func.isRequired,
  stopSketch: PropTypes.func.isRequired,
  setProjectName: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  openPreferences: PropTypes.func.isRequired,
  owner: PropTypes.shape({
    username: PropTypes.string
  })
};

export default Toolbar;