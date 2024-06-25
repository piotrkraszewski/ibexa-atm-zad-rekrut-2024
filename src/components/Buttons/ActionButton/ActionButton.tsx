import { ActionButtonProps } from './ActionButton.types';
import { useOnActionButtonClick } from './useOnActionButtonClick';
import './ActionButton.scss';

export const ActionButton = ({ type }: ActionButtonProps) => {
  const { onActionButtonClick } = useOnActionButtonClick();

  return (
    <button
      onClick={() => onActionButtonClick({ type })}
      className={`action-button ${type}`}
      data-testid={`action-button__${type}`}
    >
      {type.toUpperCase()}
    </button>
  );
};
