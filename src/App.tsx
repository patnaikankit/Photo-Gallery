import './App.css'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from 'react';
import { PhotoGallery } from './types/global.types';
import { PhotoData } from './data';
import Card from './components/Card/Card';
import AddPhotoCard from './components/Card/addPhotoCard';
import ImageOverlayCard from './components/Card/overlayCard';
import HeaderBlock from "./components/Header/_HeaderBlock";


function App() {
  // States
  const [activeCard, setActiveCard] = useState<PhotoGallery | null>(null);
  const [galleryData, setGalleryData] = useState(PhotoData)


  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );


  // Functions
  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active; 
    if (!id) {
        return;
    }
    const currentImage =  PhotoData.find((item) => {
      item.id === id
    });

    setActiveCard(currentImage || null);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);

    if (event.active && event.over) {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            setGalleryData((items) => {
                const oldIndex = items.findIndex((item) => {
                  item.id === active.id
                });
                const newIndex = items.findIndex((item) => {
                  item.id === over.id
                });

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
};

  const handleSelect = (id: string | number) => {
    const newGalleryData = galleryData.map((imageItem) => {
      if (imageItem.id === id) {
        return {
          ...imageItem,
          isSelected: !imageItem.isSelected,
        };
      }

      return imageItem;
    });

    setGalleryData(newGalleryData);
  }

  const handleOnDelete = (selectedItems: PhotoGallery[]) => {
    // if galleryData.isSelected === true then filter out the selected items and return the rest
    const newGalleryData = galleryData.filter(
      (imageItem) => !selectedItems.includes(imageItem)
    );

    setGalleryData(newGalleryData);
  };


  return (
    <>
      <div className='min-h-screen'>
        <div className='container flex flex-col items-center'>
          <div className='bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y'>
            <HeaderBlock onDelete={handleOnDelete} galleryData={galleryData} />

            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            >
              <div className='grid grid-cols-2 md:grid-cols-5 gap-8 p-8'>
                <SortableContext 
                items={galleryData}
                strategy={rectSortingStrategy}>
                  {galleryData.map((imageItem) => {
                  return (
                    <Card
                      key={imageItem.id}
                      id={imageItem.id}
                      isSelected={imageItem.isSelected}
                      slug={imageItem.slug}
                      onClick={handleSelect}
                    />
                  );
                })}
                </SortableContext>

                <AddPhotoCard setGalleryData={setGalleryData}/>

                <DragOverlay adjustScale={true} wrapperElement="div">
                {activeCard ? (
                  <ImageOverlayCard
                    className="absolute z-50 h-full w-full"
                    slug={activeCard.slug}
                  />
                ) : null}
              </DragOverlay>
              </div>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
