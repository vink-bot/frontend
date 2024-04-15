import React from 'react';

interface IQuestionLinkProps {
  questionName: string;
  questionId: number;
  categoryId: number;
  clickQuestion: (questionId: number, categoryId: number) => void;
}

const MemoizedAppQuestionLink: React.FC<IQuestionLinkProps> = ({ questionName, questionId, categoryId, clickQuestion }) => {
  const handleClick = () => {
    clickQuestion(questionId, categoryId);
  };

  return (
    <span
      className="after:absolute relative after:top-1/2 after:left-0 my-1 ml-2 block after:block cursor-pointer after:bg-green-300 align-middle text-xs leading-[16px] pl-[15px] after:translate-y-[-50%] after:w-[10px] after:h-[10px] hover:font-semibold"
      key={questionId}
      onClick={handleClick}
    >
      {questionName}
    </span>
  );
};

const AppQuestionLink = React.memo(MemoizedAppQuestionLink);
export default AppQuestionLink;
