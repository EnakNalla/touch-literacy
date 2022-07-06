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
    opacity: activeId === item.id ? '0.5' : undefined,
    backgroundColor: 'hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity))'
  };

  return (
    <div
      className="my-6 p-6 alert shadow-lg flex justify-between"
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
            className="hover:text-red-600 hover:bg-base-100  border-base-100 hover:border rounded"
          />
        </span>

        <span {...attributes} {...listeners} ref={setActivatorNodeRef} className="me-3">
          <MdDragIndicator
            className="ml-2 hover:bg-base-100 rounded hover:border border-base-100"
            size="24"
          />
        </span>
      </div>
    </div>
  );
};

export default ListItem;
