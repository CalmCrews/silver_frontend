import React, { useState } from 'react';
import SpeechToText from '../../components/SpeechToText';
import { SpeechProvider } from '@speechly/react-client';
import ReviewInput from '../../components/ReviewInput';

const Review = () => {
	const [text, setText] = useState('');

	return (
    <SpeechProvider appId="b5384755-0151-4ca3-8253-f42fe22e476a" debug logSegments>
      <SpeechToText setText={setText} />
      <ReviewInput text={text} />
    </SpeechProvider>
  );
};

export default Review;