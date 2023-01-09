import { levelType } from 'js-chess-engine';
import { ChangeEventHandler, FC, useContext, useState } from 'react';
import { cxChessengine } from '../../../Chessengine';

/**
 * Setting AI level with simple select
 */
const AiLevel: FC = () => {
  const { setLevel, level } = useContext(cxChessengine);

  const [internalLevel, setInternalLevel] = useState<levelType>(level);
  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setLevel(event.currentTarget.value as unknown as levelType);
    setInternalLevel(event.currentTarget.value as unknown as levelType);
  };
  return (
    <select onChange={onChangeHandler} className="base" value={internalLevel}>
      <option value="0">Easy</option>
      <option value="1">Beginner</option>
      <option value="2">Intermediate</option>
      <option value="3">Advanced</option>
      <option value="4" className="rounded-b-3xl">
        Experienced
      </option>
    </select>
  );
};

export default AiLevel;
