import { PhotoGallery } from "../../types/global.types";

interface Card extends PhotoGallery{
    className?: string,
    onClick?: (id:string | number) => void
}


const Card = () => {
  return (
    <div>Card</div>
  )
}

export default Card