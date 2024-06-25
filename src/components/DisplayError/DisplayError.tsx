import { useAtmContext } from '../../context/AtmContext';
import { errorTypesMessages } from '../../utils/errorMessages';
import { getErrorMessagesArray } from './DisplayError.utils';
import './DisplayError.scss';

export function DisplayError() {
  const { error, accountBalance } = useAtmContext();

  if (error.type === 'noError') return <div className="error-container" />;

  const errorMessages = getErrorMessagesArray({ error, accountBalance });

  return (
    <div className="error-container">
      <p className="error-type">{errorTypesMessages[error.type]}</p>
      <div data-testid={'error-messages'}>
        {errorMessages.map((message, index) => (
          <p key={message} className="error-message" data-testid={`error-message__${index}`}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
