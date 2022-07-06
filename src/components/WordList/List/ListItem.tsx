import { UniqueIdentifier } from '@dnd-kit/core';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WordListItem } from '@prisma/client';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md';
import { useStore } from '~/stores/StoreProvider';

interface Props {
  item: WordListItem;
  activeId: UniqueIdentifier | null;
}

const ListItem = ({ item, activeId }: Props) => {
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
    touchAction: 'none',
    opacity: activeId === item.id ? '0.5' : undefined
  };

  return (
    <div
      className="my-6 p-6 shadow-md shadow-base-300 border border-inherit rounded flex justify-between"
      ref={setNodeRef}
      id={item.id.toString()}
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
            className="hover:text-red-600 hover:bg-slate-100  border-slate-100 hover:border rounded"
          />
        </span>

        <span {...attributes} {...listeners} ref={setActivatorNodeRef} className="me-3">
          <MdDragIndicator
            className="ml-2 hover:bg-slate-100 rounded hover:border border-slate-100"
            size="24"
          />
        </span>
      </div>
    </div>
  );
};

export default ListItem;
