import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * Компонент текстового поля для ввода.
 *
 * @param value - Текущее значение текстового поля.
 * @param onChange - Функция обратного вызова, вызываемая при изменении значения текстового поля.
 * @param onKeyDown - Функция обратного вызова, вызываемая при нажатии клавиши в текстовом поле.
 */
const AppTextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <textarea
      autoFocus={true}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-full min-h-10 outline-none resize-none"
    />
  );
};

export default AppTextArea;
