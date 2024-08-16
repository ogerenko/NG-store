import { Link, useLocation } from 'react-router-dom';
import './HistoryPath.scss';
import { capitalize } from '../../utils';
import { ProductExtended } from '../../types/ProductExtended';

type Props = {
  currentProduct?: ProductExtended | null;
  isButtonBack?: boolean;
  isCurrentProduct?: boolean;
};

export const HistoryPath: React.FC<Props> = ({
  currentProduct,
  isButtonBack = false,
  isCurrentProduct = false,
}) => {
  const { pathname, state } = useLocation();
  const currentCategory = pathname.split('/')[1];

  return (
    <>
      <div className="history-path">
        <Link to="/">
          <div className="history-path__icon history-path__icon--home" />
        </Link>
        <div className="history-path__icon history-path__icon--arrow" />
        <Link to={`/${currentCategory}`} className="history-path__page-name">
          {capitalize(currentCategory)}
        </Link>
        {isCurrentProduct && (
          <>
            <div className="history-path__icon history-path__icon--arrow" />
            <Link
              className="history-path__page-name"
              to={`/${currentCategory}/${currentProduct?.id}`}
            >
              {currentProduct?.name}
            </Link>
          </>
        )}
      </div>

      {isButtonBack && (
        <div className="history-path">
          <div className="history-path__icon history-path__icon--arrow--back" />
          <Link
            to={state ? `${state.pathname}?${state.search}` : '..'}
            className="history-path__page-name"
          >
            Back
          </Link>
        </div>
      )}
    </>
  );
};
