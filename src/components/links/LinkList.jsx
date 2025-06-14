import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import { useDispatch, useSelector } from "react-redux";
import {
  reorderLinks,
  reorderLinksLocally,
} from "../../redux/slices/linksSlice";
import LinkItem from "./LinkItem";

const LinkList = ({
  links,
  loading,
  isEditingLink,
  profile,
  onEdit,
  onDelete,
  onAdd,
  getIconComponent,
}) => {
  const dispatch = useDispatch();
  const { profile: userProfile } = useSelector((state) => state.user);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedLinks = arrayMove(links, oldIndex, newIndex);

        dispatch(reorderLinksLocally(reorderedLinks));

        if (userProfile?.uid) {
          dispatch(
            reorderLinks({
              userId: userProfile.uid,
              reorderedLinks,
            })
          );
        }
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  if (!profile?.uid) {
    return (
      <div className="text-center py-8">
        <p style={{ color: "var(--color-light-text)" }}>
          Bağlantılarınızı görmek için giriş yapmalısınız.
        </p>
      </div>
    );
  }

  if (loading && links.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: "var(--color-light-text)" }}>
          Bağlantılar yükleniyor...
        </p>
      </div>
    );
  }

  if (!loading && links.length === 0) {
    return (
      <div
        className="text-center py-12 px-6 rounded-lg border"
        style={{
          backgroundColor: "var(--color-neutral-light)",
          borderColor: "var(--color-border)",
          boxShadow: "0 2px 4px var(--color-shadow)",
        }}
      >
        <p className="mb-4" style={{ color: "var(--color-light-text)" }}>
          Henüz hiç bağlantı eklemediniz.
        </p>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-lg transition-colors inline-flex items-center"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            boxShadow: "0 2px 4px var(--color-shadow)",
          }}
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          İlk Bağlantınızı Ekleyin
        </button>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 400px)" }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      >
        <SortableContext
          items={links.map((link) => link.id)}
          strategy={verticalListSortingStrategy}
        >
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              onEdit={onEdit}
              onDelete={onDelete}
              loading={loading}
              isEditingMode={isEditingLink}
              getIconComponent={getIconComponent}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="dragging-overlay">
              <LinkItem
                link={links.find((link) => link.id === activeId)}
                onEdit={() => {}}
                onDelete={() => {}}
                loading={false}
                isEditingMode={false}
                getIconComponent={getIconComponent}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default LinkList;
