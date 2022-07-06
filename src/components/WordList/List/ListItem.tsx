import { UniqueIdentifier } from '@dnd-kit/core';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WordListItem } from '@prisma/client';
import BaseListItem from './BaseListItem';

interface Props {
  item: WordListItem;
  overlay: boolean;
  activeId: UniqueIdentifier | null;
}

const ListItem = ({ activeId, item, overlay }: Props) => {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transition, transform } =
    useSortable({
      id: item.id,
      animateLayoutChanges: args => defaultAnimateLayoutChanges({ ...args, wasDragging: true })
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
    opacity: activeId === item.id ? '0.5' : undefined
  };

  if (overlay) return <BaseListItem item={item} />;

  return (
    <BaseListItem
      item={item}
      style={style}
      listeners={listeners}
      setNodeRef={setNodeRef}
      setActivatorNodeRef={setActivatorNodeRef}
      attributes={attributes}
    />
  );
};

export default ListItem;
