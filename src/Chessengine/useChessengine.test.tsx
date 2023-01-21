import { act, renderHook } from '@testing-library/react';
import useChessengine from './useChessengine';

describe('Unit testing of useChessengine hook', () => {
  test('hook return type not null', () => {
    const { result } = renderHook(() => useChessengine());
    expect(result).not.toBeNull();

    const {
      checkData,
      playType,
      refActiveGame,
      refCallback,
      refLevel,
      setPlayType,
      subscribeList
    } = result.current;
    expect(refActiveGame).toBeDefined();
    const game = refActiveGame.current;
    expect(game.exportJson()).toBeDefined();
    expect(checkData).toBeDefined();
    expect(playType).toBeDefined();
    expect(refCallback).toBeDefined();
    expect(refLevel).toBeDefined();
    expect(setPlayType).toBeDefined();
    expect(subscribeList).toBeDefined();
  });
  test('hook return set and get value of playType', () => {
    const { result } = renderHook(() => useChessengine());
    expect(result).not.toBeNull();

    let { playType, setPlayType } = result.current;
    expect(playType).toBe('PLAY');
    act(() => {
      setPlayType('VSAI');
    });

    ({ playType, setPlayType } = result.current);
    expect(playType).toBe('VSAI');
  });
});
