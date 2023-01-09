import useEventListener from './useEventListener';

type Handler = (event: KeyboardEvent) => void;

function useCatchKeyboardPress(handler: Handler, keyCode: string[]): void {
  useEventListener('keyup', (event) => {
    if (keyCode.includes(event.key)) {
      handler(event);
    }
  });
}

export default useCatchKeyboardPress;
