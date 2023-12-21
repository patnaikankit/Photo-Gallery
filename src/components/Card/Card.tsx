import { useSortable } from "@dnd-kit/sortable";
import { PhotoGallery } from "../../types/global.types";
import { twMerge } from "tailwind-merge";
import { CSS } from "@dnd-kit/utilities";

interface Card extends PhotoGallery{
    className?: string,
    onClick?: (id:string | number) => void
}


const Card = ({id, slug, isSelected, onClick, className="", }: PhotoGallery) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        index,} = useSortable({id: id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            zIndex: isDragging ? "100" : "auto",
            opacity: isDragging ? 0.3 : 1,
            gridRow: index === 0 ? "span 2" : "span 1",
            gridColumn: index === 0 ? "span 2" : "span 1",
            transformOrigin: "0 0",
          };
  return (
    <div ref={setNodeRef} style={style} className={twMerge(
        "absolute inset-0 bg-black transition-opacity duration-500 z-50 opacity-0 group-hover:opacity-40",
        isSelected && "!opacity-0"
      )}>
        <button
        {...listeners}
        {...attributes}
        className={twMerge(
          "absolute inset-0 bg-black transition-opacity duration-500 z-50 opacity-0 group-hover:opacity-40",
          isSelected && "!opacity-0"
        )}
      />
      <button
        className={twMerge(
          "absolute top-2 z-50 left-2 group-hover:opacity-100 transition-opacity duration-500",
          isSelected && "!opacity-100",
          !isSelected && "opacity-0"
        )}
        onClick={onClick && (() => onClick(id))}
      >
        {isSelected ? (
          <CheckboxIcon className="text-blue-600" />
        ) : (
          <EmptyCheckboxIcon className="" />
        )}
      </button>
        <div className={twMerge(
          "flex items-center justify-center h-full",
          isSelected && "opacity-60"
        )}>
            <img src={slug} alt="" className="block h-full w-full object-cover"/>
        </div>
    </div>
  )
}

export default Card