import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '~/stores/StoreProvider';
import ListItem from './ListItem';
import ListItemOverlay from './ListItemOverlay';

const WordList = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const { reorder, wordList } = useStore();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={e => {
        setActiveId(null);

        reorder(e);
      }}
    >
      <SortableContext items={wordList.list} strategy={verticalListSortingStrategy}>
        <div className="max-w-xl">
          {wordList.list.map(item => (
            <ListItem item={item} key={item.id} activeId={activeId} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } }
          })
        }}
      >
        {activeId && <ListItemOverlay item={wordList.list.find(item => item.id === activeId)!} />}
      </DragOverlay>
    </DndContext>
  );
};

export default observer(WordList);
