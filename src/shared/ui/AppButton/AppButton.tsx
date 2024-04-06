import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils/utils.ts';

interface IAppButtonProps {
  children?: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  classNameButton?: string;
  size?: 's' | 'm' | 'full';
  border?: 'rounded' | 'border-none';
  color?: 'yellow' | 'transparent';
}

/**
 * Компонент кнопки для приложения.
 *
 * @param children - Дочерние элементы кнопки, например, текст или иконка.
 * @param type - Тип кнопки (button, reset, submit).
 * @param onClick - Функция обратного вызова, вызываемая при клике на кнопку.
 * @param onMouseEnter - Функция обратного вызова, вызываемая при наведении на кнопку.
 * @param onMouseLeave - Функция обратного вызова, вызываемая при уходе курсора с кнопки.
 * @param classNameButton - Дополнительный класс для кнопки.
 * @param size - Размер кнопки.
 * @param border - Тип кнопки.
 * @param color - Цвет кнопки.
 */
const AppButton: React.FC<IAppButtonProps> = ({ children, type = 'button', onClick, onMouseEnter, onMouseLeave, size = 's', classNameButton, border = 'rounded', color = 'yellow' }) => {
  /**
   * Общий класс для стилизации кнопок.
   */
  const generalClass = 'relative flex items-center justify-center shrink-0 transition-all hover:opacity-70 duration-100';

  /**
   * Размеры кнопок.
   */
  const sizeList = {
    s: 'w-10 h-10',
    m: 'w-12 h-12',
    full: 'h-full w-full',
  };

  /**
   * Типы кнопок.
   */
  const borderList = {
    'border-none': 'border-none',
    rounded: 'rounded-full',
  };

  /**
   * Цвета для кнопок.
   */
  const colorList = {
    yellow: 'bg-yellow',
    transparent: 'transparent',
  };

  /**
   * Обработчик клика.
   */
  const handlerClick = () => typeof onClick === 'function' && onClick();

  /**
   * Обработчик события наведения на кнопку.
   */
  const handlerMouseEnter = () => typeof onMouseEnter === 'function' && onMouseEnter();

  /**
   * Обработчик события наведения на кнопку.
   */
  const handlerMouseLeave = () => typeof onMouseLeave === 'function' && onMouseLeave();

  return (
    <button
      className={cn(generalClass, sizeList[size], borderList[border], colorList[color], classNameButton)}
      type={type}
      onClick={handlerClick}
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
    >
      {children}
    </button>
  );
};

export default AppButton;
