import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WordListItem } from '@prisma/client';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md';
import { useStore } from '~/stores/StoreProvider';

interface Props {
  item: WordListItem;
}

const ListItem = ({ item }: Props) => {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transition, transform } =
    useSortable({
      id: item.id,
      animateLayoutChanges: args => defaultAnimateLayoutChanges({ ...args, wasDragging: true })
    });
  const deleteBtn = useRef<HTMLSpanElement>(null);
  const { removeWord } = useStore();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    touchAction: 'none'
  };

  return (
    <div
      className="my-4 p-2 shadow-md shadow-slate-200 border border-slate-200 rounded flex justify-between "
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => deleteBtn.current!.classList.remove('invisible')}
      onMouseLeave={() => deleteBtn.current!.classList.add('invisible')}
    >
      {item.word}

      <div className="flex">
        <span ref={deleteBtn} className="invisible">
          <AiOutlineClose
            onClick={() => removeWord(item.id)}
            role="button"
            size="24"
            className="hover:text-red-600 hover:bg-slate-200  border-slate-200 hover:border rounded"
          />
        </span>

        <span {...attributes} {...listeners} ref={setActivatorNodeRef} className="me-3">
          <MdDragIndicator
            className="ml-2 hover:bg-slate-200 rounded hover:border border-slate-200"
            size="24"
          />
        </span>
      </div>
    </div>
  );
};

export default ListItem;
