import React from 'react';

interface IQuestionLinkProps {
  questionName: string;
  questionId: number;
  categoryId: number;
  clickQuestion: (questionId: number, categoryId: number) => void;
}

const MemoizedAppQuestionLink: React.FC<IQuestionLinkProps> = ({
  questionName,
  questionId,
  categoryId,
  clickQuestion,
}) => {
  const handleClick = () => {
    clickQuestion(questionId, categoryId);
  };

  return (
    <span
      className="cursor-pointer relative block leading-[16px] align-middle text-xs hover:font-semibold ml-2 my-1 pl-[15px] after:block after:top-1/2 after:left-0 after:translate-y-[-50%] after:absolute after:w-[10px] after:h-[10px] after:bg-green-300"
      key={questionId}
      onClick={handleClick}
    >
      {questionName}
    </span>
  );
};

const AppQuestionLink = React.memo(MemoizedAppQuestionLink);
export default AppQuestionLink;
