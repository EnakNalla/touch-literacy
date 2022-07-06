import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { WordListItem } from '@prisma/client';
import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md';
import { useStore } from '~/stores/StoreProvider';

interface Props {
  item: WordListItem;
  setNodeRef?: (el: HTMLElement | null) => void;
  setActivatorNodeRef?: (el: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap | null;
  attributes?: DraggableAttributes;
  style?: Record<string, unknown>;
}

const BaseListItem = ({
  item,
  listeners,
  attributes,
  setActivatorNodeRef,
  setNodeRef,
  style
}: Props) => {
  const { removeWord } = useStore();

  const listItemOverly = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    node.classList.replace('shadow-lg', 'drop-shadow-2xl');
  }, []);

  return (
    <div
      className="my-6 p-6 alert shadow-lg flex justify-between"
      ref={setNodeRef ?? listItemOverly}
      id={item.id.toString()}
      style={style}
    >
      {item.word}

      <div className="flex">
        <AiOutlineClose
          onClick={() => removeWord(item.id)}
          role="button"
          size="24"
          className="hover:text-red-600 hover:bg-base-300 hover:border rounded"
        />

        <span {...attributes} {...listeners} ref={setActivatorNodeRef} className="me-3">
          <MdDragIndicator
            className="ml-2 hover:bg-base-300 hover:rounded hover:border"
            size="28"
          />
        </span>
      </div>
    </div>
  );
};

export default BaseListItem;
