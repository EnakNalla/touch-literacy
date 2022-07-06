import { WordListItem } from '@prisma/client';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md';

interface Props {
  item: WordListItem;
}

const ListItemOverlay = ({ item }: Props) => {
  const deleteBtn = useRef<HTMLSpanElement>(null);

  return (
    <div
      className="my-6 p-6 drop-shadow-2xl bg-base-100 shadow-base-300 border border-inherit rounded flex justify-between"
      onMouseEnter={() => deleteBtn.current!.classList.remove('invisible')}
      onMouseLeave={() => deleteBtn.current!.classList.add('invisible')}
    >
      {item.word}

      <div className="flex">
        <span ref={deleteBtn} className="invisible">
          <AiOutlineClose
            role="button"
            size="24"
            className="hover:text-red-600 hover:bg-slate-100  border-slate-100 hover:border rounded"
          />
        </span>

        <span className="me-3">
          <MdDragIndicator
            className="ml-2 hover:bg-slate-100 rounded hover:border border-slate-100"
            size="24"
          />
        </span>
      </div>
    </div>
  );
};

export default ListItemOverlay;
