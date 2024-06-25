import { ActionButton } from '../ActionButton/ActionButton';
import './ActionButtonsContainer.scss';

export function ActionButtonsContainer() {
  return (
    <div className='action-buttons-container'>
      <ActionButton type="deposit" />
      <ActionButton type="withdraw" />
    </div>
  );
}
