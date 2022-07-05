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
      className="my-4 p-2 shadow-md shadow-slate-200 border border-slate-200 rounded flex justify-between "
      onMouseEnter={() => deleteBtn.current!.classList.remove('invisible')}
      onMouseLeave={() => deleteBtn.current!.classList.add('invisible')}
    >
      {item.word}

      <div className="flex">
        <span ref={deleteBtn} className="invisible">
          <AiOutlineClose
            role="button"
            size="24"
            className="hover:text-red-600 hover:bg-slate-200  border-slate-200 hover:border rounded"
          />
        </span>

        <span className="me-3">
          <MdDragIndicator
            className="ml-2 hover:bg-slate-200 rounded hover:border border-slate-200"
            size="24"
          />
        </span>
      </div>
    </div>
  );
};

export default ListItemOverlay;
