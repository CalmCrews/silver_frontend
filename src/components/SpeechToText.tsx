import React, { useEffect } from 'react';
import { SpeechProvider, useSpeechContext } from '@speechly/react-client';

type SpeechToTextProps = {
  setText: (text: string) => void;
};

const SpeechToText = ({ setText }: SpeechToTextProps) => {
  const { listening, segment, attachMicrophone, start, stop } = useSpeechContext();

  const handleClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };

  useEffect(() => {
    if (segment) {
      if (segment.isFinal) {
        setText(segment.words.map(w => w.value).join(' '));
      }
    }
  }, [segment, setText]);

  return (
    <button onClick={handleClick}>
      Start/stop microphone
    </button>
  );
};

export default SpeechToText;