import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils/utils.ts';

interface IAppButton {
  children?: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
  size?: 's' | 'm';
  buttonClassName?: string;
  typeButton?: 'rounded' | 'default';
  typeButtonColor?: 'yellow' | 'transparent';
}

/**
 * Компонент кнопки для приложения.
 *
 * @param children - Дочерние элементы кнопки, например, текст или иконка.
 * @param type - Тип кнопки (button, reset, submit).
 * @param onClick - Функция обратного вызова, вызываемая при клике на кнопку.
 * @param size - Размер кнопки.
 * @param buttonClassName - Дополнительный класс для кнопки.
 * @param typeButton - Тип кнопки.
 * @param typeButtonColor - Цвет кнопки.
 */
const AppButton: React.FC<IAppButton> = ({
  children,
  type = 'button',
  onClick,
  size = 's',
  buttonClassName,
  typeButton = 'rounded',
  typeButtonColor = 'yellow',
}) => {
  /**
   * Общий класс для стилизации кнопок.
   */
  const generalClass =
    'flex items-center justify-center shrink-0 transition-all hover:opacity-70 duration-100';

  /**
   * Размеры кнопок.
   */
  const sizeList = {
    s: 'w-10 h-10',
    m: 'w-12 h-12',
  };

  /**
   * Типы кнопок.
   */
  const typeButtonList = {
    default: '',
    rounded: 'rounded-full',
  };

  /**
   * Цвета для кнопок.
   */
  const typeButtonColorList = {
    yellow: 'bg-yellow',
    transparent: 'transparent',
  };

  /**
   * Обработчик клика, вызывает переданную функцию onClick.
   */
  const handlerClick = () => {
    if (typeof onClick === 'function') onClick();
  };

  return (
    <button
      className={cn(
        generalClass,
        sizeList[size],
        typeButtonList[typeButton],
        typeButtonColorList[typeButtonColor],
        buttonClassName
      )}
      type={type}
      onClick={handlerClick}
    >
      {children}
    </button>
  );
};

export default AppButton;
