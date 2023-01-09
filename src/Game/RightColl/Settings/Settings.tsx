import { FC, Fragment } from 'react';
import Title from '../Title';
import AiLevel from './AiLevel';
import PlayButton from './PlayButton';

/**
 * Settings section
 */
const Settings: FC = () => {
  return (
    <Fragment>
      <Title>Settings</Title>
      <PlayButton vsAi />
      <PlayButton />
      <AiLevel />
    </Fragment>
  );
};

export default Settings;
