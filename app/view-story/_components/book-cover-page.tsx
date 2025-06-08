import Image from "next/image"

const BookCoverPage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="w-full h-full">
            <Image
                src={imageUrl}
                alt="Book Cover"
                fill
                className="object-cover"
                priority
            />
        </div>
    )
}

export default BookCoverPage