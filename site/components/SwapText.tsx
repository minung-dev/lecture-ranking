import { memo } from 'react';
import styles from './SwapText.module.css';

import classNames from 'classnames';

type Props = {
  textClassName?: string;
  prev: string | number;
  next: string | number;
};

function SwapText({ textClassName, prev, next }: Props) {
  return (
    <div className={styles.SwapText}>
      {!!prev && (
        <span
          className={classNames(
            'animation animation__fadeOut',
            styles.SwapText__text,
            textClassName,
          )}
        >
          {prev}
        </span>
      )}
      <span
        className={classNames('animation animation__fadeIn', textClassName)}
      >
        {next}
      </span>
    </div>
  );
}

export default memo(SwapText);
