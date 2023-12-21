import { PhotoGallery } from "../../types/global.types";
import { twMerge } from "tailwind-merge";
import Modal from "../Modal/Modal";

interface AddPhotoCard {
    setGalleryData: React.Dispatch<React.SetStateAction<PhotoGallery[]>>;
}

const AddPhotoCard = ({ setGalleryData }: AddPhotoCard) => {
  return (
    <>
        <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={twMerge(
          "rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8"
        )}
      >
        <ImageIcon />
        <p className="font-semibold text-xs md:text-base whitespace-nowrap">
          Add Photos
        </p>
      </button>

      <Modal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        modalId="addImageModal"
      >
        
      </Modal>
    </>
  )
}

export default AddPhotoCard